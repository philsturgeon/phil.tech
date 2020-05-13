---
layout: post
author: [Phil]
title: Composer now supports PSR-4
tags: [php, psr4, composer, php-fig]
excerpt: "I haven't really posted about PSR-4 here, but if you follow me on Twitter
  or hang out on Reddit you've probably seen some news about it. PSR-4 was voted
  in as an \"accepted\" PSR by the FIG in December. It took a little while to get done
  and went through a series of painful rewrites but when we have in the end is a document
  that reflects what this truly is: an improvement on PSR-0. Time to upgrade your
  packages, but don't release them just yet."
date: '2014-01-03 23:27:00'
# alias: blog/2014/01/composer-now-supports-psr4/
# comments: true
# disqus_identifier: composer-now-supports-psr4
---

I haven't really posted about PSR-4 here other than as a footnote in [this old article](/blog/2013/05/composer-and-psr0-friends-not-relatives), but if you follow me on Twitter or hang out on Reddit you've probably seen some news about it. 

[PSR-4](http://www.php-fig.org/psr/psr-4/) was voted in as an "accepted" PSR by the FIG in December. It took a little while to get done and went through a series of painful rewrites but when we have in the end is a document that reflects what this truly is: an improvement on PSR-0.

Today [Jordi Boggiano](https://twitter.com/Seldaek) merged a [pull request](https://github.com/composer/composer/pull/2459) by [Andreas Hennings](https://github.com/donquixote) into master branch of Composer that contained support for PSR-4. Andreas was a massive help to the FIG while we were trying to shake the issues out of PSR-4 during Draft and Review stages, so he really outdone himself by providing the code too.

Jordi wrote a blog about why you don't want to switch all of your packages immediately to [PSR-4](http://seld.be/notes/psr-4-autoloading-support-in-composer) as many users won't be reminded to update for another 30 days, so for now I am suggesting people create a feature branch called "feature/psr4" for those who want to try it out, to get their packages and unit-tests ready for February 4th 2014 - when it will be "PSR-4 Upgrade Day".

Converting is easy as hell. Take a look at [Fractal feature/psr4](https://github.com/php-loep/fractal/tree/feature/psr4) to see how to do it yourself.

The [Composer Autoload documentation](http://getcomposer.org/doc/04-schema.md#autoload) is already updated for PSR-4 too.

Please post up here in the comments or on Twitter if you upgrade your package(s) to PSR-4. I'd love to make a list of early adopters on here, and maybe make it into another article in a few weeks.
