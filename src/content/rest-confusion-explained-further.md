---
layout: post
author: [Phil]
title: Still Going on REST is the new SOAP
excerpt: The misunderstandings on REST continue, and I'm happy to explain them all up!
date: 2018-01-20
tags: [api, rest, rpc, soap, http2]
comments: true
disqus_identifier: rest-confusion-explained-further
alias_1: api/2018/01/20/rest-confusion-explained-further/
---

One month after [A Response to REST is the new SOAP](https://phil.tech/api/2017/12/18/rest-confusion-explained/) and I'm still having a productive dialog with the author, helping him understand how REST works. I thought it might interest some of you too.

## Pakal de Bonchamp

Thanks for the lengthy article - we unexpectedly agree on many things. I'll try to summarize my thoughts about this (and the tons of comments on social media) in a complementary post, but I just take the opportunity to clarify some dubious (but minor) points here

About the payload of DELETE requests, I have to disagree with your analysis. Rfc2616 is now obsoleted, but it did, indirectly, imply what I said. See discussions here:

<https://stackoverflow.com/questions/299628/is-an-entity-body-allowed-for-an-http-delete-request>

Although the spec does not forbid DELETE requests from having a message-body, section 4.3 seems to indicate that the body should be ignored by servers since there are no "defined semantics" for DELETE entity-bodies:
"A server SHOULD read and forward a message-body on any request; if the request method does not include defined semantics for an entity-body, then the message-body SHOULD be ignored when handling the request."
*shelley Jan 9 '13 at 23:49*

Same thing for PATCH semantics: the requirement of a "set of operations" was somehow canceled by the recent JSON Merge Patch RFC7386 , but for a long time "everybody was doing it wrong" nevertheless, and you can still find dozens of rants, from dedicated REST advocates, about this point. See <http://williamdurand.fr/2014/02/14/please-do-not-patch-like-an-idiot/>
By the way, RFC7386 states that it suits APIs which "do not make use of explicit null values", that is to say, NONE I've ever crossed. I'm appalled.

If anything, these two details show that RESTfulness can be a moving, fuzzy, treacherous jungle for the unwary developer.

## Me

For DELETE, I would suggest that using folks interpretations of it from StackOverflow is what got us into a lot of mess with HTTP and REST in general. I too was confused after reading incorrect assumptions on StackOverflow, and I have had to correct myself many times. 2616 was replaced because some stuff was unclear, and now that we have clarifications there should be no more confusion.

I wrote that [PUT / PATCH / JSON-PATCH article](https://blog.apisyouwonthate.com/put-vs-patch-vs-json-patch-208b3bfda7ac) as a response to William Durand, and we spoke about it since. If memory servers me right (Correct me Will!) he said he was a bit overly heated about that article, and accepted my interpretation, that a "set of operations" can easily be a "fields to update", which was the interpretation that was codified in JSON Merge Patch.

Overall, folks were a bit wobbly interpreting HTTP through old RFCs like 2616, which has now been clarified in new expanded RFCs. As such, we can use HTTP/1.1 and many of the amazing new RFCs like API Problems, Merge Patch, etc, to build any sort of API.

None of that (confusion about HTTP, DELETE, PATCH, or any other RFCs) has a single solitary thing to do with REST, which is still a fantastic concept if you can understand that it's offering far far FAR more than RPC. Sometimes you don't can benefit greatly from REST, sometimes RPC is just the ticket, but confusing the two then blaming REST for the confusion is not going to help anything. :)

## Pakal

Please, is there any other source of information than this 46 minutes audio-only podcast, to explain Hateoas? I understand nothing to this endless talk http://apibusters.com/003-w... (I'm not an English native), and web articles I've crossed always remain in the "theory" to avoid facing real life problems.

I've tried exploring the FoxyCart API instead, but it makes little sense to me.

For example : https://api.foxycart.com/rels/store

How is the APi client supposed to recognize "store" objects returned ? They are by default application/hal+json, how can such resources be understood by a "decoupled client"?
How does the machine know what a "fx:item_categories" affordance is?
Since integrator has to read tons of out-of-band information to understand which Resource field can be used for what, and hardcode it in the client program, what is the gain compared to non-REST APIs?

I've had a good laugh with the page "https://api.foxycart.com/re..." btw.
"Property helpers are links to various helpers for determining default values for resource properties along with other helpful API information. [..] Properties: This result varies per helper and may change over time. Please see the API browser for more details."
Isn't that a way of telling API consumers "we do what we want, just adapt to our changes when they happen"!?

## Me Again!

Thanks for coming back for another chat Pakal. I've been meaning to get transcripts on the podcast, and I will absolutely do that. Audio only is no good for many people.

If you would like an article explaining why HATEOAS is useful and show how it works, take a look at [Representing State in REST and GraphQL](https://blog.apisyouwonthate.com/representing-state-in-rest-and-graphql-9194b291d127)

The cusp is that instead of firing data fields up and down and forcing each and every client to figure out the state, and attempt to work out the next available actions, you instead "normalize" the state up into the API.

I explain that concept more on [Understanding RPC, REST & GraphQL](https://blog.apisyouwonthate.com/understanding-rpc-rest-and-graphql-2f959aadebe7).

Specifically where I pretend RPC and REST are assistants at a doctors office:

Client: Hi, I would like to speak to Dr Watson, is he there?
RPC: No. *click*
*Calls back*
Client: I checked his calendar, and it looks like he is off for the day. I would like to visit another doctor, and it looks like Dr Jones is available at 3pm, can I see her then?
RPC: Yes.

The burden of knowing what to do is entirely on the client. It needs to know all the data, come to the appropriate conclusion itself, then has to figure out what to do next. REST however presents you with the next available options.

Client: Hi, I would like to speak to Dr Watson, is he there?

REST: Doctor Watson is not currently in the office, he’ll be back tomorrow, but you have a few options. If it’s not urgent you could leave a message and I’ll get it to him tomorrow, or I can book you with another doctor, would you like to hear who is available today?

Client: Yes, please let me know who is there!

REST: Doctors Smith and Jones, here are links to their profiles.

Client: Ok, Doctor Jones looks like my sort of Doctor, I would like to see them, let’s make that appointment.
REST: Appointment created, here’s a link to the appointment details.

> How is the APi client supposed to recognize "store" objects returned ?

Instead of teaching your client that the URL /store has meaning, you teach it that the link relation "store" has meaning. It's not drastically different. Clients for hypermedia APIs are no more magically able to understand rel = store than they are able to guess a URL.

It's not really about knowing the URL, it's about seeing a link there. If the link is available, the action (or affordance) is relevant to that resource in that state.

> They are by default application/hal+json, how can such resources be
understood by a "decoupled client"?

Any client code that inspects this mime type will know that this is JSON. It's actually a special mime type that explains it's more than just JSON, its [HAL](http://stateless.co/hal_specification.html), which is a hypermedia format built in JSON.

> How does the machine know what a "fx:item_categories" affordance is?

How does the machine know what a `GET /items_categories` is? You tell it. You just train the machine to follow the link instead of remember the link and attack it directly.

> Since integrator has to read tons of out-of-band information to understand
which Resource field can be used for what, and hardcode it in the client
program, what is the gain compared to non-REST APIs?

Great question! One benefit people often say about REST is "you don't need documentation". I think that is partially true, but there will always need to be a certain amount of documentation about what resources are, possible workflows, business rules, etc. That is more user documentation than API Documentation, which certainly becomes less important. You no longer need to share a list of URLs for clients to remember or descriptions for what they do, because your documentation explains the workflows and the clients just follow the breadcrumbs.

The doctors office explains how REST can make the documentation far less necessary, as RPC makes you figure out _everything_, and REST provides you with breadcrumbs.

Both systems make you figure out what what specific fields are, and what they do. REST does not help you with specific field meanings, but neither does RPC as a general concept.

The paradigms do not provide metadata, but certain concrete implementations do.

SOAP had XML Schema, gRPC has Protobuff, and GraphQL has "GraphQL Types".

REST has no opinion on the topic, so you have potentially infinite options at your disposal. You can use Protobuff, JSON Schema, JSON-LD, Cap'n'proto, something else, all of them, or none at all. Content-Type and Accept allow you to mix and match at your pleasure.

More on that here: [Why Do People Dislike JSON?](https://blog.apisyouwonthate.com/why-do-people-dislike-json-a7d67c8d38c1)

This metadata is usually considered in-band, as the schema data is discoverable, often by a head or a link in the payload.

> I've had a good laugh with the page "https://api.foxycart.com/re..." btw.
"Property
helpers are links to various helpers for determining default values for
resource properties along with other helpful API information. [..]
Properties: This result varies per helper and may change over time.
Please see the API browser for more details."
Isn't that a way of telling API consumers "we do what we want, just adapt to our changes when they happen"!?

I think you may have misread this. They are saying that the actual HTML returned by each specific helper is different to other helpers, so the best way to take a look is to jump into the API browser, instead of them copying and pasting it all into documentation. I think that is fair enough.

I would be very happy to answer any more questions you have, and help you understand HATEOAS as a concept. It's misunderstood by most people, who then ignore it, and call REST pointless because it's basically "slightly different RPC with different URLs". Without HATEOAS, REST is pretty much just that. This is why we need to help people understand HATEOAS instead of moaning about it.

Those articles should do a good job of explaining it all. In the mean time, I'm going to get transcripts up on the API Busters podcast. :)

<hr>

We'll see how it goes from here. Seems like progress is being made, and it's giving me plenty of tips on questions to answer in the next book: [Talking to Other People's APIs](https://leanpub.com/talking-to-other-peoples-web-apis/).
