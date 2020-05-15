---
layout: post
author: [Phil]
title: Asset handling in CodeIgniter with the BASE tag
tags: [codeigniter]
excerpt: There are many suggested ways to handle your assets in CodeIgniter (including
  my very own Asset library) but this solution has to be one of the easiest. Read
  on to find out what it is!
date: '2009-09-17 12:21:00'
comments: true
disqus_identifier: Asset-handling-in-CodeIgniter-with-the-BASE-tag
alias: blog/2009/09/Asset-handling-in-CodeIgniter-with-the-BASE-tag/
alias_1: codeigniter/2009/09/17/asset-handling-in-codeigniter-with-the-base-tag/
---

There are many suggested ways to handle your assets (CSS, images, JavaScript, etc) in CodeIgniter including my very own [Asset library](http://github.com/philsturgeon/codeigniter-asset "CodeIgniter Asset library - Load CSS, images & JavaScript easily"). Some people use paths relative to the web root like this:

`<img src="/image/logo.gif" alt="Logo" />`

This method works fine if your application will only EVER exist in the web root. If that works for you, fine, no need to read on.

Those that need their assets to be found wherever their CodeIgniter application happens to sit (root, sub-directory, sub-domain) can use libraries, helpers or add base\_url() in front of all references to an asset. This does work but seems a bit overkill for something that can be handled with HTML.

My new evil scheme? Use the lesser-known HTML tag <base> to get all of our links and references working perfectly. This should go into the <head> of your document.

`<base href="<?=base_url();?>">`

Now all your relative links will be relative to your base\_url. Brilliant!

`<img src="images/logo.gif" alt="Logo" />`

That will work fine, assuming your images are stored in public\_html/images. Use some common sense on that.
