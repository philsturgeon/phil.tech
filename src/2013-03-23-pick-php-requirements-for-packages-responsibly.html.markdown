---
layout: post
title: Pick PHP Requirements for Packages Responsibly
category: php
alias: blog/2013/03/pick-php-requirements-for-packages-responsibly/
excerpt: Which version of PHP to use for anything is always much debated in the PHP
  community. I'm luck enough to have kissed sweet goodbye to PHP 5.2 a while back,
  but PHP 5.4 and PHP 5.3 are both actively used by different projects and recently
  I have come across a few packages that have been using PHP 5.4 almost exclusively
  just to use short array syntax, which to me is short sighted and selfish. I tried
  tweeting about this and everyone seemed to be a little confused, so instead of
  140 characters I thought I'd try 7051.
date: '2013-03-23 21:02:00'
comments: true
disqus_identifier: pick-php-requirements-for-packages-responsibly
---

I recently tweeted something which seems to have confused a lot of people:

<blockquote class="twitter-tweet"><p>If you release PHP packages that require PHP 5.4 _JUST_ because you want to use short array syntax, then I hope your pet gets run over.</p>&mdash; Phil Sturgeon (@philsturgeon) <a href="https://twitter.com/philsturgeon/status/315475056203534338">March 23, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Now, don't go running off to PETA, I'm clearing kidding about the pets, but people seemed confused by the main gist of this point: If you're going to release a package (a Composer package for example) as PHP 5.4, then make sure it is worth it. 

