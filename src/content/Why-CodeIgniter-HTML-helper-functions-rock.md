---
layout: post
author: [Phil]
title: Why CodeIgniter HTML helper functions rock
tags: [codeigniter]
excerpt: A complaint I often hear about CodeIgniter is one about HTML helper functions
  like form_open(), doctype() and img(). This post helps explain what they are and
  why they are useful.
date: '2009-12-14 17:06:00'
comments: true
disqus_identifier: Why-CodeIgniter-HTML-helper-functions-rock
alias: blog/2009/12/Why-CodeIgniter-HTML-helper-functions-rock/
alias_1: codeigniter/2009/12/14/why-codeigniter-html-helper-functions-rock/
---

A complaint I often hear about CodeIgniter is one about HTML helper functions like `form_open()`, `doctype()` and `img()`.

The complaint boils down to these points:

- `heading('Hello', 1)` is ugly compared to `<h1>Hello</h1>!`
- Putting HTML in PHP functions is "bad MVC".
- My favourite "I know how to write HTML, I don't need a helper".

These points of view come from people who do not understanding the potential benefits of using HTML helpers - which is fair enough as I used to think they were useless too.

Two small things to mention first, then on to the "meat" of the article.

### It looks ugly

If you are reading this you are quite likely a programmer who stares at PHP for large amounts of time. Who cares if it does not look as clean as plain HTML in your view files? As far as readability goes, if a designer was to look at heading() im sure it would make perfect sense to them as much as a <h1>.

### MVC pattern

Due to CodeIgniter being a MVC framework, people try to apply those three letters to everything. The people who see HTML helpers as "bad MVC" say so mainly because they have HTML outside of the view, which to them "goes against the rules" but I don't think it should be as cut-and-dry as "ALL HTML ALWAYS GOES IN VIEWS".

The way I see it is simple, views should contain your custom chunks of HTML (i.e. displaying content, forms, RSS feeds, etc) and helpers/plugins should contain whatever they need to do their helpful job and if that happens to be a small amount of HTML, who gives a damn? It doesn't "break MVC" in the slightest.

### Wrapping your data

The main interest to me comes in the extra abstraction layer these HTML helpers provide you with. The "whats the point?" comments can be answered in the same way as "What's the point in using jQuery?" or "Why use CodeIgniter over PHP?". The extra layer of abstraction, combined with helper extending/overriding makes it very easy to change simple bits of logic throughout your application output with minimal fuss.

To explain what the f\*\*k I am talking about, I'll use an example.

~~~ php
<form action="<?= site_url('controller/method') ?>" method="post">

// vrs

<?= form_open('controller/method') ?>
~~~

First you will see the standard HTML way to do it, with the `site_url()` function used to create the link to the form action. Second you will see the `form_open()` tag - and in this example its shorter too, wahey!

I wanted a way to set accept-charset="UTF-8" in all my forms to help keep my data all <a href="/blog/2009/08/UTF-8-support-for-CodeIgniter">UTF-8 in CodeIgniter</a>. If I was using just HTML then I would have to go through <strong>all</strong> my forms and add that in myself, which would be wasting time I could have spent at the pub.

Instead, as CodeIgniter allows you to extend helpers, I just made my own slightly modified `form_open()` in `application/helpers/MY_form_helper.php` which contained this logic. Because I was using PHP to wrap my useful data, I could make one simple change and update all of my `<form>` tags.

The main problem is people are looking at these HTML helper functions and seeing them purely as different syntax.

### Think big

My example shows one useful application of this beyond shorter syntax, but there are plenty more applications for

HTML helper functions.

- Store your DOCTYPE in a config variable and update your entire site from XHTML 1.1 to HTML 5 easily
- Developing your app with `<h1>Something</h1>` then realizing your headers in 500 different view files need `<h1><span>Something</span></h1>`
- Fetching metadata from a database and outputting with `meta()`
- Adding Google event tracking to images loaded with `img()`
- Set your page titles (display headers, not title tag) to use a config variable 1 to 6 in case your CMS needs to change what level the links are.
- XSS protection for forms using `form_open()` and `form_close()`. Derek Allard hinted at this some time ago and I still hope to see it happen.

There are all sorts of crazy things you can do with HTML helpers and while it might be hard to see their value before you have the "aha!" moment, it is a pain to realise you need to use them when it is too late.
