---
layout: post
title: 'Composer and PSR-0: Friends, Not Relatives'
category: php
tags: psr0, php, php-fig, composer
alias: blog/2013/05/composer-and-psr0-friends-not-relatives/
excerpt: As a huge proponent of Composer, a happy user of PSR-0 and a voting member
  on the PHP-FIG I get into plenty of conversations about all of them, and it worries
  me how much confusion there is in the community about these things not actually
  being related. To many of you this will be preaching to the choir, but this will
  hopefully clear a few things up for many or at the very least be a handy resource
  to link people to when they show signs of getting confused between the two.
date: '2013-05-07 18:08:00'
comments: true
disqus_identifier: composer-and-psr0-friends-not-relatives
---

As a huge proponent of Composer, a happy user of PSR-0 and a voting member on the PHP-FIG I get into plenty of conversations about all of them and it worries me how much confusion there is in the community about these things not actually being related. 

To many of you this will be preaching to the choir, but this will hopefully clear a few things up for many or at the very least be a handy resource to link people to when they show signs of getting confused between the two. _I'm sorry if this bores you silly._

1. PSR-0 came out in 2009
1. Composer came out in 2011
1. Composer happens to support PSR-0
1. PSR-0 code can be installed and autoloaded using Composer

It seems that a lot of folks discover Composer and PSR-0 at the same time and seem to assume they are the same thing - especially since both Composer and PSR-0 have the idea of a "vendor" and a "package", but those two things are not related to each other either. 

These are a few points that I have wanted to clarify during some strange conversations over the last few weeks.

## Vendor Name Confusion