When I say "make sure it is worth it" I mean, **don't just switch your arrays from array() to [] just because it looks cool**. That was the extent of my original tweet, because I've seen a few packages doing that and it annoyed me immensely. This conversation became confused quickly with people assuming that everyone on Composer is PHP 5.4 because only smart cool kids use Composer (which is weird, elitist, ignores those that use composer locally but deploy to PHP 5.3 servers and according to [stats from Jordi](https://twitter.com/seldaek/status/315805955050848256) isn't true anyway), other people started wanging on about how WordPress should move to PHP 5.3 which would make companies upgrade somehow (but that ignores the fact that PHP 5.4 packages would still be out of reach) and there were about 30 other conversations going on, all spawned out of the tweet which was making one very specific point...

Suffice it to say, if you require a user to upgrade their version of PHP simply so you can use some syntactical sugar inside a package that nobody else is even going to be looking at, then you're an idiot. Beyond that, you're actually hurting the community. 

If every time a developer wants to use a package they're forced to build their own because the developer of the original stupidly decided to use PHP 5.4 when [only 3.1%](http://w3techs.com/technologies/details/pl-php/5/all) of the internet is using that version, then we're doubling up on efforts to build useful, reusable components that we can all share.

## PHP 5.4 is more than just []

There are lots of brilliant new features in PHP 5.4 that could make a developer wish to pick PHP 5.4 over PHP 5.3 for a package they build.

Just look at the "New Features" change-log:

* Support for traits has been added.
* Function array dereferencing has been added, e.g. foo()[0* ].
* Closures now support $this.
* Class member access on instantiation has been added, e.g.*  (new Foo)->bar().
* Class::{expr}() syntax is now supported.
* Binary number format has been added, e.g. 0b001001101.
* The session extension can now track the upload progress of files.

Most of this is traits and dereferencing, which a lot of developers love. If you plan on making heavy use of features like this, such projects like  [AuraPHP](http://auraphp.github.com/) then great, that's a wonderful decision. We need people building components at the bleeding edge, and we need people building PHP 5.4 specific code that really shows people how to do it, but does the next package you release _need_ to be PHP 5.4?

If you're just using traits, then make sure those traits are optional. If you're dereferencing then… well do you need to? It's an extra line of code to avoid it, and instead of making your package compatible with only 3.1% of PHP-based websites you could make it work with over 50.4%. That is the entire point of sharing code right, to actually be able to share it with people?

## "But I use PHP 5.4 for all my projects"

Yes, you do, but think about [other people](/blog/2012/08/understanding-circumstance) for a minute. At [Kapture](http://kaptu.re) we use PHP 5.4 on any PHP-based application, and I already have a PHP 5.5 branch of the API ready to go and passing tests so that as soon as PHP 5.5.0 comes out I'll be upgrading. I can do what I like, because I control the servers, but what about other people?

And not even other people, other projects?

PyroCMS for example, a few months back decided to up the requirements for the next version from PHP 5.2 to PHP 5.3. This might be seen as slow moving, but lets remember that WordPress won't be upping the requirements until 2014 sometime.

It's not just Pyro, another example would be Drupal 8 (based on Symfony2) who are in the same boat, as are _plenty_ of other "distributed" projects. 

If the amount of work it takes to keep your packages PHP 5.3 is minimal (long array syntax, keeping traits optional, and not using dereferencing) is that trivial, and it means that projects can use your packages, then surely it's worth it? This avoids PHP 5.4 people and PHP 5.3 people all building the same shit, just because one group wants to use the new hotness, even though it doesn't really add all that much.

Again, it's about sharing it with the lowest common denominator which is the same logic that is being used by that vast majority of popular Composer packages or component-based frameworks which distribute over Composer:

* Assetic
* AWS SDK 2
* Behat
* Buzz
* Doctrine
* Guzzle
* Laravel 4
* Monolog
* Imagine
* PPI
* Password Compatibility
* Pimple
* Swiftmailer
* Symfony2
* Twig
* ZF2

All PHP 5.3, because PHP 5.4 usage is not high enough yet. 

## So why not PHP 5.2

If we're going for the lowest common denominator, why not go for PHP 5.2?

PHP 5.2 and PHP 5.3 are worlds apart, whereas PHP 5.4 (syntactically) is just adding some sugar. Sure under the hood there are loads of speed improvements in PHP 5.4 and it's an excellent version, but the architectural differences between 5.3 and 5.4 are trivial (or non-existent) compared to 5.2 and 5.3.

PHP 5.2 doesn't have namespaces, closures, or late static binding. PHP 5.2 makes PSR-0 compatibility impossible, and that alone is a massive reason to ditch it for packages. Using PHP 5.2 blows chunks and it needs to be burned with fire, but PHP 5.4 doesn't make enough of a difference **to a package** to really justify using it at this time.

## "But we have to push things forward"

Upping requirements of everything everywhere does not increase adoption of new PHP version support with hosting companies. Most hosting companies pay no attention to these things, and even when you beg and plead for them to upgrade they do it at their [own damn rate anyway](http://feedback.rackspace.com/forums/71021-product-feedback/suggestions/997049-php-5-3-support-in-cloud-sites). Some more alert companies like [Crucial Webhosting](http://www.crucialwebhost.com/) have been rocking PHP 5.5 since the first alpha1, for people to _test_ their code, but this is not because of people releasing PHP 5.5 code on packagist, this is due to PHP getting more consistent and regular with their releases and because they want to carve a name for themselves as being different from the average hosting company.

The whole idea that hosting companies care about what version we use for our components is just not realistic. When you say "well if I increase my packages people will have to upgrade to PHP 5.4 quicker." you're only kidding yourself. In reality those people just won't bother looking at your package, especially if there is another one (all be it worse) next to yours. 

## Summary

Running PHP 5.4 on your servers is going to make your code quicker and I can't recommend it enough, but using PHP 5.4 specific syntax doesn't change a thing. It makes some code a little cleaner, which most people wont ever see because its buried away in a package they wont bother looking at, and comes at the cost of drastically reducing adoption of your packages. In your applications you should use all the syntactical goodness that PHP 5.4 provides, just keep it out of your packages unless you need to. And if you think you need to, do you really *need* to?

As long as you understand that the usage will be much less and are ok with that (like Aura) then that's fine, but don't release some generic Geocode or OAuth 2 package as PHP 5.4 just because you prefer [] over array(). I don't want to have to hurt any pets.
