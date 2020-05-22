---
layout: post
author: [Phil]
title: Refactoring an entire API Ecosystem
tags: [architecture]
excerpt: 
  You've joined a huge company and the entire API ecosystem is a complete mess, how do you prioritize what needs to be done in order to unf**k the whole thing? API Descriptions REST, API Evolution, Circuit Breakers, HTTP/2, HTTP Caching, gRPC, GraphQL, what is going to help and when do you do it?
date: '2020-05-22 10:00:00'
comments: true
---

When I started working at WeWork back in 2016 I rather quickly discovered that the entire architecture was a total mess... Over the course of the 18 months I managed to stay there, we fixed a whole lot of that mess.

No APIs were documented so people would just build a new version of whatever resource they needed. If `/v2/users` existed and the GET was fine but the POST needed to change, they'd make a `POST /v3/users` and let everyone keep using the `GET /v2/users` forever. Or vice versa. There was no pattern to any of it. You might hit a v1, v2, v3 and v6 endpoint in the same client codebase.

APIs were built based on what the team thought one client would need, but usually ended up being unusable for other clients, so seeing a v6 for a service only a year or two old wasn't unheard of.

Every API (and API version) would use whatever data format and error format it liked, meaning you could be hitting multiple error formats in the same codebase. Customers seeing "Error: [object]" was common.

Various different authentication systems were used all over the place, most of which were incredibly insecure, and sometimes endpoints would have no authentication applied accidentally.

APIs would often respond in 2-5 seconds, with 10s not being uncommon, because somebody somewhere said multiple HTTP calls were bad - meaning GIANT payloads of JSON with every single tangentially related piece of information all shoved into one call.

No HTTP caching anywhere, so page loads were always slow, and performance spikes of upstream dependencies were always more noticeable than they would have been otherwise.

Nobody had used a single timeout anywhere, so any service going slow would back up any client talking to it.

A talks to B talks to C talks to D talks to E, all entirely synchronously.

50+ services and applications relied on the same two monoliths, who also both relied on each other, so if either one of them got backed up they'd both start a death spiral and take out everything else.

Everything was the lowest quality RESTish API, not a single actual REST API there, yet many people were sure REST was the issue. Some wanted to rewrite everything in GraphQL, some wanted all gRPC...

The web and mobile versions of the same client were full of duplicated logic that would show different options for the same user because somebody forgot to add the 8th condition to an if statement, no shared logic.

## So... 😳

There was a lot of work to be done, but getting this all in the right order was important due to basically working on this alone, with 80-150 developers who were all just focused on tight deadlines and mostly not on quality. How do you pick what to work on when and in what order?

