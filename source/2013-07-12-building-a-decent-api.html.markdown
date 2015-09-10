---
layout: post
title: Building a Decent API
category: php
alias: blog/2013/07/building-a-decent-api
excerpt: PHP developers are increasingly moving over to API development, as are a
  lot of server-side developers. It's a trend thats been happening for the last few
  years and it's getting to the point where everyone and their dog are putting articles
  showing off how to build "awesome" API's. Unfortunately most of these are either
  woefully inadequate or are promoting bad practices. These are some of the golden
  rules I go by.
date: '2013-07-12 21:25:00'
comments: true
disqus_identifier: building-a-decent-api
---

_**Update:** This initial list of tips is aimed mostly at beginners, but I expanded upon it so much I turned it into [a whole book](http://apisyouwonthate.com). I'm a little less shouty in that, and it is good reading for beginners, intermediates and experienced API developers alike._ 

PHP developers are increasingly moving over to API development, as are a lot of server-side developers. It's a trend that's been happening for the last few years and it's getting to the point where everyone and their dog are putting articles showing off how to build "awesome" API's. Unfortunately most of these are either woefully inadequate or are promoting bad practices.

I'm not going to link to any bad examples because that's just rude, but here are some golden rules that I stick to when building out API's.

### Never Expose DB Results Directly

 1. If you rename a field, then your users are fucked. Convert with a hardcoded array structure.
 1. Most DB drivers [for PHP] will show integers as numeric strings and `false` as `"0"`, so you want to typecast as much of your output array as possible.
 1. Unless you're using an ORM with "hidden" functionality, people will see passwords, salts and all sorts of fancy codes. If you add one and forget to put it in your `$hidden` array then OOPS! Manually declare your output, do NOT just return Users::all();

### Use the URI sparingly, and correctly

1. Use the query string for paired params instead of `/users/id/5/active/true`. _Your API does not need to be SEO optimised._
1. `?format=xml` is stupid, use an `Accept: application/xml` header. I added this to the CodeIgniter Rest-Server once for lazy people, and now people think it's a thing. It's not.
1. Make all of your resources plural. `/user/X` might make sense initially, but when you get a word like "opportunity" it gets weird fast gets. `/opportunities` and `/opportunity/X` is a pain.

### Resources are EVERYTHING

1. You're always either asking for one resource, or multiple. If it's one, just return that data as an array. If you've asked for multiple, then return them in a plural parent element (such as "users").
2. Two resources in different locations should look identical (your iPhone dev will love you for this). This could be `/me/friends` and `/users/5/friends`, or embedded data. 
3. If I want multiple resources in one call, then give them to me. `/users/X,Y,Z` in a `"users"` array works nicely.
4. If you ask for multiple and some results exist, shove that in a "users" array.
5. If you ask for multiple but find none, then a 404 makes sense.

### JSON, XML or shut up

1. Don't spend forever trying to make your system output everything under the sun. Sure you can output [lolcat](http://api.flickr.com/services/feeds/photos_public.gne?id=35034363287@N01&lang=en-us&format=lolcode), but you don't need to.
2. Tell your users to send you JSON or XML in the body. Messing around with `application/x-www-form-urlencoded` and its flat key/value formatting just to get at data with `$_POST['foo']` is silly, especially when any decent framework (like Laravel 4) will allow `Input::json('foo')` anyway.
3. No payload parameters. I've seen APIs accept `application/x-www-form-urlencoded` with a `json={}` parameter. If you think that is a good idea it's time you re-train as a yoga teacher or something, the stress is effecting your judgement.

### Authentication

1. [OAuth 2 is the shit](http://phptownhall.com/blog/2013/07/10/episode-9-is-oauth-2-the-devil/). A few people wrote ranty arguments about how it's insecure, because they weren't using SSL. Or because X company implemented it badly. Don't implement it badly.
2. Unless your API is firewalled off from the outside internets use SSL. 
3. Make sure your OAuth 2 implementation is spec compliant, or you're going to have a bad time. [This one is](https://github.com/php-loep/oauth2-server).

### Caching

1. Your API needs a shorter memory than my favorite fruit is watermelon. No state, no sessions, no IP recognition. Don't guess, let them tell you who they are with their access token.
2. Caching should only happen on popular endpoints where there is no user context, and you know it's not going to change in the timeframe.
3. The `Cache-Control` header let's people know if they can (or should) cache stuff. If other devs ignore those headers then it's their problem.

### Background all the things

1. "When the user sends us an image, resize it, upload it to S3, send an email then show a confirmation". Nope. That should be at least one background job, preferably 3, with an IMMEDIATE response. Ditch off to one "image_processing" job to get things going.
2. Create an "email" job, a "sms" job and a "APN" job for example, so you can generically send out all sorts of contact stuff from your API, your other jobs, etc without infecting your API with all that stuff. I can switch from Twilio to... well I don't know anyone better, but I could do it easy as hell by updating the SMS job.
3. Put your workers on a different server. Your API server is busy enough handling HTTP requests in responses, don't make it think about anything else.

### Pagination

1. Do this. So many people just dump back an "get all this data" response and forget that N gets pretty big over time.
2. Add a `"paging"` element, which has a `"next"` or `"previous"` URL if there are more on either side.
3. Don't make the client do math.
4. OUTPUT TOTALS. I'm looking at you Facebook. Why do I have to poll "next" 20 times to manually count($response['data']) to see how many friends a specific user has when you obviously know the answer already? GAH!

### Response Codes

1. Give me an actual error message, not just a code. "Oh yay, a E40255 just happened" --Nobody.
2. Use 410 instead of 404 if it's been deleted, or blocked, or rejected. "This content has been removed." is more useful than "Um, nope."

### Documentation

1. If you have well written documentation, you get to say RTFM a lot.
2. Versioned API's are easiest to keep up to date, because they don't change (unlike the Facebook API, which might as well be nightly builds from develop).
3. Use a tool. [Swagger-PHP](https://github.com/zircote/swagger-php) + [Swagger-UI](https://github.com/wordnik/swagger-ui) does the trick.

### Testing

1. Write tests ([Behat](http://behat.org/) is great at this), and get Jenkins to automate them. 
2. If tests aren't automated, they might as well not exist.
2. Unit-test your components and models and whatnot. 
3. No need to mock the DB, make a "testing" server and beat it hard, just mock FB/Twitter/"Foo-External API" calls.
4. TEST FOR ERRORS, not just success. Try and trigger every guard statement.
5. If tests aren't automated, they might as well not exist. _Nope, not a copy/paste error._

### Version your API like an adult

1. Sure throwing a `v1/` subfolder into your `app/controllers` or whatever might seem like a real clever way of doing things, but how are you gonna merge v1.0 tweaks with v1.1 and v2.0?
2. If you're going to use v1 then make sure its a different codebase, don't make one app do all versions ever because IT WONT WORK AND STOP TRYING WHY DO YOU KEEP TRYING STOP IT!
2. Nginx comes with a handy [Map module](http://wiki.nginx.org/HttpMapModule), map custom Accept headers to a variable.
3. Those headers can look like this: `application/vnd.com.example-v1.0+json`. Gross? [Whatever](https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&docid=-l1lNUV-Sj-RKM&tbnid=Tkz4Pv-XTuQGAM:&ved=0CAUQjRw&url=http%3A%2F%2Fscans-daily.dreamwidth.org%2F3196144.html&ei=jfOaUbTWB4yq0AHM-oCwBw&bvm=bv.46751780,d.dmg&psig=AFQjCNE52ObL3umOX7eH24qcfc3aQkoH2w&ust=1369195783425767).
3. Use this variable to map to a different directory in your virtual host config, and these each have their own Git branch. Something like: "set $api_path api-v$api_version;" followed by a "root   /var/www/$api_path/public;"
4. Merge changes upwards to as many codebases that share a common history, don't try and copy and paste changes like a dummy.
5. All rules in this section mean 1.0 could be PHP, 2.0 could be Node (you hipster you) and 3.0 could be Scala (I don't even...) and only your minor versions need to worry about merging changes upwards.

This message has been brought to you with the help of Dos Equis, and a little Scotch.

Build your API's better, because now you have no excuse.
