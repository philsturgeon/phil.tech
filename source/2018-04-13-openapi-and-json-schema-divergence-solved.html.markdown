---
title: "Solving OpenAPI and JSON Schema Divergence"
date: 2018-04-13 13:44 UTC
tags: api, json-schema, api-specs, openapi
category: api
comments: true
---

My [previous article](/api/2018/03/30/openapi-and-json-schema-divergence/) explained the divergence between [OpenAPI](https://github.com/OAI/OpenAPI-Specification) and [JSON Schema](http://json-schema.org/) (a.k.a the subset/superset/sideset problem), and promised solutions. One of those solutions is a tangible thing, which you can install right now! The other is now ready for tool vendors to start considering.

To briefly recap: OpenAPI v3 declares it supports JSON Schema, but there are [more caveats than I can ever remember](https://swagger.io/docs/specification/data-models/keywords/) to that.

![Carefully writing JSON Schema for your data model kiiiinda works](article_images/2018-03-30-openapi-and-json-schema-divergence/data-model-service-model.png)

So, if you try to use JSON Schema for your data models, and OpenAPI as the service layer (the glue!) then you bump into errors like this:

~~~ shell
$ speccy lint docs/openapi.yml
Specification schema is invalid.

#/paths/~1foo/post/requestBody/content/application~1json/properties/user_uuid
expected Array [ 'string', 'null' ] to be a string
    expected Array [ 'string', 'null' ] to have type string
        expected 'object' to be 'string'
~~~

[Speccy](https://github.com/wework/speccy) is a linter we built at WeWork to validate and make recommendations, like rubocop or eslint, but for OpenAPI.

Not only will Speccy consider this invalid, no other OpenAPI/Swagger validator will validate this, and most tools run validation before doing their job.

Postman mirroring via [APIMatic Transformer](https://apimatic.io/transformer) fails.

SDK generation fails.

Everything fails.

## Step 1: Converting OpenAPI to JSON Schema

Before we worry about how everything is going to fit together, we need the ability to convert from JSON Schema to OpenAPI-specific schema objects (that conform to as many of those caveats as possible).

This was promptly solved with a new NPM package: [json-schema-to-openapi-schema](https://github.com/wework/json-schema-to-openapi-schema)! It was quick to release thanks to an existing package: [openapi-schema-to-json-schema](https://github.com/mikunn/openapi-schema-to-json-schema).

Creating json-schema-to-openapi was mostly just a case of flipping the tests around, and changing a bunch of the code to just do the opposite of whatever it was doing before.

~~~ js
const toOpenApi = require('json-schema-to-openapi-schema');

const schema = {
  '$schema': 'http://json-schema.org/draft-04/schema#',
  type: ['string', 'null'],
  format: 'date-time',
};

console.log(toOpenApi(schema));
~~~

The example prints out:

~~~ text
{
  type: 'string',
  format: 'date-time',
  nullable: true
}
~~~

Here's a full list of the conversions it'll make:

- Strip `$schema` and `id` from root, which are both invalid keywords in OpenAPI
- Switches `type: ['foo', 'null']` to `type: foo` and `nullable: true`
- Switches `patternProperties` to `x-patternProperties`
- Converts `dependencies` to an allOf + oneOf OpenAPI-valid equivalent

Huge props to Henry Andrews (author of the latest JSON Schema drafts) for providing the relevant OpenAPI to convert "dependencies" to. More conversions will need to be made, but I believe 99% of the likely uses are covered.

Henry is also going to be releasing some code to help make this package support multiple drafts of JSON Schema, for now it's only draft 4/5 (they're pretty much the same thing).

## Step 2: Workflow

Ok with that done, we need to figure out how and where we convert from JSON Schema to OpenAPI. There are probably a million potential workflows, but here's my recommendation.

Stuff you're doing locally with OpenAPI is usually checking the docs after editing the files, or linting things to see if your changes are ok. Seeing as these are two things Speccy can help with, it seems like a good idea to have Speccy know how to read JSON Schema files.

Default behaviour:

~~~
$ speccy lint docs/openapi.yml
Specification schema is invalid.

#/paths/~1invalidations/post/requestBody/content/application~1json/properties/user_uuid
expected Array [ 'string', 'null' ] to be a string
    expected Array [ 'string', 'null' ] to have type string
        expected 'object' to be 'string'
~~~

The new `--json-schema` switch (`-j` for short).

~~~
$ speccy lint docs/openapi.yml -j
Specification is valid, with 0 lint errors
~~~

The resolver built into Speccy checks for this switch, and treats `$ref` like it might be a JSON Schema file. It's fairly harmless to make the assumption for aaaall `$ref` calls, as it's only going to remove/convert specific keywords that are not valid OpenAPI anyway. 👍🏼

This feature will be released in [Speccy v0.6.0](https://github.com/wework/speccy/milestone/4) which is still in development, but v0.6.0-3 is available. Run `npm i speccy@next` to grab the development version and test it out.

## This Helps Linting... but...

Ok so you don't care about linting, you want to generate SDKs, sync to an automated Postman collection, or one of the other 23497487 things OpenAPI allows you to do, right? Speccy can't do all of that, but it can give you a pure OpenAPI file to play with.


The resolve command has been around for a while, hoisting `$ref`'ed schemas up into the one file:

~~~ shell
$ speccy resolve test/samples/json-schema/openapi.yaml
~~~

If the `$ref`'s point to a JSON Schema file, you're gonna get JSON Schema shoved in and it's going to make an invalid file.

~~~
openapi: 3.0.0
info:
  version: 1.0.0
  title: OpenAPI /w JSON Schema Example
paths:
  /a:
    get:
      summary: foo
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $schema: 'http://json-schema.org/draft-04/schema#'
                type: object
                properties:
                  foo:
                    readOnly: true
                    type: string
                    example: '123'
                  bar:
                    type:
                      - string
                      - 'null'
                    format: uuid
                    example: '12345'
                  baz:
                    type:
                      - string
                      - 'null'
                    format: date-time
                required:
                  - foo
                  - bar
~~~

This file is full of errors.

![Most valid JSON Schema files will trigger errors if they have some of the many keywords OpenAPI doesn't like, especially $schema.](article_images/2018-04-13-openapi-and-json-schema-divergence-solved/swagger-editor-unhappy.png)

Using the magical new `-j` switch, we can resolve ourselves a for realsies OpenAPI file:

~~~ shell
$ speccy resolve test/samples/json-schema/openapi.yaml -j
~~~

~~~
openapi: 3.0.0
info:
  version: 1.0.0
  title: OpenAPI /w JSON Schema Example
paths:
  /a:
    get:
      summary: foo
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  foo:
                    readOnly: true
                    type: string
                    example: '123'
                  bar:
                    type: string
                    format: uuid
                    example: '12345'
                    nullable: true
                  baz:
                    type: string
                    format: date-time
                    nullable: true
                required:
                  - foo
                  - bar
~~~

Boom! No more type arrays, we got some nullable's in there so we've not lost any "optional" hints, and it's a perfectly valid OpenAPI file. Thanks Speccy!  

## A More Proper Solution

This is not a perfect solution of course, it's a workaround. I don't want everyone having to use Speccy for the rest of time, but I did need to sort this out for folks at WeWork. We like having JSON Schema files be the source of truth (it makes [contract testing really easy](https://github.com/thoughtbot/json_matchers), and [client validation](https://blog.apisyouwonthate.com/the-many-amazing-uses-of-json-schema-client-side-validation-c78a11fbde45) is awesome), but there needs to be a longer term plan.

Luckily, the folks at OpenAPI and JSON Schema are all talking to each other. On the weekly OpenAPI Technical Steering Committee call we hashed out a bit of a plan, and a [sweeeeet proposal has been drafted](https://github.com/OAI/OpenAPI-Specification/issues/1532).

I really like this new proposal:

~~~
openapi: 3.0.2
info:
  title: A sample using real JSON Schema and xsd
  version: 1.0.0
paths:
  /:
    get:
      responses:
        '200':
          description: Ok
          content:
            application/json:
              x-oas-draft-alternate-schema:
                type: json-schema
                externalValue: ./rootschema.json
            application/xml:
              x-oas-draft-alternate-schema:
                type: xml-schema
                externalValue: ./rootschema.xsd
~~~

Let's try it out. Let's build it into stuff. I'm gonna have a go at making Speccy support it, I'll be poking folks to get it into projects like [ReDoc](https://rebilly.github.io/ReDoc/).

If no unexpected problems show up with implementing this idea, we'll see this proposal appear as a feature in OpenAPI v3.1, and take over as the official `schema` keyword in 4.0, killing the "divergence" issue forever.

Thanks to everyone working on this, including (but not limited to): Henry Andrews, Mike Ralphson, Darrell Miller, Daniel Goosby, and anyone else at WeWork I've been nagging for help whilst I fight my way through NodeJS'ing.
