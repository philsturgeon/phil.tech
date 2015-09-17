---
layout: post
title: 'How to: Create a Twitter feed with full syntax support'
category: php
alias: blog/2009/07/How-to-Create-a-Twitter-feed-with-full-syntax-support/
excerpt: 'If you have a project that you would like to add a Twitter feed to, but
  do not want to add in a massive library for the one feed, take a look at this very
  simple PHP snippet that will give you full synatx support. '
date: '2009-07-28 09:32:00'
comments: true
disqus_identifier: How-to-Create-a-Twitter-feed-with-full-syntax-support
---

If you have a project that you would like to add a Twitter feed to, but do not want to add in a massive library for the one feed, try this little snippet of procedural code that I recently implemented on [pyrocms.com](pyrocms.com "PyroCMS - a modular open source CodeIgniter CMS").

### Expressions

#### Detect URL's

` '|([a-z]{3,9}://[a-z0-9-_./?&+]*)|i' => '<a href="$0" target="_blank">$0</a>', `

#### Detect E-mail addresses

` '|[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,6}|i' => '<a href="mailto:$0">$0</a>', `

#### Detect @usernames's

` '|@([a-z0-9-_]+)|i' => '<a href="http://twitter.com/$1" target="_blank">$0</a>', `

#### Detect #tags

` '|#([a-z0-9-_]+)|i' => '<a href="http://twitter.com/search?q=#$1" target="_blank">$0</a>' `

### Example

Lets put this together to create a very simple working example.

`<?php// Fetch the Tweets in JSON form and convert to a PHP object                                                                                                           $tweets = json_decode(     file_get_contents('http://twitter.com/statuses/user_timeline/philsturgeon.json?count=10'));// List all regular expression rules$patterns = array(    // Detect URL's    '|([a-z]{3,9}://[a-z0-9-_./?&+]*)|i'     => '<a href="$0" target="_blank">$0</a>',        // Detect Email    '|[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,6}|i' => '<a href="mailto:$0">$0</a>',        // Detect Twitter @usernames    '|@([a-z0-9-_]+)|i'     => '<a href="http://twitter.com/$1" target="_blank">$0</a>',        // Detect Twitter #tags    '|#([a-z0-9-_]+)|i'     => '<a href="http://twitter.com/search?q=#$1" target="_blank">$0</a>');// Loop through tweetsforeach($tweets as $tweet){    // Run all rules to replace syntax with HTML    $tweet->text = preg_replace(array_keys($patterns), array_values($replace), $tweet->text);        // Display the tweet with syntax enabled    echo '<p><strong>'.date('d/m/Y', strtotime($tweet->created_at)) . '</strong> ' . $tweet->text.'</p>';}?>`

This is not following perfect coding practices, it will not cache data and might not be the most optimal implementation but I was trying to keep the amount of code low to show the simplicity of how it can be achieved.

Instead of showing a users timeline you can use the same code to show search results with the url:

> http://search.twitter.com/search.json?q=pyrocms

Now, go forth and tweet!
