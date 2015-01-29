---
layout: post
title: "Dredd: Do Your HTTP API Justice"
date: '2015-01-28 7:14:00 +0500'
category: api
tags: http api dredd apiblueprint
comments: true
excerpt: "If you have documentation for any sort of HTTP-based API, from a micro-service to a non-trivial RESTful API, if it has existed for more than a week it has got some mistakes in it. Documentation degrades over time. This article aims to help you ensure that your API documentation keeps entirely in line with the implementation, utilizing two tools: API Blueprint and Dredd."
---

If you have documentation for any sort of HTTP-based API, from a micro-service to a non-trivial RESTful API, if it has existed for more than a week it has got some mistakes in it. Documentation degrades over time. This article aims to help you ensure that your API documentation keeps entirely in line with the implementation, utilizing two tools: [API Blueprint] and [Dredd].

If you are not familiar with API Blueprint, maybe you know of [Apiary]. API Blueprint is the Markdown-based format used by Apiary to create their API documentation - along with other various features. Dredd is a tool that will check for discrepancies between your documentation and the actual implementation.

## HTTP API Documentation Errors

Documentation errors could be a new field added or removed from the API request or response, but not reflected in the documentation. Using serializers such as [Fractal (PHP)], [Active Model Serializers (Rails)] or [Marshmallow (Python)] can help you notice field changes, but there are many more areas to think about. Maybe a new query string has been added which was not listed, or a new JSON-API style link (relationship) is being presented that was not available before. What about response headers? So many things can change.

To make sure API documentation is 100% matching the implementation at [Ride], and to avoid a number of angry Colombians kicking my ass next time they're in up in NYC on a team building trip, I have spent quite some time implementing [Dredd].

## Testing with Dredd

My previous explanation of Dredd might sound a bit magic. To me at first this is exactly how it sounded, but really it is so simple. Dredd is just a CLI NodeJS application which looks at every Request and Response documented in your API Blueprint file and treats it like an integration test. The API Blueprint file is put into the git repo by Apiary by messing about with the settings, meaning it can be updated in pull requests along with the code that is being changed, which makes CI integration much easier.

Dredd will look at the headers, status code, response format and the exact body returned, and let you know if there are differences in any of those areas. An error message will be output, meaning you can debug an application locally or dispense quick and brutal justice on your continuous integration build.

Setting this up took me about three weeks, but we have an incredibly non-trivial API at Ride. There are complex user roles, we are pre-1.0 meaning there were a lot of bugs to fix and are in a rapid development phase meaning I was coding against moving goal posts.

You can do this much quicker.

