---
layout: post
title: "The Importance of Serializing API Output"
date: '2015-05-30 18:04:00'
category: api
tags: http, api, serialization, php, fractal, rails, ams
comments: true
excerpt: "One of the most important parts of building any sort of HTTP API is to serialize data before you
output it, and hardly anyone does it."
---

I've given the [API Pain Points](https://www.youtube.com/watch?v=3W7bQj6OdLU) talk a bazillion times over the last year. In just 2015 I gave it at:

- [Lone Star PHP](https://joind.in/talk/view/13552)
- [OpenWest](https://joind.in/talk/view/13899)
- [ConFoo](https://joind.in/talk/view/13621)

One section that seems to get a lot of feedback and questions is when I talk about serialization, which I refer to as "adding a presentation layer to your data".

MSDN says it like this:

> Serialization is the process of converting an object into a stream of bytes in order to store the object or transmit it to memory, a database, or a file. Its main purpose is to save the state of an object in order to be able to recreate it when needed. The reverse process is called deserialization. -- **Source:**  [MSDN Programming Concepts](https://msdn.microsoft.com/en-us/library/ms233843.aspx)

To PHP developers, they often consider serialization to be using the [`serialize()` function](http://php.net/serialize). Yes, this is one form of serialization, but it's not the only one. Another common serialization approach is of course to use the [`json_encode()` function](http://php.net/json_encode). These days modern frameworks will automatically convert any array returned from a controller method to JSON, meaning you don't even need to call `json_encode()` yourself.

This can be a handy shortcut, but if you are building HTTP API (AJAX/RESTful/Hypermedia), then you need to be a bit more specific with what you are returning.

The most common offender is this:

~~~php
<?php
class PlaceController extends CoreController
{
    public function show($id)
    {
        return Place::find($id);
    }
}
~~~

Excuse the drastically simplified chunk of code here, but the point is we're taking a model (probably using an ORM) and returning the result directly.

This seems fairly innocent, but leads to a range of problems.

## No More Secrets

Every single field you add to your data store is going to end up being output to the API callee. If this is an internal API then maybe that is ok, but if your information goes anywhere near the browser, or another outside location like a mobile device, you're going to have a really bad time.

The most obvious examples are users passwords. Sure they're encrypted but you _obviously_ do not want to be handing those out to strangers.

Slightly more obscure things like password reset tokens being leaked can also lead to your users being hacked.

But it can get even more obscure. In this 'place' example, maybe a requirement filtered down from business asking you to add a 'contact email' which is for internal use only. If you've spent months getting these places on board and have built some unique contacts, you might not want to leak all of those email address to potential competitors.

Yes, many ORMs have 'hidden' or 'visable' options to blacklist or whitelist various properties, but as time goes on the chances of keeping every potentially value hidden gets more and more unlikely, especially if you have a junior who doesn't know that one of these fields is taboo, and a tired peer reviewer lets it sneak through on a busy day.

An example of [Fractal] - a PHP serialization library I built to help me serialize my APIs - has this simple example:

~~~php
<?php
use League\Fractal\Manager;
use League\Fractal\Resource\Collection;

// Create a top level instance somewhere
$fractal = new Manager();

// Ask the ORM for 10 books
$books = Book::take(10)->get();

// Turn this collection
$resource = new Collection($books, function(array $book) {
    return [
        'id'      => (int) $book->id,
        'title'   => $book->title,
        'year'    => (int) $book->yr,
        'author'  => [
        	'name'  => $book->author_name,
        	'email' => $book->author_email,
        ],
        'links'   => [
            [
                'rel' => 'self',
                'uri' => '/books/'.$book->id,
            ]
        ]
    ];
});
~~~

Yes, again it is overly simplified and uses callbacks instead of classes for the logic, but the general idea holds.

There are tools out there for every language under the sun. I've worked with [ActiveModel Serializer] and it's almost identical.

Regardless of the language you're using this week, I'd like to explain why doing this is so important. You can learn the how later, but this article is about the why.

## Attribute Data Types

Many languages - PHP included - are pretty dumb when it comes to their data binding drivers. Things like MySQL and PostgreSQL have many data types: integer, float, boolean, etc, but everything that gets through to userland is just a string.

Instead of `true` and `false` you see `"1"` and `"0"`, or maybe even `"t"` and `"f"`. Floats come out as `"-41.235"` instead of `-41.235`.

To a weakly typed language that might not seem particularly important, but strictly typed languages will fall over if this is to ever change. A few times I have seen a numeric string change to an integer due to some math being done in an [ORM accessor](http://laravel.com/docs/4.2/eloquent#accessors-and-mutators), in which `"1" + "2" = 3`. Such a change could potentially pass your unit tests if they're vague enough, but it will break the shit out of your iOS app.

ActiveRecord in Rails will track what data type fields should be as they are added to the schema via migrations, but if these change - via accessors or by changing schema type - it will still cause problems.

Using serialization like the example above, you can typecast your data to ensure it is the expect type on output, and that type will only change if you change it in the serializer.

## Renaming Fields

Renaming fields in the data store should not break your API. If you think having to update all of your integration tests is annoying, think how more annoying it will be for mobile app developers and other frontend teams who have to update and deploy new applications. Maybe you don't even remember to lock-step the deploy. If you don't then you're gonna have broken apps for end users, and even if you push an update to iOS it will be broken until they update their app.

All you need to avoid this renamed field hell is a serialization layer, which will let you update the reference to the field without changing the outside representation.

## Multiple Data Stores

Lots of these ORMish serialization solutions have one major assumption: all of your data lives in the same data store. What happens when some of your data leaves SQL and gets moved off to Redis or something else?

Even if you aren't moving partial data from SQL to Redis, maybe you've split your one table into two, or are using pivot tables now. Most ORM serializers will land on their face if you try this.

Instead, maybe using the repository pattern which has become so popular in Laravel, you can pass all of this data from whatever stores they are in to the serialization library, and the serializer will maintain a consistent output.

## Versioning Serializers

In the past I have versioned serializers for major versions. v1 and v2 of `FooSerializer` can both exist, which have different tests, and satisfy multiple API client needs perfectly.

## Serializer Formats

Something that Fractal has not yet smoothly achieved, but aims to fix for v1.0, is multiple format "adapters". This has been done pretty well in the Rails community, and you can send different headers to get totally different formats.

- [JSON-API](http://jsonapi.org/)
- [HAL](http://stateless.co/hal_specification.html)
- [EmberData](http://emberjs.com/api/data/classes/DS.RESTAdapter.html)

Depending on the mime-type you send, you can tell your serializer to send back that format, without having to clog up your entire codebase with potentially complex logic.

## Solutions

I could probably bang on with more reasons for days, but todays flight landed at 5am and the folks next to me kept me up all night.

I have covered the 'why' for serialization, but not the 'how'. For that, take a look at these solutions:

* [Fractal] - PHP
* [JMSSerializerBundle] - PHP + Symfony2
* [Marshmallow] - Python
* [ActiveModel Serializer] - Ruby + Rails
* [JBuilder] - Ruby + Rails
* [Roar] - Ruby

I saw a great talk at RailsConf 2015 by my new friend [João Moura](https://twitter.com/joaomdmoura) called [AMS, API, Rails and a developer, a Love Story](https://www.youtube.com/watch?v=PqgQNgWdUB8), which will show off some of the cool functionality.

Whichever system you pick, they all have roughly the same idea.

If you're making any sort of API, _please_ do this.

An API is not just a proxy for SQL commands, it should be planned, considered and maintained carefully, and a simple change to your data store should not take down the entire network of applications and services.

[Fractal]: http://fractal.thephpleague.com/
[JMSSerializerBundle]: http://jmsyst.com/bundles/JMSSerializerBundle
[Marshmallow]: http://marshmallow.readthedocs.org/
[ActiveModel Serializer]: https://github.com/rails-api/active_model_serializers
[Roar]: https://github.com/apotonick/roar
[JBuilder]: https://github.com/rails/jbuilder
