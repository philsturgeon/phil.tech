---
title: "GraphQL vs REST: Caching"
date: 2017-01-26 22:16 UTC
tags: graphql, rest, api, http, caching
category: api
published: false
---



## Caching is Hard

Caching is [a really big topic for APIs](http://www.apiacademy.co/how-to-http-caching-for-restful-hypermedia-apis/), and [for the web in general](https://www.mnot.net/cache_docs/), as it can be done on multiple levels:

- **Client Caching:** A.K.A Browser Caching, whatever is downloading the data can keep track of what was downloaded when, if that data had any expire time, etc.

- **Network Caching:** Tools like Varnish or Squid intercept requests that look the same, and short circuit the response, saving the server some work.

- **Application Caching:** Have some Memcache/Redis/etc in your application that caches various datastore queries and responses internally, making the response quicker to generate.

Ideally all three concepts would be used as often as possible. API developers can implement application caching, and place some network caching in front of that to alleviate work from the API server in general, and reduce latency a bit for the client.

Here's a quick intro to how Varnish works, using pictures to save adding another two-thousand words:

![A request being returned early by a varnish server. Source: [book.varnish-software.com](http://book.varnish-software.com/)](/images/article_images/2017-01-10-a-no-nonsense-comparison-of-graphql-and-rest/httpcachehit.png)

![A request failing to find a match (a.k.a cache miss), and being passed on to the API server to fulfill. Source: [book.varnish-software.com](http://book.varnish-software.com/)](/images/article_images/2017-01-10-a-no-nonsense-comparison-of-graphql-and-rest/httpcachemiss.png)

Tools like Varnish (alternatives being Squid or a hosted Varnish service called Fastly) leverage HTTP headers like `ETag`, `Vary`, `Cache-Control` to handle cache validation, and know all the rules of HTTP, meaning this application caching can essentially be thrown in and function with very little effort from the API developers, and the clients will get a speed boost without having to do anything at all.

GraphQL loses out here. Due to the way it operates as a query language POSTing against a single endpoint, using HTTP as a dumb tunnel, it does not get to utilize these existing HTTP-based network caching tools. This means the entire efforts of caching is relying on application caching, which is not sufficient.

It also means that if the API is not caching enough, the onus of caching is thrown onto the clients. GraphQL.org [seems happy to suggest](http://graphql.org/learn/caching/) the client should take care of caching on their end:

> In an endpoint-based API, clients can use HTTP caching to easily avoid refetching resources, and for identifying when two resources are the same. The URL in these APIs is a globally unique identifier that the client can leverage to build a cache. In GraphQL, though, there's no URL-like primitive that provides this globally unique identifier for a given object. It's hence a best practice for the API to expose such an identifier for clients to use.
> -- Source: [graphql.org](http://graphql.org/learn/caching/)

In an ideal world, all clients would implement client caching, but a lot don't. Many HTTP client (gems, packages, etc. that make the actual HTTP requests, or HTTP layers for things like EmberData) either make it easier, or handle it seamlessly for clients, but they utilize the same things that cache proxies do: `Etag`, `Cache-Control`, etc.

Without that meta data, client caching automatically for GraphQL becomes seemingly impossible. Facebook has released [DataLoader](https://github.com/facebook/dataloader) which can make GraphQL client caching easier, but clients not using NodeJS will have to port the logic, or continue to roll their own. If client caching is ignored (seen as too complicated, or not advertised as useful well enough), an "endpoint-based" API is still provided some protection against repeated requests by utilizing network caching.

REST can cache in all three ways, but GraphQL can only handle the two. Maybe some GraphQL specific network caching systems exist, but these newly invented conventions will not be as tried and battle tested as HTTP solutions. So far, the lack of network caching is being touted as a +1 for GraphQL, which strikes me as odd.

REST definitely has the upper hand for a system where cache hits are both likely and important. If an API is generating resource intensive predefined reports for a multitude of clients, a REST approach would absolutely beat the GraphQL approach.

## Customisation = Cache Misses

The flip side of that coin is this: the more customisable a REST API becomes, the higher the cache miss rate, and the less useful network caching becomes for that API.

A REST API offering sparse fieldsets would let two clients request different things, meaning one client could request `GET /turtles?fields=name,lifespan` and the other could request `GET /turtles?fields=name` hoping for a faster response. Seeing as the second would be a cache miss, if the REST API was not appropriately application or database caching (or the data is not something thats cacheable), then both requests would be slow.

A REST API that _does not_ offer sparse fieldsets would force two different clients to request `GET /turtles/123`, meaning the first request would get a `200 OK`, and the second would get a `304 Not Modified`, responding a bit quicker thanks to Varnish short cicuiting the application server entirely.

Seeing as network caching is not an option for GraphQL, APIs using it have to focus on smart application and database caching, or restructuring data to be inexpensive to query. This is a good idea for any API, but is more apparent for GraphQL APIs.