First, read [How To Test REST API with API Blueprint and Dredd](http://blog.apiary.io/2013/10/17/How-to-test-api-with-api-blueprint-and-dredd/).

Next, I'll outline everything I had to consider and implement to make this work which is not listed there at all.

### Step 1: A Useful Run Script

In the Apiary article they have an example `scripts/test` file:

{% highlight console %}
#!/bin/sh
./node_modules/coffee-script/bin/coffee app.coffee &
sleep 5
PID=$!
dredd apiary.apib http://localhost:3000/
RESULT=$?
kill -9 $PID
exit $RESULT
{% endhighlight %}

I tweaked that and made a `bin/run_dredd` script to fit in with the other Rails executables:

{% highlight console %}
#!/bin/sh
RAILS_ENV=test bundle exec rake db:reset
RAILS_ENV=test bundle exec rake db:fixtures:load
RAILS_ENV=test bundle exec rake db:seed
RAILS_ENV=test bundle exec rails server -p 3001 &
sleep 5
PID=$!
dredd apiary.apib http://localhost:3001/ --sorted
RESULT=$?
kill -9 $PID
exit $RESULT
{% endhighlight %}

This helped make dredd set itself up with a useful database, run a server in the test environment, look at the `apiary.apib` file then kill its process. A very handy script.

### Step 2: Test Data

I [wrote about seeding a database in PHP/Laravel](/blog/2013/11/build-apis-part-1-useful-database-seeding/) and there are a few new tools like [Factory Muffin] to make this really easy. Regardless of the language or framework, however you seed your database for other integration tests will probably work fairly well as a start.

At Ride as you can see above we use Rails fixtures for tests already, so I got a long way off of that. I ended up writing a custom `db:seed` logic which would make custom users, custom OAuth tokens, and basic related data to be used solely by Dredd.

### Step 3: Running Different Users

When I first started with Dredd I was trying to send it the same access token for everything using `dredd apiary.apib --header FOO-TOKEN`, forgetting that various endpoints expect tokens to belong to either users, or one of a few different OAuth clients that represent internal services.

Our API would complain that the token was not for a user, or was not for that specific service.

To make this work, I added some

{% highlight text %}
## Credit Card collection [/credit_cards]

### Create a Credit Card [POST]

+ Request (application/json; charset=utf-8)
    + Headers

            Authorization: Bearer passenger_access_token
{% endhighlight %}

We also have `driver_access_token` and `foo_service_access_token`. This can be a bit misleading as it looks like we are saying _only users_ on an endpoint that might allow users _and_ services, but that can be explained for humans in the description.

### Step 4: Leaky Data

Some integration test frameworks will let you insert fixtures into the database before each test, then reset the database to its previous condition via transactions or whatever afterwards to ensure a fresh state for each test. Dredd will not make your life that easy. It will continue to have knock-on effects on other endpoints in whatever order it runs in.

Using the `dredd --sorted` switch will very likely reduce the number of resources that try to delete content before reading it. The tests will be run in this order: `CONNECT`, `OPTIONS`, `POST`, `GET`, `HEAD`, `PUT`, `PATCH`, `DELETE`, `TRACE`. This is probably not a magic bullet, but it reduced my errors by about 30%.

To combat the other 70% I experimented with [writing hooks](https://github.com/apiaryio/dredd/wiki/Writing-Hooks) for Dredd, which are a way you can use CoffeeScript - uck - to run NodeJS script - uck - before and after various tests. I found some examples to run code before every test, so I wondered if I could hook up a `db:reset` and a `db:seed` before each Dredd test.

I knew this would be slow if it worked, but it ended up running the child processes async meaning the seeds would not finish before it tried to run the test. After a few hours of messing around I dropped this approach, instead aiming to focus on compartmentalizing the users so their actions would have no affect on each other.

Following the approach in Step 3, I just made a `billy_no_mates_access_token` which had no matched users, meaning I could add and change addresses without deleting any other data.

### Step 5: Continuous Integration

CircleCI was perfectly happy to run Dredd with minimal cocking around:

{% highlight yaml %}
dependencies:
  post:
    - npm install -g dredd
test:
  override:
    - bundle exec rake test
    - bundle exec ./bin/run_dredd
{% endhighlight %}

I had to override the default command to allow multiple commands, and obviously `dredd` had to be installed via npm, but after that it just used the same `./bin/run_dredd` I'd been using locally.

### Extra: Syntax Errors

JSON syntax errors in examples, Markdown syntax errors and other problems can really mess you up, and Dredd is not always that hot at reporting them. There is another tool called [Snowcrash], which you can use directly once installed. If anything goes weird in your tests, try this command:

{% highlight sh %}
$ snowcrash apiary.apib
{% endhighlight %}

This gives some great feedback on all sorts of potential screw-ups in your documentation, which otherwise might go unreported.

## Limitations

If you have no integration tests then this can be a good start, but it should not be relied on as your complete source of integration tests. API Blueprint is great, but it has limitations. 

For example, you can only have one request for each "URL" + "HTTP Method" combination. This has been a pain in the past when I have wanted to document multiple `POST /oauth/tokens` requests showing the various inputs and outputs for different OAuth grant types, but API Blueprint wouldn't let me.

Also, documenting multiple errors can be tricky. You can only have one error response example per HTTP Status Code. For example, you can only have one `422` response for _all_ validation errors on that endpoint.

This makes Dredd terrible for proper integration testing, and that is fine as it is not what Dredd is for. Dredd is testing your documentation is accurate using the API, it is not for testing your API. That is just a handy side benefit. Dredd has caught actual bugs that our unit and integration tests did not, but again, you can't _just_ use Dredd. **You need a real test suite too.**

## Summary

Getting Dredd setup can be rather hard work depending on the size of your HTTP API, but it is very much worth it. It has helped me avoid a kicking from the API clients once or twice, and no doubt it will help more in the future. That said, I would have preferred to spend three weeks working on features instead of trying to crowbar this into our workflow.

Hopefully you can get it done a little quicker with this advice.

[Apiary]: http://apiary.io/
[API Blueprint]: https://apiblueprint.org/
[Swagger]: http://swagger.io/
[RAML]: http://raml.org/
[Fractal (PHP)]: http://fractal.thephpleague.com
[Active Model Serializers (Rails)]: http://railscasts.com/episodes/409-active-model-serializers
[Marshmallow (Python)]: http://marshmallow.readthedocs.org/
[Ride]: http://ride.com/
[Factory Muffin]: https://factory-muffin.thephpleague.com/
[Dredd]: https://github.com/apiaryio/dredd
[Snowcrash]: https://github.com/apiaryio/snowcrash
