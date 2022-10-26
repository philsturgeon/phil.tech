---
layout: post
author: [Phil]
title: "Only You Can Bring Modern OpenAPI Bundling to JavaScript"
date: 2022-10-26 17:15:23+00:00
tags: [api, javascript, json-schema, api-specs, openapi]
---

If you're familiar with [OpenAPI](https://openapis.org/) you're probably familiar with "Bundling", also known by some as "Resolving" or "Dereferencing", "External Inlining"... there's a lot of names for this, but basically we are talking about pulling all the referenced parts of OpenAPI documents (linked together using `$ref`) into a single OpenAPI document. This could be done in memory to work with complex OpenAPI programatically, or saving the new single file to be more portable.

I wrote more about why you might want to do that, and the history of it in OpenAPI v2.0 and v3.0 over on the Stoplight blog: _[Keeping OpenAPI DRY and Portable](https://blog.stoplight.io/keeping-openapi-dry-and-portable)_, which will give you examples that look a bit like this:

```yaml
  responses:
    '200':
      description: OK
      schema:
        type: object
        properties:
          data:
            type: array
            items:
              $ref: './schemas/gif.yaml'
          meta:
            $ref: './schemas/meta.yaml'
          pagination:
            $ref: './schemas/pagination.yaml'
```

For a long time the way various bits of tooling followed `$ref`, how it turned a set of OpenAPI documents littered with filesystem implementation details, and what it did with it afterwards, were all up to the tooling vendor. Different tools worked in different ways. This meant confusing expectations for users, which in turn means confusing functionality requests for tooling maintainers. Some OpenAPI could be written in a way that would break when loaded on a different operating system, and could suffer from all sorts of case sensitivity issues or special character nonsense. 

It was a mess. 

Unfortunately that mess still exists, because tooling has not moved to adopt this new functionality.

Bundling has been standardized in JSON Schema Draft 2020-12, and we got Ben Hutton on the blog back in August 2021 to talk about it in _[JSON Schema Bundling has been Formalized](https://apisyouwonthate.com/blog/json-schema-bundling-finally-formalised)). 

The tldr there is you can name schemas with an `$id` which is a URI, which can then be used as a `$ref` regardless of where files sit in the filesystem. As long as you tell the tool where things are, it can find all the various bits itself by memorizing the $ids and stitching them together with $ref. Then to do "bundling" it can dump them into `$defs`. It looks a bit like this in OpenAPI:

```yaml
openapi: 3.1.0
info:
  title: API
  version: 1.0.0
components:
  schemas:
    # This name has not changed, or been replaced, as it already existed and is likely to be referenced elsewhere
    non-negative-integer:
      # This Reference URI hasn't changed
      $ref: 'https://example.org/schemas/examples/non-negative-integer'
    # The path name already existed. This key doesn't really matter. It could be anything. It's just for human readers. It could be an MD5!
    non-negative-integer-2:
      $schema: 'https://json-schema.org/draft/2020-12/schema'
      $id: 'https://example.org/schemas/examples/non-negative-integer'
      description: Must be a non-negative integer
      $comment: A JSON Schema that uses multiple external references
      $defs:
        nonNegativeInteger:
          allOf:
          # These references remain unchanged because they rely on the base URI of this schema resource
          - $ref: /schemas/mixins/integer
          - $ref: /schemas/mixins/non-negative
      $ref: '#/$defs/nonNegativeInteger'
    integer:
      $schema: 'https://json-schema.org/draft/2020-12/schema'
      $id: 'https://example.org/schemas/mixins/integer'
      description: Must be an integer
      type: integer
    non-negative:
      $schema: 'https://json-schema.org/draft/2020-12/schema'
      $id: 'https://example.org/schemas/mixins/non-negative'
      description: Not allowed to be negative
      minimum: 0
``` 

Seeing as OpenAPI v3.1 and JSON Schema are now [entirely compatible](https://apisyouwonthate.com/blog/openapi-v3-1-and-json-schema), this means OpenAPI has inherited that standardized bundling method. All modern venders in the OpenAPI space (the likes of [Stoplight](https://blog.stoplight.io/stoplight-now-supports-openapi-3-1-documents), [Postman](https://blog.postman.com/postman-now-supports-openapi-3-1/), and [Redocly](https://redocly.com/blog/updates-2021-05/)) advertize support for OpenAPI v3.1, but they do not yet support `$id` in references. 

These teams are all _hugely_ busy working on many amazing things that you're all going to love, and they prioritize what they're working on based on what users are asking for, but this is something the OpenAPI community at large does not know they should be asking for.

Even if some of these tooling vendors decide they want to add it to their tools, the way the OpenAPI ecosystem seems to work in most programming languages is that the referencing/bundling is outsourced to a few very popular upstream libraries that everyone depends on. In JavaScript that would be [json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser). It does not support `$id`, and I'm sure loads of OpenAPI tools _could_ jump on this sweet sweet standardized bundling if it did. Without getting upstream dependencies like json-schema-ref-parser to support it, we'll be waiting a long time for the user facing tools to add this functionality.

## Let's Resolve the Resolvers!

Who maintains this [json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser) library? Let's go and shout at them to get on with it! It's got almost **two million weekly downloads** after all, this needs to get sorted out! 

Oh, it's me...

I took on maintenance of this library as a favour to the previous maintainer who was dealing with **a lot**, and my position at Stoplight at the time meant I could assign some of the work to our team as we were also using it. Since then I have changed jobs (I help Stoplight out here and there but am not full time or leading teams), and Stoplight are [using their own fork](https://github.com/stoplightio/json-schema-ref-parser) with some specific product functionality in it.

So now I am maintaining a tool which I do not know the internals of particularly well. I was only ever offering to hold the keys, but I've been left holding the bag. Maybe I can get the folks at Stoplight to pitch in some help, but either way this package has a LOT of users, yet pull requests are few and far between. Every week I have a few "Bump" "WTF" "When are you going to do this?!" emails on some issue or other, and its not particularly good for my mental health.

Currently I am focused on scaling my reforestation charity [Protect Earth](https://protect.earth/). There's a lot of trees to plant, land to buy, partnerships to grow, code to write, qualifications to get, employees to manage... and all of that is unpaid work I am doing because I want to put the biggest dent into the climate crisis that I possibly can. After a long day of working in the field slashing bamboo with a machete or planting hundreds of trees **for free** I don't need to come to my inbox and see it full of grumpy demands for more work for free, especially when I need to try and get some billable hours of work done to avoid going entirely broke! 

This package had an issue tracking [`$id` and `$ref` changes for OpenAPI v3.1](https://github.com/APIDevTools/json-schema-ref-parser/issues/145), but its not likely to be an easy change to get this support in. The previous maintainer James Messinger had started building a replacement library that would make it far easier to support modern JSON Schema properly: [json-schema-reader](https://github.com/APIDevTools/json-schema-reader), but progress stopped on that for the same reasons maintenance stopped on json-schema-ref-parser. Perhaps I could rustle up a few contributors to help comb through json-schema-reader, figure out where it's at, then we can make a plan to get it there. If that happens, we can deprecate json-schema-ref-parser and jobs a good'un.

Before we do that, I would love to know if there are modern viable alternatives in the JavaScript community. Perhaps whilst I've been getting stuck into tree planting there is a new brilliant replacement for json-schema-ref-parser in the JavaScript community. If there is, please contribute a link on [OpenAPI.Tools GitHub](https://openapi.tools/).

So far I have come across Jason Desrosiers' [JSON Schema Bundler](https://github.com/hyperjump-io/json-schema-bundle), which has been described as "a little rough around the edges, but it works." There does not seem to be all that much usage and I haven't had a chance to dig in and see how much feature parity there is. They did mention it only removes external refs, so you'd still have internal refs (something that json-schema-parser attempts to handle with "dereferencing", but occasionally just gets stuck in infinite loops).

The Redocly crew mentioned they have some code which could be used as [a starting point](https://github.com/Redocly/redocly-cli/tree/master/packages/core), but I'm guessing it's not completely read as [Redocly have not got $id references](https://github.com/APIDevTools/json-schema-ref-parser) in their documentation product yet. 

Are either of these tools good enough to use? Give em a try! 

Is there anything else out there? What is it! 

If you know anything useful, or want to get stuck in as a contributor to json-schema-ref-parser or the new json-schema-reader, give me a shout on any of the usual places:

- [twitter.com/philsturgeon](https://twitter.com/philsturgeon)
- [APIs You Won't Hate's Slack](https://slack.apisyouwonthate.com/)
- Send a pull request to [json-schema-ref-parser](https://github.com/APIDevTools/json-schema-ref-parser) 😅
- Come and [plant trees all over the UK](https://protect.earth/events) with me and we can natter in the field

I'll be happy to manage a collaborative effort and guide people towards excellent libraries through deprecations and more blog posts here and everywhere else. Let's work together and make something better than ourselves.
