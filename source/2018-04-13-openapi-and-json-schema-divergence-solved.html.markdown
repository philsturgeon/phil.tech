---
title: "Solving OpenAPI and JSON Schema Divergence"
date: 2018-04-13 13:44 UTC
tags: api, json-schema, api-specs, openapi
category: api
comments: true
---

_**Update 2020-02-02:** This article has been replaced entirely, as the proposed workaround was written into a now abandoned project Speccy, and the long-term proposed solution "Alternative Schemas" has been punted to a later version of OpenAPI due to [complications with the form it took](https://github.com/OAI/OpenAPI-Specification/issues/1943)._

Instead of using Speccy go grab [Spectral](https://stoplight.io/spectral/), it's everything I wanted Speccy to be but with 10x the functionality thanks to having a whole team of people working on it instead of just me and Mike. It doesn't bother with the JSON Schema proper to OpenAPI-flavoured Schema conversion because you can use [json-schema-to-openapi-schema](https://github.com/openapi-contrib/json-schema-to-openapi-schema) for that, and we solved the divergence properly in OpenAPI without the need for workarounds...

Instead of worrying about Alternative Schemas, the JSON Schema <> OpenAPI divergence will be resolved in OpenAPI v3.1 thanks to [#1977](https://github.com/OAI/OpenAPI-Specification/pull/1977) being merged. The latest estimate for v3.1.0-RC1 is end of February, so tooling vendors should get to work on upgrading support for [JSON Schema 2019-09](https://json-schema.org/specification.html) and other [OpenAPI v3.1 changes](https://github.com/OAI/OpenAPI-Specification/blob/v3.1.0-dev/versions/3.1.0.md).
