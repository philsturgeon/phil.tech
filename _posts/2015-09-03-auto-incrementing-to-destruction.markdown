---
layout: post
title: "Auto-Incrementing IDs: Giving your Data Away"
date: '2015-09-03 13:47:00 +1200'
category: http
tags: http api
comments: true
---

Something we're always taught as developers, usually by tutorials or via the defaults in various ORM tools, is every SQL table needs an auto-incrementing ID. This is a weirdly common fallacy, enforced by old tutorials, new tutorials and half-arsed tooling in various forms. Why are auto-incrementing IDs a problem? Because it means people can download your database. 

This is not a new problem, it's been covered well over the last twenty years, but it is a problem I tell people about in my API talks and it seems new to many. People want to know how to avoid it, and how API data can ever be safe.

## A Case Study

I contracted for a startup going through an accelerator, where one of the teams were building a unique database of user-generated photographs, and these photos were of artwork. Artwork like awesome graffiti, unknown installations, etc., and this data was not available anywhere else on the Internet.

They had these two URLs on their API:

1. `GET /artworks/234`
2. `GET /users/6138`

What are the problems here?

### Leaking "Success" to Competitors

As a startup, you often have competitors. Letting those competitors know the size of your data set, and how many users you have in your system, could lead to some pretty embarrassing situations.

Looking at the URL `GET /users/6138`, I can go to `GET /users/1`. If that shows me data, I can reasonably assume they have _at least_ 6138 users, but to find the total I can easily make a script that `++$id` and counts every HTTP status `200`, and also counts things like 404 or 410, to give a accurate number of how many active users there are, and how many closed their account.

That could embarrass a larger company, or utterly destroy a small startup.

### Leaking Datasets to Competitors (or Assholes)

Leaking statistics to your enemies might not be something that keeps you up at night, but what about giving away your actual data?

In our case study, these people had unique data, available nowhere else. If other people want this data, they can use the same `++$id` approach to grab a hold of that data, and populate their own app, making a new competitor quite easily, and with a slightly better app could potentially put them out of business.

Balls.


## Alternatives

There are some alternatives to this, which can be used in pretty much any scenario. 

### ID Obfuscation

If you're stuck with 1, 2, 3 in your DB due to a picky ORM, or due to not wanting to change an existing schema and all the data that goes with it, you can keep your IDs and just "hide" them.

Obfuscation allows you to turn a `1` into a `"df234FSafd"` and a `"p363fdte7"` into a `2364`. Your IDs stay the same, but the user cannot `++$id` anymore because `"df234FSafd" + 1` isn't a thing.

They use a hidden secret key, without which the strings are not reversible, so they're relatively safe.

**PHP**

* [Tiny](https://github.com/zackkitzmiller/tiny-php/) - based on code used by [Forrst](http://zurb.com/forrst), and built by the excellent [Zack Kitzmiller](https://twitter.com/zackkitzmiller)
* [HashIDs](http://hashids.org/php/) - This is good too

**Ruby**

* [obfuscate_id](https://github.com/namick/obfuscate_id) - Rails only sorry other people, but looks good
* [HashIDs](http://hashids.org/ruby/) - Oh look its back

**Python**

* [Opaque ID](https://github.com/marekweb/opaque-id) - Obfuscation for integer IDs
* [HashIDs](http://hashids.org/python/) - Seriously?

**JavaScript, Java, Scala, Perl, Swift, Clojure, Objective-C, C, C++11, Go, Erlang, Lua, Haskell, Elixir, Rust, ColdFusion, Groovy, Kotlin, Nim, VBA, ActionScript, CoffeeScript, Bash and for Node.js & .NET**

* [HashIDs](http://hashids.org/) - Ok calm down with the language support

### Universally Unique IDs

UUID is a cool way to make some really unique identifiers for your records, without relying on the DB to auto-increment to make it unique.

These can be used in place of usual IDs. They look a little bit like this:

> de305d54-75b4-431b-adb2-eb6b9e546014

That, again, is not `++$id`-able. 

On top of that, two records made at the exact same split second will not have the same UUID, which is where the "universally" bit comes in. You can use this for offline support, meaning you make an item locally, give it an UUID, then sync up with the database when your user gets out of the subway and you've maintained integrity of your IDs and your data at large. 

**PHP**

* [ramsey/uuid](https://packagist.org/packages/ramsey/uuid) - PHP 5.4+ library for generating RFC 4122 version 1, 3, 4, and 5 UUIDs

**Ruby**

* [SecureRandom.uuid](http://ruby-doc.org/stdlib-2.2.3/libdoc/securerandom/rdoc/SecureRandom.html#method-c-uuid) - Built in!

**Python**

* [uuid](https://docs.python.org/2/library/uuid.html) - Built in!

## But if your app can get it, so can the user

Maybe, but how do your users get to the data?

In the case of pageable content, like a "Recent Events" list, simply limit the history of the data you can search through to a few days.

In the case of geo data searched for by proximity (stuff near you), set a limit on the number of records that can be returned, and how far out they can zoom. They'd have to script a bot to get it all which would take a while and is something you can probably program to detect.

Also rate limiting. If you require folks to register an app, you can limit their credentials on the free tier to stop them downloading everything. 

Then, if they do start trying to download your whole data set, it'll at least take them a long time, and again, hopefully give you a chance to notice suspect activity.

How? Look for apps regularly hitting their rate limit. Look for stuff that is randomly search geo boxes moving across the map in an unnatural way (people don't move in a sweeping left to right grid pattern). 

Automate those detections, and fire off an email to the bastards trying to download your dataset. You'll have their email because they signed up, and if they're really daft they'll use their work email. I've seen that happen, and we had a nice little chat.

<hr/>

If you want more advice on HTTP/API stuff, grab a copy of my book [Build APIs You Won't Hate](http://apisyouwonthate.com/). You can get that eBook for free if you donate $10 to my next [charity bike ride](http://fundraising.housingworks.org/index.cfm?fuseaction=donordrive.participant&participantID=2035).
