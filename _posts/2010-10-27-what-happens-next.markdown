---
layout: post
title: 'CodeIgniter: What happens next?'
category: codeigniter
permalink: blog/2010/10/what-happens-next
excerpt: " \n Times have been hard for the developers of CodeIgniter - EllisLab and
  they have addressed this in a few ways: A spot on the ExpressionEngine Podcast,
  a few articles explaining the future of EllisLab and ExpressionEngine and how they
  plan to take things forward. Sadly, as always us CodeIgniter developers have been
  left with not much more than a nod and a pat on the head. "
date: '2010-10-27 15:07:00'
comments: true
disqus_identifier: what-happens-next
---

 **Update 31/01/2011:** Things have changed a great deal since this article was written and now CodeIgniter 2.0 is released with Reactor (a community powered branch) being considered the default version of CodeIgniter. I am very happy with CodeIgniter, but this article may suggest otherwise. I'll leave it up as an explanation of problems at one point in CodeIgniter's life-time.

Times have been hard for the developers of CodeIgniter - EllisLab and they have addressed this in a few ways: A spot on the ExpressionEngine Podcast, a few articles explaining the future of EllisLab and ExpressionEngine and how they plan to take things forward. Sadly, as always us CodeIgniter developers have been left with not much more than a nod and a pat on the head.

This most recent pat came in the form of [What's Happening Now?](http://codeigniter.com/news/whats_happening_now/) which is the CodeIgniter branch of their acknowledgements to the recent article " [A Plea to EllisLab](http://thenerdary.net/articles/entry/a_plea_to_ellislab)". Kenny's article was extremely well written and got a lot of attention from the ExpressionEngine community about the issues at EllisLab. They responded with " [I hear You](http://thenerdary.net/articles/entry/a_plea_to_ellislab)" and went onto the [EE Podcast #33](http://5by5.tv/eepodcast/33)but the response for the CodeIgniter community is much less useful.

I asked EllisLab to post an article to address the CodeIgniter community but the result left me feeling a bit cold.

> CodeIgniter has always been born from ExpressionEngine ... to gauge what’s happening with CodeIgniter, you can often look to ExpressionEngine.

So not much then? New features for ExpressionEngine very rarely directly benefit CodeIgniter any more as the entire CMS is backported and squeezed on top of the framework. It has so many extended and overridden libraries calling EE a CI application is like calling Frankenstein an average bloke.

> ...we will be actively working on communicating short and long term plans for the framework to you...

This has been said repeatedly since EECI2009 with nothing done about it. Just put up a page with a rough list of Roadmap features. People have no idea what is happening in the future of CodeIgniter and they want to know.

> We are still interviewing for the open [Software Engineer position](http://ellislab.com/company/jobs/) to expand our team, which will make it easier for us to allocate _real_ resources to CodeIgniter development.

There are thousands of users ready to expand the team for free on BitBucket and plenty more who would join if they thought it would achieve anything. It took 3 years for my FTP::download() function to get merged into the core, how could I possibly hope to get something like [Migrations](http://github.com/philsturgeon/codeigniter-migrations) in there, even though plenty of people want it and [many other features](http://twtpoll.com/r/t7vaq0)?

### So what is happening to the CodeIgniter Community?

People are getting fed up. For a community that has already been waiting almost 14 months for an update, we don't have that much to look forward to. Although [CodeIgniter 2 is stable enough](/blog/2010/10/codeigniter-2.0-is-stable) to use in production there is not that much in there that is _really_ new and exciting. That might not have been such a problem 5/6 months ago when we thought it would be out soon as everybody expected to be salivating over a 2.1 feature-set by now, but we are in the same position we were in back then with no assurances that it will be any different in another 6 months. Because of this I am noticing quite a serious brain-drain of developers using CodeIgniter which has got much worse over the last few weeks.

Let's have a look at who has left EllisLab in the last month:

- [Derek Allard](http://derekallard.com/blog/post/new-challenges/)
- [Dan Horrigan](http://dhorrigan.com/blog/article/i-am-no-longer-with-ellislab)

Two very skilled developers who had a big impact on CodeIgniter and MojoMotor (another one of Ellis' products). Two people alone might not make much difference but I can think of several other skilled developers who have left CodeIgniter or are considering it. They are currently working on CodeIgniter forks, are building new frameworks themselves or are just giving up and learning Rails. Why? Because there is no excitement left in CodeIgniter anymore.

### What does that mean for the community?

The appeal of CodeIgniter over other frameworks has always been the community and the documentation. Based on the people who are talking about leaving, the IRC channel is going to be basically empty and the forums will have hardly any useful responses.

If people aren't careful or new members in the community don't step forward to support the new users, one of the two main reasons for people to come to CodeIgniter will be gone.

### What is next for me?

I have a few fun things in the works. I've been learning Ruby recently and I'll be getting into the [Ramaze](http://ramaze.net/) framework. This is not a response to my feelings about CI, just something I have wanted to do for a while.

The most exciting thing is a funky little framework called [Fuel](http://fuelphp.com/) that [Dan Horrigan](http://dhorrigan.com/) and myself have been working on over the last few days. It will essentially be some of the best ideas behind Kohana mixed with some of the logical simplicity of CodeIgniter. HMVC thought-out, migrations in the core and everything autoloaded. It is too soon to announce anything just yet, but it will definitely be worth keeping an eye on.

Something I have to stress is that this doesn't mean I'll be leaving CodeIgniter for good. [PyroCMS](http://codeigniter.com/) runs CodeIgniter 2.0 and that project is still moving forwards with great pace. I'll also be doing what I can to get people together for CICON2011 EU, UK and US (website coming soon) but I won't be doing a whole lot of anything else in CodeIgniter.

I just need something more interesting to develop with; CodeIgniter is too simple and adverse to change to provide anything new and interesting for experienced PHP developers.

