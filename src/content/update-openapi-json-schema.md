---
layout: post
author: [Phil]
title: Update on OpenAPI and JSON Schema
date: 2019-09-07
tags: [api design, openapi, json schema, api descriptions]
comments: true
disqus_identifier: update-openapi-json-schema
alias_1: 2019/09/07/update-openapi-json-schema/
---

_**Update 2020-02-02:** JSON Schema Draft 2019-09 has been published for a while, and after much deliberation we got the folks at OpenAPI to merge [#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977) for v3.1. This will make OpenAPI a small superset, and no longer a subset/superset/sideset. Of those five keywords, two are deprecated (`nullable` and `example`). Latest estimate for v3.1.0-RC1 is end of February, so tooling vendors should get to work on upgrading support for JSON Schema 2019-09 and the other OpenAPI v3.1 changes._

<hr>

The API design space is booming right now, with OpenAPI and JSON Schema tooling seriously growing up. My [new job at Stoplight.io](/2019/06/13/new-life-new-job/) is letting me channel passion for improving this space, and the whole team has been crushing it. We released a new API description document linter ([Spectral](https://stoplight.io/open-source/spectral/)), a damn intelligent mock-server ([Prism](https://stoplight.io/open-source/prism/)), and an [amazing OpenAPI & JSON Schema editor](/2019/08/22/reinventing-api-design-stoplight-studio/) called [Stoplight Studio](https://stoplight.io/studio). This last one is just exceptional, and is the culmination of a years work by a whole lot of people.

The majority of the [design-first workflow](https://apisyouwonthate.com/blog/weworks-api-specification-workflow/) I've been talking about is being solved, meaning you can just replace your hamster-powered duct-taped docs/mocks/linting/governance nonsense with free Stoplight tools. 

Sadly there is still a huge problem in the API design space which we've not yet managed to solve: OpenAPI v3.0 and JSON Schema are still only _mostly_ compatible, and that little difference is substantial enough to cause big problems for a lot of people. 

https://twitter.com/peter_marklund/status/1139118108365508608

A while back I blogged about the [divergence and incompatibilities](https://apisyouwonthate.com/blog/openapi-and-json-schema-divergence-part-1) between the two description languages, which is mostly about OpenAPI v3.0 being an "extended subset" of JSON Schema Draft 5. The phrase "extended subset" means it is missing some stuff, added some stuff, and changed some other bits. OpenAPI Schema Objects are not JSON Schema, and tooling is not interchangeable, but _people think it is_.

About 10% of my working life for the last two years has gone on trying to explain this to people and solve the confusion that it causes. From a sample-size of 100 of my Twitter followers and Slack community, 38% were lucky enough to never notice the problem, and 62% had been bitten at least once. Half the people who had run into this problem suffered frequently. 

At WeWork I [created a workaround](https://apisyouwonthate.com/blog/solving-openapi-and-json-schema-divergence) to let folks write actual JSON Schema for their data model, then convert it to OpenAPI Schema Objects (OpenAPI-flavoured JSON Schema-but-not) via the resolver command built into [Speccy](http://speccy.io/). Sadly Speccy has not had any feature work done since I left WeWork, and [json-schema-to-openapi-schema](https://github.com/wework/json-schema-to-openapi-schema) is not even getting PRs merged.

We could fork json-schema-to-openapi-schema and maintain it at [Stoplight](https://stoplight.io), but I'd rather actually solve the problem instead of dedicating developer time to hacking around the issue. 

## Alternative Schemas

The OpenAPI Initiative have bi-weekly calls, with a group called the "OpenAPI Technical Steering Committee". For a while there was discussion about "Alternative Schema" being championed by the excellent Darrel Miller. The idea was that OpenAPI v3.1 would add a new `alternativeSchema` keyword, and you could specify `schemaTye: jsonSchema`, `xmlSchema`, or various other relevant schema languages.

Alternative Schemas sounded great back in April 2018. I'd join the calls for an hour every two weeks, but when things went to hell for me at WeWork I shoved off to [ride bikes up and down volcanoes for a month](/canary-islands-tenerife-gran-canaria/). When I got back to work the Alternative Schemas proposal had morphed into something incredibly complex, and IMHO not very useful for end users, and awful for tooling vendors too.

It allowed for mixed OpenAPI Schema and JSON Schema objects in a very confusing way, meaning JSON Schema keywords were being applied as special keywords in OpenAPI Schema Object, essentially being "extra validation" for an OpenAPI object, which... is not ideal. For anyone interested I have [given constructive criticism on the OpenAPI Specification repo](https://github.com/OAI/OpenAPI-Specification/issues/1943), and do plan to follow it up with an Alternative Alternative Schema proposal as part of my work at Stoplight in the next few months.

In the mean time it's been my suggestion that AS is punted to OpenAPI v4.0, with "proper JSON Schema, XML Schema, Schematron, etc support through an extendable Schema Interface" being the theme for that big release. That'll be huge, but that'll be huge. In the mean time we can make OpenAPI v3.1 focus on solving JSON Schema compatibility fully, and forever, with a perfectly compatible change in wording in the `3.1.0.md` Markdown file.

## JSON Schema Alignment in OpenAPI v3.1

JSON Schema ~is finishing up some work around `$id` and `$anchor`, then it can tag up the next draft~ have finished the latest draft! Dropping the old non-standard versioning schema of 1-7, the next draft was referred to as draft 8 for a while, the latest draft is called "JSON Schema Draft 2019-09". It has no major changes, but drastically simplifies a lot of the language to make the JSON Schema spec easier to read.

Some folks are concerned about pegging OpenAPI v3.1 to a draft, but draft process is almost finished now. With this draft almost out there, there will be on more, then the one after that is expected to be something equivalent to v1.0.0-RC1. We are considering our options with IETF and W3C who may want some amount of change to be considered, but things are getting pretty close now, to a point where sticking to draft 5 is considerably more damaging than any perceived downside to upgrading to modern JSON Schema.

Upgrading will be simple for OpenAPI, its tooling vendors, and the users of those tools. There are two "breaking changes" between 5 and 2019-09 that OpenAPI can abstract away for its users: `exclusiveMinimum` and `exclusiveMaximum`. In draft 5 they were modifiers, and now they are distinct values.

~~~yaml
# draft 5
minimum: 10
exclusiveMinimum: true

# draft 2019-09
exclusiveMinimum: 10
~~~

OpenAPI v3.1 can easily support both, detecting if its a boolean or an integer. Then the only changes OpenAPI tool vendors need support are support for the various new JSON Schema keywords, like:

- `propertyNames` (a shorthand array of allowed properties)
- `const` (like `enum` but only 1 value)
- `examples` instead of just `example`
- `if / then / else` sugar on allOf / oneOf

Whilst JSON Schema was listening to feedback from its user base and adding this new functionality, we have also been trying to get closer to OpenAPI. JSON Schema added `readOnly` and `writeOnly`, keywords, and I recently got `deprecated` into 2019-09. 🙌

2019-09 added vocabularies, which is a feature designed with projects like OpenAPI (and AsyncAPI) in mind. The OpenAPI Schema Object can become a Vocabulary, extend the "Core" and "Validation" vocabularies, ignoring JSON Hyper Schema completely, and describing behavior for the 4 extra keywords and 2 "modified" ones:

- `nullable`
- `discriminator`
- `xml`
- `example`
- `exclusiveMinimum` / `exclusiveMaximum`

It will be infinitely easier to explain to people that OpenAPI is a superset of JSON Schema, than explaining what on earth an "extended subset" is all about.

_Bonus points if they accept my recommendation of deprecating `nullable` in favor of `type: ['foo', 'null']`, `example` in favor of `examples`, and `discriminator` in favor of `allOf` because most OpenAPI tooling out there does not support discriminator and it still confuses the shit out of many of us._

This would push OpenAPI v3.1 users toward plain-old JSON Schema, just in time for v4.0 where they can then actually just use JSON Schema and these superfluous keywords can be forgotten about. Even [the awkward `xml` keyword](https://swagger.io/docs/specification/data-models/representing-xml/) would not be required with XML Schema being in the new "Alternative Schemas" (or as I said, just the new approach to `schema`).

https://twitter.com/philsturgeon/status/1135895975376097280

The main thing is that OpenAPI v3.1 could once and for all solve the main issue: people can use bog-standard JSON Schema in OpenAPI if they want, without getting bizarre errors when they try to use a JSON Schema keyword which OpenAPI does not support. This situation would be _gone_, and without needing a hacky workaround to convert one to the other.

Tooling vendors will have an easy time too, as JSON Schema validators can replace hand-rolled OpenAPI validators, many of which are outdated, or bad. They can just go in the bin, and support for the handful of extra keywords can go into the JSON Schema Validators as a pre-programmed or third-party vocabulary. More teamwork on fewer tools, the dream!

## Progress

So where are we with getting this done? 

Back in June the OpenAPI TSC were game to see what updating to modern JSON Schema would look like, but the next chat didn't go so well. It probably didn't help that I had been riding through Serbia and gotten myself somewhere between heat exhaustion and heat stroke, but things got confused when I tried showing off OpenAPI implemented as a JSON Schema Vocabulary...

This PR was too confusing so I made another ([#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977)) that focuses on the changes to the specification, and we can figure out the implementation as a vocab later. 

Sadly around about the time I got this PR done, the bi-weekly calls took a summer break.  Darrel and I made some progress asynchronously via PR comments, and I went hunting for feedback on the OpenAPI Slack. There were some concerns from two static language code generator tooling developers. The gist of their concerns were that they already struggle to support dynamic payloads with keywords like `allOf` (OAS2) and `oneOf` (OAS3) so adding more things like "type arrays" (e.g: `type: ["string", "null"]`) would be a problem, even though that keyword is long-form for oneOf with a type of string or a type of null.

Without getting into it too in depth: JSON is a dynamic data format, and JSON supports things which do not translate into simple idiomatic Java or C++. A JSON API response might contain a `{ data: {} }` which is a single object or an array of objects. An object might return an object of arbitrary user-generated keys and values, which need to be described generically with `patternProperties` or similar. Folks using [API evolution](https://apisyouwonthate.com/blog/api-evolution-for-rest-http-apis/) might have changed `coordinates: "lat,lng"` from a string to an array: `coordinates: ["lat", "lon"]`, deprecating the string but supporting both until client had update.

These dynamic payloads can be handled in any programming language, it is just tricker in static languages. I understand that, but given the choice between "Making life slightly harder for tool vendors" and "Keeping things super confusing for all users of OpenAPI regardless of what language they use" the former should be a unanimous vote, even from us tooling vendors. 

More on this another time, but for now at least the two folks who had concerns are not blocking JSON Schema update for v3.1. They are focusing on a concept called "OpenAPI profiles" which may or may not happen, but either way will hopefully let the JSON Schema update progress.

Now September is here the calls will start up again soon. We missed it Friday due to a lot of us being at API City 2019, but the next call should happen. I'm gonna avoid getting heat exhaustion so I don't have to try and give presentations while the room is spinning, and hopefully we can get [#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977) merged; having OpenAPI v3.1 commit to supporting modern JSON Schema as a light superset, instead of a customized/subset/superset of a very old draft. 🙌

_**Update 2019-10-03:** JSON Schema Draft 2019-09 was published, and [OpenAPI v3.1 looks likely](https://github.com/OAI/OpenAPI-Specification/issues/2025) to have [#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977) included - which brings full JSON Schema Draft 2019-09 support. So when will OpenAPI v3.1 come out? Tough to say, but there is talk of maybe getting an RC1 out in a few weeks, and the more complex things like overlays may well be punted to a later RC, or v3.2. Things are looking incredibly positive._

_**Update 2020-02-02:** JSON Schema Draft 2019-09 has been published for a while, and after much deliberation we got the folks at OpenAPI to merge [#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977) for v3.1. This will make OpenAPI a small superset, and no longer a subset/superset/sideset. Of those five keywords, two are deprecated (`nullable` and `example`). Latest estimate for v3.1.0-RC1 is end of February, so tooling vendors should get to work on upgrading support for JSON Schema 2019-09 and the other OpenAPI v3.1 changes._


## Further Reading

[AsyncAPI upgraded to JSON Schema Draft 7](https://github.com/asyncapi/asyncapi/issues/212) last month, and will be getting on the next draft when tooling catches up.

If you aren't convinced the JSON Schema <> OpenAPI discrepancy is a problem, here are just a few recent observations and problems:

- [JSON Schema Faker](https://github.com/json-schema-faker/json-schema-faker) has had to add support for OpenAPI keywords
- [OpenAPI Sampler](https://github.com/Redocly/openapi-sampler) has had to add support for JSON Schema keywords, and people want [more recent JSON Schema draft keywords too](https://github.com/Redocly/openapi-sampler/pull/10)
- [Awkwardly converting one to the other when people have mixed mode OpenAPI and JSON Schema](https://github.com/mikunn/openapi-schema-to-json-schema/issues/33) which is not truly valid according to either spec
- Stoplight is stripping `$schema` from OpenAPI models because users keep putting it in there
- [Known issues for AWS API Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-known-issues.html) like requiring schemas written as proper JSON Schema Draft 5, not OpenAPI Schema Objects, meaning you cannot write valid OpenAPI 
- [`nullable` doesn't make sense to JSON Schema tooling](https://github.com/stoplightio/prism/pull/506)
- [People are trying to `anyOf` and `oneOf` in OpenAPI v2](https://github.com/stoplightio/spectral/issues/393) because "it's JSON Schema"
- [People are using `oneOf` for multiple types anyway](https://github.com/stoplightio/spectral/issues/288) which is just a verbose version of `type: ["foo", "bar"]`
