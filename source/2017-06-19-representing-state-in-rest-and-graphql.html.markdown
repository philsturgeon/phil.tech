---
title: Representing State in REST and GraphQL
date: 2017-06-19 22:56 UTC
tags: hypermedia, hateoas, graphql, rest, api, http
category: api
comments: true
hide_closing: true
excerpt: It's very common for APIs to be treated like "databases over HTTP", with clients expected to infer state from a collection of boolean switches and date fields. Stop this with HATEOAS.
---

Representing state is a complex thing. At my last two jobs, it's been very common for APIs to be treated like "databases over HTTP". The fields are sent up and down from the server to multiple mobile/web apps, and there's not too much else going on.

Over time, we noticed this specific problem happening over and over again: When you ask the clients to infer state from the fields alone, they often infer things differently. More than that, even if they infer the correct state _right now_, it might not be the correct state in a few months.

What the hell am I going on about?

An example!

Let's talk about invoices. Our API could be REST, RESTish or GraphQL, doesn't matter. We have a basic object with a bunch of date fields:

~~~json
{
  "data": {
    "type": "invoice",
    "id": "093b941d",
    "attributes": {
      "published_at": "2017-06-15 12:31:01Z",
      "sent_at": "2017-06-15 12:34:29Z",
      "paid_at": null
    }
  }
}
~~~

We tell the clients that if there is no paid date, then it has not been paid, and the same logic applies for sent. It might look a bit like this:

~~~js
if (model.paid_at) {
  status = 'paid';
} else if (model.sent_at) {
  status = 'sent';
} else if (model.published_at) {
  status = 'published';
} else {
  status = 'draft';
}
~~~

This means we can display `Status: Sent` on our various client applications, and it's likely all the apps got that right.

Soon we notice a situation where the payment is initiated, but the payment bounces. Maybe we add another field, and this whole "inspect the dates" thing starts to fall apart.

~~~json
{
  "data": {
    "type": "invoice",
    "id": "093b941d",
    "attributes": {
      "published_at": "2017-06-15 12:31:01Z",
      "sent_at": "2017-06-15 12:34:29Z",
      "paid_at": "2017-06-16 09:05:00Z",
      "payment_received_at": null
    }
  }
}
~~~

A client inferring state from those fields would consider that invoice paid. Another client would consider it to be an unpaid invoice, as there was a failed payment. If a new "published" state was added, they'd be showing as draft. Mess all over.

Of course, folks will say "well you shouldn't change things without versioning", but even if we started with the 2nd example of that JSON and never changed anything, multiple clients could interpret those fields differently.

