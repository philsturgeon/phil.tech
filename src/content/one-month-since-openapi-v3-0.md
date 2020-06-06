---
layout: post
author: [Phil]
title: One Month Since OpenAPI v3.0
date: 2017-08-26
tags: [api, json-schema, api-specs, openapi]
comments: true
disqus_identifier: one-month-since-openapi-v3-0
alias_1: api/2017/08/26/one-month-since-openapi-v3-0/
---

Last month today [OpenAPI v3.0 was released](https://www.openapis.org/blog/2017/07/26/the-oai-announces-the-openapi-specification-3-0-0), and not only is there [a lot of cool stuff](https://blog.readme.io/an-example-filled-guide-to-swagger-3-2/), but it unblocks some akward situations with vendor prefixes and other lacking features. I was hoping the tooling would be hot on its tails. Progress is being made in all of the repositories I've got my eyes on, but sadly v3.0 support is not there yet.

## Marketing

Even though the whole OpenAPI community advises against calling the specification "Swagger", the specification is only available on [Swagger.io](https://swagger.io/specification/), or linked from [OpenAPIs.org](http://openapis.org) with a [direct link to GitHub](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md).

The messaging here is confusing. Is it OpenAPI or Swagger? If it's not Swagger why is the specification still on that site? Ending up on GitHub feels like I accidentally clicked the wrong thing, and 3.0 might be unfinished, but it's meant to be out!

Whilst OpenAPI is obviously for technically minded people, these are still concerns that will put newcomers off, and I hope they're addressed.

## Tooling

The [workflow I outlined](/api/2017/07/20/my-vision-for-a-perfect-world-in-api-specification/) back in July relies on a few tools.

[APImatic Transformer](https://apimatic.io/transformer) to convert Postman or (whatever other source files people have kicking around) to OpenAPI, so that the workflow can begin. This is still v3.0-rc1.

[swagger-node](https://github.com/swagger-api/swagger-node) is awesome for designing and building well specified APIs in Node. It skips the need for things like Dredd as the framework itself is ensuring the code conforms to the specification, instead of building specifications from code like some other junky tools. Still v2.0, but [subscribe for updates](https://github.com/swagger-api/swagger-node/issues/514).

[ReDoc](https://rebilly.github.io/ReDoc) is a UI for the OpenAPI schema, creating HTML for humans to look at. It's undergoing some architectural changes which will hopefully ease rejiggering under the hood, but v3.0 aint done just yet. [Subscribe for updates](https://github.com/Rebilly/ReDoc/issues/312).

[API Flow](https://github.com/luckymarmot/API-Flow/) will allow mirroring to Postman from our API Specifications. Unlike the earlier mentioned one-off Postman import, used to create OpenAPI Specifications from ragtag examples, this would be an ongoing Read-only mirror. Sadly, this too does not support v3.0. [Subscribe for updates](https://github.com/luckymarmot/API-Flow/issues/102).

## Summary

We're still actively creating OpenAPI v2.0 content at work, knowing that we can [manually upgrade](https://blog.runscope.com/posts/tutorial-upgrading-swagger-2-api-definition-to-openapi-3) later.

When most of these tools support v3.0 we can upgrade APIs one at a time. This will be a little confusing, but hopefully it will simplify the specification files enough that folks be happy.

Fingers crossed the OpenAPI community can keep on cranking, and I'll obviously send whatever pull requests I can to help.
