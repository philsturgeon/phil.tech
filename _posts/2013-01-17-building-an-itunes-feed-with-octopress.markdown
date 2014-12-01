---
layout: post
title: Building an iTunes feed with Octopress
category: ruby
permalink: blog/2013/01/building-an-itunes-feed-with-octopress
excerpt: " \n\t  \n \n\tOctopress is a great little CMS for hackers and it works on
  GitHub pages for free hosting, so a few PHP developers have been known to use it
  to smash together a basic site even thought it's using Ruby; Boo, hiss, etc. One
  site I've built with Octopress is for a new podcast I co-host with Ben Edmunds called
  PHP Town Hall. It needed an iTunes compatible RSS feed, so I built one. "
date: '2013-01-17 04:12:00'
comments: true
disqus_identifier: building-an-itunes-feed-with-octopress
---

Octopress is a great little CMS for hackers and it works on GitHub pages for free hosting, so a few PHP developers have been known to use it to smash together a basic site even thought it's using Ruby; Boo, hiss, etc.

One site I've built with Octopress is for a new podcast I co-host with Ben Edmunds called [PHP Town Hall](http://phptownhall.com/). It needed an iTunes compatible RSS feed, so I built one.

### source/itunes.rss

<script src="https://gist.github.com/4553431.js?file=itunes.rss"></script>    

Some of this is obviously hardcoded, but I didn't care enough to change that and I don't see what benefit throwing some config options in would have made.

### plugins/octopress_filters.rb

Apple require you to use an RFC 2822 format for the date strings, which as far as I could tell was not built into Jekyll or Octopress. In this octopress_filters.rb file I added the following method towards the bottom:

<script src="https://gist.github.com/4553431.js?file=octopress_filters.rb"></script> 
  
I've written a [pull request](https://github.com/imathis/octopress/pull/948) to add that in on the off-chance folks think its useful, but I'm fine with the hack. It works, and I'll be updating future versions with Git so I wont randomly loose the change.

### Posts

The last change to make is to give each of your blog posts some extra parameters. Below is an example of a PHP Town Hall post:

<script src="https://gist.github.com/4553431.js?file=All Posts"></script> 

Here we add three new params to an average post, which are:

* **filename** - Will be inserted into the iTunes feed which has a link to an S3 bucket hardcoded, and have .mp3 appended. 
* **length** - The file size in bytes.
* **summary** - A short summary just for display on the iTunes page.

That's all you need to do, so run rake preview to take a look at the URL then if it works publish it.