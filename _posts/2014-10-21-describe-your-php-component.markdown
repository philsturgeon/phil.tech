---
layout: post
title: Describe Your PHP Component
category: php
permalink: blog/2014/10/describe-your-php-component
excerpt: I've been talking recently about what The League of Extraordinary Packages
  is up to in regards to components, and made a plea to avoid "Not Invented Here"
  syndrome to help the community focus on quality instead of quantity. Today I noticed
  a new pet-peeve.
date: '2014-10-21 12:21:00'
comments: 'true'
disqus_identifier: describe-your-php-component
---

I've been talking recently about what [The League of Extraordinary Packages](/blog/2014/10/what-is-the-league-of-extraordinary-packages) is up to, and made a plea to [avoid "Not Invented Here" syndrome](/blog/2014/10/php-wars-attack-of-the-clones) to help the community focus on quality instead of quantity. Today I came across a new pet-peeve. 

<s>Right now, if you</s> Earlier this-morning, if you did a [search for "pdf"](https://packagist.org/search/?q=pdf) on Packagist, you <s>will</s> would have seen solid examples of two of my largest issues with the PHP Component eco-system, and even a brand new one.

1. Framework specific code; There is a Yii-only PDF package and a Laravel-only PDF package.
2. Attack of the Clones; there are so... so many... 
3. The New One - Missing descriptions; One the first page, the third and fourth packages were completely unlabeled. 

In a world where there are (unfortunately) thousands of packages that do exactly the same thing, you'll need to _at least_ add a description if you want to have anyone pick your package over anyone else's. This helps you get more users (and therefore more contributions) but also helps people skip your component if its no good for them.

I [added a description to one](https://github.com/mneuhaus/Famelo.PDF/pull/7), but another [didn't even have a README](https://github.com/kaystrobach/FLOW.Pdf/issues/1) for me to copy one from. The PR was merged and the README was added, meaning that those two now make a little more sense.

Please send a pull request to any package you see without a description. It goes in the `composer.json`, and simply needs `"description" : "Copy some text from their README.",` added in. 

If you add a description to a package, please post the pull request up here for props.