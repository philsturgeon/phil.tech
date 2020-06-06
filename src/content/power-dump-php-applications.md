---
layout: post
author: [Phil]
title: Power dump() on your PHP applications
tags: [php]
excerpt: Application development going a bit slowly? Take a power dump() and get right
  back on track. This handy little PHP function will output the what, why, when, where
  of your variables and help you get back on track.
date: '2010-09-28 19:04:00'
comments: true
disqus_identifier: power-dump-php-applications
alias: blog/2010/09/power-dump-php-applications/
alias_1: php/2010/09/28/power-dump-php-applications/
---

When trying to work out what the hell is going wrong in your PHP application the first thing most of us start doing is madly start var\_dump()'ing everything possible to work out where the problem is. var\_dump() is fine, but by default it comes out in one line. So then we need to echo `<pre>` tags. Then we can't always see whats going on, especially if the background is black and bla bla bla so it goes on.

One option is to install XDebug which does basically the same thing, but sadly we don't all have access to SSH for our servers. Shared hosting, limited shell, can't install stuff, whatever. I spend a lot of time with CodeIgniter which is all about portability, make your stuff work anyway.

Using this handy function (which I have set up as a CodeIgniter debug\_helper or native PHP debug\_functions.php) I can dump any number of variables and always be able to see whats going on.

    /** * Debug Helper * * Outputs the given variable(s) with formatting and location * * @access public * @param mixed variables to be output */function dump(){ list($callee) = debug_backtrace(); $arguments = func_get_args(); $total_arguments = count($arguments); echo '<fieldset style="background: #fefefe !important; border:2px red solid; padding:5px">'; echo '<legend style="background:lightgrey; padding:5px;">'.$callee['file'].' @ line: '.$callee['line'].'</legend><pre>'; $i = 0; foreach ($arguments as $argument) { echo '<br/><strong>Debug #'.(++$i).' of '.$total_arguments.'</strong>: '; var_dump($argument); } echo "</pre>"; echo "</fieldset>";}

Thanks to the fact this shows the line number and file it was called from I also manage to avoid those annoying "where the hell did I put that debug?!" situations, which is one of the main causes of swearing in my office.

Give it a try.
