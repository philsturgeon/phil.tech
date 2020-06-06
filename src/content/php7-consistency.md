---
layout: post
author: [Phil]
title: PHP7 Consistency
date: 2016-01-07 02:37:00+00:00
tags: [http, api, uploads]
draft: true
---

]philsturgeonThe Real Phil Sturgeon 144 points 9 days ago 
Because they're fucking idiots who wrote bad PHP years ago and didn't notice that was a) their fault and b) the language improved astronomically.
I have had people shit on me for years about PHP then I mention I also wrote Go and RoR and I watch their brains melt. Ignore them. They're daft.

Has PHP 7 improved?

Ok, firstly you need to take that tone on a long hike. While you're doing that, please consider these few changes in PHP 7.0:
https://wiki.php.net/rfc/context_sensitive_lexer
https://wiki.php.net/rfc/phpng
https://wiki.php.net/rfc/abstract_syntax_tree
https://wiki.php.net/rfc/uniform_variable_syntax
https://wiki.php.net/rfc/engine_exceptions_for_php7
https://wiki.php.net/rfc/internal_constructor_behaviour

Literally none of those are cosmetic, so you're wrong there.



Sites running PHP


Uber was built on CodeIgniter
TIME uses Drupal 7
USA.gov uses CodeIgniter
Bloomberg uses a bunch of PHP
Tumblr runs PHP, think they just upgraded to 7
Pornhub on PHP
Youporn is on Symfony
etsy, mailchimp, flickr, slack

In the top 20 sites on Alexa

2. Facebook (Hack and HHVM)
5. Baidu (HHVM)
6. Yahoo (partially)
7. Wikipedia (HHVM)

OH BUT HHVM ISN'T PHP

- making new implementations of language is common as hell, ruby, python, etc all have multiple. CPython, JRuby, etc.-
Facebook had a big enough set of servers that eaking more performance out of PHP itself clearly made sense. 

Facebook use PHP because it's easy to find developers, maybe easier than finding every Haskell developer in the world.

Which leads onto...

What is the selection process for a language on a service you're writing?

node - write it good use it on the front and back