This comes up fairly often, and was actually asked on the [composer-dev](https://groups.google.com/forum/?fromgroups=#!topic/composer-dev) mailing list the other day. 

**If you use PSR-0 and Composer then you have two different vendor names, and two different package names.**

Why? Because even code that is not using PSR-0 needs vendors and package names, so code like the Facebook SDK can be made Composer compliant by just adding a composer.json, and doesn't need to be recoded to PSR-0. 

* Facebook => vendor/facebook/php-sdk/src/facebook.php

If you do want to use PSR-0 for your classes then you need to make PHP vendors and packages too, but remember your code could be sitting along-side non-PSR-0 code, so you still need these Composer specific vendors for your code. This means your package could look like this:

* Phil\Kitten\Snuggles => vendor/phil/kittens/src/Phil/Kitten/Snuggles.php

Now, while you might be annoyed at having to have two lots of vendors, you can see here that they might not be identical. I might want my PHP namespaces to be singular, and my Composer package could well be plural.

This goes even further when you consider the fact that PHP namespaces do not allow hyphens, but composer packages totally do, because why not?

* Symfony\Component\BrowserKit\Cookie => vendor/symfony/browser-kit/src/Symfony/Components/BrowserKit/Cookie.php

Or these names could be **completely** different from their Composer names:

* Illuminate\Validation\ValidationServiceProvider => vendor/laravel/framework/src/Illuminate/Validation/ValidationServiceProvider.php

Why is that totally different? Because Laravel is a framework, made up of lots of different components. These components are under the "Illuminate" namespace and can be used in any application you like. Together, it becomes the Laravel framework. 

So, these two have nothing to do with each other, and lets not assume they need to be the same thing, because that only covers a fraction of the use-cases that PSR-0 supports. 

## Saying Composer packages are not PSR-0

This has come up so many times and it's silly.

> "Composer is meant to support PSR-0, but I have all these lower-case folders!"

Uck. Having a sub-directories such as "src/", "tests/" etc does not make this code Non-PSR-0. PSR-0 autoloaders are able to register to multiple points. Each location you register is bound to a namespace prefix, then it will load from there. If you are using Composer packages you will point your prefix at your src/ folder:

~~~js
"autoload": {
    "psr-0": { "Foo\Upload": "src" }
}
~~~

Everything inside there is then considered to be PSR-0, everything outside is irrelevant.

> So this code is specifically required to live in Composer? I thought you said…?

Nope. This code is developed to be a component, which bundles its src/, its tests/ and a README no doubt. It happens to be installable by Composer, or Unicorn (the dependency manager I made up earlier), but could totally work on its own without breaking the PSR-0 spec at all.

If you wanted this code to live outside of Composer then you could do one of two things:

1. Copy and paste the contents of src/ into one main PSR-0 folder in your application - like its 2001 - and use the [example autoloader](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-0.md#example-implementation).
1. Copy and paste the whole component codebase and use the [SplClassLoader](https://gist.github.com/jwage/221634) to register Foo\Upload to src/ yourself.

Doing either of these is a bit weird, because… well why would you?

If you want to install components, then use something that is designed to install them (Composer or Unicorn), and if you want to autoload your own code put it directly into an autoloadable area within your application.

PyroCMS does both, it has:

* system/cms/modules/\*/src/
* system/cms/src/
* vendor/\*/\*/(lib/|src/)

_**Note:** That regex is just there to highlight that Composer devs can do what they like, it doesn't matter._

The point here is that PyroCMS supports custom PSR-0 autoloading locations (one global, one in each module) and a main vendor/ folder which has a mixture of PSR-0 and random classmapped code. 

## PSR-0 must stay "Implementation Agnostic"

This is another conversation that has popped up a few times. People want to see Composer making changes to bring PSR-0 support more into the core, or want PSR-0 to change based around how Composer works. That would be _nuts_, and luckily nobody on the FIG has been vocal about having any interest in doing this.

Realistically Composer is the only dependency manager out there _at the moment_, but theoretically somebody else could build a bigger and better system tomorrow. The entire PHP community could immediately fall in love with this dependency manager, instantly throwing Composer out faster than plague-ridden step-mothers in 1349, and they could both support PSR-0 equally.

You might need to make a `unicorn.json` file to sit next to your `composer.json` and it could work with both systems just as easily. No other changes should be required to switch.

Having a spec that relies on a specific structure being set up by a piece of third-party software would be detrimental to the entire community, which is why things like [PHPab](https://github.com/theseer/Autoload) are awesome, but not a standard.

## Composer must stay "Specification Agnostic"

What will happen when a new autoloading standard is released? We'll be finding out fairly soon, as the PHP-FIG are working on an awesome proposal called the "Package Autoloader". This is codenamed PSR-X and will most likely be released as PSR-4, and is incredibly similar to PSR-0 code with a few super-handy tweaks.

To put it simply, PSR-X no longer translates underscores to directory separators (which was in there for legacy PEAR/Zend type stuff) and allows package developers to potentially skip out the PHP namespace by inferring it:

* `Symfony\Component\BrowserKit\Cookie` => `vendor/symfony/browser-kit/src/Cookie.php`

For this to work there will be a slightly different sample implementation of the autoloader, which will accept arguments that basically convey the message that Symfony\Component\BrowserKit maps to vendor/symfony/browser-kit, and instead of requiring the extra folder structure it will just start looking for the next folder or file. In other words, you are simply deleting the Symfony/Components/BrowserKit folders and moving everything up a few folders. Simple!

If Composer was all tied up on PSR-0 then this would never work, and all the old stuff would break. As it stands it will be insanely easy for Composer to integrate PSR-X/PSR-4? support into Composer. There will be some logic that goes into the composer.json which will look something like:

~~~js
"autoload": {
    "psr-4": { "Foo\Upload": "src" }
}
~~~  
    
This would work exactly the same, but you just skip a few folders. Whoopdydoop!

## Composer, PSR-0, PSR-X and their separation are all important

PSR-X needs to be separate to avoid fucking with PSR-0 users. They both need to be separate from Composer to let Composer do its thing while they do theirs.

I've heard some chatter about "which is more important" and I think even wondering about that is pointless. PHP is an ecosystem, and in an ecosystem everything plays its part. Trees are obviously important, but I remember having some drunken conversation where somebody explained to me how the planet Earth would pretty much die over a few decades if there were no ants. 

Whatever type of "a bird flaps its wings and we have dinosaurs again" story you want to go with, it is important to remember that every single part of an ecosystem is important. If you hate ants then don't buy an ant-farm, or go to the rain forest but if you kill them all off there will be a lot of upset ant-eaters. Or something.
