---
layout: post
title: The Tribal Framework Mindset
category: php
permalink: blog/2014/01/the-tribal-framework-mindset
excerpt: The PHP community has made some amazing leaps forward in the last few years,
  but some folks still (intentionally, or unintentionally) are contributing towards
  the siloing of the PHP community into framework-specific sub-sections. We used to
  work that was for a handful of reasons, but with Composer, the FIG and the onset
  of PSR's we have literally no reason to do this anymore. This article hopes to point
  out some of the ways in which that can happen, with potential solutions too.
date: '2014-01-02 17:58:00'
comments: true
disqus_identifier: the-tribal-framework-mindset
---

Twitter seems to lead to the same thing happening over and over again.

1. I say something I think is entirely uncontroversial
2. People misunderstand and jump to weird conclusions
3. Some folks start defending against that weird conclusion
4. When I try to explain why they are mistaken, people go reporting to @PHPDrama

Yesterdays comment:

<blockquote class="twitter-tweet" lang="en"><p>As much as I understand pushing the &quot;Laravel Community&quot;, content, blogs, etc, can we stop this soloing of efforts and be a PHP community?</p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/statuses/418553604107431936">January 2, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I meant to say "siloing", but being half asleep after a 24-hour session in Atlantic City in the back of a minivan with screaming kids meant that I made a mistake. It should still have made sense.

Well, I thought so at least until I had a myriad of bizarre responses from people (mostly the well-known Laravel names) defending and picking issue with things I said, assuming instead of saying something logical I must have meant something moronic. That is rather offensive to me, so let's explain it for them. 

## Packages

If you are building a PHP package then you are faced with two options:

1. Make it work with your favorite framework
2. Make it run with every framework out there

Now, if you pick option 1 then a) you are just trying to save time, or b) you suck. I've been talking about [framework agnostic packages](/blog/2012/03/packages-the-way-forward-for-php) since early 2012 when Laravel 3 had bundles, CodeIgniter had Sparks, and everyone else had something else just for them. Frameworks didn't have much choice than to build their own solutions because the only other option was PEAR, and most of those frameworks were built with "avoiding PEAR" as one of their main selling points.

We've come a long way in that time through the proliferation of Composer, and frameworks like Laravel are doing a good job at making the Composer uptake better, but many people in the frameworks communities are bad at making their code work outside of their specific framework environment. Even Laravel 4 itself does not advertise much about how to use its packages outside of Laravel. I wrote about how to do it with the Database package back in [December 2012](http://12devsofxmas.co.uk/2012/12/day-4-mixing-and-matching-php-components-with-composer/) but that was made easier thanks to the Capsule package (later rolled into the core) built by an employee of mine to simplify the bootstrap process. **I mention this not to "brag" as somebody suggested, but to highlight that I am very aware that some packages CAN be used alone, but most packages are not as easy to bootstrap as Eloquent, and there is a reason why Eloquent is so easy.** Most L4 packages could benefit from this sort of easier bootstrapping, as it can be pretty tough on some packages, especially something like Pagination which requires an Environment variable, knowledge of the Symfony HttpRequest, Views, etc.

So if Laravel itself is not advertising its usage outside of Laravel with even the most basic README examples, and so many developers in the community are stuck in this "I only ever use Laravel for everything, and why do I care if it works with CakePHP" mindset we're left scarily close to where we were last year - with frameworks that don't play nicely together, and developers who don't build code that works together.

If you don't believe me, go and have a look at all of the Laravel specific packages on [packagist](https://packagist.org/search/?q=laravel). Some of them are bridge packages for generic code (which is excellent) but many of them are Laravel-only for basically no reason. That makes me sad.

