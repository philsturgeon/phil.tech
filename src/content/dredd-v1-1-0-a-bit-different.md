---
layout: post
author: [Phil]
title: "Dredd v1.1.0: A Bit Different"
date: 2016-06-20 18:11:00+00:00
tags: [http, api, dredd, apiblueprint]
# comments: true
---

A new version of Dredd - the API Documentation testing tool from [Apiary Inc.] - has been released, and it has changed
 a few things for the better. During the upgrade at [Ride] I ran into a few problems, mostly based around how we had
 been using Dredd and [API Blueprint].

_I've blogged about Dredd and API Blueprint a few times, [covering the concept and workflow][dredd-article], and
later showing off more in-depth how you can [structure your API Documentation][apiblueprint-article]. This is still the
approach we use, and if you're not familiar with Dredd maybe head over to one of those._

[v1.1.0] was released June 17th, and whilst it's not exactly a new iPhone or a driverless car, I'm excited. One of
the main things they snuck in there is [experimental support for Swagger]! I've not had a play with that yet, but
it's great that they're starting to support both, especially as [Apiary supports Swagger too].

## Nullable

One thing I noticed was support for the `nullable`. [Adam Kliment](https://twitter.com/ntmlk) - author of Dredd -
created a [hack hook to support nullable][nullable-workaround], but it was very much a workaround. We had to shove a
`#nullable` at the end of the line.

~~~ md
- started_at: `2015-01-07T14:03:43Z` (string, nullable) - #nullable
~~~

Now - I think due to switching from Protagonist to [Fury.js] - we can remove the hook and the hacktag.

~~~ md
- started_at: `2015-01-07T14:03:43Z` (string, nullable)
~~~

## Multiple Response Testing

The main thing I noticed, was that Dredd was now testing all multiple responses. Multiple responses look like this:

~~~ md
## Avatar collection [/avatars]

### Upload an avatar [POST]

+ Request (application/json; charset=utf-8)

    + Attributes
        - avatars (object)
          - avatar_url: `http://example.org/some-actual-file.jpg`

+ Response 201 (application/json; charset=utf-8)

    + Attributes
        - avatars (Avatar Full)

+ Response 415 (application/json; charset=utf-8)

    + Attributes
        - errors (array[Error Unsupported Media Type])
~~~

This was really common in our API, as a way to show that you might get an important error. We don't show every possible
 error sure, but if something seemed unique or interested it would go in.

Using previous versions of Dredd, if you had multiple responses, you would see the following:

~~~
warn: Runtime compilation warning: Multiple responses, using first.
 on Avatar > Avatar collection > Upload an avatar
~~~

Now, Dredd will give them all a go!

The downside to Dredd trying to run new tests is that it will probably break your build. Seeing as the request is built identically, the response will be identical, and the test will fail! Instead of getting a `415` here, we'll
end up getting a `200`.

To get around this I had to abandon multiple responses (boo!) and switch to using two request transactions, like this:

~~~ md
## Avatar collection [/avatars]

### Upload an avatar [POST]

+ Request OK (application/json; charset=utf-8)

    + Attributes
        - avatars (object)
          - avatar_url: `http://example.org/some-actual-file.jpg`

+ Response 201 (application/json; charset=utf-8)

    + Attributes
        - avatars (Avatar Full)

+ Request Unsupported Media Type (image/gif)

+ Response 415 (application/json; charset=utf-8)

    + Attributes
        - errors (array[Error Unsupported Media Type])
~~~

Notice here the first request now has a name, `Request OK`, which can be arbitrary string (within reason). I chose to
stick to the HTTP status reason so it matches, as that seemed like as good a convention as any.

You'll also notice another change, I've added a new named request: `Request Unsupported Media Type`. That `image/gif`
will trigger the API to respond with an error, as we only accept `application/json`, `image/jpeg` or `image/png` for
that endpoint. Now that it is a new transaction it wont conflict with the `OK` test, and we're all green!

## Thanks!

Great job from the Dredd contributors, I saw [Honza Javorek]'s name show up a whole bunch in the [changelog] and know a lot of others put in serious effort too.

[Apiary Inc.]: https://apiary.io/
[Ride]: https://ride.com/
[dredd-article]: https://phil.tech/api/2015/01/28/dredd-api-testing-documentation/
[apiblueprint-article]: https://phil.tech/api/2015/10/08/http-documentation-with-api-blueprint/
[v1.1.0]: https://github.com/apiaryio/dredd/releases/tag/v1.1.0
[API Blueprint]: https://apiblueprint.org/
[experimental support for Swagger]: https://github.com/apiaryio/dredd#supported-api-description-formats
[Apiary supports Swagger too]: https://blog.apiary.io/2016/01/18/We-ve-got-Swagger
[nullable-workaround]: https://gist.github.com/netmilk/ca5f39e607336e81edea
[Fury.js]: https://github.com/apiaryio/fury.js
[Honza Javorek]: https://twitter.com/honzajavorek
[changelog]: https://github.com/apiaryio/dredd/blob/master/CHANGELOG.md
