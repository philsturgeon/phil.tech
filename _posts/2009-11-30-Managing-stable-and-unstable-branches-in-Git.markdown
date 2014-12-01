---
layout: post
title: Managing stable and unstable branches in Git
category: git
permalink: blog/2009/11/Managing-stable-and-unstable-branches-in-Git
excerpt: 'Stable and unstable branches mean that while you work on a new version of
  your software, you maintain the current   version by working on bug-fixes and small
  tweaks. Find out how to achieve this using Git. '
date: '2009-11-30 18:42:00'
comments: true
disqus_identifier: Managing-stable-and-unstable-branches-in-Git
---

Stable and unstable branches are something that every open-source developer, project manager, or general software user should be aware of. The idea is that while you work on a new version of your software, you maintain the current version by working on bug-fixes and small tweaks.

A great example of this methodology is Mozilla Firefox. They already have branches for 3.6 and 4.0, but if a bug is noticed in 3.5.x they can still make a fix without worrying about any of their 3.6+ features getting in the way.

To do this using Git (a distributed version control system) is very simple when compared to other version control systems like Subversion. In Subversion have to keep careful notes of which trunk updates you have merged into your branch, spend ages looking through logs for the correct merge points and messing around with long URL based merge commands. IF you don't know what I'm talking about, don't worry. Subversion sucks so put it out of your mind.

### Branch naming conventions

By default, every Git repo has one branch called **master**. I like to make sure this branch always has a relatively stable release of the code so although it can be considered "bleeding edge", a user should always be able to pull and not be bombarded with errors.

So if master contains our current release, what should we call our new branch? Let's use PyroCMS as an example so we have some numbers to work with.

The current release of PyroCMS at time of writing is v0.9.7.2, and that sits in the master. I have created a new branch called v0.9.8-dev to contain all new features for v0.9.8.

### Creating the branches
> # when in master  
> git branch v0.9.8-dev  
> git checkout v0.9.8-dev  
> git push origin v0.9.8-dev

This creates a branch for user A, switches to it and pushes it to the origin remote repository. Once thats done, other people can use it via:

> # when in master  
> git branch v0.9.8-dev  
> git checkout v0.9.8-dev  
> git pull origin v0.9.8-dev

This creates a branch on user B's local repository, switches to it and pulls the current copy of v0.9.8-dev merging in any of their master changes at the same time (effectively updating the branch too).

### Submitting work

Now everybody has a branch, people can switch between master and v0.9.8-dev putting their code into whichever branch is relevant for the task. For this use the usual combination of git status, git add and git commit (a.k.a "S.A.C" = if you don't run status, add, then commit I will SAC your ass from the team).

> git status

Shows which files have been changed. Nothing will be added to the commit until you run add/rm.

> git add folderA folderB/fileB1.html fileC\*.php

That will add anything in folderA, only fileB1.html within folderB and fileC1.php, fileC2.php, fileC3.php etc. With selective use of add and rm you should be able to avoid committing anything you don't mean to, like cache files or your database config files (you know who I'm talking about guys :-p).

With that done, commit with with a simple:

git commit -m "This system now makes tea quicker and better than before."

And finally, a quick pull then a push.

> # when in master  
> git pull master  
> git checkout v0.9.8-dev  
> git merge master  
> git push

Doing this ensures that the most up to date copy of master has been downloaded, v0.9.8-dev is switched to and master changes are merged in. Then by using git push and ommiting the remote name and branch, it will just push everything meaning master and v0.9.8-dev are updated simultaneously.

### Releasing new versions

When you are ready to release a new version of your stable branch, you run the following:

> git checkout master  
> git tag v0.9.7.3  
> git push origin v0.9.7.3

If instead you wish to release the new major version, you need to make sure it has all of your master changes and then:

> git checkout master  
> git merge v0.9.8-dev  
> git tag v0.9.8  
> git push  
> git push origin :v0.9.8-dev

For most of you, that command is probably the most confusing of the lot. What this does it switch to master, merge in all of your v0.9.8-dev branch changes, tag the new release in the local repository and then push everything to your remote. Then right at the end it deletes the unstable branch and your transition is complete!

That then means its time to blog, tweet then party. Your new version is out and that means go to the pub as quick as possible with your phone off so you dont have to worry about bug-fixes. Tomorrow - when the hangover wears off - it's time to go back to the start and begin working on your new stable and unstable versions.

