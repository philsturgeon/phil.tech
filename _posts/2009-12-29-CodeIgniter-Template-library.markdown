---
layout: post
title: CodeIgniter Template library
category: codeigniter
permalink: blog/2009/12/CodeIgniter-Template-library
excerpt: 'Working with multiple views in CodeIgniter has always been a pain. Out of
  the box CodeIgniter provides no real way of having a layout file or header/footer
  functionality. This library makes the whole process very easy and gives lots of
  useful methods for shared output. '
date: '2009-12-29 10:38:00'
comments: true
disqus_identifier: CodeIgniter-Template-library
---

Working with multiple views in CodeIgniter has always been a pain. Out of the box CodeIgniter provides no real way of having a layout file and the only way to get header/footer functionality is to put $this->load->view('header') in your views or in each controller and method.

Obviously as a programmer I am lazy and don't want to do that. Years ago I made some dodgy helper which evolved into a library which I called **CodeIgniter Layout library**. The problem was this was a library that got used for loads of different applications, some modular, some not and ended up with a really confused set of features that were plain bodged together. It was so embarrassingly screwed that I never released it, even though it is running 95% of all views in PyroCMS v0.9.7.

During PyroCMS v0.9.8 development one of the first things to go was the Layout library, which has been entirely re-coded with my **[CodeIgniter Template library](/code/codeigniter-template "Template library for CodeIgniter")**.

This library has an awesome featureset:

- Page title - will guess if nothing is set
- Breadcrumbs
- Meta-data
- Layout files - wrapper around the loaded view
- Themes
- Partials - Give any number of views a name and load them in the layout (sidebar, menu, extra footer, etc)
- Loading views in modules - supports [Modular Separation (PHP 5)](http://codeigniter.com/forums/viewthread/121820/) and any system that uses $this->router->fetch\_module().

So that's lots of crazy stuff that to me has been very useful and should be for others too.

The way it works is simple, you tell it what view you would like to load and tell it which layout to use, then it will wrap your view file with the layout suggested. By using the [MY\_Controller trick](http://codeigniter.com/wiki/MY_Controller_-_how_to_extend_the_CI_Controller/), you can set the name of the layout file for your entire application and by creating a Front\_Controller and Back\_Controller you can set different default layouts for your frontend or backend respectively. This is a big change for people not used to structuring their applications this way, but trust me it is worth it for several reasons I will go into in a later post.

[Read more](/code/codeigniter-template "Template library for CodeIgniter") about this library to learn how it all works and see some code examples.

