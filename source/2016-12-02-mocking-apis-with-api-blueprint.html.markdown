---
title: "Mocking APIs with API Blueprint"
date: 2016-12-02 13:01 UTC
category: api
tags: building-rest-apis-in-rails, http, api, apiblueprint, video, mocking
comments: true
---
The second video in a pile of [LiveCoding.tv](http://livecoding.tv/philsturgeon/) videos shows how to use your API Blueprint documentation to mock APIs, and a few different ways of serving those mocks up to people.

Using a mock server, you can basically see how an API would work, without actually building anything. This is really helpful as early on you can agonise over which tools to use, what names to use, design decisions, and all sorts of other stuff as you "um-and-ahh" about getting this set up.

_**Side-note:** That's what ["Build APIs You Won't Hate: eBook & Paperback"](https://apisyouwonthate.com) is for. To try and reduce the initial flip flopping around on design decisions as you get started._

One popular API specification tool is [API Blueprint](http://apiblueprint.com/), which is built by the folks over at [Apiary.io](https://apiary.io). Apiary will - amongst other things - give you a mock server without you needing to do anything. You simply use their editor to make your documentation, and they'll produce a mock server for you!

<iframe width="560" height="315" src="https://www.youtube.com/embed/Q00H6BPVNQI" frameborder="0" allowfullscreen></iframe>

In the video I forgot how to ngrok, but I covered it in the notes below.

## Interested in a Proper Series?

These rough videos will be replaced with a nicely recorded series, and to get updates about that, just let me know your email address.

<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px; width:100%;}
	/* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//apisyouwonthate.us10.list-manage.com/subscribe/post?u=f5c5ff66d95d11dec1b88cf54&amp;id=bef95bfd48" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">

	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f5c5ff66d95d11dec1b88cf54_bef95bfd48" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->

## Notes

Go to your API in Apiary and click Inspector. At the top it will have a mock server host name:

> http://private-3a141-philsturgeon.apiary-mock.com/

If you navigate to this in your browser, you will see a list of routes defined in your Apiary, so
grab one of those.

~~~ shell
$ http GET http://private-3a141-philsturgeon.apiary-mock.com/products
~~~

Here you will see output, generated from our data structures and example values:

~~~ http
HTTP/1.1 200 OK
Access-Control-Allow-Methods: OPTIONS,GET,HEAD,POST,PUT,DELETE,TRACE,CONNECT
Access-Control-Allow-Origin: *
Access-Control-Max-Age: 10
Connection: keep-alive
Content-Length: 320
Content-Type: application/json
Date: Tue, 30 Aug 2016 18:49:49 GMT
Server: Cowboy
Via: 1.1 vegur
X-Apiary-Ratelimit-Limit: 120
X-Apiary-Ratelimit-Remaining: 119
X-Apiary-Transaction-Id: 57c5d54d0ace330b004cddee

[
    {
        "apv": 7.4,
        "description": "Tastes like apple juice but knocks you on your arse.",
        "id": "djkfh34t234t",
        "image_url": "http://example.com/ciders/old-bris.jpg",
        "name": "Old Bristolian",
        "relationships": {
            "manufacturer": "",
            "recent_reviews": ""
        },
        "type": "cider"
    }
]
~~~

Alternatively, because Apiary is a paid service, you might want to use some free tools. Running
a mock server locally is easy with [drakov](https://www.npmjs.com/package/drakov)!

~~~ shell
$ npm install -g drakov
$ drakov -f apiary.apib
~~~

Again, you can use a HTTP client to test the response:

~~~
$ http GET http://localhost:3000/products --json
~~~

~~~ http
HTTP/1.1 200 OK
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
Access-Control-Allow-Origin: *
Connection: keep-alive
Content-Length: 344
Content-Type: application/json
Date: Tue, 30 Aug 2016 19:03:33 GMT
ETag: W/"158-JzY5bB7n307mn5JL95pPGw"
X-Powered-By: Drakov API Server

[
    {
        "apv": 7.4,
        "description": "Tastes like apple juice but knocks you on your arse.",
        "id": "d66c7429-d8e0-4772-85b4-c18e66564e88",
        "image_url": "http://example.com/ciders/old-bris.jpg",
        "name": "Old Bristolian",
        "relationships": {
            "manufacturer": "",
            "recent_reviews": ""
        },
        "type": "cider"
    }
]
~~~

Then, if you want to share this with other people, one solution is to offer your local copy over [ngrok](https://ngrok.com/). This will
make a local tunnel to the drakov server you have running.

~~~ shell
$ brew cask install ngrok
~~~

Assuming you still have drakov running on port 3000, you can now run this in another session:

~~~
$ ngrok http 3000

ngrok by @inconshreveable                                                            (Ctrl+C to quit)

Tunnel Status                 online
Version                       2.1.3
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://xxxxxx.ngrok.io -> localhost:3000
Forwarding                    https://xxxxxx.ngrok.io -> localhost:3000
~~~

The Web Interface will give you an inspector very much like Apiary, and the forwarding links are a host you can share with others on your team.

# In ANOTHER tab...

~~~ shell
$ http GET http://xxxxxx.ngrok.io/products --json
~~~

Once again you should see the collection. You can now share the `http://xxxxxx.ngrok.io` host name with your coworkers, family and friends, and snoop on the traffic as it comes in, if you should so wish.

If you'd like to have a more permanent solution, consider shoving draokv on a free Heroku instance.

Personally, I quite like having the tunnel turn off in my control, as it stops people relying on this mock for too long. It gives them a chance to give feedback, but stops people relying on it for their test suites permanently.

Fin!
