---
layout: post
title: What happened to Modular Separation?
category: codeigniter
permalink: blog/2010/09/what-happened-to-modular-separation
excerpt: Modular Separation for CodeIgniter is no more. It has kicked the bucket,
  shuffled off the mortal coil, run down the curtain and joined the bleedin' choir
  invisible!! THIS IS AN EX-PARROT!!
date: '2010-09-19 17:56:00'
comments: 'true'
disqus_identifier: what-happened-to-modular-separation
---

[Modular Separation](http://codeigniter.com/wiki/Modular_Separation/) for CodeIgniter is no more. It has kicked the bucket, shuffled off the mortal coil, run down the curtain and joined the bleedin' choir invisible!! THIS IS AN EX-PARROT!!

Obscure Monty Python references aside, support for Modular Separation has been dropped in place of Modular Extensions. Both projects were developed by [wiredesignz](http://twitter.com/wiredesignz) who has recently returned to active development after a period of inactivity.

I've been supporting Modular Separation for several months in his absence keeping it working with CodeIgniter 2.0, fixing any bugs and helping to get it known, but 99% of the work was done by wiredesignz himself.

Now he is back to developing he has merged Modular Separation back into Modular Extensions taking the best from both. Modular Extensions adds HMVC aspects to your modules which means you can load controllers from other controllers which Modular Separation did not support. To continue using modules in the same way as in Modular Separation simply do not use or include the MX/Controller or extend from MX\_Controller, just use the old Controller in the same way.

The [Modular Extensions](http://codeigniter.com/wiki/Modular_Extensions_-_HMVC/) wiki page should contain everything you need to know about installation. It is essentially a case of replacing MY\_Router and MY\_Loader with the new ME code, and if you want HMVC you need to start using MX\_Controller.

Enjoy.

