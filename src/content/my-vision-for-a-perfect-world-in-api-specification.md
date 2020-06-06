---
layout: post
author: [Phil]
title: Chasing the Perfect API Specification Workflow
date: 2017-07-20
tags: [api, json-schema, api-specs, openapi, raml]
comments: true
disqus_identifier: my-vision-for-a-perfect-world-in-api-specification
alias_1: api/2017/07/20/my-vision-for-a-perfect-world-in-api-specification/
---

Documentation is a nice thing to have, but it is often treated as optional or superfluous, especially in teams where the clients and servers are managed by the same people. Here the code is considered the contract, so why define it again in documentation?

Certainly, with all the tooling around, API documentation seems like "another thing to do". You already have to define all the fields/types/values in a series of places:

1. Prototyping
1. Serializers
1. Validation
1. Integration tests
1. Documentation
1. Postman Collections

Seems a bit redundant to have to build all these things, which for years has lead me to look for ways to simplify things. When documentation is considered an extra job, that job wont get done. If you can get entice developers with cool functionality (like automating some of the mundane work involved in the list above) then documentation can happen for free.

A few months back I started to realize they could all be simplified by API specifications, writing contracts in one format, which can be used for a lot of different stuff: [JSON Schema](http://json-schema.org).

Here are the requirements for my imagined perfect workflow.

- One source of truth where developers need to update stuff
- [API Design / Prototyping](https://phil.tech/api/2016/11/22/apis-documentation-first/) - Design first, code later when you've agreed on contracts
- [Beautiful documentation for humans](https://stripe.com/docs/api) built without any effort
- [Validate payloads before you send em](https://code.tutsplus.com/tutorials/validating-data-with-json-schema-part-1--cms-25343) on the client side
- RSpec matchers providing [contract testing API responses](https://robots.thoughtbot.com/validating-json-schemas-with-an-rspec-matcher)
- Documentation testing to [confirm docs arent lies](https://phil.tech/api/2015/01/28/dredd-api-testing-documentation/)
- [SDK Generators](https://apimatic.io/) with customisable templates

I've been on a mission to make this happen, and after months of research I've found it doesn't exist _just yet_. Luckily it's bloody close.

## What about API Blueprint?

API Blueprint is simple, great for planning, but the tooling in some areas is a little lacking. Apiary plan to [add more validation functionality to MSON](http://apibusters.com/post/episode-02-api-blueprint/), but tooling around it would all have to be invented from scratch.

Think of a language. That language has [at least one JSON Schema validator](http://json-schema.org/implementations.html#libraries), and most testing frameworks have assertion helpers to confirm that a response matches a JSON Schema file. API Blueprint does not have this, and doing so would be a herculean effort.

Beyond that, HTML generators for API Blueprint have lagged behind the newer functionality added (MSON). I had to [hack MSON data structures](https://github.com/danielgtaylor/aglio/issues/103#issuecomment-300870872) into the templates, and my CSS is not on point.

Let's see how API Blueprint ranks:

<ul>
  <li>
    <del>One source of truth where developers need to update stuff</del>
  </li>
  <li>
    API Design / Prototyping
  </li>
  <li>
    <del>Beautiful documentation for humans built without any effort</del></li>
  <li>
    <del>Validate payloads before you send em on the client side</del>
  </li>
  <li>
    <del>RSpec matchers providing contract testing API responses</del>
  </li>
  <li>
    Documentation testing to confirm docs arent lies
  </li>
  <li>
    <del>SDK Generators with customisable templates</del>
  </li>
</ul>

Sturgeons Perfect Workflow Score: 29%


## What about RAML

RAML v1.0 supporting JSON Schema seemed initially really promising, and it supported [JSON Ref](https://tools.ietf.org/html/draft-pbryan-zyp-json-ref-03) to help keep file sizes down. I had some successes, but HTML doc generation was a mess.

I struggled to example values in the request/response as API Blueprint would. I’d hoped to see an example payload built with the default or example values I provide for each field, but they would not show up. Instead documentation suggested I had to pass in my own hand-crafted examples.

Maybe this was a failing of raml2html and not RAML at large, but I couldn't find any other tools out there, and it was only one of a handful of issues with raml2html. If the main tool in the community is that lacking, I either need to ask WeWork to commit resources for me to work on building a HTML generator we can use, or we need another tool.

There was a [RAML RSpec matcher](https://github.com/rzane/rspec-raml) floating around that supported v0.8 but not v1.0.

On the plus side, writing in YAML was not as bloody awful as I always imagined it would be, and with most of the work being done in JSON Schema it mattered less what format the glue was in. Also there is a dredd-alike tool called [Abao](https://github.com/cybertk/abao).

<ul>
  <li>
    One source of truth where developers need to update stuff
  </li>
  <li>
    API Design / Prototyping
  </li>
  <li>
    <del>Beautiful documentation for humans built without any effort</del></li>
  <li>
    Validate payloads before you send em on the client side
  </li>
  <li>
    <del>RSpec matchers providing contract testing API responses</del>
  </li>
  <li>
    Documentation testing to confirm docs arent lies
  </li>
  <li>
    <del>SDK Generators with customisable templates</del>
  </li>
</ul>

Sturgeons Perfect Workflow Score: 57%

Whilst wondering about getting green light to dig into contributing to these tools, I was sent [an article about the future of RAML](https://blogs.mulesoft.com/dev/api-dev/open-api-raml-better-together/). Basically RAML is getting out of the service modeling game, focusing instead on data modeling. This would place it as a competitor to JSON Schema, making it was less interesting to me.

They were deciding to let the only remaining competitor handle service modeling: OpenAPI.

## So What about OpenAPI

OpenAPI (previously called Swagger) is a tool I've been actively avoiding for years. I ran across it first via a PHP annotation-to-HTML based tool, and the specification was probably v1.2. I really didn't like the tool, the workflow, the [Swagger UI](https://swagger.io/swagger-ui/), or anything about it at all.

That early negative association stuck with me for years, and I entirely ignored Swagger v2.0. Luckily these days "OpenAPI" (the new name for Swagger) is a whole new world. v2.0 is loads better than v1.2, and whilst v2.0 requires some hacks to do anything useful (more on that in a second), the unfinished-but-imminent v3.0 is looking to solve the vast majority of issues in v2.0.

Luckily these days we can ignore Swagger UI (which still looks like it was designed by a developer who's really into RPC), and use one of these two amazing tools: [ReDoc](https://github.com/Rebilly/ReDoc) or [Spectacle](https://github.com/sourcey/spectacle).

With beautiful HTML generation, supposed JSON Schema support, and Dredd supporting it too, I thought I'd found my perfect workflow.

Perfect isn't right, but it's close.

### JSON Schema Divergence

OpenAPI v2.0 was based on [JSON Schema Draft 4](https://tools.ietf.org/html/draft-zyp-json-schema-04), but it would be inaccurate to say OpenAPI is JSON Schema. OpenAPI v2.0 ended up being both a sub-set and a super-set of
JSON Schema Draft v4, were some stuff is supported, some stuff is missing, and some stuff is _different_.

OpenAPI v3.0 will solve this a bit on release by deprecating some of their differences to match to JSON Schema way of doing things, but [not all have been resolved](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#properties).

For example, v2.0 has no way to say "this field could be null". JSON Schema would let you write `type: ['string', 'null']`, but that would flag as invalid in an OpenAPI validator. v3.0 will still not support this, instead offering [their own syntax](https://github.com/OAI/OpenAPI-Specification/blob/OpenAPI.next/versions/3.0.md#fixed-fields-20): `nullable: true`.

OpenAPI v3.0 will be out any minute, and so for it's been in feature freeze for a long time. The core team have for a while been saying they don't think JSON Schema is an ideal format, hinted that they don't think they need to stick to it, or might support multiple inputs and JSON Schema is just one of them. In some places some have also said that converging the with JSON Schema would make sense for `type` specifically, so I'm seeing very mixed signals about JSON Schema 100% compliance. We'll have to see what happens in 3.1.

If JSON Schema is going to be part of my workflow, I'll have to use [a converter](https://github.com/garethr/openapi2jsonschema). This still feels a little backwards as I want the contracts written in JSON Schema and just referenced from the docs, but I'll need to build a JSON Schema to OpenAPI converter for that... maybe I will.


### The Void of Uselessness between v2.0 and v3.0

Accepting the loss of JSON Schema as a source, I continued with the viability experiment. I initially struggled massively to convert a ~20 endpoint RESTish API from API Blueprint to OpenAPI.

Crucial features missing from v2.0 like "this field could be null" really jammed a stick in my spokes.

Often I would see issues closed down with "It's coming in v3.0", but nobody can just jump into v3.0 whilst it's unfinished, with tooling in varying levels of support for the various RC versions that exist. Besides, rewriting these specs isn't trivial, with [sizable changes existing between the two](https://blog.readme.io/an-example-filled-guide-to-swagger-3-2/), and only [unofficial converters](https://github.com/mermade/swagger2openapi) existing.

During the void between v2.0 and v3.0, there was no v2.1 release to ease the pain. The ecosystem has bridged the gap by awkwardly baking v3.0 features into v2.0 tooling, utilizing a combination of vendor prefixes (`x-`), and unofficial syntax supported by some tools but not others.

For example: example. The feature exists officially in v3.0, but does not exist in v2.0. Example is important for both Dredd (it uses these values to make real API requests and test your documentation), and for human documentation. Without it, nothing is useful.

[Apiary](https://apiary.io/) (the folks behind API Blueprint and Dredd) [offer `x-example`](https://help.apiary.io/api_101/swagger-extensions/), which solves Dredd, but ReDoc will not know that example value exists, and documentation looks like crap.

If you switch to using `example` (which ReDoc actually supports via [OpenAPI Sampler](https://github.com/APIs-guru/openapi-sampler) even though it's not official v2.0 syntax), Dredd will error due to `example` being an unexpected property. I'm working on a PR to make ReDoc support `x-example`.

Beyond that, nullable is still a mess.

Whilst a comment in [a Dredd issue thread](https://github.com/apiaryio/dredd/issues/283) suggests that the JSON Schema syntax of `type: ['string', 'null']` will work... [it doesn't](https://github.com/swagger-api/swagger-editor/issues/1302). Maybe their renderer or parser-of-choice is lax enough to support it, but ReDoc and any strict parser will error.

In the mean time, renderers and parsers are supporting `x-nullable: true`. Example: https://github.com/Rebilly/ReDoc/pull/95

Seeing as ReDoc supports `x-nullable`, it renders just fine, but Dredd does not know about this extension. [Yet](https://github.com/apiaryio/fury-adapter-swagger/issues/112). This will cause failures in your Dredd run due to responses not matching the expected response if the field contains a null, even though you've marked that field as being nullable.

So, this is the sort of thing that happens when you rely on vendor extensions. I know that - and so does the CSS community - but this route is forced upon anyone during this v2.0 to v3.0 gap.

Those oddities aside: so long as OpenAPI v3.0 comes out soon, and the tooling supports it quickly, these weird quirks wont matter.

<ul>
  <li>
    API Design / Prototyping
  </li>
  <li>
    <del>One source of truth where developers need to update stuff</del>
  </li>
  <li>Beautiful documentation for humans built without any effort</li>
  <li>
    Validate payloads before you send em on the client side
  </li>
  <li>
    RSpec matchers providing contract testing API responses
  </li>
  <li>
    Documentation testing to confirm docs arent lies
  </li>
  <li>
    SDK Generators with customisable templates
  </li>
</ul>

Sturgeons Perfect Workflow Score: 86%

That's v3.0 anyway. OpenAPI v2.0 gets a score of 71% due to either losing Dredd or losing ReDoc.

## Getting People Involved

Initially I was just doing research, finding out how to achieve the dream workflow for API specification. It was spawned by trying to get people at work to actually document APIs. Working at a company where the closest thing to documentation is outdated incomplete Postman collections can be really frustrating, and my existing attempt using API Blueprint and a hacked Aglio output wasn't getting people excited.

To get people excited I thought I would need to offer more than just documentation. API Blueprint got us that, but putting a lot of work in just to get documentation for services that are already in production is never going to be a task anyone jumps at.

Trying to get JSON Schema files into the mix would get us at least the RSpec contract testing that I _knew_ people would be excited about, but with the divergence in OpenAPI v2.0 I've had to kick that can down the road a little.

What really surprised me was that people at work are really excited about getting their systems added to the doucmentation. We've ported a few Postman collections to OpenAPI to get started, and I'm looking into other ways to get the ball rolling for some of the other teams, but we're up to 6 APIs and counting.

Never have I been happier to be wrong. I still think documentation should be considered a happy by-product of a well specified API, but if that documentation looks good enough it might just be enough to get people doing the grunt work.

## Next Steps

Plenty more work to be done.

1. Focus on getting enough OpenAPI v2.0 done that we at least have documentation
1. Upgrade to v3.0 when it's out
1. Generate `tests/contracts/foo.json` from `docs/definitions/foo.json` for now. Backwards as that is
1. Implement [RSpec / JSON Schema matchers](https://robots.thoughtbot.com/validating-json-schemas-with-an-rspec-matcher) to simplify integration tests and coerce folks into keeping spec files up to date
1. Sync OpenAPI changes to a read-only Postman Collections
1. Sync OpenAPI changes to a read-only Paw Collections (so people can use either!)

## Update 2017-08-08

When I discuss this "perfect workflow", I'm talking about my current needs. At work I want to get all the stuff above done, so that things at work are awesome. This caused me to miss out on two key important points.

**Hypermedia:** I've not mentioned Hypermedia here. I'm still struggling to decide how API specification and hypermedia fit together, as it can live in the HTTP body or in the metadata. More on that in the future - but work does not use Hypermedia (yet)

**GraphQL:** Theoretically with JSON Schema or OpenAPI / Swagger as a base for our contracts we gain GraphQL almost for free via a multitude of converters. I'd love to experiment with tacking a GraphQL endpoint into an otherwise RESTish API, so the team can experiment at making their data highly querably (instead of the classic normalized approach) to avoid it being slow as dog-shit. That should help out data structuring in general as they do it, because without that work GraphQL and JSON-API-style includes are always going to suffer equally.

_I'm writing [a book about API specifications](https://leanpub.com/api-specification-aint-just-for-nerds), various formats, all that good stuff. It's a complicated world that I'm going to try and make simple for everyone._
