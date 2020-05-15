---
layout: post
author: [Phil]
title: A Happy Compromise Between Customization and Cacheability
excerpt: With endpoint-based APIs you get to choose if you want increased likelihood of network cache hits, or the ability to slim down the response. The two goals are mutually exclusive, but there is a compromise that can be made.
date: 2017-08-13
tags: [hypermedia, hateoas, graphql, rest, api, http]
comments: true
disqus_identifier: a-happy-compromise-between-customization-and-cacheability
alias_1: api/2017/08/13/a-happy-compromise-between-customization-and-cacheability/
---

With endpoint-based APIs (REST, RESTish, SOAP, RPC, AJAX-ish junk, etc.) you get to choose if you want increased likelihood of network cache hits, or the ability to slim down the response. The two goals are mutually exclusive.

Slimming responses can be achieved with concepts like [sparse fieldsets](jsonapi.org/format/#fetching-sparse-fieldsets) (tl:dr; send `?fields=foo,bar` to just get foo and bar).

This is common and popular for two reasons:

1. It takes fractionally less time to download a smaller repsonse over the network
2. Some of those fields might be computed on request, and as such are slow

Specifications like [OData](http://www.odata.org/) and [JSON-API](jsonapi.org/format/#fetching-sparse-fieldsets) support this, and most of their tooling also support it. The trouble is, the more you allow a response to be customized, the lower the chance of a cache hit.

If two different clients (eg: the web app and the iOS app) request slightly different fields, then they're not shared, and the network cache is keeping one set of caches for web and one for ios. That's half as useful, and the more different clients you have, the less useful network caching becomes (if you're using sparse fieldsets).

This is a massive shame! [Varnish](http://varnish-software.com/), [Squid](http://www.squid-cache.org/), [Fastly](https://www.fastly.com/), etc., can all be a huge boost to the speed and stability of your architecture, and can save a bunch of money by reducing your application server hosting resources.

For those using network caching, there are two common scenarios.

## High Customization, Low Cache Hits

The Turtles.com web app requests `GET /turtles?fields=name,lifespan` which takes 200ms.

The Turtles.com iOS app then requests `GET /turtles?fields=name` which takes 192ms, because the network cache did not consider this request as a match for the first request (and rightly so). Skipping the `lifespan` field made the JSON serializer do a little less work, and the time in transit was reduced too, so we saved a few ms.

## No Customization, High Cache Hits

The Turtles.com web app requests `GET /turtles` which takes 220ms. That's a little slower as we've got all the fields (maybe 20 of them) coming back.

The Turtles.com iOS app then requests `GET /turtles` the network cache considers that a hit, and short circuits the application server entiely, responding in 118ms.

Even though the iOS app doesn't need all the fields, we've hit the network cache, and subsequent requests are matching.

This scenario is what most REST APIs do. It's usually not an issue if fields are all precomputed and simply being fetched, but this scenario really falls apart when computed fields are part of the resource.

## Computed Fields Suck

I've seen a simple `"is_enterprise": true` field snuck into a serializer, which then makes 3-4 SQL queries to establish if the company should be considered enterprise (if it has more than 500 members, going via a pivot table, etc).

It also had `"locations"` field, which is an array of data fetched from another system. This API is a farily slow responder on the best of days, and sometimes it has bad days. Bad days maybe this endpoint takes 1-2s instead of the 118-220ms we've been discussing.

No amount of clever eager-loading or caching trickery can fully solve the fact that multiple computed fields are going to slow down all/some responses, especially when fetching a collection. Clients having their requests slowed down by being handed expensive information (that they didn't even want) is a completely understandable source of frustration.

The obvious advice is "don't have expensive computed fields in the resource", and just pre-compute them, but sometimes these things are either unavoidable, or somebody else did it and you don't have time to fix everything all in one go. Let's accept them as an unfortunate reality and move on.

One solution is see often a new endpoint: `GET /turtles/lean` which doesn't really help, and is occasionally a slippery slope to client and use-case specific endpoints (`GET /turtles/mobile`, `GET /turtles/ios`, `GET /turtles/ios-random-usecase-tuesday5`. That's no ideal (cache missing all over the shop and forces the team maintaining that API to know too much about specific use cases). It also does not help us with collections.

Others do `?full=true` and have a "Basic" and "Full" serializer for the same response, which is a bit too binary to be considered customization. If you want to call the collection and only need one or two fields from that full version, you're stuck with _all_ the fields, including whatever computed values are there which you still don't want.

## Reasonable Cache Hits, Partial Customization

One solution to make your endpoint-based API responses partially customizable is... partials!

Google have been recommending this solution for years as a common best practice, and YouTube was doing before that.

`GET /turtles?partial=dimensions`

Instead of specifying fields, we specify a partial, which is like a nickname for a group of fields.

Let's stop talking about turtles for a minute, and go back to that company example. Here's a simplified version of some code I wrote for WeWork:

~~~ruby
class Api::V3::CompanyPresenter
  attr_accessor :company, :partials

  def initialize(company, partials: [])
    @company = company
    @partials = Array(partials)
  end

  def as_json
    {
      uuid:                        company.uuid,
      name:                        company.name,
      status:                      company.status,
    }.tap do |hash|
      hash[:locations] = locations if (partials & ['locations', 'full']).any?
      hash[:enterprise] = company.enterprise? if (partials & ['enterprise', 'full']).any?

      if (partials & ['contact_info', 'full']).any?
        hash[:contact_info] = {
          name: company.contact_name,
          email: company.contact_email,
          phone: company.contact_phone,
        }
      end

      if partials.include? 'full'
        # A bunch of other fields
      end
    end
  end

  def locations
    ThirdPartyFooClient.fetch_slow_ass_data
  end
end
~~~

Then in the collection controller I implement:

~~~ruby
  def index
    companies = fetch_filtered_paginated_companies(params).map do |company|
      Api::V3::CompanyPresenter.new(company, partials: whitelist_partials).as_json
    end

    render json: { companies: companies }
  end

  def show
    company = find_company(params)
    company = Api::V3::CompanyPresenter.new(company, partials: whitelist_partials).as_json
    render json: { company: company }
  end

  def whitelist_partials
    if params[:partials]
      partials = Array(params[:include].split(','))
      ['contact_info', 'locations', 'enterprise', 'full'] & partials
    end
  end
~~~

Now calling `GET /api/v3/companies` will result in only `uuid`, `name` and `status` being added, and if a client wants locations or any of the other allowed fields they can call them.

The potential values will be advertised in OpenAPI documentation so people can find them, as this API does not even come close to having any HATEOAS descriptors or anything else. Yet.

This code and this exact approach is not meant to be an example of wonderfully perfect API design.

- I don't like versions in the URL and prefer [evolution](https://www.mnot.net/blog/2012/12/04/api-evolution.html)
- Locations should almost certainly be a sub-collection
- Using existing serializers instead of hacking my own would be better
- Using JSON-API, HAL or Siren would be more useful instead of this naked JSON

Personal preferences aside, I was able to implement this partial functionality in one endpoint very quickly and easily without breaking anything, and without rewriting the entire API. Sometimes you need partial solutions, and partial customization with `?partials=` is partial enough for me.

## Further Steps

Maybe make two different whitelists, one for resources and another for collections of resources. If your API has a high pagination limit (or no pagination 😱) and you're letting `?partial=full` then you could be in for a really bad time.

## Lols what about GraphQL

So, anyone reading this who's been hearing a lot about GraphQL would think: REST is dumb, GraphQL fixes all of this!

Well no. REST provides these trade-offs for you to consider, and GraphQL forces your hand into the one option that it allows: high customization and no [network] cachability.

As discussed in [GraphQL vs REST: Caching](https://phil.tech/api/2017/01/26/graphql-vs-rest-caching/), GraphQL does not work with existing HTTP endpoint-based network caching tools, so the only client options fall on the client attempting to handle it with very little insight, and cache invalidation/expires potentially being very different in two different clients, or your data all has to be restructured to support potentially any call, with any huge amount of nesting, and all of the serialization that comes with it.

REST suggests you to make targeted endpoints with a very specific goal in mind, that handle the specific set of data in a performant way and offer a bunch of caching metadata for network tools to leverage. This should not be seen as a negative point, especially with HTTP/2 removing the issue of "multiple handshakes = slow".

More on that shortly.
