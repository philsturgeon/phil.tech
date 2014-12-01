---
layout: post
title: CodeIgniter & Canonical links
category: codeigniter
permalink: blog/2009/05/CodeIgniter-Canonical-links
excerpt: I have recently starting using Google Analytic's to track this web-site and
  as such I have suddenly started to care about improving its SEO while creating Google
  Analytic friendly URL's.
date: '2009-05-19 12:03:00'
comments: true
disqus_identifier: CodeIgniter-Canonical-links
---

Due to CodeIgniter's URI flexibility people are able to access the same url in many ways which causes issues with both Google ranking, search results and Google Analytic.

**Home page**

> http://example.com/  
> http://example.com/home.html (managed view my page manager)

This makes working out who hit my homepage tricky as there are several pages all showing as home.

**Multiple module/controller URI's**

> http://example.com/news  
> http://example.com/news/  
> http://example.com/news.html

This has two problems. I cannot find out which section is most popular without using a calculator, and it breaks content drilldown.

**Multiple page content**

> http://example.com/news/Article-name  
> http://example.com/news/2009/05/Article-name  
> http://example.com/news/Article-name.html  
> http://example.com/news/2009/05/Article-name.html

This just confuses the search engines by having a whole bunch of pages with the same content, and again means tracking page views in Google Analytics is near impossible.

Now, here are are two possibilities.

### Method #1: Full parsed URL's

This method basically shows Google crawlers and Google Analytic the same URL; the URL that a user _should _be using to view this page.

`echo '<link rel="canonical" href="' . site_url( $this->uri->uri_string() ) . '" />';`

**Pro's:** This would make sure EVERY page had a correctly formed URL for the page no matter what URI they accessed the page from.

**Con's:** Content Drilldown in Google Analytic will not work if you use $config['url\_suffix'] extensions. Doesn't take into account routed URL's so they will show separately.

### Method #2: Routed URL's for Analytic, Parsed URL's for Robots

Well it seems to make Google search and Google Analytic happy we are going to need two different approaches. This method will insert the full correct URL if a robot comes to the site to crawl for links, and insert the link we'd like to see show in Google Analytic if it is a normal user.

`if ($this->agent->is_robot()) \{   echo '<link rel="canonical" href="' . site_url( $this->uri->uri_string() ) .'" />'; } else \{   echo '<meta name="canonical" content="'. base_url().implode('/', $this->uri->rsegment_array()) . '" />'; }`

**Pro's:** The pro's of Method 1 but also uses will display the basic CodeIgniter URI even if the URL is masked behind a Route.

**Con's:** If you use routes for content drilldown such as "news/2009/04/Article-name" then it will show up as "news/article/Articlename". This may or may not be a bad thing.

**_Update:_** _ These first two methods require you to use [a piece of JavaScript](http://erikvold.com/blog/index.cfm/2009/4/23/relcanonical-and-google-analytics) written by [Erik Vold](http://erikvold.com/) to enable Google Analytics to register canonical links. I had not realised Google Analytics would pay no attention to a canonical link until I showed this article to a member of the web marketing team at work. I have added this 3rd method to cover this._

### Method #3: Routed URL's for Analytic, Parsed URL's for Robots (direct aproach)

As it turns out Google Analytic could not care less about your canonical links by default, we can give Google bots and Google Analytic two totally different values. We can set the current user-facing URI as a canonical link in the HTML, then insert the fully routed URI segments straight to Google Analytic.

`echo '<link rel="canonical" href="' . site_url( $this->uri->uri_string() ) . '" />';`

` <script type="text/javascript"> try { var pageTracker = _gat._getTracker("UA-XXXXXXX-YY"); pageTracker._trackPageview("<?=base_url().implode('/', $this->uri->rsegment_array();?>")); } catch(err){} </script> `

**Pro's:** Same as method #2 but doesn't require any extra JavaScript. You are simply passing a CodeIgniter value straight into code that is already there.

**Con's:** Effectively the same as method #2 here as well.

I personally am a fan of method #2 method #3. Does anybody have any other funky methods for handling this?

This is not the set-up that will work for everyone, as sometimes people want to have multiple URL's being tracked for a single content page. This happens quite a bit at work, but for my personal site and most of the sites using [PyroCMS](http://pyrocms.com/) I could see the advantages.

As captcha's are still not working, please discuss this in the [CodeIgniter post](http://codeigniter.com/forums/viewthread/114862/) I set up for this article.