An example I often use of a framework agnostic package is [Sentry](https://github.com/cartalyst/sentry/) which took the approach of "build in support for everything". This is an excellent solution as it means seamless integration for much of it, but certainly can be hard to do. Keeping it generic and linking to bridge packages in the README is another simplistic approach.

[Fractal](https://github.com/php-loep/fractal) is another example, as is any package in [The PHP League of Extraordinary Packages](http://thephpleague.com/). The League is a silly/fun vendor namespace used by me and a group of friends so we can switch responsibilities on projects without having to move them around between ourselves or constantly pull request each other. All of our packages are completely framework agnostic and list bridge-packages in the README. Nice and easy.

**Update:** People have suggested that writing framework agnostic code is something the average person doesn't have time for when they're trying to hit their business goals. Well two things to that:

* It's not actually that hard. All you have to do is make sure your code (other than the service provider) does not directly require a piece of any other framework. NO HARD DEPENDENCIES. That makes testing easier anyway and is already something that most Laravel developers are doing with the repository pattern. If you use the repository pattern, you can easily tuck your framework dependencies behind an interface in a completely identical fashion.
* Why are you releasing packages at all if you're rushing to hit your business goals? Come back and do that after "the launch".

## Developers

Something that gets my back up is when developers brand themselves as "Laravel Developers" or "CakePHP Developers" instead of "PHP Developers". I have tried suggesting to people that "Web Developer" was a better term, but the more CLI, API and parallel work I do the less I feel like that term applies. "Software Developer" or "Software Engineer" fits like a glove, but regardless of whether you want to go that far: You are not purely a Laravel Developer!

Doing this you are saying to the world: "I only know FrameworkX." Like the JavaScript developers who only know jQuery, and are therefore probably useless with AngularJS or Backbone. 

By picking only one framework to represent your skills you make yourself less appealing to those who assume you don't have transferable skills. Sure they're wrong, but you just lost out on a potential job offer. After-all, if you are a good enough PHP developer to easily use any framework, why are you listing yourself so specifically with one specific framework? You are a PHP developer who specializes in Laravel, not a Laravel developer.

## Books

Everyone and their dog is writing a book at the moment (myself included) and a popular topic on the internets these days is Laravel. I suggested that if you are writing a book that _could_ be applicable to any framework then you definitely should do that. Obviously a book about "how to learn Laravel" should not have a "to run Migrations in ZF2", but a book almost anything else does not need a hard requirement on a specific framework. For the same reason packages shouldn't, and because it hurts your sales, hurts the PHP community at large and keeps people trapped in this tribe-like mindset which has been plaguing the PHP community for a decade.

The same applies to blog posts. An article about Laravel and some piece of technology should probably just be an article about PHP and the technology. This can just come down to SEO. If the only person to write about Neo4j is writing specifically about using it in Laravel then some other PHP developer might not spot it on the search terms and spend a few days trying to work things out for themselves. The number of man-hours wasted by these different PHP tribes doing the same things over and over again is an absolute travesty. 

## Resources

This same logic applies to Laravel community resources. 

Jeffrey Way unfortunately assumed I was talking about his [Laracast video about community](https://laracasts.com/lessons/laravel-community-crash-course) with my original tweet. Again, not the case. Laracasts plays an incredibly powerful role in releasing high quality training resources for people that want to learn specifically about Laravel, so shoving AuraPHP advice in there might not be something anyone would care about. 

To me it seems that this video was far from being a problem, but was confirmation of everything I've been saying. The intro describes the problem that the video then goes through solving: "You know the drill, you join some new technical community but you don't yet know who is who or what is what." That is exactly the issue here. 

This is what keeps people using their one-true-framework over all others for so long. With all their code in that system, and all their knowledge, and all their friends, and all their RSS feeds, all covering that one community, the thought of moving to another just seems like death.

We cannot expect all technical communities to be one because they share so little in common. Moving between Python, PHP and Ruby as I do there are certainly very separate communities, but we certainly shouldn't have this wall of confusion between different frameworks in the same language, and it certainly should not be such a large wall that it needs to be put into a video.
If I start using some Python framework I might expect to be a little lost learning about where to get my Python news, but I wish we didn't have to have to have any of this confusion between PHP frameworks. 

Further to that, things like the [Laravel Packages Registry](http://registry.autopergamene.eu/) (linked to in the main wiki) are dangerous. Lots of developers coming into the Laravel community are _extremely_ inexperienced as it is all about having a minimal entry level. That is _excellent_ and was one of the biggest selling points of CodeIgniter for all those years, but folks managing various resources in the Laravel have to keep that in mind when making decisions. By making Laravel-only package repositories like this you are training these developers to go and find their packages in this one resource, instead of just… using packagist.

Every other day I see somebody saying "Anyone know a good Laravel package for X?" My answer is usually a link to https://packagist.org/search/?q=X. 

## Morals

Why is this any of my business? Why should you listen to me? Because I spent almost a decade doing this shit and it was awful. CodeIgniter this, CodeIgniter that. I was typecast as the CodeIgniter guy, all of my freelance requests were CodeIgniter. My blog was entirely CodeIgniter, I built APIs in CodeIgniter, I ran gave talks about CodeIgniter, I almost had CodeIgniter stamped on my tombstone.

Then CodeIgniter pissed me off so hard I got involved with creating FuelPHP and using the two taught me some serious lessons about framework agnostic packages. Maintaining codeigniter-oauth2 and fuelphp-oauth2 was enough of a life lesson in itself.

I vowed to never get stuck in that mindset again, and have since been working my arse off on the [PHP Framework Interoperability Group](http://www.php-fig.org) to help make new PSRs, help work on the community issues, get the website improved, create new bylaws to streamline the development of new PSRs, etc.

All of this work can easily be undermined by people unthinkingly staying in their tribal framework mindset, ignoring the rest of the PHP community and creating too many Laravel-only resources. 

All of you developers. Guess what: In 5 years you probably wont be using the same framework. 

That's not an insult to Laravel, or Taylor, or anyone else from any other framework. I'm just telling you it wont happen.

You'll change jobs, or something new will come out, or your management will randomly decide to go webscale with NodeJS, or the next version might change too much for you, or not enough for you: whatever. You will need to be ok with changing tools and knocking down the walls between the PHP frameworks by letting people continue to use the same packages and package managers, etc means changing between PHP tools is less drastic and time consuming for everyone. 

One thing I am happy about is Taylor Otwell has learned from the issues of the Kohana community, which not only broke itself in half with the v2/v3 debacle, but isolated itself from the rest of the PHP community with leadership that was often nothing short of obnoxious, but definitely elitist.

Luckily that itself is not happening. Laravel made it through v3 to v4 with minimal pushback and v4.1 is a feature-packed but simple upgrade. The leadership is also generally incredibly friendly… except for when they talk to me like I am just some basic bitch.

But the other concerns worry me. I don't want any PHP developers wasting their time on tribal bullshit. I don't want people having to spend time relearning over and over again. I don't want developers getting religious about their choice. I don't want people having to port packages to work on other frameworks. All of that is happening, and all of it needs to stop. We are the PHP community and together we are fucking huge. 80% of the internet is ours, and we need to remember to work together instead of fragmenting the community, siloing it with framework specific resources that have no reason to exist.

I just ask that you keep that in mind when you are making decisions; developers and community leaders alike.
