---
layout: post
title: Misconceptions about ORMs
category: 
permalink: blog/2011/06/misconceptions-about-orms
excerpt: " \"ORMs are overweight, slow, hard to work with, pointless and for people
  who don't know how to use SQL\". These are all arguments we have all heard - and
  in some cases in the past I have even used - but this is a stupid argument made
  by people who either looked at a \"Getting Started\" page and thought \"yuck\" or
  tried a bad clam and decided to avoid seafood for the rest of their life. In this
  article I'll explain why I have converted from a fully anti-ORM developer to somebody
  who strongly recommends you give a [good] ORM a try. \n"
date: '2011-06-15 23:21:00'
comments: 'true'
disqus_identifier: misconceptions-about-orms
---

I was reading an article today [ORM is an anti-pattern](http://seldo.com/weblog/2011/06/15/orm_is_an_antipattern) and it reminded me of some of the opinions I used to have about ORMs. I had used some PHP ORMs before like Doctrine and Propel and found them both to be heavy and a bit long winded for doing what I wanted to do. After that I wrote off ORMs for good and refused to listen to anyone who tried selling me a new one, but this makes about as much sense as turning to men just because you ended up with one fat girl. They aren't all that heavy, and they aren't all that ugly.

After I decided to learn some Ruby on Rails (mainly for poops and giggles) I ended up falling in love with their [ActiveRecord implementation](http://guides.rubyonrails.org/active_record_querying.html) - which is essentially ORM. They had thought out pretty much everything, it seemed to work pretty quickly and saved me a craptonne of time over working with SQL.

This article is not intended to directly dig at our friend Seldo here, but I will be referring to the points in his article to help me dispel some of the misconceptions that he - and plenty of others - have about ORMs as a whole.

### Inadequate abstraction
> The whole point of an abstraction is that it is supposed to simplify. An abstraction of SQL that requires you to understand SQL anyway is doubling the amount you need to learn: first you need to learn what the SQL you're trying to run is, then you have to learn the API to get your ORM to write it for you.

Personally, I couldn't give a damn what SQL is being written as long as the ORM is performant and gives me results. The whole point of abstraction is that you are provided with a simple solution to do something more difficult or time consuming. Whether or not the API is intuitive or not is purely down to whoever developed the API and not down to ORMs on the whole.

### Incorrect abstraction
> If your project really does not need any relational data features, then ORM will work perfectly for you, but then you have a different problem: you're using the wrong datastore. The overhead of a relational datastore is enormous; this is a large part of why NoSQL data stores are so much faster. If your data is relational, however, that overhead is worth it: your database does not merely _store_ your data, it **represents** your data and can answer questions about it on the basis of the relations captured, far more efficiently than you could in procedural code.

Hang about, ORM stands for Object Relational Mapping. The fact that it handles relationships for you is exactly the reason for using an ORM! Maybe Doctrine and Propel handle this badly, but if you use something like FuelPHP's or Rails ActiveRecord then you'll see that adding in some "belongs\_to", "has\_many", "has\_one", etc to your models makes talking to related data a breeze. Let's imagine a normal model in CodeIgniter for example - not pure SQL but close enough to be the same thing:

{% highlight php %} class User\_model { public function get($params) { $this->db ->select('profiles.\*, users.\*, IF(profiles.last\_name = "", profiles.first\_name, CONCAT(profiles.first\_name, " ", profiles.last\_name)) as full\_name', FALSE) ->limit(1) ->join('profiles', 'profiles.user\_id = users.id', 'left'); return $this->db->get('users')->row(); } } {% endhighlight %}

Well that was no fun, but we have a method we can use to grab a single user from the database. Now, if we want to make a query that will get us a list of articles that user has written, or decide to see a list of their friends or work with any other sort of data then we have two options:

1. Modify the SQL query to make one mega-join
2. Make another query

To be honest I don't really want to do either! Option 1 leaves me pulling back way more information than I need everywhere else in my application that method is used and option 2 means writing a really similar method just to join a few extra fields. What a PITA.

Now if we were using Rails we'd just do this:

{% highlight ruby %} User::find(id, :include => :profile) {% endhighlight %}

Then if we felt like including the users articles or friends we'd just do this:

{% highlight ruby %} User::find(id, :include => [:profile, :articles, :friends]) {% endhighlight %}

And brilliantly we can just do user.profile.foo to access nested properties and not have it all jammed into the main user variable as a SQL JOIN would end up doing.

### Death by a thousand queries
> This leads naturally to another problem of ORM: inefficiency. When you fetch an object, which of its properties (columns in the table) do you need? ORM can't know, so it gets all of them (or it requires you to say, breaking the abstraction). Initially this is not a problem, but when you are fetching a thousand records at a time, fetching 30 columns when you only need 3 becomes a pernicious source of inefficiency. Many ORM layers are also notably bad at deducing joins, and will fall back to dozens of individual queries for related objects.

WRONG. Most ORMs will allow you to pass a select in to suggest what fields you want back instead of just assuming you want \*. As for relationships this is done in two ways.

**Lazy-Loading** - When you call $article->comments in PHP for example, the ORM can fire a \_\_get() and see that comments is not set. It'll then realise it has a join and can sy "oh crp, I'd better go find some comments for this article!". That is _amazing_ for Rapid Application Development, but of course is pretty inefficient. That is why any decent ORM will have...

**Eager-Loading** - You can see an example of eager loading in the code-block above. I told the ORM that not only did I want a User record, but I was going to want to load up the Profile, all related Articles and the users Friends too. That will make the ORM run off and build up one whapping massive query that will be cut, sliced, diced and formatted in exactly the way I would expect - an object for user and profile, and articles & friends are an array of objects containing only the relevant data.

> Many ORM layers are also notably bad at deducing joins, and will fall back to dozens of individual queries for related objects. As I mentioned earlier, many ORM layers explicitly state that efficiency is being sacrificed, and some provide a mechanism to tune troublesome queries. The problem, I have discovered with experience, is that there is seldom a single "magic bullet" query that needs to be optimized: the death of database-backed applications is not the efficiency of any one query, but the number of queries. ORM's lack of context-sensitivity means that it cannot consolidate queries, and must fall back on caching and other mechanisms to attempt to compensate.

Well only if the ORM is a piece of junk. I mentioned earlier how lazy loading is great for RAD, well that is me all over. Bash together a prototype for the investors/testers/indecisive client, etc then make something slick and efficient later. I was working on [TravlrApp](http://travlrapp.com/philsturgeon/usa-canada-2011) and noticed that the page was running slowly. Sure its got a lot of data, but I noticed I was missing any eager loading. This meant that the ORM was making about 400 queries on a page... :-/

I popped a few eager load references in and BAM, it made some crazy SQL for me like so:

{% highlight sql %} Trip Load (4.4ms) SELECT "trips".\* FROM "trips" WHERE ("trips".user\_id IN (19,20,21,22,23,24,25,26,28,29,30,31,32,33,34,35,36,37,..........,346,347,348,349,350,351,352,353,354,355,356,357,358,360,361) AND ("trips"."started" = 't' AND "trips"."completed" = 'f')) Trip Load (0.8ms) SELECT "trips".\* FROM "trips" WHERE ("trips".user\_id = 19 AND ("trips"."started" = 't' AND "trips"."completed" = 'f')) LIMIT 1 SQL (0.4ms) SELECT COUNT(\*) FROM "users" INNER JOIN "friendships" ON "users".id = "friendships".user\_id WHERE (("friendships".friend\_id = 19) AND ((accepted\_at IS NULL))) Marker Load (0.8ms) SELECT "markers".\* FROM "markers" WHERE "markers"."id" = 16 LIMIT 1 CACHE (0.0ms) SELECT "users".\* FROM "users" WHERE "users"."id" = 19 LIMIT 1 Rendered home/\_activity.html.erb (40.1ms) Rendered layouts/partials/\_metadata.html.erb (4.7ms) Rendered layouts/partials/\_header.html.erb (7.5ms) User Load (93.6ms) SELECT "users"."id" AS t0\_r0, "users"."email" AS t0\_r1, "users"."encrypted\_password" AS t0\_r2, "users"."password\_salt" AS t0\_r3, "users"."reset\_password\_token" AS t0\_r4, "users"."remember\_token" AS t0\_r5, "users"."remember\_created\_at" AS t0\_r6, "users"."sign\_in\_count" AS t0\_r7, "users"."current\_sign\_in\_at" AS t0\_r8, "users"."last\_sign\_in\_at" AS t0\_r9, "users"."current\_sign\_in\_ip" AS t0\_r10, "users"."last\_sign\_in\_ip" AS t0\_r11, "users"."created\_at" AS t0\_r12, "users"."updated\_at" AS t0\_r13, "users"."username" AS t0\_r14, "users"."first\_name" AS t0\_r15, "users"."last\_name" AS t0\_r16, "users"."website" AS t0\_r17, "users"."bio" AS t0\_r18, "users"."admin" AS t0\_r19, "users"."total\_distance\_traveled" AS t0\_r20, "users"."invitation\_code" AS t0\_r21, "users"."num\_invites" AS t0\_r22, "users"."address\_1" AS t0\_r23, "users"."address\_2" AS t0\_r24, "users"."town" AS t0\_r25, "users"."city" AS t0\_r26, "users"."country\_id" AS t0\_r27, "users"."postcode" AS t0\_r28, "users"."home\_marker\_id" AS t0\_r29, "users"."current\_marker\_id" AS t0\_r30, "users"."last\_seen\_marker\_id" AS t0\_r31, "trips"."id" AS t1\_r0, "trips"."name" AS t1\_r1, "trips"."slug" AS t1\_r2, "trips"."description" AS t1\_r3, "trips"."user\_id" AS t1\_r4, "trips"."created\_at" AS t1\_r5, "trips"."updated\_at" AS t1\_r6, "trips"."start\_date" AS t1\_r7, "trips"."end\_date" AS t1\_r8, "trips"."last\_place\_id" AS t1\_r9, "trips"."distance\_traveled" AS t1\_r10, "trips"."started" AS t1\_r11, "trips"."completed" AS t1\_r12, "trips"."is\_private" AS t1\_r13 FROM "users" LEFT OUTER JOIN "trips" ON "trips"."user\_id" = "users"."id" AND "trips"."started" = 't' AND "trips"."completed" = 'f' WHERE "users"."id" IN (25, 21, 105, 110, 111, 124, 158, 242, 189, 262, 294, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 322, 323, 19, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 208, 296, 211, 210, 232, 234, ............... 288, 281, 282, 283, 287, 284, 290, 285, 280, 291, 89) AND (trips.id > 0) ORDER BY users.username Rendered home/\_dashboard\_sidebar.html.erb (126.6ms) SQL (0.2ms) SELECT COUNT(\*) FROM "users" Rendered layouts/partials/\_footer.html.erb (1.6ms) Rendered home/dashboard.html.erb within layouts/application (266.8ms) Completed 200 OK in 4170ms (Views: 174.4ms | ActiveRecord: 3411.5ms) {% endhighlight %}

As I said before, I don't care how it's all working internally as long as it works well - and this is awesome! This is two pretty speedy queries instead of essentially infinite queries. I could have made it all into one query, but as the article mentions it's not about making one super-dooper query and often two small ones are quicker.

### OK, So like OMGZ?!

Well no. One thing I agree with in this article - and with most ORM naysayers - is that using ORM all the time for everything is obviously ridiculous. ORM is around as a RAD tool to help you get things done quicker. A phrase that I find myself having to say far too often is  "doing more stuff takes longer", which means "yes, ORM does use more memory than native SQL" but that does not make it evil and bad.

If you are using a decent ORM then I see no reason why your application would fall over or perform badly unless you wrote it wrong.

Sure if you are developing a site that is going to have 6 squillion users logging in every second then you are probably going to find ORM being a bottleneck, but at that point I would recommend either using Stored Procedures instead of SQL in your PHP, or maybe even switch to an even more performant database engine.

### So... which would you suggest?

ORMs I consider to be worth a try are mainly ones built specifically for a framework. This removes a lot of the bloat as the framework itself contains a lot of the code that something like Doctrine would end up duplicating.

- [ActiveRecord](http://guides.rubyonrails.org/active_record_querying.html) (Rails)
- [ORM](http://fuelphp.com/docs/packages/orm/crud.html) (FuelPHP - not blowing my own horn, this excellent ORM was made entirely by Jelmer and Dan)
- [DataMapper](http://datamapper.wanwizard.eu/) (CodeIgniter)

### Summary

ORM is development on crack. You'll get things done quicker and as long as you don't pick a fatty you'll have a good time. Use it to make your web applications quickly and if you end up getting that Angel Investor to give you $10 million for "SquareFaceTwitPile" then you can probably afford to hire somebody to spend all day tweaking the last 0.00000002% of performance out of the application for v2.0 while you are sipping Mai Tais on a yacht somewhere.