Changing things without versioning is sometimes known as [API evolution](https://www.mnot.net/blog/2012/12/04/api-evolution), and whilst you shouldn't go running about breaking things willy nilly, you should be able to add to an API without clients exploding. GraphQL is advertising people use evolution right on their homepage, so it's not an alien concept.

## API != Database

Inferring states from dates or other arbitrary fields is awful, and it _always_ goes wrong. I noticed a similar issue with Postmates Fleet saying "Waiting on verification of your profile image" on the mobile app, and the web app said "Please upload a profile image". If I dug into the code, I'd bet they were looking for an "image verified" switch of some sort, and the web app just happened to notice a field that the mobile app didn't.

This is one of many many many reasons why folks need to stop treating an API like it is purely SQL-over-HTTP. The data can be stored like this in the _database_, but exposing it in the contract is begging for trouble, as clients will always end up with a slightly different picture of the current state.

How do you avoid this? State machines!

In the world of Ruby there are loads of options, but [Statesman](https://github.com/gocardless/statesman) is super simple, and [AASM](https://github.com/aasm/aasm) is cool.

Let's look at this just in code, and ignore HTTP for a second.

~~~ruby
class InvoiceStateMachine
  include Statesman::Machine

  state :draft, initial: true
  state :published
  state :sent
  state :failed
  state :paid

  transition from: :draft,        to: :published
  transition from: :published,    to: [:draft, :sent, :paid]
  transition from: :sent,         to: [:failed, :paid]
  transition from: :failed,       to: :paid

  guard_transition(to: :sent) do |invoice|
    invoice.has_contact_info?
  end

  before_transition(to: :sent) do |invoice, transition|
    EmailService.new(invoice).send_contact_invoice
    invoice.touch(:sent_at)
  end

  after_transition(to: :failed) do |invoice, transition|
    EmailService.new(invoice).send_contact_failure
    EmailService.new(invoice).send_owner_failure
    invoice.touch(:failed_at)
  end

  after_transition(to: :paid) do |invoice, transition|
    EmailService.new(invoice).send_owner_success
    invoice.touch(:paid_at)
  end
end
~~~

Now we can do this:

~~~
invoice.current_state # => "draft"
invoice.allowed_transitions # => ["published"]
invoice.can_transition_to?(:sent) # => true/false
invoice.transition_to(:paid) # => true/false
~~~

This gives us a lot of ability to assert a single "status", and you know the server has everything under control. We've not had to spread that logic throughout persistence layer logic, controller logic, and arbitrary classes. It's all in the state machine, and the main thing is that we no longer have to ask the clients to try and guess what's up with the invoice.

## Exposing State over HTTP

Just like the Ruby example, we want to know the current state, and we want to know what we can do next.

First thing? Shove that `current_state` property in your serializer to expose a `"status": "draft"` field in the output. This'll work fine for both RESTish APIs and those built with GraphQL.

How about the "what to do next" bit?  Well, this is exactly what HATEOAS is!

### HATEOAS I CALL ON THEE

"Hypermedia As The Engine Of Application State" is a concept that's ignored by many, but it's what makes a REST API so powerful.

At it's most basic, starting to implement some HATEOAS in your API would look like this:

~~~ json
{
  "data": {
    "type": "invoice",
    "id": "093b941d",
    "attributes": {
      "created_at": "2017-06-15 12:31:01Z",
      "sent_at": "2017-06-15 12:34:29Z",
      "paid_at": "2017-06-16 09:05:00Z",
      "payment_received_at": null,
      "status": "published"
    }
  },
  "links": {
    "pay": "https://api.acme.com/invoices/093b941d/payment_attempts"
  }
}
~~~

The existence of that `pay` link can be used to let the various client apps know they should show the "Pay" button. If it wasn't `published` that link wouldn't be there.

This theoretically works, although it is not super clear exactly what a client needs to do from the existence of this pay link alone.

What HTTP method should be used?
What fields need to be sent?
What mime type should be put in `Accept`?

There are a few ways HATEOAS can help.

**OPTIONS + Meta Data**

A client could call `OPTIONS /invoices/093b941d/payment_attempts` and get a response with metadata about the document.

What actions are available. What fields can be updated. What data do those fields expect?

Sometimes people make [homegrown solutions](http://zacstewart.com/2012/04/14/http-options-method.html), and some folks leverage tools like [JSON Schema](http://json-schema.org/) for the fields part.

**Hyper Schema**

Another approach is [JSON Hyper-Schema](http://json-schema.org/latest/json-schema-hypermedia.html), which is a draft spec. Is essentially an extension to JSON Schema, which adds `links` keywords! Instead of making your own `OPTIONS` metadata and linking to JSON Schema, this Hyper-Schema could be the entire OPTIONS response!

If hiding it behind options seems weird, you can also/either place a link in the response document:

~~~
{
  "schema": "http://api.acme.com/schemas/invoice/093b941d"
  "data": {
~~~

Using metadata to let clients know what data they should send is very cool, as it offers a method for client-side validation which matches server-side validation perfectly. Now your various applications can use that JSON Schema to validate data locally before even trying the POST (saving time and reducing traffic to the server).

**Hypermedia-friendly Formats**

Instead of two requests, another approach is combining the metadata with the response document. Our example so far has been using [JSON-API](http://jsonapi.org/), so to continue using that:

~~~
"links": {
  "pay": {
    "href": "https://api.acme.com/invoices/093b941d/payment_attempts"
    "meta": {
      "method": "POST",
      "type": "application/json"
    }
  }
}
~~~

This isn't really part of the JSON-API specification, but [it is valid](http://jsonapi.org/format/#document-links). Inventing your own standards and conventions can be a pain in the ass, so maybe don't bother. There's a standard for that: [Siren](https://github.com/kevinswiber/siren).

Check out this potential JSON response.

~~~json
{
  "class": [ "invoice" ],
  "properties": {
    "id": "093b941d",
    "all_the_other": "fields",
    "so_many": "other_fields",
    "status": "published"
  },
  "entities": [
    {
      "class": [ "items", "collection" ],
      "rel": [ "http://acme.com/rels/pay-invoice" ],
      "href": "https://api.acme.com/invoices/093b941d/payment_attempts"
    }
  ],
  "actions": [
    {
      "name": "pay-invoice",
      "title": "Pay Invoice",
      "method": "POST",
      "href": "https://api.acme.com/invoices/093b941d/payment_attempts",
      "type": "application/json",
      "fields": [
        { "name": "invoice_number", "type": "hidden", "value": "42" },
        { "name": "amount", "type": "number" },
        { "name": "stripe_token", "type": "text" }
      ]
    }
  ],
  "links": [
    { "rel": [ "self" ], "href": "http://api.acme.com/invoices/093b941d" },
    { "rel": [ "previous" ], "href": "http://api.acme.com/invoices/a46c437c" },
    { "rel": [ "next" ], "href": "http://api.acme.com/invoices/ca0e7f36" }
  ]
}
~~~

Perfect!

We now which HTTP method to use. We know what fields to send. We know the data types of the fields. We don't know a huge amount about what to put in those fields, but it's a start.

How easy would it be to hook that response up to an "Actions" dropdown, and dynamically have the interface built out from it? You could roll out certain features to your client applications _without touching the client code_.

You can finally fire Gary!

There's quite a few [other data formats](https://sookocheff.com/post/api/on-choosing-a-hypermedia-format/) that support hypermedia, including the awesomely named [Hydra](http://www.markus-lanthaler.com/hydra/).

## Actions seem unRESTy

Something I've said [fairly recently](https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/) is that "actions are RPC" ('remote procedure call'), which is... semi accurate. If an API is nothing but actions then it is probably better off as RPC. I'm building a permissions API that accepts a bunch of parameters, then returns true or false if the user has permission. That can stay as RPC.

REST is all about a beautiful mixture of data, relationships and actions. Taken from the Siren homepage is this lovely quote:

>It's important to note the distinction between link relations and classes. Link relations define a relationship between two resources. Classes define a classification of the nature of the element, be it an entity or an action, in its current representation.

They continue to fit their "add item" link in with the usual expectations for collections and resources, and the add item is still `"href": "http://api.x.io/orders/42/items",`. This mixture of actions and data actually lines up rather well with what I've said in that article.

A [recent talk from Mike Amundsen](http://www.ustream.tv/recorded/102891495) goes through a number of topics, but specifically Hypermedia (HATEOAS) as a collection of affordances (potential actions that can taken). This quote was up in there:

<img src="When I say hypertext, I mean the simultaneous presentation of information and controls such as that the information becomes the affordance through which the user obtains choices and selects actions. by Roy Fielding, 2008" src="/images/article_images/2017-06-15-representing-state-in-rest-and-graphql/information-and-controls.png" class="data-no-caption" />

Information and actions, displayed up to a user through a self-documenting format of awesomeness, with a selection of links that turn a well-tuned client into a crawler instead of just being a CRUD exchange... well that's the whole point of REST.

## To HATEOAS or not to HATEOAS

We know that if you don't have HATEOAS, [you only have a RESTish API](http://roy.gbiv.com/untangled/2008/rest-apis-must-be-hypertext-driven).

HATEOAS is a really useful concept, which solves so many issues I've run into time and time again. I don't think every API needs to use HATEOAS by any means, and simple (micro)services often wont.

Regardless of needing it, I definitely think people should understand what it is. The main reason? People should know what they're missing when they call GraphQL "REST 2.0". GraphQL has no ability to offer HATEOAS<sup>\*</sup>, and as such is essentially a _subset_ of REST, and not a "new version".

A lot of the [cool stuff you can do in GraphQL can be done in REST](https://blog.runscope.com/posts/you-might-not-need-graphql), but GraphQL has no HATEOAS. Maybe think about that.

Sure waiting for links before working out what to do next is slower for mobile applications that need to function as blazingly fast as possible over crap networks, but REST has solutions to that, and to be honest server-to-server doesn't always need to trim bits.

If you're really set on using GraphQL but want to make sure you're representing state and not forcing clients to guess, at least implement a state machine and add that `status` field.

Finally, if you're not doing any of this stuff then stop calling it a REST API. RESTish will do. 👍

<em>Thanks to the small army of people who battled through my nonsense first drafts in an effort to make me sound intelligent. You know who you are, but especially [@dstockto](http://twitter.com/dstockto), [@glasnt](http://twitter.com/glasnt), and [@mwop](http://twitter.com/mwop).</em>

<em><sup>\*</sup> I'm sure you could find some way to hack HATEOAS support into GraphQL, like a field with an array of potential mutators that are available, but it'll be a bit of a mess and you'd need to request specific pieces of metadata making the queries huge. The majority of REST & RESTish APIs have ignored HATEOAS for years, so I don't expect a stampede of GraphQL developers trying to mash it into a query language that was designed to exclude it.</em>
