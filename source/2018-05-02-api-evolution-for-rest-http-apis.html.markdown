---
title: API Evolution for REST/HTTP APIs
date: 2018-05-02 21:01 UTC
tags:
---

There are a lot of pro's and con's to various approaches to API versioning, but that has been covered in depth before: _[API Versioning Has No "Right" Way](https://blog.apisyouwonthate.com/api-versioning-has-no-right-way-f3c75457c0b7)_.

API Evolution is making a comeback these days with GraphQL and gRPC advocates shouting about it. Whatever API paradigm or implementation you subscribe to, evolution is available to you. REST advocates have been recommending API evolution for decades, but in the past I failed to understand how exactly to handle evolution.

Luckily, as always, tooling and standards for HTTP have been improving, and these days API evolution is a lot easier to wrap your head around.

## What is API Evolution

API Evolution is the concept of striving to maintain the "I" in API, the request/response body, query parameters, general functionality, etc., only breaking them when you absolutely, _absolutely_, have to. It's the idea that API developers bending over backwards to maintain a contract, not matter how annoying that might be, is often more financially and logistically viable than dumping onto a wide array of clients.

At some point change cannot be prevented, so at that time evolution suggests you provide sensible warnings to clients, letting them know if a feature they're using is going away, and not bothering them otherwise.

## Examples

> The field `name` exists, and that needs to be splint into `first_name` and `last_name`.

Easy enough. However the data is handled internally (splitting on first space or last space or some other [falsehood defying assumption](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/)) you now have two new fields.

The serializer can change from outputting just their name, to outputting all three fields:

```
class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :name, :first_name, :last_name

  attribute :name do |object|
    "#{object.first_name} #{object.last_name}"
  end
end
```

When folks `POST` or `PATCH` to your API, if they send a `name` you can convert it, if they send `first_name` and `last_name` it'll get picked up fine on the serializer. Job done.

> The field `price` needs to stop being dollars/pounds/whatever as we're starting to support currencies that don't fit into "unit" and "subunit".

Ok! [Currencies are hard](https://gist.github.com/rgs/6509585), so this sort of thing is not uncommon. Let's start [using micros](https://support.siftscience.com/hc/en-us/articles/203869406-The-amount-field) instead.

We don't want to just outright change this value from dollars to cents because then we'd start charging $1,000,000 for stuff that should only cost $1, and folks probably wouldn't like that. Let's make a new field: `price_micros`.

Now clients can either send the `price` field, and it'll convert. This will only work for the older currencies, and if `currency` is a field in the resource (or something nearby) then it's easy enough to support `price` for whatever initial currencies you had (dollar/pound/euro) and throw an error if somebody tries using price for these newer currencies, pointing them instead to the micro field.

Nothing broke for existing use cases, and new functionality was added seamlessly.

> We have too many old fields kicking around, we need to get rid of them.

Deprecations can be communicated in a few ways for API's. For those using OpenAPI v3, you can mark it as `deprecated: true` in the documentation. That's no ideal, of course, as OpenAPI is usually human-readable documentation, sat out of band on a developer portal somewhere. Rarely are OpenAPI schemas shoved into the response like JSON Schema is, so programmatically clients have no real way to access this.

JSON Schema is considering [adding a deprecated keyword](https://github.com/json-schema-org/json-schema-spec/issues/74), and oops I think I'm in charge of making that happen. I'll get back to doing that after this blog post. The idea here would be to pair the schema with a smart SDK (client code) which detects which fields are being used. If the schema marks the `foo` field as deprecated, and the client code then calls `$response->foo`, in PHP that could be snooped on with `function __get` (dynamic programming yaaaay) and fire off deprecation warnings on use.

GraphQL has the advantage when it comes to field deprecation for sure, as their type system demands clients to specify the fields they want. By knowing which clients are requesting a deprecated field, you can either reach out to that client (manually or automatically), or shove some warnings into the response somewhere to let them know they're asking for a thing which is going away. This is the sort of advantage you get when your type system, clients, etc. are all part of the same package, but HTTP in general can achieve this same functionality through standards.

All of that said, removing old fields is usually not all that much of a rush or an issue. Over time new developers will be writing new integrations, looking at your new documentation that tells them to use the new field, and your developer newsletters or changelogs just let them know to move away from it over time.

> A carpooling company that has "matches" as a relationship between "drivers" and "passengers", suggesting folks who could ride together, containing properties like "passenger_id" and "driver_id". Now we need multiple drivers, so this whole matches concept is garbage.

At a lot of startups, this sort of conceptual change is common. No number of new fields is going to help out here, as the whole "one record = one match = one driver + one passenger" concept was junk. We'd need to make it so folks could accept a carpool based on the group, and any one of those folks could drive on a given day.

Luckily, business names often change fairly regularly in the sort of companies that have fundamental changes like this. There is often a better word that folks have been itching to switch to, and evolution gives you a chance to leverage that change to your benefit.

Deprecating the whole concept of "matches", a new concept of "riders" can be created. This resource would track folks far beyond just being "matched", through the whole lifecycle of the carpool, thanks to a status field containing pending, active, inactive, blocked, etc.

By creating this a new `/riders` endpoint, this new resource can have a brand new representation. As always, the same database fields can be used internally, the same internal alerting tools are used for letting folks know about matches (v1 app) or new pending riders (v2 app). The API can create and update "matches" through this new "riders" interface. Clients can then use either one, and the code just figures itself out in the background. Over time the refactoring can be done to move the internal logic more towards riders, and your [integration tests / contract tests](https://blog.apisyouwonthate.com/tricking-colleagues-into-writing-documentation-via-contract-testing-206308b47e05) will confirm that things aren't changing on the outside.

> We have all these old endpoints hanging around, can we get rid of these slightly more intelligently than just sending some emails?

Yes! API Endpoints can be marked with a `Sunset` header to signal deprecation (and eventual removal) of an endpoint.

The [Sunset header][sunset-draft] is an in-development HTTP response header that is aiming to standardize how URLs are marked for deprecation. tl;dr it looks a bit like this:

```
Sunset: Sat, 31 Dec 2018 23:59:59 GMT
```

The date is a [HTTP date], and can be combined with a `Link: <http://foo.com/something> rel="sunset"` which can be anything that might help a developer know what is going on. Maybe link to your API documentation for the new resource, the OpenAPI/JSON Schema definitions, or even a blog post explaining the change.

Ruby on Rails has [rails-sunset], and hopefully other frameworks will start adding this functionality. Open-source API Gateway system [Tyk](https://tyk.io/) is [adding support to an upcoming version](https://github.com/TykTechnologies/tyk/issues/1626).

Clients then add a middleware to their HTTP calls, checking for Sunset headers. We do this with [faraday-sunset](https://github.com/wework/faraday-sunset) (Ruby), [Hunter Skrasek](https://twitter.com/HSkrasek/) made [guzzle-sunset](https://github.com/hskrasek/guzzle-sunset) (PHP), and anyone can write a thing that looks for a header and logs it to whatever logging thing they're using.

[HTTP date]: https://tools.ietf.org/html/rfc7231#section-7.1.1.1
[sunset-draft]: https://tools.ietf.org/html/draft-wilde-sunset-header-03
[rails-sunset]: https://github.com/wework/rails-sunset/

> Changing validation rules, something seemingly backwards compatible, like making the length of a field a little longer.

Changing validation rules seems like it might be a backwards compatible change, but often it is not. For example, making a string field accept a longer value can lead to some interesting problems. As clients often bake validation rules into client applications based on whatever the documentation says, if that documentation changes they aren't going to notice, and that validation will mismatch on different clients.

Putting [client-side validation logic in JSON Schema](https://blog.apisyouwonthate.com/the-many-amazing-uses-of-json-schema-client-side-validation-c78a11fbde45
), and having clients use that as the basis for their validation, solves this problem and a whoooole lot more. Over time new JSON Schema files can be pushed, and clients will pick those up from the `Link` header as they go, giving seamless support for the new validation rules!

> Deprecating a specific type of authentication from an endpoint, it's time to say goodbye to HTTP Basic Auth.

If they the client is making a request with an authorization header, they have some sort of account. If during the signup for that account you've asked them for an email, you can contact them. If you've not got any way to contact them... tough. Monitor how many folks are using HTTP basic, blog about it, shove some videos up, and eventually you're just going to have to turn it off.

The only other approach to helping out here is an SDK. If you slide some deprecation notices into the code months ahead of the cutoff date, you can throw some warnings saying the code is no longer going to work. This gives you a fighting chance for anyone that keeps a bit up to date. For those that don't, you don't have much choice.

Shoving a clear error into your HTTP response (here using the amazing [RFC 7807: Problems for HTTP APIs](https://tools.ietf.org/html/rfc7807)):

```
HTTP/1.1 403 Forbidden
Content-Type: application/problem+json

{
  "type": "https://example.org/docs/errors#http-basic-removed",
  "title": "Basic authentication is no longer supported",
  "detail": "HTTP Basic has been deprecated since January, 1st 2018, and was removed May, 1st 2018. Applications should switch to OAuth to resume service."
}
```

Clients will upgrade fairly quickly at this point.

## More Power

The above solutions are a little ad-hoc, and can lead to branched code paths with a bunch of ifs. You can feature flag some of this stuff to help keep things a little tidy, and another approach is to write up change as libraries, something [Stripe refer to as "declarative changes"](https://stripe.com/blog/api-versioning). This approach can be a little heavy handed, but it's something to keep in mind. 

## Summary

Evolution involves thinking a little differently to how you approach change. Often there are simple things you can do to keep clients ticking along, and whilst clients will have to change at _some point_, the whole goal here is to allow them a decent amount of time to make that switch, with the minimal change possible during that change, and **no lock-step deploys** required.

And yes, whilst making a new endpoint to switch `/matches` and `/riders` is essentially the same as `/v1/matches` and `/v2/matches`, you've skipped the [quagmire of tradeoffs](https://blog.apisyouwonthate.com/api-versioning-has-no-right-way-f3c75457c0b7) between global versioning, resource versioning, or **gulp** method versioning. Global versioning has it's place, but so does evolution.

Think about it this way. If implementing some change takes twice as long for API developers compared to other versioning approaches, but save 6 or 7 client developer teams from having to do a while bunch of work, testing, etc. to chase new versions, this has been worthwhile to the company in terms of engineering hours spent.

If you've only got a small number of clients (maybe an iOS and Android version) of an API that changes drastically every year or two, then global versioning is clearly the way to go.
