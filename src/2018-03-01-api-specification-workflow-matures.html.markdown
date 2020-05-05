---
title: "Design-first API Specification Workflow Matures"
date: 2018-03-01 07:47 UTC
tags: api, json-schema, api-specs, openapi
category: api
comments: true
---

Back in October I wrote _[Chasing the Perfect API Specification Workflow]_, which was a huge article about the state of the API specification world. One person trying to figure out a good workflow, in a sea of alternative specifications, with incomplete tooling, making it hard to see a solution for all the partial bits of functionality.

[Chasing the Perfect API Specification Workflow]: https://phil.tech/api/2017/07/20/my-vision-for-a-perfect-world-in-api-specification/

RAML and API Blueprint fell short of my requirements very quickly, and OpenAPI v3 was not available at the time of writing.

The initial requirements:

- API Design / Prototyping
- One source of truth where developers need to update stuff
- Beautiful documentation for humans built without any effort
- Validate payloads before you send em on the client side
- RSpec matchers providing contract testing API responses
- Documentation testing to confirm docs arent lies
- SDK Generators with customisable templates

OpenAPI v2.0 scored a 71% for those requirements, and the drastically improved (but frustratingly out of reach) OpenAPI v3.0 scored 86%. Tooling seemed very slow to move to OpenAPI v3, and [a month after v3.0 was launched](https://phil.tech/api/2017/08/26/one-month-since-openapi-v3-0/), pretty much nothing supported it.

JSON Schema divergence was huge, and with v2 missing oneOf, allOf, etc. it was difficult to write good specs for APIs with more "dynamic" contracts. At work we battled through the best we could, building as much documentation with OpenAPI v2 as possible. We actually did fairly well, but it was a stack of hacks and vendor extensions. It was painful to teach and depressing to use, but now, thankfully, we're on OpenAPI v3.0!!

## OpenAPI v3.0

Right now my main goal has been [generating human-readable documentation](https://blog.apisyouwonthate.com/turning-contracts-into-beautiful-documentation-deac7013af18) at the day job. With new employees starting every day, we need people to know how our many many many APIs work. Documentation is not the most interesting thing about API specifications by any means, but it's currently the most relevant at my job.

[ReDoc](https://github.com/Rebilly/ReDoc) was our documentation generator of choice, and it only supported v2.0 for a while. When the [ReDoc 2.0.0 alpha builds](https://github.com/Rebilly/ReDoc/releases) started popping up supporting OpenAPI v3.0 we jumped on them, and helped discover a whole bunch of bugs. ReDoc author [Roman Hotsiy](https://twitter.com/RomanHotsiy) was an absolute champion, fixing bugs and cutting alpha builds on a regular basis.

Thanks to ReDoc's use of [swagger2openapi](https://github.com/Mermade/swagger2openapi/) as a compatibility layer, OpenAPI v2/v3 are both supported. Our bevy of quirky API specs helped swagger2openapi author [Mike Ralphson](https://twitter.com/PermittedSoc) to isolate a bunch of bugs, and really test out the amazing new resolver logic in [v2.12.0](https://github.com/Mermade/swagger2openapi/releases) betas. We have a build step that converts our OpenAPI v2 specs to v3 using 2.12.0-5, as ReDoc is still using 2.11.x and that's not quite so good at handling giant/self-referential schemas.

Certainly I'm not recommending you go screaming into using an alpha and a beta, but we are using these a whole bunch and have no more problems to report. If you want OpenAPI v3.0, give them a try.

## Improving Specifications

A few months ago I came up with a medal system, to help give people an idea of where their docs/specs are at, and to give readers of the docs an idea of how much they could trust the docs.

- 🏅 Gold - Guaranteed accurate against code, thanks to the use of Dredd or JSON Schema Matchers, which means the API build will fail if the specification is lying
- 🥈 Silver - Not guaranteed to be entirely accurate, but confidence levels are high. There may be minor discrepancies.
- 🥉 Bronze - Hey look, at least there's something... 😅

Most things started off at bronze, as we just jammed some outdated Postman Collection through the [APImatic Transformer](https://apimatic.io/transformer) and were left with glorified bookmark collections of content. These Postman Collections were missing all sorts of metadata, descriptions, explanations, so the transformer generated rather lacking content, and this gave them a bronze.

Of course this ruffled a few feathers. Bronze was seen as a bit of a face slap, but that is pretty much the point. "These docs are not good, but they could be if you..." The fact that people cared at all was fantastic, and it meant that people actually put quite a lot of time into getting to Silver. To do that, we crowd-sourced a style guide, sharing tips, advice, recommending file structures, etc.

We found also that being honest about the quality of a specific APIs docs improved trust for other docs. If a user looked at some crap docs, they might just think that "docs are no more use than Postman", which is entirely inaccurate and has been a problem in the past. Marking poor docs as poor, and good docs as good, means everyone knows what to expect.

A lot of the work from our style guide resulted in [Speccy](https://github.com/wework/speccy), an open-source OpenAPI v3.x linter for making specs be good, not just valid.

## Keeping Up-to-Date

Getting folks onto Gold is the next mission. [Keeping Documentation Honest](https://blog.apisyouwonthate.com/keeping-documentation-honest-d9ab5351ddd4) outlines a few approaches to doing this.

Short version...

### Dredd

The tool [Dredd](https://github.com/apiaryio/dredd) was initially designed for API Blueprint, added support for OpenAPI a while back. It's written in JavaScript and can be seen as a completely different test suite to your usual PHPUnit/RSpec/whatever. You need to set up data in seeds at the start, and be aware that tests keep state so order is very important. Run it with `--sorted` to limit the damage  there.

### JSON Matchers

Writing JSON Schema files instead of OpenAPI for your schema objects brings a lot of value, like being able to skip Dredd and confirm your responses using JSON Schema.

Ruby folks can use [thoughtbot/json_matchers], and PHP users can make a simple helper method for their test suite by wrapping [JSON Guard].

The only downside here is having to convert a lot of files from YAML to JSON, but that can be done quickly in a lot of ways. Try [atom-yamljson].

### To Be Confirmed

A whacky alternative approach is code generation, which in some languages could quite likely be done at runtime, or artifacts could be compiled earlier. Either way, by referencing the OpenAPI file in your controller, or in a middleware, your actual production code, you could validate request bodies, query string parameters, etc, all based off of the contract itself!

Why write up all that Rails/PHP/whatever code if you can have your existing contract do it for you? Imagine not having to write the same validation rules in multiple places then also write tests to make sure they're the same.

[thoughtbot/json_matchers]: https://github.com/thoughtbot/json_matchers
[JSON Guard]: http://json-guard.thephpleague.com/
[atom-yamljson]: https://atom.io/packages/atom-yamljson

This approach needs more validation. I know it's going to work, but I've not had the time to test anything, or get anything into production. Rails users can try it out with this prototype gem [SwaggerShield](https://github.com/amcaplan/swagger_shield/).

## Postman Mirroring

We have some hardcore Postman users, who manually provide examples for every response, write all their tests to ensure contracts are up-to-date, write descriptions for all their parameters in the postman collection, and have the collection reading from their GitHub repo. It's impressive how dedicated they are to maintaining this, but 90% of people do not put in the work, and the Postman Collections are outdated and missing metadata.

For those who chose to Postman First, we use [APImatic Transformer] to import Postman, and output OpenAPI v3.0 for our documentation hub to use. For everyone else we do the opposite! We have CircleCI build a job hourly that clones down all the repos, plucks out the OpenAPI specs, and fires it off at the Postman Pro API to update the View-only Postman Collections shared with the whole team!

This gives people the ability to play with their API in Postman, without ever needing to worry about maintaining anything.

It also means we can very easily support Paw, or whatever other HTTP client comes out with support for shared collections. It's nice to not be tied to a specific vendor. :)

## Next Steps

As always there is more to be done.

### API Gateway Support

Server-side validation might not be entirely realistic for everyone, especially due to all the various frameworks that would need adapters built. So for now I'm talking to Kong about getting OpenAPI or JSON Schema support, where we can reference specs for specific requests to skip even bothering the application server.

![Sequence flow diagram showing API gateway validation skipping the application server](article_images/2018-03-01-api-specification-workflow-matures/api-gateway-json-schema.png)

Solving this at a higher level is appealing as it avoids the need to write 15 different framework plugins in 9 different languages, but that makes confirming the request validation in integration tests a little harder. We might need to move to API monitoring tests instead for that, but... I digress.

[Tyk](https://tyk.io/) has [just merged JSON Schema Draft v4 support](https://github.com/TykTechnologies/tyk/pull/1343), but it's a little tricky to imagine JSON Schema alone (not even HyperSchema) being easy to hook up, all the URLs, HTTP methods, paths, etc. are in the OpenAPI layer. It might be a bit of a manual effort instead of saying "Here's an entire OpenAPI file, you figure it out!"

Either way, I quite like the idea of not even bothering the application server until we're relatively confident the payload is valid. Of course you'll still have to hit it for certain validation requests (is this email unique) but you can absolutely skip "that value is not an email address".

[Tyk]: http://tyk.io/
[JSON Schema support]: https://github.com/TykTechnologies/tyk/commit/d94e7df58d41a00668d9db68b2c06c13ba51c050

### Editors

There are [multiple editors] out there, some with GUI options and some are more like Eclipse distributions with a few plugins for OAI syntax... I need to find one to recommend to my coworkers, as a way to get folks building out OpenAPI specs without having to learn it all and mess around by hand.

[Stoplight.io] have a [beautiful API editor][stop], which eventually I think is going to have local clients for OS X, Linux, etc. but right now is web only. This might be the winner, if folks an click around a super easy API Editor, build out good DRY OpenAPI specifications, have changes committed along with their PRs, etc. then we're pretty much sorted there.

If not I'll try to hook up `$ speccy edit` to launch one of the Node editors, and run that on a local server. So far none of them seem to support editing files in place, or multiple files. It's all import then export the product, which isn't really achieving the workflow I want.

### Speccy

We really need a `speccy init` which will create a simple file structure, asking a few questions, and essentially making a hello world. Getting folks a basic file to play around with will be a lot more useful than asking them to start from scratch.

Speccy also really [needs a config file](https://github.com/wework/speccy/issues/14), and somebody is threatening to [make a VS Code plugin](https://twitter.com/DanHerd/status/968221934591889413).

### Client-side validation

Not got around to getting anything into production, because... well 👆 & 👇, but I am currently seeking volunteers at work. I did whoever write up a whole [guide on using JSON Schema for client-side validation](https://blog.apisyouwonthate.com/the-many-amazing-uses-of-json-schema-client-side-validation-c78a11fbde45) using JavaScript, so let me know how it goes if you try it out.

### SDK Generation

I really need to dig in to the options here, and find "the best" tool for the job. There are a lot of platforms like Stoplight, Apigee, SwaggerHub, etc. that try to do all the things, and they all do a different "some" of the things. I don't want to be forced into any one of them tbh, but if we can use a single service without duplicating efforts and functionality too much then I'd be happy to use them.

A CLI tool which we can write templates for would be ideal, which... [Swagger CodeGen] caaaaan do, but the output seems a bit funky. More work to be done, update on this next braindump.

[Swagger CodeGen]: https://github.com/swagger-api/swagger-codegen
[Stoplight.io]: http://stoplight.io/
[stop]: http://stoplight.io/platform/design/
[multiple editors]: http://openapi.tools/#editors
[APImatic Transformer]: https://apimatic.io/transformer

### OpenAPI and JSON Schema Convergence

As mentioned OpenAPI and JSON Schema are not entirely compatible, and this leads to most of the trouble right now. Sometimes you want OpenAPI, sometimes you want JSON Schema, and between the two you can do 100% of the things I want.

Sadly OpenAPI v3.0 still supports it's own mildly different version of JSON Schema, which is roughly JSON Schema Draft v5, but it's a sub-set super-set. Some things are missing, some things are different, and some keywords exist for OpenAPI schema objects that have no meaning to JSON Schema validators...

This situation is a known problem for JSON Schema and OAI maintainers. I've been on a few calls with both teams discussing how to solve it, and so far it seems like adding "Alternative Syntax" is the way to go. OpenAPI could keep its own schema objects (JSON Schema-ish-kinda) and a new keyword is added to signify a `$ref`'ed file is JSON Schema Draft v8 proper (no messin).

For now you're stuck either trying to write a file thats valid for both systems (just hope you don't need `type: ['string', 'null']`), or converting from [one to the other](https://github.com/mikunn/openapi-schema-to-json-schema) to get the best of both... This needs to change.

## Summary

I'm getting pretty close to having a workflow I'm completely happy with for spec-first API design and development. As always walking the line between idealism and realism, suggesting one thing to folks to do for now, whilst trying to improve things for our future selves to transition to when the time is right.

Having folks now writing OpenAPI v3.0 by hand is tough, but at least we're not on a myriad of vendor hacks shoved into some weird OpenAPI v2.0 with some v3.0 shimmed in nonsense... Postman Mirroring has got a few folks excited, and of those who are excited they're really being helped out with speccy.

Finding a kick-ass editor to recommend will be ridiculously important in getting other people on board, and if we can get a few of those gold medal APIs to expose their JSON Schema objects for folks to client-side validate... getting folks to pour effort into specs should no longer be such an uphill battle.

Then we just need to get better at keeping out docs up to date, with either API Gateway implementations or server-side validation with tools like SwaggerShield ensuring the incoming stuff is correct, and contract testing responses in the application.

Making progress ey?

All of this stuff is being blogged and booked about over at [APIs You Won't Hate](https://apisyouwonthate.com) as I go, so pre-order a copy of the partially written [Surviving Other People's APIs](https://apisyouwonthate.com/books/surviving-other-peoples-apis.html) to get more in depth reading material.
