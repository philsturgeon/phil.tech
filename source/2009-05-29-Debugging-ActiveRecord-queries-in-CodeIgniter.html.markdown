---
layout: post
title: Debugging ActiveRecord queries in CodeIgniter
category: codeigniter
alias: blog/2009/05/Debugging-ActiveRecord-queries-in-CodeIgniter
excerpt: When you have an ActiveRecord call that just will not work, it can be a pain.
  To save asking questions on the CodeIgniter forums that you could answer yourself,
  try these steps.
date: '2009-05-29 12:56:00'
comments: true
disqus_identifier: Debugging-ActiveRecord-queries-in-CodeIgniter
---

When you have an ActiveRecord call that just will not work, it can be a pain. Many developers seem to find an issue and instantly ask for help, which often takes a great deal longer than it would to work it out on your own.

To save asking questions on the CodeIgniter forums that you could solve yourself, try these steps:

1.) Output the final query and see if it looks right. Do this after your model call or within the model after $this->db->get().

` // Clear any existing output (optional) ob_clean(); echo $this->db->last_query(); // Stop PHP from doing anything else (optional) exit(); `

2.) If it looks fine, try running it in phpMyAdmin or another GUI.

3.) If it fails, you get an error message from MySQL server telling you what’s wrong. It will make it pretty obvious what change needs to be made to get it working.

4.) If it runs fine, then CodeIgniter is not running the query correctly. This could:

a.) CodeIgniter is logged into MySQL with a different user who may not have the same permissions.

b.) A condition is not being met in your model file or controller that is stopping the query from being run. Output values along the way.

Debugging is a wonderful thing CodeIgniter fans, follow these steps and you'll solve any query issues you come across.

