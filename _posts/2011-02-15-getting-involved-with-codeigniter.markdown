---
layout: post
title: Getting involved with CodeIgniter
category: codeigniter
permalink: blog/2011/02/getting-involved-with-codeigniter
excerpt: " \n\tWhat makes Reactor so much more different than CodeIgniter has been
  in the past? Anyone can be involved whether you are a hard-core developer who is
  happy to jump into the codebase and start changing things and adding features, or
  a new user who just wants to request some new features, you can do this on the UserVoice
  or send in your code using BitBucket and GitHub. "
date: '2011-02-15 22:05:00'
comments: 'true'
disqus_identifier: getting-involved-with-codeigniter
---

Now that CodeIgniter (Reactor) 2.0 is out people are starting to get involved, which is great. There are still a few stragglers getting confused over branch names and having arguments over the philosophy of CodeIgniter, but it all seems to be dying down a little bit. To put it simply, CodeIgniter Reactor 2.0 is CodeIgniter. When you upgrade, this is what you will most likely be upgrading to, it is the version you will download when you go to the CodeIgniter homepage and as long as you don't go randomly wandering around BitBucket accidentally downloading development versions then it will be pretty stable. In fact, CodeIgniter Reactor 2.0 has fixed about 30 bugs that existed in 1.7.x so it is actually way more stable.

So with that out of the way, what makes Reactor so much more different than CodeIgniter has been in the past? Well that is easy, anyone can be involved whether you are a hard-core developer who is happy to jump into the codebase and start changing things and adding features, or a new user who just wants to request some new features, you can do this on the [UserVoice](https://codeigniter.uservoice.com/forums/40508-codeigniter-reactor). On here are lots of features and we already have some features over 800 vote points (people can spend 10 each, up to 3 at a time, so that is not actually 800 votes). Now I think it is important to address here, that just because a feature is asked for, does not mean 100% it will happen, it just means it will be noticed over other feature requests and discussed. For example, if 100 people go in there and ask for a .NET GUI for generating code... well tough, that still is not going to happen. The fact that we vet feature requests after a full discussion should be seen as a plus, because the community sure would not be happy if we just ran around making every single change that anybody asked for. Then CodeIgniter might as well just be a Microsoft product and would loose its lightweight claim to fame!

### You seem to say "we" quite a lot

Unlike Queen Victoria I do not use the term "we" to describe myself, I am referring to the Reactor Engineer team. We are a team of 6 long-time CodeIgniter developers who accepted the challenge from EllisLab and applied to help manage a community version of CodeIgniter. The community asked for change and EllisLab responded with a way for us to do it. Great!

### What to expect from the Engineers

Expect dedication but don't expect the world. There have been numerous complaints that are entirely contradictory.

1. They'll just change everything and change the framework that I love beyond recognition.
2. They aren't doing enough, why don't we have namespaces, static classes up the wazoo and a zillion other random features?!

Well it looks like we can't win eh? ;-)

The Reactor Engineers are mostly people who work with CodeIgniter on a regular basis. Myself, I have been using CodeIgniter every single day on my 9-5 for the last 14 months and a fair bit for the 4 years before that, so I am around it alot. As somebody who uses CodeIgniter this much it is easily fair to say I have written more CodeIgniter based apps than EllisLab! As such I notice a lot of things that are missing or just plain broken and I really wanted to be in a situation where I could make those changes easily. When I notice an error, or a friend of mine working on a commercial app notices an error, or one of the 100 people who email me about CodeIgniter every single bloomin' day notices an error, I sure want to be able to fix is ASAP.

That is exactly the sort of thing the Engineers are about: helping to facilitate change.

### Sweet, can you facilitate my change?

Damn right. Here are some simple rules to get your changes into CodeIgniter:

1. [**Follow the EllisLab Coding Standards**](http://codeigniter.com/user_guide/general/styleguide.html) - They are pretty simple and mean that all of CodeIgniter will look like Rick Ellis himself wrote it. Remember, he is a black belt so that is a good thing.
2. **Documentation** - Documenting your own code might be boring, but it's a lot more boring for us to document other peoples code when they are the ones providing the changes. Supply all features and changes with documentation. Some may only be an update to the changelog, some will be entire library docs, just make sure it is right and fits in with the rest.
3. **Test** - There is no point sending in busted code. Write the change into your applications, test the balls off it and submit the change when it's done.
4. **Use [BitBucket](https://bitbucket.org/ellislab/codeigniter-reactor) / [GitHub](https://github.com/philsturgeon/codeigniter-reactor)** - You can send the changes via a Pull Request on either repository. The GitHub one is a personal repo I use to help Git users get their changes in, but has EllisLab's blessing.

### What change is good change?

A good change to make is one that has been really useful to you. Not just on one project, but on lots. If that change is on UserVoice then even better! Drop a comment on there saying you are going to work on it, then leave another when it is done with a link to the change. That means the Engineers and all the other users interested in that change can have a look.

An example of a good change recently is things like GET string support, or supporting multiple environments. The code for these was tiny, but was pretty darn useful for a lot of developers. Other changes are things like adding  decimal, less\_than and greater\_than rules to Form Validation or adding the audio/mp3 mime type to the mimes.php config. We aren't trying to re-invent the framework or create artificial intelligence, just make it better one step at a time.

### What is a bad change?

Don't create something just for the hell of it. If you make a feature and only test that feature in a plain install with no real world usage, that feature is going to suck.

Also I've seen quite a few "CodeIgniter haz to haz _Sprockets_ because X and Y Framework have them!!!11one" and this is a terrible reason to do anything. If you instead think "I really like the way Kohana has implemented this feature, perhaps I will work it into my application and test it as I go, then see if anybody else is interested" then good work, you might have yourself a feature for 2.1.

### Summary

CodeIgniter Reactor is here to stay and is a tool for good. It is lightweight, stable, useful and has a great following, but us Engineer folk are not going to spend our entire free time working on features for the hell of it, nor should we be expected or needed to. Everyone who wants and needs a feature in CodeIgniter has the equal opportunity to get their code into place and anybody who has been using CodeIgniter for more than a few months can dedicate something useful. As for the size of the changes, we are taking things slow for now and changes will eventually ramp up but nobody should be scared of using it.

Now hopefully we can all stop posting about "the status of the community" or "the future of CodeIgniter" and having silly arguments on the forums and get back to writing some code. I'll have a sweet new version of [PyroCMS](http://pyrocms.com/) out fairly soon and [Pancake](http://pancakeapp.com/) 2.1 needs to get done. Both of which will be running on Reactor and taking full advantage of the new changes!

