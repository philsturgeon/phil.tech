---
layout: post
title: 'PHP: Ecosystem Update'
category: php
alias: blog/2012/07/php-ecosystem-update
excerpt: Don't worry guys, this isn't another PHP apologist or PHP hater blog. We've
  all had enough of those recently. This is a quick heads up on two projects that
  are doing what they can to make the PHP ecosystem a better place.
date: '2012-07-10 16:17:00'
comments: true
disqus_identifier: php-ecosystem-update
---

Don't worry guys, this isn't another PHP apologist or PHP hater blog. We've all had enough of those recently. This is a quick heads up on two projects that are doing what they can to make the PHP ecosystem a better place.

## Framework Interoperability Group (PHP-FIG)

I think most of you by now will have heard of the PHP-FIG or PSR-1 and PSR-2 in some form or another. There have been loads of arguments about this for and against, with the good old fashioned snake_case v camelCase and tabs v spaces arguments coming back for a new round. Nobody agrees - go figure. 

These silly arguments about brackets and spaces really clouded the point of what the FIG is trying to do and as member I felt I should help out however I could along with the other members to fix the FUD going around. Paul M Jones wrote an awesome FAQ style blog post that answered a lot of these questions when [PSR-1 and PSR-2 were accepted](http://paul-m-jones.com/archives/2420) but to many people this was just "some guys blog", we really needed some central location for all this information.

So, on a mission to help people know what the hell the FIG are up to, I grabbed a domain, pestered a few people to set something up on GitHub pretty soon they had a website set up on GitHub Pages: [http://php-fig.org/][fig-site]. A few of the guys chipped in with the content, and now there is a shiny new [PHP-FIG FAQ][fig-faq] page!

If you still have any questions, doubts or concerns about the FIG then please just comment here, raise issues on GitHub, make suggestions in the form of pull requests, whatever. The point of this page is that it answers questions and stops everyone running around going "THE MEAN MAN ON THE INTERNET IS TELLING ME I CANT PUT BRACKETS ON A NEW LINE!!1!1". 

Seriously, nobody cares, that is not the point.

The point is that the frameworks and component developers have come together to build usable recommendations for interoperable code, so I can build my projects using a little bit of Symfony (love their YAML parser) and a little bit of FuelPHP (grabbing me some Validation) and throw it all into some other framework, and everything is the same. 

Beyond the basic interop factor, the way I see it, by reducing the number of active style guides around we'll have less of these religious battles in the future. Right now you love coding in a certain way, probably because the framework or CMS you develop with always did things in a certain way. If all of these frameworks used the same style new developers are more likely to code in the same way, meaning there will be less of those office arguments about where brackets are going and everything else.

Ruby, Python, etc are all pretty much on the same page with coding style, if PHP can get there too that that is one nice tick in the box for PHP (even if it doesn't change the world).

[fig-site]: http://www.php-fig.org/
[fig-faq]: http://www.php-fig.org/faq/

## PHP The Right Way

As a PHP developer I often have friends ask "What is the best way to get started with PHP?". My usual answer is "I don't know, that was 12 years ago, look at tutorials or something.". I can barely remember what sites I looked at, or what blogs gave me bits of advice. I have no idea where to send them and its been like that for years.

About 3 days ago [Josh Lockhart][josh] (author of the micro-framework [Slim][slim]) made an initial commit on a new website, which was another GitHub Pages public repository, with the URL [phptherightway.com][phptrw]. He sets out to solve exactly this problem by collating together all the best bits of advice, best practises, resources and whatever else seems relevant.

I found this on Reddit /r/PHP and there was a massive fight about PSR-1 and PSR-2 with the usual "You'll pry allman brackets from my cold dead fingers" bullcrap, so I jumped in and send a pull request to fix up the FIG explanations. Then I kinda got hooked, and I've sent in enough pull requests to get push access and my name on the footer. Cheers Josh!

It has grown exponentially since he set it up and there has been a constant stream of issues, pull requests, comments and improvements. Today it had tweets from [Smashing Mag][smashing] and [Gina Trapani][gina] (from Lifehacker) and a bunch of other folks are happy to see it and so am I. It's a great resource that focuses very much on how to do things properly.

The main focus here is that PHP 5.4 is a real option, and you should be using it. The latest bout of "PHP 5.4 sux" comments going around are mainly focused on what PHP 5 was. I am forced to work with PHP 5.2 for distributed apps as there are still about 20% of PyroCMS users on that branch. Only about 3% are on PHP 5.4 even though it's nearly half way through its lifetime! Hosts are fun. But while I am stuck on this version, most people aren't. If you are building for clients and you have enough sway then set them up with PHP 5.4. Just tell them its more secure, or faster, or cheaper, or more "social" - whatever you have to say to make them go for it.

It drives me mad on a daily basis that I have to use this archaic version of PHP because... wait for it... PHP 5.4 is awesome!

PHP 5.2, 5.3 and PHP 5.4 all represent MASSIVE jumps forward in the language. Yes we still need primitive types, yes there are still plenty of quirks, but in every single version PHP gets a huge amount better. 

Following the advice on this site you will almost certainly learn new things and hopefully it will help new people coming to PHP: The Best Worst Language around.

[josh]: https://twitter.com/codeguy
[slim]: http://www.slimframework.com/
[phptrw]: http://phptherightway.com
[smashing]: https://twitter.com/smashingmag/status/222585989426716674
[gina]: https://twitter.com/ginatrapani
[lifehacker]: http://lifehacker.com/