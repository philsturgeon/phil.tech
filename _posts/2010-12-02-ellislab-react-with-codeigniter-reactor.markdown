---
layout: post
title: EllisLab react with CodeIgniter Reactor
category: codeigniter
permalink: blog/2010/12/ellislab-react-with-codeigniter-reactor
excerpt: " \n\tTwo weeks ago we had some interesting news from EllisLab about the
  planning of a \"Official CodeIgniter Community Branch\" in which \"CodeIgniter Deputies\"
  would be appointed to manage community contributions. That was pretty awesome, but
  today we've had some even better news about the future of CodeIgniter. That is:
  The CodeIgniter Reactor! "
date: '2010-12-02 22:52:00'
comments: 'true'
disqus_identifier: ellislab-react-with-codeigniter-reactor
---

So it's been a month since my post " [CodeIgniter: What happens next?](/blog/2010/10/what-happens-next)" and things have changed drastically in the world of CodeIgniter. That post was regarded by some as me saying "I hate CodeIgniter, you suck" which could not have been further from the truth. The article was meant to express my concerns that CodeIgniter was not progressing, the downfalls that need to be addressed and a public "so it's a little boring right now, I'm going to give Fuel and Rails a try for fun". This was a badly written article that focused too much on the nagative points and accidentally caused a shit-storm of tweets and response posts. Oops!

Since what some have referred to as "CodeIgniter-gate" EllisLab's have done a great job of listening to the points raised by me and other members of the community and in part I believe we have effected change. Two weeks later we had some interesting news from EllisLab about the planning of a " [Official CodeIgniter Community Branch](http://codeigniter.com/news/the_official_codeigniter_community_branch/)" where "CodeIgniter Deputies" (or Engineers as they are now called) would be appointed to manage community contributions. That was pretty awesome, but today we've had some even better news about the future of CodeIgniter. That is: The CodeIgniter Reactor!

Codeigniter at this point is splitting into two slightly different versions:

#### CodeIgniter Core

Commits to this branch will be managed entirely by EllisLab as CodeIgniter has been to date. It will be a slow-moving, heavily tested version that EllisLab will be using as a base for their commercial products ExpressionEngine and MojoMotor. Releases will be less often but it will be brilliant for running client systems or large-scale in-house projects which you need to be mission critical and stable as hell because you KNOW it will work well.

#### CodeIgniter Reactor

The Reactor branch will be managed entirely by the 6 CodeIgniter Engineers - of which I am one. This branch will be used to merge in community changes that we agree will be of benefit CodeIgniter without drastically changing the entire thing. It will be used as a test-bed for features that we want and the best will be merged by EllisLab as and when they see fit, if they feel it is of benefit to the stable Core branch. I know I speak for some of the Deputies when I say changes to this branch should be kept as simple as possible. We're not looking to totally re-write the architecture as some have suggested and we aren't just going to throw in ORM and HMVC just for the hell of it. The answer on those two will most likely remain as it always has done: "If you wan't it, install it".

### Good news right?

Hell yes. This is exactly what the CodeIgniter community has been looking for. EllisLab need to keep their core version working for themselves of course and have always suggested that if a feature is to be integrated then it needs to be heavily tested first. So we can take and make changes, test them and if they like em they'll be merged. Spot on!

### But... but...!

Now I'm going to preempt a few of the comments on this post, based in part by some of the general comments I've seen flying around Twitter after the original "Official Community Branch" post by EllisLab.

> Why are there two versions? This will confuse the community!

Not at all, this is how open-source works. Let's look at Red Hat as an example. Red Hat is a stable commercial project that they sell and is the core product of their company. Red Hat Fedora is the "leading edge" of their distribution, where they back-port features when they see fit. This works brilliantly for them, let's see if it works for the CodeIgniter community.

> This is just EllisLab being lazy and giving up on development

If you think that you're a fucking idiot who doesn't deserve a response. I've seen a few people saying this, go lick a window. I'll say again: "this is how open-source works".

### Making Feature Requests

There used to be a forum for this, but useful suggestions were always lost in a sleugh of crappy or repeated suggestions. 5000 "LETS HAVE ORM!!!11" posts would hide useful suggestions and code-fixes, so they never happened. That forum has now been closed and instead EllisLab and the CodeIgniter Engineers be looking at a [UserVoice feedback forum](http://codeigniter.uservoice.com/). This will allow members to vote features up, so those that the community want will be clear to see amongst other suggestions that not so many people want or need.

### Contributing Code

Same as right now. Fork, commit and send a pull request! I am toying with the idea of setting up a copy of the [repo on GitHub using the hg-git](news/2010/07/bitbucket-or-github) plugin. That would be purely so people who don't understand Mercurial/BitBucket can get involved, but of course learning it would make the process more centralized.

### So when can we get our grubby mitts on this sexy new code?

Next year. First quarter of 2011. We have to plan, develop and create, but you can be certain our first order of business is raising the bug tracker to the ground. Fix  the old then improve the new!

CodeIgniter is about to get exciting again guys, watch this space!

