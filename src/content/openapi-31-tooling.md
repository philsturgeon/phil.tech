---
layout: post
author: [Phil]
title: OpenAPI v3.1 Resources for Tooling Developers
date: 2022-05-11
tags: [openapi, rest, api, http]
canonical: https://www.openapis.org/blog/2022/05/11/openapi-v3-1-resources-for-tooling-developers
---

OpenAPI v3.1.0 has [a bunch of great changes](https://www.openapis.org/blog/2021/02/18/openapi-specification-3-1-released), solving problems like the [subtle differences between JSON Schema objects and OpenAPI Schema objects](https://apisyouwonthate.com/blog/openapi-json-schema-divergence), and adds support for Webhooks. 

Upgrading tooling can be tricky, but this should be a lot easier than the jump from v2 to v3.0. To reduce the workload we've put together some convenient resources for tooling developers, to provide test cases, examples, and guidance in general.

First of all, these articles will show the differences between v3.0 and v3.1 from a user perspective:

- [OpenAPI official release notes](https://www.openapis.org/blog/2021/02/18/openapi-specification-3-1-released)
- [OpenAPI Blog: Migrating from 3.0 to 3.1](https://www.openapis.org/blog/2021/02/16/migrating-from-openapi-3-0-to-3-1-0)
- [Nordic APIs Blog: What's New in OpenAPI v3.1.0](https://nordicapis.com/whats-new-in-openapi-3-1-0/)

## Do you need to support everything?

Some of that content is aimed more at end users and what they will need to do, but what do tooling vendors need to do? 

For new features like webhooks, you can think to yourself: does this tool need to support webhooks? If it's a documentation tool, probably! If the tool is validating incoming web requests to your server, then probably not. 

Some tools have gone with a definition of 3.1.0 support which is "a 3.1.0 document will work equally well as a 3.0.0 does in the same tool", which is a good first step. Then support for other new keywords can be added later. 

It's my opinion that getting 3.1.0 documents to _work_ at a basic level is more important than supporting every single feature in 3.1.0. End-users will create feature requests for the bits they're most excited about as you go.

## JSON Schema consolidation

For the bulk of the other changes, the difference is that instead of using a schema object that is _very similar_ to JSON Schema, the OpenAPI Schema object is now literally JSON Schema. There's some technicalities involved here and technically OpenAPI Schema has defined it's own JSON Schema vocabulary, which extends the main JSON Schema vocabulary and adds support for `discriminator`. As the usage of `disciminator` in 3.1.0 was clarified to be purely a "hint" or shortcut for an existing oneOf, anyOf, allOf, this can be safely ignored by the vast majority of tooling. 

tl;dr: you can use any valid JSON Schema tooling to work with the contents of a `schema:` object in OpenAPI, which means a lot of tools can phase out reliance on hand-crafted schema inspection code, and leverage any of the existing [JSON Schema tooling](https://json-schema.org/implementations.html) instead. 


For example, if a tool you maintain was manually validating OpenAPI Schemas in JavaScript before, it might be an idea to wrap that in an `if ($version == "3.0")` statement, use that old logic, deprecate it, then if the version is 3.1 you could leverage powerful tools like [AJV](https://github.com/ajv-validator/ajv) or [HyperJump](https://json-schema.hyperjump.io/) to do all the heavy lifting. This immediately benefits your tooling from them doing all the work supporting modern JSON Schema / OAS3.1 keywords for you, like [if/then/else](https://json-schema.org/understanding-json-schema/reference/conditionals.html#if-then-else). 

It also means they can do the heavy lifting for other changes that come as JSON Schema matures into a stable release (although it would be brilliant if you could help them out a too).

## Test Cases

To make sure your tooling works with OpenAPI v3.1, you'll need some OpenAPI v3.1 documents to test against. There is no official list of OpenAPI v3.1 documents around, but there are some example files written by the community which can be used in a test suite to show pass or fail scenarios:

- [Mermade OpenAPI v3.1 Examples](https://github.com/Mermade/openapi3-examples/tree/master/3.1) - Extremely minimal examples that hit most of the new functionality.
- [Adyen OpenAPI](https://github.com/Adyen/adyen-openapi/tree/main/yaml) - A financial technology platform with real-world OpenAPI v3.1 documents shared publically.

## Validation Schema

Many tools use a JSON Schema document that describes valid OpenAPI documents. Yes that is a very meta sentence, but if you know what I mean then you are wondering if there is a new one for OpenAPI v3.1? Good news, there is! 

- [OpenAPI v3.1 Official Schema](https://github.com/OAI/OpenAPI-Specification/tree/main/schemas/v3.1)

## Find Other v3.1 Tooling

To see how other OpenAPI tools are doing take a look at [OpenAPI.Tools](https://openapi.tools). Perhaps there is some other tooling you could leverage, or some developers you could team up with, or ask questions to, or hire to work on your thing too, etc.

Don't forget to send a [pull request](https://github.com/apisyouwonthate/openapi.tools/compare) to OpenAPI.Tools to say when you're supporting v3.1, by adding `v3_1: true` to `_data/tools.yml`. You can also pop a `openapi31` tag on GitHub so that other tooling aggregators can find you too!
