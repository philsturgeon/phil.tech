---
layout: post
title: Geocoding API's Compared
category: 
permalink: blog/2011/02/geocoding-apis-compared
excerpt: " \n In this article I explain the pro's and con's of working with three
  of the most popular free geocoding services around: Google Map's API, Yahoo PlaceFinder
  and SimpleGeo. This review goes beyond the \"I want this address on a map marker!\"
  junk most people do and goes on to explain some of the issues faced when using these
  services in slightly \"out of the ordinary\" conditions. "
date: '2011-02-08 22:30:00'
comments: 'true'
disqus_identifier: geocoding-apis-compared
---

Over the last few weeks I have been doing plenty of work with geolocation and reverse geolocation directly in JavaScript, PHP and Ruby using mostly the Google Map's API. For the majority of map work the Google Map API is fine, but once you go past basic plotting of items on the map, comparing distance, etc and start trying to reverse geocode, everything gets a lot more complicated.

There are several options around but most geocoding or reverse geocoding services are a crusty mess with useless data or no/lacking API's. The best services I could find were Google Maps, [Yahoo PlaceFinder](http://developer.yahoo.com/geo/placefinder/) and the relatively new [SimpleGeo](http://simplegeo.com/).

### Geocoding

One of my recent projects involved writing a custom data management module for a multi-site CMS which could automatically Geocode any addresses when new data is inserted or updated. This would be easy if the system was a single-domain site but unlike the Google  Maps JavaScript v3 API, the PHP API requires an API Key which is registered to a specific URL. This may not be an issue for many of you so we can say that basic geocoding with Google works perfectly, but for me this is a massive fail.

