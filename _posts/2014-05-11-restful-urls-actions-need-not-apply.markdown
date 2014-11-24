---
layout: post
title: 'RESTful URLs: Actions Need Not Apply'
category: rest
permalink: blog/2014/05/restful-urls-actions-need-not-apply
excerpt: I was doing a little consulting for a company while I was out in South Africa
  and we played the game. You fire SOAP functionality at me, and I write down RESTful
  endpoints. Once or twice I found myself considering suggesting a dodgy unRESTful
  endpoints, but each time I wrangled my brain a little harder to work out what combinations
  of slashes and squiggles would appease the RESTful Overlords, and avoid them throwing
  lightning bolts down from upon high.
date: '2014-05-11 20:36:00'
comments: 'true'
disqus_identifier: restful-urls-actions-need-not-apply
---

I was doing a little consulting for a company while I was out in South Africa and we played the game. You fire SOAP functionality at me, and I write down RESTful endpoints. This was rapid-fire API design with 20 people in the room. 

It was fun, but a few of them were tricky. Their requirements were far from trivial, being a company that sends millions of emails and text messages a day to people based on various different type of phone number, short-code, or user id. Once or twice I found myself considering suggesting a dodgy unRESTful endpoints, but each time I wrangled my brain a little harder to work out what combinations of slashes and squiggles would appease the RESTful Overlords, and avoid them throwing lightning bolts down from upon high.

## SOAP Style

Traditionally APIs would consist of a series of endpoints which all described verbs (actions):

> POST /SendUserMessage HTTP/1.1  
> Host: example.com  
> Content-Type: application/x-www-form-urlencoded  
>  
> id=5&message=Hello!

As you might have already gathered, this is not how things are done with REST.

## Kinda RESTful

Some API developers consider the following approach to be more RESTful because it uses a "sub-resource":

> POST /users/5/send-message HTTP/1.1  
> Host: example.com  
> Content-Type: application/json  
>  
> { "message" : "Hello!" }

Nope, because that is still using a verb in the URL. A verb is an action - a doing term, and our API only needs one verb - the HTTP Method. All other verbs need to stay out of the URL.

A noun is a "place" or a "thing". Resources are "things", and a URL becomes the "place" on the Internet where a "thing" lives.

## Proper RESTful

This example would be drastically more RESTful:

> POST /users/5/messages HTTP/1.1  
> Host: example.com  
> Content-Type: application/json  
>  
> { "message" : "Hello!" }


Perfect! We are creating a new message, which belongs to a user. The best part about keeping it nice and RESTful like this, is that other HTTP actions can be made to the identical URL:

* `GET /users/philsturgeon/messages`
* `PATCH /users/philsturgeon/messages/xdWRwerG`
* `DELETE /users/philsturgeon/messages/xdWRwerG`

This is all much easier to document and much easier to understand for both humans and software which is "RESTfully aware."

So for this client, they had to send potentially hundreds of thousands of messages on a regular basis. The solution we went with was to make `/messages` its own endpoint and send the messages in batches of a few hundred:

> POST /messages HTTP/1.1
> Host: example.com
> Content-Type: application/json
> 
> {
> 	[{
> 		"user" : { "id" : 10 },
> 		"message" : "Hello!"
> 	},  
> 	{
> 		"user" : { "username" : "philsturgeon" },
> 		"message" : "Hello!"
> 	}]
> }


This would look incredibly similar to create the data as it would to retrieve the data, which is intentional. Regardless of the HTTP verb and regardless of the specific URL, a spade should always look like a spade, and a bag of spanners should always look like a bag of spanners. Things should be a specific pattern and it should not require guesswork to figure out how things look for GET or POST... unless you're Facebook and then it's just one big gameshow with no prizes.

_After the session with that company I made a note to write this up in my API book and blog about it too. It took me a while to get around to it, and in the meantime somebody else wrote a blog on the same subject which I cannot remember or find. Gimme the link if you know it, I don't want anyone getting in a flap saying I stole this._