Using [actual REST](https://apisyouwonthate.com/blog/rest-and-hypermedia-in-2019) would have solved many of their client-side logic mismatch issues, thanks to the concept of REST being a [state machine over HTTP](https://apisyouwonthate.com/blog/representing-state-in-rest-and-graphql) (HATEOAS = A++ at this).

[HTTP/2 would have solved their HTTP/1-based fears](https://apisyouwonthate.com/blog/lets-stop-building-apis-around-a-network-hack) over "going over the wire" more than once.

[API evolution](https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis) would have helped avoid v13 for minor nonsense.

In the end this was the approach:

1. Document the existing mess 
2. Stem the bleed
3. Drain the swamp
4. Create a Style Guide

## 1. Document the Existing Mess

I asked around for people interested in documenting APIs using OpenAPI. The reasoning here is that its rather hard to fix problems you can't see, and having no visibility into which APIs are using which data formats, versioning schemes, what data looks like where, is hard if you're messing around in code or packet sniffing.

There were a few teams who jumped on OpenAPI, for a variety of reasons. Some needed documentation and weren't sure how to do it, some recognized the ridiculousness of needing to write new code because nobody remembered how the old code worked, but many saw it as pointless busywork.

Regardless, we got a bunch of people to create OpenAPI descriptions, converting things from scratch notes in Google Docs, from outdated Postman collections, contriving things from integration tests, all sorts. 

We picked the biggest, most important, most used APIs first, and eventually others got involved wanted to "do the right thing".

For teams with multiple API versions I recommended documenting the latest version of their API, and for the APIs with bizarre method+resource versioning (`GET /v3/users` & `POST /v2/users`) they should document all of the latest methods. 

The goal was not to immediately solve many problems, and it would have been easy to get bogged down in making everything lovely, but we had to stay focused on just documenting the existing mess.

Why? Well, these problems had all existed for months and years, and getting the ball rolling on documentation would at least slow the number of new versions popping up in the mean time. 

When enough teams were on the way with OpenAPI, I started the next phase.

## 2. Stem the Bleed

I lived in NewRelic for a few months. It was everywhere but entirely underutilized. Every API you opened up was clearly struggling, but nobody was looking, and when they did they were looking at average times not percentiles so an app that looked good was actually struggling and nobody could see. No alerts were set up.

I baked [timeout logic](https://apisyouwonthate.com/blog/taking-a-timeout-from-poor-performance) into the WeWork-branded HTTP client that was used either directly, or via various SDKs. At first the max timeout was set to 20s, because there were some API endpoints that would genuinely take 20s to respond. We fixed the errors as we popped up, then tweaked it down to 15s.

From there I picked two of the largest upstream APIs and went to work on them. There were some folks saying it needed to be rewritten in gRPC, some suggesting GraphQL was the only way to save it, but this RESTish [HTTP/1 mess of mega payloads](https://apisyouwonthate.com/blog/lets-stop-building-apis-around-a-network-hack) had far bigger problems. Comically the three slowest endpoints were `GET /v1/users/{id}`, `GET /v2/users/{uuid}` and `GET /v3/users/{uuid}`, which all had their own unique challenges. 

Working with [Tom Clark](https://twitter.com/itstomclark) - an evil genius with Ruby and Postgres optimizations - we figured out 100 different changes to be made, with everything from DB indexes to object allocation making big wins here and there. After a few weeks we'd got the worst offending endpoints down from the 2s-10s range, and everything under 1s. 

This of course had ripple effects throughout the entire ecosystem. With so many circular references in the ecosystem, getting A quicker meant B and C were quicker, and seeing as A was talking to B and C it meant A was quicker too! 

NewRelic was showing that JSON serialization was rather slow (exagerated by the mega-payloads) so people started suggesting switching to gRPC becasue "Protobuf is faster". There may have been some gains there, but the time involved would have been ridiculous. We switch the JSON serializer to [Oj](https://github.com/ohler55/oj) and shaved a bunch of time off without åny clients needing to make a single change.

Another change we made was to make smaller, more targeted, cacheable endpoints. Instead of User containing Company and Memberships and Locations and Other Membership For That Location... we made a few endpoints you could hit:

- `/v3/users/{uuid}`
- `/v3/users/{uuid}/profile`
- `/v3/users/{uuid}/locale`

The first endpoint stayed the same, bloated with infinite information, but we added [partials](https://apisyouwonthate.com/blog/partials-happy-compromise-between-customization-and-cacheability) as a hack to allow people who only wanted some information to get it. Not an ideal approach, but it meant clients could just add `?partials=foo` for a huge performance improvement.

That locale endpoint solved a performance issue for the other megamonolith: B would hit A on `/users/{uuid}` to find out the locale (`en-GB`, `pt-BR`) and get 489657 lines of JSON back, some of which required a call back to B. This self dependency meant if either started to get slow they'd both just crash, and that was happening for _no reason_. Moving the locale information to its own endpoint sped things up _and_ avoided the self dependency.

We then also shoved `Cache-Control` headers on these endpoints, easily providing HTTP Caching to happen on the client side, and on [Fastly](https://www.fastly.com/) too, which was already there just being ignored by most APIs. This sped up every client who [enabled HTTP caching middleware](https://apisyouwonthate.com/blog/speeding-up-apis-apps-smart-toasters-with-http-response-caching) in the HTTP clients with a one line change on their part.

Taking literally the slowest (and most important) API in the entire company and getting most of it quicker than the next fastest API got some attention from people, which helped with the next steps.

## 3. Drain the Swamp

My hope was that only documenting the latest versions would mean that clients on older APIs would start to upgrade to the later versions, but that wasn't happening as quickly as I would have hoped. 

I wanted API teams to get control of their time. Instead of having to fix bugs in X versions of their API, it would be far better to set up a "two global versions" policy, where a v5 deprecates v1-v4 and removes v1-v3 as soon as possible. 

Using NewRelic as my guide, I found APIs with multiple versions, where the older versions were causing instability issues for the entire application. The API mentioned above had v1 and v2 deprecated with different dates using [rails-sunset](https://github.com/wework/rails-sunset/). 

```ruby
# config/initializer/deprecations.rb
SUNSET_MILESTONES = {
  drain_the_swamp: DateTime.new(2018, 2, 1),
  v2_needs_to_go: DateTime.new(2018, 4, 1),
}

# app/controllers/users_controller.rb
class UsersController
  # Deprecate all methods and point them to a blog post
  sunset SUNSET_MILESTONES[:drain_the_swamp], link: 'http://example.com/blog/get-them-foos-outta-here'
end
```

We aggressively deprecated v1 and worked with the only clients still using it. Then we started getting rid of v2. All the time I was telling other API team leads to do the same, and I was baking Sunset header sniffers into our SDKs so that clients would start seeing warnings in their logs and test suites even if they had no idea what a [`Sunset` header](https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis) was.

Reducing the surface area of problems for API teams meant they had more time on their hands to do the next bit.

## 4. Create a Style Guide

When you've got an ecosystem of terrible APIs, with inconsistent naming, overlaping terminology (account means 5 different things), inconsistent data formats, and a myriad of other problems, you need to educate people in how to make an API better. I'm not going to tell everyone at WeWork to read my book (although I did see it sat on a few desks), but I tried really hard to educate by starting an "API Guild", doing various training sessions with teams, talking to team leads one-on-one about why problems happened, trawling postmortems to find ways things could have been avoided, then writing it all down in a big old style guide. 

The style guide started in [Gitbook](https://gitbook.io/) as a very opinionated "How to best buid APIs at WeWork" guide. Instead of teaching the various pros and cons of all the ways of doing something and hoping people came to a good decision, it pretty much said "Do X, maaaaaaaaybe Y for these reasons", because two approaches were better than infinite unique snowflakes.

Boiled down it said various things like:

- Error formats must be [RFC 7807](https://tools.ietf.org/html/rfc7807) or [JSON:API Errors](https://jsonapi.org/examples/#error-objects-basics).
- Pagination should be Cursor-based not Page-based.
- Versioning must be "Global in the URL" or "API Evolution".
- GET methods must declare their cacheability (even if not cacheable).
- Internal APIs can be any paradigm you want (gRPC, GraphQL) but inter-department or public APIs must be REST.
- JSON:API is strongly recommended for any new versions, but try to
- If using JSON:API avoid overreliance on `?include=` and favor HTTP/2 and "links" (HATEOAS!) for that.

Then I set to work writing automated tooling which would sniff for as much of this as possible, creating a tool called "Speccy", which has now been replaced with [Spectral](https://stoplight.io/spectral).

Custom rules can be created using a simple DSL, and you can even create custom functions with JavaScript when that DSL is not enough, meaning rules like this could be made:

- This endpoint is missing a `Cache-Control` header.
- This API description has three different versions in it, please deprecate the oldest.
- We noticed `?page=`, please use cursor-based pagination instead.
- This endpoint has no security mechanism listed.
- Error content type is `application/json`, please migrate to `application/problem+json` using RFC 7807.
- This JSON response has 300 properties can you slim this down 50 or fewer.

All of this sent errors and warnings out to anyone who enabled the tool in their Continuous Integration platform, which was tricky as the API was already in production. I wanted to get ahead of more problems. 

I've been talking a lot about API Design First over the last few years here and on APIs You Won't Hate, and now you might see why. 

Folks would submit their plan for a new API or a new version, then the automated style guide would provide a bunch of feedback, and we'd be able to ask more questions for far more interesting things like:

> Where is that data coming from? A local DB or... AGH you're "syncing" thousands of records from another service hourly with polling? _Please do not you'll kill it!_

Learn more about [automated style guides](https://apisyouwonthate.com/blog/automated-style-guides-for-rest-graphql-and-grpc) over here.

## Summary

There's loads of things API designers and developers talk about, all of which solve many problems, but it's always important to know how and when to wield them. 

- API Descriptions (OpenAPI, JSON Schema, etc)
- Standard API formats
- HATEOAS (REST)
- API Evolution
- Circuit Breakers
- HTTP/2
- HTTP Caching
- GraphQL
- gRPC

How much of this would actually help in the above situation, and what order do you push to apply these things? 

Sometimes gRPC and GraphQL can absolutely do a better job than RESTish or REST APIs, but nowhere near as often as some people think. Beware those who want to rewrite everything. Making performance improvements and evolving existing APIs will bring you many of these same benefits without throwing the baby out with the bathwater. Forcing change and extensive learning onto clients because you can't figure out how to make your existing API work better is a selfish, slow, and expensive move.

At a company which is mostly RESTish (HTTP APIs), I usually recommend working your way higher up the [Richardson Maturity Model](https://apisyouwonthate.com/blog/rest-and-hypermedia-in-2019) as soon as you can, getting HTTP Caching, "HTTP State Machine" (HATEOAS), and evolution are huge wins that solve so much of this, but it's not the first thing I'd jump into when there's a total lack of documentation. 

I'd rather see bad-but-documented APIs than great APIs nobody knows how to use. Of course over time a great API that's well documented (and self documenting) through a type system (JSON Schema) and links (HATEOAS) is ideal, but it's one step at a time. 

Shine a light on the current mess and slowly add enjoy the fact that HTTP is a intelligently layered system. You can add HTTP/2 support without changing an API at all, then over time split the endpoints out into smaller ones, with cache control headers on them, and clients can use these smaller ones with cache controls in the own time without having to rewrite everything to use totally different tooling.

Whatever you do, create a style guide, focus on deleting old code as fast as you can, and make sure that new APIs/versions are designed well before you get going. If you'd like to know how that works, read all about [Code First vs Design First](https://apisyouwonthate.com/blog/api-design-first-vs-code-first/) over here, and maybe you can unf**k an entire mad ecosystem one piece at a time.