Yahoo PlaceFinder supports an Application ID which is registered to an Application on the Yahoo Developer Network and therefore does not care about the URL. The API looked perfect and really simple to use, but a [quick test](http://where.yahooapis.com/geocode?q=1 Abbey Apartments, Keynsham, Bristol, BS31 2JA&appid=[yourappidhere]) proved to be inaccurate, as were the majority of the tests I ran after that. As another example, I enter my family house "46" and it returns the details for "28" down the road and the co-ordiantes show the Google Street View of number 5. Not too helpful eh?

This is a common problem in the UK as our main postal service "Royal Mail" is selfish jerk when it comes to allowing people to use it's postcode data. Google were lucky enough to be able to buy a license but as far as I can tell Yahoo never managed to get one. This means simple requests for a house name and road number often end up several houses out and far from accurate, but for many services "somewhere on the road" may be good enough.

While tweeting my complaints about Google and Yahoo I had several people suggest I use SimpleGeo. I'd used it a little before but was under the impression that it had no actual geocoding service. It does but at the time of writing the "address" parameter in the Context API is only for the USA, so thats no good for the rest of us. SimpleGeo right now is mainly about providing you with data about what is at - or near - a specific set of coordinates.

For this project I ended up using Yahoo PlaceFinder through lack of options and luckily the level of accuracy was just about good enough. Google would have been my choice if their API Key was less restrictive.

### Reverse Geocoding

Another project I have been working on recently is [TravlrApp](http://travlrapp.com/) which uses an awful lot of geocoding and reverse geocoding. If you aren't familiar with the term "reverse geocoding" then it basically means providing human data from a set of [![Google Map JS Objects](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-02-08_at_23.52_.29_.png)](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-02-08_at_23.52_.29_.png)coordinates, so you provide 37.766713, -122.428938 and get 1600 Pennsylvania Ave NW, Washington, DC. Google, Yahoo and SimpleGeo all do this well with varying levels of accuracy but the most important part of reverse geocoding is providing segments of address that your application can understand.

I've been using a City database for TravlrApp to populate auto-complete lists but sadly it the data set seems to be missing some cities. What I wanted to do was let users click the map, have Google tell me the City and Country, have my code check the database and if they don't exist then it should add them to that list. In this day in age I would have thought that would be easy, so I started playing with Google Reverse Geocoding.

Google is very accurate in most countries and is easily the largest data set I have used. Some countries such as Iraq will just tell you that the coordinates are in Iraq, but not many of my TravlrApp customers will be planning holidays there so I am not too fussed. The real problem with using the Google Maps API for reverse geocoding is that the results are returning in a relatively unusable way. For an example of a few of the JS objects returned from the API take a look to the right. This may at first look pretty useful, but the way they return their data is actually about as logical as the average episode of Family Guy... after smoking a whole bowl of meth.

So what is Google doing? Well it will return any number of objects which each have a different level of accuracy. There is no specific number and none of these objects have a specific level, it just gives you as many as it feels like for that specific point on the map. Within each of these objects is an array of "address\_compontents" which look more promising (see below).

   ![Google Address components](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-02-08_at_23.54_.11_.png)  

Well that looks pretty useful right? Wrong. Google will give you up to 7 items back with the first being the most accurate and the last being either a postcode, country or sometimes a state. The first could be a house number, street, village or town and there could be any number of entries in-between. This example is the most clean, but sometimes the first line will have the street address mixed in with a postcode and the country name too, and sometimes the city or region will have part of the post code mixed in too. Other parts are often left out or repeated up to 3 times for no obvious reason.

They provide a type property but this is no more useful as everything from a village to a country could be considered "political". Utterly useless.

![Yahoo XML](https://s3.amazonaws.com/philsturgeon-blog/Screen_shot_2011-02-09_at_00.00_.17_.png)Yahoo does a much better job of this by providing a rigid chunk of XML that you can use to pick exactly what piece of information is what. It is still not hugely accurate but if you are clicking on a map you most likely do not need to know the exact address.

First it will take a guess at the line 1 - 4 of your address but more usefully it will tell you exactly what the Street, City, County, State, Country and Postcode along with a few country codes and other useful information. If it is not sure about any of this information it will just leave it blank so you know exactly where you stand when working with this API. In the most populated countries this seems to do a brilliant job but I can't say I have tested it fully. At least in the UK and US it is spot on almost everywhere I query so I may well be using Yahoo PlaceFinder for all my reverse-geocoding needs, even if the geocoding itself sucks.

Finally onto SimpleGeo. I have avoided this in the past mainly because of the Client support. They only officially maintain Objective-C, Android, Java and Python while the .NET, Ruby and PHP ones are left to the community. The PHP client requires a few PECL extensions and I've previously found the Ruby client to lack support for their Places data, but that is another issue altogether. To be fair I cannot complain too much. I was talking to one of the guys behind SimpleGeo and he said "it's open source, fork it!", which I say to lazy and complacent PyroCMS users on a daily basis. Hell, that's why I bought Ed Finklers " [Pull Request or STFU](http://spaz.spreadshirt.com/pull-request-or-stfu-black-A6928817/)" t-shirt!

Client support aside I am wary of using SimpleGeo for reverse geolocation. When using their [demo](http://simplegeo.com/products/context/#demo), coordinates in the USA seem to give you a plethora of information but hop the pond to the UK, anywhere in Europe or just anywhere not in the States and you'll be lucky to get much more than "Provincial", "Timezone" and "Country" returned.

### Summary

If you are lucky enough to not need to do any multi-domain based work and you do not need Reverse Geocoding then Google will probably do the trick. Google Map API is very accurate, has great data and will not limit you too much as long as you have an API key. That said you can only use Google Geocode data to plot items onto a Google Map. If you do anything else you are violating the terms of use, which is pretty anal if you ask me.

Yahoo provides the easiest access to data as you can geocode both ways with just a file\_get\_contents() in PHP and as far as I can tell - let me know before their lawyers do - they do not have the same restrictions on where you can use their data. Their accuracy is not always brilliant for geocoding but when the service is free and easy to work with you can't really complain too much.

SimpleGeo clearly has massive potential and I am sure it will only get better in time. For now with it's incomplete data sets, limited official client libraries and use of oAuth for the entire API I can see the average developer having a tough time getting too far with it, but I will keep experimenting with SimpleGeo for TravlrApp as in the USA it seems to work very nicely and has great documentation.

As always my comparison reviews have ended up being "use them all". They all have their pro's and con's and do certain jobs well. It's just a shame SimpleGeo does not do it all perfectly - yet.

