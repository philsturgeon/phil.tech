---
title: A Response to REST is the new SOAP
date: 2017-12-18 14:32 EDT
tags: api, rest, rpc, soap, http2
category: api
comments: true
excerpt: This article outlines a list of common misunderstandings about REST, so I thought it would be a nice opportunity to set the record straight on a bunch of them. The article is really just 100% misunderstandings, so lets learn some stuff!
---

Enough people have asked me about the article _[REST is the new SOAP](https://medium.com/@pakaldebonchamp/rest-is-the-new-soap-97ff6c09896d)_ that I felt it justifies a write up. Before I get started, I want to be clear that I hold no grudge against the author, and if any frustration leaks out in my writing I'd like to apologize in advance.

The entire article is full of common misunderstandings about REST and HTTP. Despite dedicating my career to trying to educate people through these confusions, they continue to be rife. Clearly I am not being loud enough, writing effectively enough, or doing a good enough job. That is the frustration you might hear in my writing, but nothing is aimed at the author.

Let's get going.

> Now we were able to robustly connect to any such API, with just a few lines of code.

That's a fairly different goal from what REST sets out to achieve: stability of API and clients, and longevity lasting decades. Triggering an action on a different server is not the main goal.

> RPC was dead, the future was RESTful: resources living each on its own URL, and manipulated exclusively through HTTP protocol.

This should not have been true, RPC is still valid and I use it regularly for servers that have no reason to be REST, like action-based microservices, or anything similar to the [Slack Web API](https://api.slack.com/web) (which is proudly and quite rightly RPC).

Bandwagon jumping is a problem, and we see this with new technologies, all the time. I wrote [A Tale of Tom, Dick and Harry](https://philsturgeon.uk/2014/05/07/the-tale-of-tom-dick-and-harry/), where the three characters advocate tech, and some of them do it recklessly. A lot of REST advocates in the past have played the role of Dick in that story, but remember to separate issues with REST itself, from those with the people pushing it willy nilly onto everything.

> From then on, every API we had to expose or consume became a new challenge; not to say a testimony to insanity.

New things can seem complex, taking time to learn. That does not make them a poor idea.

> No more standards, no more precise specifications. Just a vague “RESTful philosophy”, prone to endless metaphysical debates, and as many ugly workarounds.

You could follow the [JSON-API](http://jsonapi.org/) standard, or the [OData](http://www.odata.org/) standard. They're REST after all.

When the author writes RPC, they said they follow XML-RPC or JSON-RPC, so why ignore the standards out there for REST, then blame REST?

> How do you map the precise functions above, to a handful of CRUD operations?

I wrote a [article for Smashing Magazine](https://www.smashingmagazine.com/2016/09/understanding-rest-and-rpc-for-http-apis/) explaining this which seems relevant.

> Is sending the activation reminder email an update on a “must_send_activation_reminder_email” attribute? Or the creation of a “activation_reminder_email resource”?

A simple `POST /activation_reminders` would certainly suffice. "email" is an implementation detail that might change over time, as the user might have requested you send push notifications, text messages, etc, and that setting lives on the server. RPC-minded people focus too heavily on the action their client is trying to achieve, not on the domain model they're trying to effect.

> Is it sensible to use DELETE for cancelSubscription() if the subscription remains alive during a grace period, and may be resurrected during that time?

Deleting means removing the record, so if you delete it it is gone. Change the status of the subscription with `PATCH /subscriptions/123` and `{ "status": "cancelled" }`, and this seems a little less confusing.

Alternatively if capturing more information is required, `POST /subscription/123/cancellations` and consider creating a `SubscriptionCancel` representation to avoid the confusion of having an RPCish endpoint with arbitrary fields floating around requiring documentation.

> How do you split the data tree of getAccountDetails() between endpoints, to respect the data model of REST?

This question is vague so I'm not sure what it means, but you can create new resources that reference the 'account_id' in interest and have that endpoint figure it out. That what the server is for. 👍🏼

> What URL endpoint do you assign to each of your “resources”? Yeah it’s easy, but it has to be done anyway.

Whatever the resource is called is the name of the URL.

- Chocolate -> /chocolates
- Payment Attempts -> /payment_attempts

> How do you express the diversity of error conditions, using the very limited bunch of HTTP codes?

Now you are confusing HTTP and REST, which is common but not correct. HTTP is a transportation layer, and as such you are expected to use the HTTP status codes to portray the category of error as far as HTTP is concerned, then application specific issues become a job for your application. I wrote an [article about this](https://philsturgeon.uk/http/2015/09/23/http-status-codes-are-not-enough/) too.

tl;dr: is that HTTP error codes are like an exception. Just like getting a 400 is not enough, neither is getting an `ArgumentError` or any other exception name. You then need to get code if you're a computer, or get message if you're a human, and use that metadata to establish the specifics.

> What serialization formats, which specific dialects do you use for input and output payloads?

Most folks use JSON but yeah you can use literally whatever you like. Choice is not a failure.

Want to use [Protobuff](https://developers.google.com/protocol-buffers/)? [BSON](http://bsonspec.org/)? Sendgrid offered `lolcat` for a while. Doesn't matter.

> How exactly do you scatter these simple signatures between HTTP method, URL, query string, payload, headers, and status code?

Query strings are for querying items, payload is for data you're sending, status code is a category of the response (success or fail)

> And you’re gone for hours, reinventing the wheel. Not even a tailored, smart wheel. A broken and fragile wheel, requiring tons of documentation to be understood, and violating specifications without even knowing it.

Ok this is frustrating. REST APIs are often mocked because the proponents explain that you should not need documentation. A REST API absolutely should not need documentation, but I have spent the last few months working on generating documentation for our APIs, because  they are all RPC APIs.

When an API [represents its own state](https://blog.apisyouwonthate.com/representing-state-in-rest-and-graphql-9194b291d127), uses [hypermedia to declare its affordances](http://www.ustream.tv/recorded/102891495?utm_content=buffer4016f&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer), and [provides a contract](https://blog.apisyouwonthate.com/guessing-api-contracts-ac1b7eaebced), you can _chose_ to generate human readable documentation, but that's only going there for people treating the REST API like a RPC API...

A REST API quite definitively requires less documentation, unless you've just built an unspecified RPC which is pretending to be REST, like so many people do.

> Yet minutes later they will rejoice that HTTP verbs have well defined semantics to create (POST), retrieve (GET), update (PUT/PATCH) and delete (DELETE) resources.

> If the point is to be minimalist, at least let it be done right. Do you know why PUT, PATCH, and DELETE have never been implemented in web browser forms? Because they are useless and harmful. We can just use GET for read and POST for write. Or POST exclusively, when HTTP-level caching is unwanted. Other verbs will at best get in your way, at worst ruin your day.

This is an assertion without much merit in my opinion. GET is absolutely dangerous if you use it for the inappropriate thing.

![](article_images/2017-12-18-rest-confusion-explained/get-aint-secure.png)


> You want to use PUT to update your resource? OK, but some Holy Specifications state that the data input has to be a “complete resource”, i.e follow the same schema as the corresponding GET output. So what do you do with the numerous read-only parameters returned by GET (creation time, last update time, server-generated token…)? You omit them and violate the PUT principles?

This sounds like a frustration born from not understanding the purpose of PUT. It is designed to avoid conflicts as you mention, and as I explain in my article [PUT vs PATCH vs JSON-PATCH](https://philsturgeon.uk/api/2016/05/03/put-vs-patch-vs-json-patch/), here is a scenario where using PUT will lead to reverting data.

**1.) Initial state**

~~~
GET /foos/123

{
  "field1": false,
  "field2": false
}
~~~

**2.) Request A updates `field1` to be true**

~~~
PUT /foos/123

{
  "field1": true,
  "field2": false
}
~~~

**3.) Request B updates field2 to be true**

~~~
PUT /foos/123

{
  "field1": false,
  "field2": true
}
~~~

If both fields start `false`, and each request only intends to update one field, little do they know they are clobbering the results and essentially reverting them each time. Instead of ending up with both values being true, you'll simply have whatever the last request was, which is going to be "field1": false and "field2": true.

PUT is great for things like [file uploads](https://philsturgeon.uk/api/2016/01/04/http-rest-api-file-uploads/) for a users avatar for example, you can reattempt multiple times (on timeout or failure), and you'll not have to worry about having two images (like you would if you had `POST uploadImage(userId)`).

So, if you want idempotent actions, then yes you want PUT, and you absolutely need to provide the entire body. If you want to update just a bit, use PATCH.

> You want to use PATCH to update your resource? Nice, but like 99% of people using this verb, you’ll just send a subset of resource fields in your request payload, hoping that the server properly understands the operation intended (and all its possible side effects); lots of resource parameters are deeply linked or mutually exclusive(ex. it’s either credit card OR paypal token, in a user’s billing info), but RESTful design hides this important information too. Anyway, you’d violate specs once more: PATCH is not supposed to send a bunch of fields to be overridden. Instead, you’re supposed to provide a “set of instructions” to be applied on the resources.

This is another conflation unfortunately, also explained in the [PUT vs PATCH vs JSON-PATCH](https://blog.apisyouwonthate.com/put-vs-patch-vs-json-patch-208b3bfda7ac) article.

Yes, there is a standard called [RFC 6902: JSON-PATCH](https://tools.ietf.org/html/rfc6902), but this has nothing to do with REST, nothing to do with HTTP, and is merely an optional standard you can chose to use. It is 100% overkill if all you are trying to do is update a simple resource, but it can do amazingly useful things, like atomic increment/decrement, which you'd need to create a whole new resource for otherwise.

From your description, you want to just use PATCH and send just the fields you want. That's fine, I do that, it works, it's valid, REST is happy, and if you want to be certain of that there is a standard called [JSON Merge Patch](https://tools.ietf.org/html/rfc7386), which simplifies things for the authors exact use case.

> You want to DELETE resources? OK, but I hope you don’t need to provide substantial context data; like a PDF scan of the termination request from the user. DELETE prohibits having a payload. A constraint that REST architects often dismiss, since most webservers don’t enforce this rule on the requests they receive.

This is absolutely completely false. Neither [RFC 7231: Hypertext Transfer Protocol: Semantics and Content](https://tools.ietf.org/html/rfc7231), nor [now-obsolete RFC 2616](https://tools.ietf.org/html/rfc2616) ever said this, or even hinted at it.

RFC 7231 did add a warning that some HTTP servers and implementations will reject this, but that is a polite heads up from the HTTP crowd about something various server projects have got wrong over the years, not a failure of REST in any way...

~~~
4.3.5.  DELETE

   A payload within a DELETE request message has no defined semantics;
   sending a payload body on a DELETE request might cause some existing
   implementations to reject the request.
~~~

Read the whole thing [here](https://tools.ietf.org/html/rfc7231#section-4.3.5).

> REST aficionados easily profess that “people are doing it wrong” and their APIs are “actually not RESTful”. For exemple, lots of developers use PUT to create a resource directly on its final URL (/myresourcebase/myresourceid), whereas the “good way” of doing it is to POST on a parent URL (/myresourcebase), and let the server indicate, with an HTTP “Location” header, the new resource’s URL

I'm sorry anyone ever corrected the author on this, as create is perfectly RESTful. Either approach here is perfectly valid, and creating with a PUT is totally fine if you know the URL. The author got some bad advice here.

> Using “HTTP 404 Not Found” to notify about an unexisting resource sounds RESTful as heck, doesn’t it? Too bad: your nginx was misconfigured for 1 hour, so your API consumers got only 404 errors and purged hundreds of accounts, thinking they were deleted….

I've definitely been bit by Fastly caching 404s when I wasn't expecting it. 404's were being cached 60s, which seemed weird when we tried getting an item which was not created "yet" and appeared uncreated for a while. This is actually a feature. A point we'll get to more later is: If you're operating at high traffic, you want to be using HTTP caching. Some important data request on the homepage of a website getting thousands of hits a section should be cached, and if that item is suddenly removed then your server would absolutely crap itself searching for all those items.

The item not being created yet honestly should have been a 201, alerting the client it might take a while, and lets it know to retry later. We then lowered the 404 cache timeout to 15s, meaning the client after 15s saw the resource. Problem solved.

It's a sane default for a HTTP cache, but not everyone is expecting it all the time when it comes to an API.

> Using “HTTP 401 Unauthorized” when a user doesn’t have access credentials to a third-party service sounds acceptable, doesn’t it? However, if an ajax call in your Safari browser gets this error code, it might startle your end customer with a very unexpected password prompt [it did, years ago, YMMV].

Old browsers did funny things, and they don't now... ¯\\_(ツ)\_/¯

> Some standard HTTP error codes are specific to Webdav, others to Microsoft, and the few remaining have definitions so fuzzy that they are of no help. In the end, like most REST users, you’ll probably use random HTTP codes, like “HTTP 418 I’m a teapot” or unassigned numbers, to express your application-specific exceptions. Or you’ll shamelessly return “HTTP 400 Bad Request” for all functional errors, and then invent your own clunky error format, with booleans, integer codes, slugs, and translated messages stuffed into an arbitrary payload. Or you’ll give up altogether on proper error handling; you’ll just return a plain message, in natural language, and hope that the caller will be a human able to analyze the problem, and take action. Good luck interacting with such APIs from an autonomous program.

I sense the frustration here, clearly some terrible things have happened. Nobody actually uses 418, that's a joke so lets move on.

The "shamelessly return “HTTP 400 Bad Request” for all functional errors" specific bit... well define "functional error"? There is absolutely a weird religious battle that wages over 400 for 422 for validation style things, with 422 being a WebDAV error and 400 being meant to syntax errors (thing missing quotes in JSON or unclosed pair in XML). Honestly it's pretty standard to just use 400 for any validation errors, and theres plenty of valid 4xx codes for many situations.

It seems a little funny the author keeps complaining about lack of standards, and complaining about having to do things that standards do for you. No HTTP API developer needs to create their own error format, they just need to use the standards that exist.

- [RFC 7807: Problem Details for HTTP APIs](https://tools.ietf.org/html/rfc7807)
- [JSON-API Errors](http://jsonapi.org/format/#errors)

This is one of the first things I recommend to folks when consulting, as it avoids the natural language processing pains this author has clearly suffered.

> REST has made a career out of boasting about concepts that any service architect in his right mind already respects, or about principles that it doesn’t even follow. Here are some excerpts, grabbed from top-ranked webpages.

> _REST is a client-server architecture. The client and the server both have a different set of concerns._ What a scoop in the software world.

This is a bit of a misquote of [Roy Fieldings REST dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm):

~~~
5.1.2 Client-Server

The first constraints added to our hybrid style are those of the client-server architectural style (Figure 5-2), described in Section 3.4.1. Separation of concerns is the principle behind the client-server constraints. By separating the user interface concerns from the data storage concerns, we improve the portability of the user interface across multiple platforms and improve scalability by simplifying the server components. Perhaps most significant to the Web, however, is that the separation allows the components to evolve independently, thus supporting the Internet-scale requirement of multiple organizational domains.
~~~

Nobody said this was a brand new, idea, but it's absolutely something that needed to be said as at the time RPC folks often did not consider this to be something worth worrying about. I'd rather be pleased that a good idea I was aware of was incorporated into REST, than complain about that good idea not be new to _me_.

> REST provides a uniform interface between components. Well, like any other protocol does, when it’s enforced as the franca lingua of a whole ecosystem of services.

Another misquote of Roy Fielding, who originally wrote:

~~~
5.1.5 Uniform Interface

The central feature that distinguishes the REST architectural style from other network-based styles is its emphasis on a uniform interface between components (Figure 5-6). By applying the software engineering principle of generality to the component interface, the overall system architecture is simplified and the visibility of interactions is improved. Implementations are decoupled from the services they provide, which encourages independent evolvability. The trade-off, though, is that a uniform interface degrades efficiency, since information is transferred in a standardized form rather than one which is specific to an application's needs. The REST interface is designed to be efficient for large-grain hypermedia data transfer, optimizing for the common case of the Web, but resulting in an interface that is not optimal for other forms of architectural interaction.

In order to obtain a uniform interface, multiple architectural constraints are needed to guide the behavior of components. REST is defined by four interface constraints: identification of resources; manipulation of resources through representations; self-descriptive messages; and, hypermedia as the engine of application state. These constraints will be discussed in Section 5.2.
~~~

The "Uniform Interface" criteria means not inventing your own conventions inside the protocols being used like RPC and GraphQL do for example.

HTTP verbs, headers, all the things the author scoffed at, are the uniform interfaced being used appropriately. When REST is implemented inside HTTP, all HTTP tools can be used, and network caching, debugging, monitoring for errors, etc can be used perfectly.

For example, tools like Runscope Traffic or NewRelic will not know that an error happened if you rely on `{ success: false }` or some other home-made convention.


> Rest is awesome, because it is STATELESS. Yes there is probably a huge database behind the webservice, but it doesn’t remember the state of the client. Or, well, yes, actually it remember its authentication session, its access permissions… but it’s stateless, nonetheless. Or more precisely, just as stateless as any HTTP-based protocol, like simple RPC mentioned previously.

Oh dear, are you maintaining sessions internally despite using a RESTish interface? I've had to hit login and logout on various sides of making requests, and the server was fairly unstable under load. Failure to log out would then cause more issues as the servers sessions were all taken. Other servers will maintain the session for _that server_, which obviously falls apart as soon as a load balancer is in place.

This is a mess, and if each request was simply accepting some sort of token and validating on each request it would not matter which server is hit, and no logouts are ever necessary.

> With REST, you can leverage the power of HTTP CACHING! Well here is at last one concluding point: a GET request and its cache-control headers are indeed friendly with web caches. That being said, aren’t local caches (Memcached etc.) enough for 99% of web services? Out-of-control caches are dangerous beasts; how many people want to expose their APIs in clear text, so that a Varnish or a Proxy on the road may keep delivering outdated content, long after a resource has been updated or deleted? Maybe even delivering it “forever”, if a configuration mistake once occurred? A system must be secure by default. I perfectly admit that some heavily loaded systems want to benefit from HTTP caching, but it costs much less to expose a few GET endpoints for heavy read-only interactions, than to switch all operations to REST and its dubious error handling.

You can leverage the power of HTTP caching with any HTTP API, but something REST recommends is that resources are meant to explicitly define their cacheability:

> REST enables intermediate processing by constraining messages to be self-descriptive: interaction is stateless between requests, standard methods and media types are used to indicate semantics and exchange information, and responses explicitly indicate cacheability. - Roy Fielding

Specifically, I want to focus on this:

> That being said, aren’t local caches (Memcached etc.) enough for 99% of web services?

Memcache caching data and utilizing HTTP caching only appear somewhat equivalent if you are _caching based on time alone_.

If we're only discussing based on time alone (5 seconds, 10 minutes, 24 hours, etc), then yeah the two appear similar, but there's one rather key difference: who is defining that time?

If Service A is being called by Client X, locally caching the response on Client X with memcache/redis/etc will work perfectly fine, but Client X is responsible for deciding how long that cache should last. Maybe there was some communication between times at the time of implementation, where "3 hours" was decided, and Client X uses 3 hours.

Well... what if Service A realizes that 2 hours would be more appropriate due to improving their data processing and making data update more quickly? Or what 6 hours to improve performance? If those teams are still in close communication, they can try to get that changed, and so long as the email doesnt get lost or the ticket doesn't vanish into a JIRA backlog, those teams will eventually get their caching back on point.

If there is also Client Y and Cient Z showing this data, they're going to have disparate data for the entire duration of the development cycle required to get them all updated.

This is much much more complex if Client X, Y and Z all work at different companies, speak different languages, or for any one of hundreds of other reasons.

HTTP Caching via `Cache-Control` or `Expires` centralizes the expiry time on the server, meaning clients all over the world will respect the decisions made by the server so long as they're coded to follow the HTTP response, instead of hardcoding stuff. Lots of middlewares support this, like the Ruby gem [Faraday](https://github.com/lostisland/faraday/) middleware [Faraday HTTP Client](https://github.com/plataformatec/faraday-http-cache).

It of course still uses memcache/redis/etc to cache the response, it just handles the "how long" for you. I've explained all of this in an article on [HTTP response caching](https://blog.apisyouwonthate.com/speeding-up-apis-apps-smart-toasters-with-http-response-caching-a67becf829c6).

Even just this difference makes HTTP caching seem more valuable, but wait, there's more!

The author unfortunately entirely ignores the concept of [HTTP conditional caching](https://robots.thoughtbot.com/introduction-to-conditional-http-caching-with-rails), which is fantastic.

For example, if I implement traditional expiry based caching alone, I have this thing for X hours; let's say 8. In that time, things could have changed, and if I want to know about changes I need to subscribe to AMQP messages or some real-time API to provide invalidations. This might be possible to make, but its a whole lot of extra architecture to solve a problem that the HTTP specification has solved for you.

With conditional caching I can make a lower expiry, say 1 hour. It'll pass along the ETag and essentially ask the server: "Only generate a bunch of JSON and shove it over the pipe **if** it is different from what I already have". If it's the same, the server gives you a nice little 304, the server doesn't have to do as much work, no waiting for a lump of JSON, no parsing it locally, and you can be happy knowing you're still not serving the right data.

If the data has changed, you'll get the up to date data, and everyone is happy.

On many systems I've seen, the response time for a 304 is half that of the 200, depending obviously on how overloaded your responses are.

As a third benefit, HTTP Caching allows systems to say "I don't care about your cache, in this instance I 100% want the freshest thing and performance be damned", which is not something you can do without building non-standard ways of doing it. That's that Uniform Interface thing again.

> Thanks to all this, REST has HIGH PERFORMANCE! Are we sure of that? Any API designer knows it: locally, we want fine-grained APIs, to be able to do whatever we want; and remotely, we want coarse-grained APIs, to limit the impact of network round-trips. Here is again a domain in which REST fails miserably. The split of data between “resources”, each instance on its own endpoint, naturally leads to the N+1 Query problem. To get a user’s full data (account, subscriptions, billing information…), you have to issue as many HTTP requests; and you can’t parallelize them, since you don’t know in advance the unique IDs of related resources. This, plus the inability to fetch only part of resource objects, naturally creates nasty bottlenecks.

Well, the author here completely ignores sparse fieldsets (specifying the fields to return) and compound documents (including related items in the response), which absolutely solve the problem the author is describing. It's weird the author never noticed these techniques, as they've been popularized for years in REST APIs, and are now a fundamental part of GraphQL.

Despite this problem being solved, many REST advocates are advocating for a slightly more more modern approach of creating [smaller more targeted resources, and utilizing HTTP/2](https://blog.apisyouwonthate.com/lets-stop-building-apis-around-a-network-hack-9a68f7e83dd2). This reduces the importance of the HTTP network bottleneck, and of course [Early Hints](https://tools.ietf.org/html/draft-ietf-httpbis-early-hints-05) and [Server Push](https://http2.github.io/faq/#whats-the-benefit-of-server-push) can start pushing requested responses into the pipe removing the "missing IDs" issue the author describes.

Basically this paragraph is wrong on two counts.

1. The described problem has already been sufficiently solved in various popular standards
2. The described problem is also solved even more efficiently in HTTP/2

> REST offers better compatibility. How so? Why do so many REST webservices have “/v2/” or “/v3/” in their base URLs then? Backwards and forward compatible APIs are not hard to achieve, with high level languages, as long as simple rules are followed when adding/deprecating parameters. As far as I know, REST doesn’t bring anything new on the subject.

Global versioning and the like are the result of RPC-minded folks (like the author) designing APIs and ignoring the concept of [API Evolution](https://blog.apisyouwonthate.com/api-versioning-has-no-right-way-f3c75457c0b7).

Using JSON Schema etc can make this a lot easier. Something the RPC author may have picked up from the SOAP days using WSDL, very similar concepts.

> REST is so easy, it can be queried from any shell, with CURL! OK, actually, every HTTP-based protocol can be queried with CURL. Even SOAP. Issuing a GET is particularly straightforward, for sure, but good luck writing json or xml POST payloads by hand; people usually use fixture files, or, much more handy, full-fledged API clients instantiated directly in the command line interface of their favorite language.

Agree, writing JSON or XML on the command line sounds terrible, which is why everyone uses Postman or similar. I've not seen anyone advocating using CURL for RESTful interactions since 2010 somewhere, and I pointed out how weird that was then.

> “The client does not need any prior knowledge of the service in order to use it”. This is by far my favourite quote. I’ve found it numerous times, under different forms, especially when the buzzword HATEOAS lurked around; sometimes with some careful (but insufficient) “except” phrases following.

Well, once a developer understands HTTP and REST, you can understand any RESTful API that actually follows those constraints. Again, they're not saying "Any REST API will immediately make sense to literally anyone that just got into web development" or anything else daft, they're saying that REST APIs describe themselves. Again, [Representing State in REST and GraphQL](https://blog.apisyouwonthate.com/representing-state-in-rest-and-graphql-9194b291d127) explains this (and HATEOAS).


> Still, I don’t know in which fantasy world these people live, but in this one, a client program is not a colony of ants; it doesn’t browse remote APIs randomly, and then decide how to best handle them, based on pattern recognition or black magic. Quite the opposite; the client has strong expectations on what it means, to PUT this one field to this one URL with this one value, and the server had better respect the semantic which was agreed upon during integration, else all hell might break loose.

Nobody is talking about magic. Please listen to [this podcast](http://apibusters.com/). for a full response to this confusion, as its a common one.

> Each web framework has its own way of defining URL endpoint. So expect some big dependencies, or a good layer of handwritten boilerplate, to plug your existing API onto your favorite server as a set of REST endpoint.
>
> Libraries like Django-Rest-Framework automate the creation of REST APIs, by acting as data-centric wrappers above SQL/noSQL schemas. If you just want to make “CRUD over HTTP”, you could be fine with them. But if you want to expose real APIs, with workflows, constraints and such, you’ll have a hard time bending any REST framework to fit your needs.
>
> Be prepared to connect, one by one, each HTTP method of each endpoint, to the corresponding method call; with a fair share of handmade exception handling, to translate passing-through exceptions into corresponding error codes and payloads.

Wait, what? Who is just copying and pasting APIs around between codebases? Why would you do any of that?

That's like complaining that a hotel booking validation form can't be copied from Django to Rails, or... what? Ugh.

> How to industrialize client-side integration?

JSON Schema. 👍🏼

> You’ll have to craft URLs by hand, write serializers and deserializers, and learn how to workaround the ambiguities of the API. Expect quite some trial-and-error before you tame the beast.

Good lord no, that's what HATEOAS is for.

> Do you know how webservices providers make up for this, and ease adoption?
>
> Simple, they write their own official client implementations.
>
> FOR. EVERY. MAJOR. LANGUAGE. AND. PLATFORM.

You can generate those from OpenAPI/JSON Schema... but yeah creating tools that simplify integration absolutely gets more folks using your system. This is not a _requirement_ but a recommended approach to improving developer experience.

> For decades, about every programming language has functioned with the same workflow: sending inputs to a callable, and getting results or errors as output. This worked well. Quite well.

Confusing REST API URIs with callables is the whole problem, that is what RPC is.

> I don’t doubt that some smart people out there will provide cases where REST shines; they’ll showcase their homemade REST-based protocol, allowing to discover and do CRUD operation on arbitrary object trees, thanks to hyperlinks; they’ll explain how the REST design is so brilliant, that I’ve just not read enough articles and dissertations about its concepts.

Yeah respectively this is literally it. Here are loads of articles.

> I don’t care. Trees are recognized by their own fruits. What took me a few hours of coding and worked very robustly, with simple RPC, now takes weeks and can’t stop inventing new ways of failing or breaking expectations. Development has been replaced by tinkering.

Burning fossil fuels is way easier than setting up solar panels, but that doesn't make it a better idea. Overuse of RPC is ignorant and causes problems down the line, rather similarly.


> The future could be bright. There are still tons of excellent protocols available, in binary or text format, with or without schema, some leveraging the new abilities of HTTP2… so let’s move on, people.

Or just use HTTP/2 for your REST API, which would solve that network bottleneck thing the author mentions, amongst many other issues.

I get it, REST is a complex topic. Too many people think they understand it, and are falsely validated when they bump into other people who don't understand it. Folks everywhere are building RESTish APIs which are basically just RPC + HTTP verbs + Pretty URLs, and as that doesn't seem very helpful they write giant articles explaining why that's not very useful...

## Summary

The future _is_ bright, we can get there through education, usage of standards, and avoiding bandwagon hopping. As soon as we stop [designing APIs around a network hack](https://blog.apisyouwonthate.com/lets-stop-building-apis-around-a-network-hack-9a68f7e83dd2), [thing more intelligently about API versioning](https://blog.apisyouwonthate.com/api-versioning-has-no-right-way-f3c75457c0b7), and really [commit to contracts](https://blog.apisyouwonthate.com/guessing-api-contracts-ac1b7eaebced), the REST API world will be fantastically popular over the next few years.

[JSON HyperSchema](http://json-schema.org/latest/json-schema-hypermedia.html) alone is going to solve confusion around hypermedia controls (HATEOAS), and make writing contracts via specifications far far easier.
