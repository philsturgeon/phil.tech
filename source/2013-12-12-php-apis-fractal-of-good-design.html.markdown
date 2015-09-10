---
layout: post
title: 'PHP API''s: Fractal of GOOD Design'
category: php
tags: api, apisyouwonthate, php, fractal
alias: blog/2013/12/php-apis-fractal-of-good-design/
excerpt: Recently I started a new blog series called "Build API's That You Wont Hate".
  It was meant to be a fleshed out series based off of my experiences over the last
  several years building nontrivial RESTful API's for all sorts of clients. I didn't
  fully plan the series and just kinda got going with it, and after thinking about
  things a little more I realised that it was going to be a huge commitment. I figured
  I should turn it into an ebook, and it's coming along pretty well. 
date: '2013-12-12 01:20:00'
comments: true
disqus_identifier: php-apis-fractal-of-good-design
---

Recently I started a new blog series called "Build API's That You Wont Hate", starting off with [Part 1 - Useful Database Seeding](/blog/2013/11/build-apis-part-1-useful-database-seeding). It was meant to be a fleshed out series based off of my experiences over the last several years building nontrivial RESTful API's for all sorts of clients. The first was not super API related, as database seeding is something that is useful for any application, but it was certainly a requirement for the rest of the series. I didn't fully plan the series and just kinda got going with it, and after thinking about things a little more I realised that it was going to be a huge commitment. I wanted it to be about twelve parts, and to do an article like that justice takes upwards of 6 hours. That's an hour a night every night for months, and my girlfriend would not be impressed with me doing that all for free.

I figured I should turn it into an ebook. I wrote an ebook a little while ago called [Catapult into PyroCMS](https://leanpub.com/catapultintopyrocms) which was a fun experience, but definitely felt like the most niche of all niche possible markets. Finding people who like [PyroCMS](http://pyrocms.com/) enough to buy a book, but not enough to know how it works? Well, it didn't get onto the New York Times best sellers list, but it did ok, and it definitely didn't put me off going again.

Instead of going with Efendi again I decided to go with LeanPub (for various reasons, and it looks like Efendi is moving content over to LeanPub anyway). The process was incredibly simple, and after taking out some swears, converting the first blog into a chapter and getting [Dayle Rees](https://twitter.com/daylerees) to make me a book cover I was well on my way to getting an early copy out. 

Since then I have been working on one chapter a week, covering various bits of theory and today getting Chapter 6 done, outputting formatted data, using "Transformers".

This most recent chapter was a big deal for me as it covers the basics of the new package I have been working on at the day job (where I build a nontrivial API) called [Fractal](https://github.com/php-loep/fractal). The aim of Fractal is to be the solution to pretty much every issue I have had building API's in regards to data output.

So far (at 0.4.4) its abilities are:

* Allow an area for you to type-cast your data, so not all of your booleans look like "0"
* Avoid db schema changes changing your output
* Allow for simple, flexible and controllable embedding of data, avoiding infinite loops

Next on the list is:

* Implement HATEOAS/HAL links

Those links are the final piece in the puzzle but I have a few ideas. 

Fractal 0.1.0 is currently in production and its got a little bit quicker and cleaner since then. The main idea is that your data needs to be "transformed" somehow from whatever it is in the database, to standardised JSON output (or whatever format) and the place to do that does not fit in the responsibilities of our usual MVC components. 

Chapter 6 shows off how you can make basic transformers for items which can be arrays, stdClass, ORM models, etc, and or collections which again can be arrays, ArrayItterator of models, arrays of stdClass objects, etc. They are all parsed with a singular instance of the data, so collections are iterated through for transformation. 

~~~php
<?php namespace App\Transformer;

use Place;
use League\Fractal\TransformerAbstract;

class PlaceTransformer extends TransformerAbstract
{
    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Place $place)
    {
        return [
            'id'           => (int) $place->id,
            'name'         => $place->name,
            'lat'          => (float) $place->lat,
            'lon'          => (float) $place->lon,
            'address1'     => $place->address1,
            'address2'     => $place->address2,
            'city'         => $place->city,
            'state'        => $place->state,
            'zip'          => (float) $place->zip,
            'website'      => $place->website,
            'phone'        => $place->phone,
        ];
    }
}
~~~

Then in the controller you can do something really simple like this:

~~~php
<?php
use App\Transformer\PlaceTransformer;

class PlaceController extends ApiController
{
    public function index()
    {
        $places = Place::take(10)->get();
        return $this->respondWithCollection($places, new PlaceTransformer);
    }

    public function show($id)
    {
        $place = Place::find($id);
        
        if (! $place) {
        	return $this->errorNotFound('Did you just invent an ID and try loading a place? Muppet.');
		}
		
        return $this->respondWithItem($place, new PlaceTransformer);
    }
}
~~~

That is drastically simplified and of course you have no idea what `respondWithItem()` does, but you can get that from the README, or… you know… buying the book. ;)

Where this gets fun is when you add "embeds" to your transformer.

~~~php
<?php namespace App\Transformer;

use Place;
use League\Fractal\TransformerAbstract;

class PlaceTransformer extends TransformerAbstract
{
    protected $availableEmbeds = [
        'checkins'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @return array
     */
    public function transform(Place $place)
    {
        return [
            'id'           => (int) $place->id,
            'name'         => $place->name,
            'lat'          => (float) $place->lat,
            'lon'          => (float) $place->lon,
            'address1'     => $place->address1,
            'address2'     => $place->address2,
            'city'         => $place->city,
            'state'        => $place->state,
            'zip'          => (float) $place->zip,
            'website'      => $place->website,
            'phone'        => $place->phone,
        ];
    }

    /**
     * Embed Checkins
     *
     * @return League\Fractal\Resource\Collection
     */
    public function embedCheckins(Place $place)
    {
        $checkins = $place->checkins;

        return $this->collectionResource($checkins, new CheckinTransformer);
    }
}
~~~

This will allow you to send a query string parameter to Fractal, and enable URLs like "/users?include=checkins,friends". This can be nested to an unlimited level, and they can be collections or items. Or paginated items, but that is complicated as fuck and will have to be covered in the book.

So I guess this article is saying two things.

1. Check out [Fractal](https://fractal.thephpleague.com/). It's early, but has a lot of potential. 
1. Buy my [ebook](http://apisyouwonthate.com/). It's going to get considerably better over time, but it's already got a lot of useful content.

Get on Twitter with any feedback about the book or Fractal. @philsturgeon
