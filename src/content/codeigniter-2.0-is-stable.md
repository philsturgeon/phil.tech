---
layout: post
author: [Phil]
title: CodeIgniter 2.0 is stable (enough)
tags: [codeigniter]
excerpt: For the last 7 months since CodeIgniter 2.0 was released on BitBucket  the
  question "when will it be stable?" has been all bouncing around all  over the place.
  The truth is CodeIgniter 2.0 has been stable for months.  Somebody at EllisLab could
  open the  terminal and write $ hg tag v2.0;  hg push; right now, but what would
  that actually give us?
date: '2010-10-18 20:11:00'
comments: true
disqus_identifier: codeigniter-2.0-is-stable
alias: blog/2010/10/codeigniter-2.0-is-stable/
alias_1: codeigniter/2010/10/18/codeigniter-2.0-is-stable/
---

For the last 7 months since [CodeIgniter](http://codeigniter.com/) 2.0 was [released on BitBucket](http://codeigniter.com/news/ellislab_moves_to_mercurial_assembla_bitbucket_codeigniter_2.0_baking/) the question "when will it be stable?" has been all bouncing around all over the place. The truth is CodeIgniter 2.0 has been stable for months. Somebody at EllisLab could open the terminal and write $ hg tag v2.0; hg push; right now, but what would that actually give us?

CodeIgniter 2.0 is a major release, which means this has been a perfect chance for [EllisLab](http://ellislab.com/) to make major changes that effect compatibility. One example of a major change is that our Models now need to extend CI\_Model instead of Model. That is an acceptable change for a major release, but think of the outcry if that was done after EllisLab had tagged v2.0. They would have to release a v2.0.1 which would not be compatible with v2.0, and that would be plain ridiculous. I've been told we shouldn't have any massive changes coming, but for now EllisLab still have that option. If any big changes do happen you don't need to worry about them breaking anything as you should be watching the RSS feed/changelog before grabbing a newer revision anyway.

> "But there are f\*\*kloads of bugs in the issue tracker!"

Yeeeaaahhh... no. At the time of writing there are 93 issues in the [Issue Tracker](http://bitbucket.org/ellislab/codeigniter/issues) on BitBucket. The vast majority of those are invalid, irrelevant, ridiculous or badly described and non-repeatable. Another thing to remember is that most of these issues (and more) exist in CodeIgniter 1.7.x. I have found several bugs in 1.7.2 that I have fixed and pushed in 2.0. Now that CodeIgniter 1.7.x is frozen, all fixes for any bugs discovered are going into 2.0. That means CodeIgniter 2.0 is actually more stable than 1.7.2.

Looking at this from another angle you need to bare in mind that EllisLab maintain two commercial products built on top of CodeIgniter 2.0. [ExpressionEngine](http://expressionengine.com/) (until the 2.1.1 release tonight) was still pretty buggy and [MojoMotor](http://mojomotor.com/) was only released at the end of July. Imagine how annoying it would be for you if one guy at work was going mental changing everything while you were trying to fix bugs with a unstable system? I'd be having serious words with him that's for sure.

So, EllisLab have been busy working on ExpressionEngine and MojoMotor while only really fixing a few CodeIgniter bug's here and there. I'd say that's fair enough right? After-all those two applications are the main bread and butter of the company. Does this mean that CodeIgniter will end up stagnating? Hell no.

[ExpressionEnigne just hit 2.1.1](http://expressionengine.com/blog/entry/expressionengine_2.1.1_released/) and I have been assured by EllisLab CTO Derek Jones that within the next week we'll start to see a signification increase in commits to the repository. The less they need to concentrate on fixing bugs in ExpressionEngine the more they can start to work on CodeIgniter and take it forward as a framework that can benefit us as much as them.

My advice to you, [download the latest copy](http://bitbucket.org/ellislab/codeigniter/get/tip.zip) and have a play. If your application worked in v1.7.2 it will work in v2.0 and [the upgrade](/blog/2010/05/upgrading-to-codeigniter-2.0) is pretty simple.
