---
layout: post
author: [Phil]
title: Tips for a Subversion addict learning Git
tags: [git]
excerpt: I have been using Subversion for years and have come to know it like the
  back of my hand. Recently I began using Git and it was a much trickier transition
  than I had expected. Now I have finally found my feet with the basics of Git I thought
  I should take the time to explain my main points of confusion during the learning
  stage and give you a few things to look out for.
date: '2009-05-11 14:42:00'
comments: true
disqus_identifier: Tips-for-a-Subversion-addict-learning-Git
alias: blog/2009/05/Tips-for-a-Subversion-addict-learning-Git/
alias_1: git/2009/05/11/tips-for-a-subversion-addict-learning-git/
---

This post is a mixture of things learnt from IRC, educated guesses and the results of _many_ hours of trial and error.

### Local & Remote repositories

In Subversion you have one repository which all of your code is submitted to directly when a commit is made. This is very different for Git and is what makes it a "distributed" version control system. A repository can be on a SSH server, GitHub, a local folder or network drive. Each repository is given a nickname, which is called a "remote".

    git remote add origin git@github.com:philsturgeon/pyrocms.gitgit pull origin master

The name of this new remote repository is "origin", but it can be anything you like.

The pull command fills your local repository with commits from the remote repository for the "master" branch, which is essentially the same as the Subversion "trunk".

As I mentioned earlier, when you make a commit it doesn't actually send the changes anywhere. To do that you need to use git push.

    git push origin master

This just sends any commits on your local repo to the remote repo.

**Summary of point:** Subversion only has one repository, Git can have any number from 1 to... lots.

### Local & Remote branches

In Subversion seeing as you only have the one repo, all branches exist there and all your commits update that branch straight away. Git has branches stored in two places, local and remote. This idea confused the hell out of me when I first heard about it but after learning to understand point #1, this became very useful.

Git allows you to create a local branch, check it out, work on it and commit to it all offline without contacting the remote repo. Eg:

    git branch ticket5git checkout ticket5git commit -a -m "Committing changes"

Then when you are done, you may send all of your commits to the remote branch in 'origin' using push again.

    git push origin ticket5

This is what the guide meant when it said "You will never directly modify a remote branch." because you don't, you work on a copy of that branch then send that copy to the repo when you are done.

**Summary of point:** You can commit, switch and merge branches offline then send it all off online.

### Empty folders

Subversion can add a folder in the same was as you can add a file. Git has a known bug that simply ignores any folder with no files in it. No matter what you do, you cannot add or commit an empty folder. Always just add a index.html or another empty file if that folder needs to be there.

The developers know about this, but to quote from the official [Git FAQ](http://git.or.cz/gitwiki/GitFaq):

> "...nobody competent enough to make the change to allow empty directories has cared enough about this situation to remedy it.". Fair enough then.

**Summary of point:** Make sure each directory has at least one file.

### Do not rename

Just don't even bother trying, it seems to just break at random. It is better to copy the file(s), set the new name and delete the old copy. My worse rename experience was renaming "public\_html" to "application" in the PyroCMS repo. It added "application" but kept an empty directory structure of some of "public\_html" and it was a nightmare to remove this ghost directory as it did not exist in local copies and could not be pulled or fetched.

**Summary of point:** Do not rename a thing, copy and delete.

### Get a Mac or use Linux

Seriously, do not try install Git on a Windows machine unless you are a masochist: it is NOT worth it. Use anything with a Unix shell and the install will be done in minutes.

That said, installing Git on CentOS 5 was an absolute nightmare for me as well.

If you are using Windows, give [SmartGit](http://www.syntevo.com/smartgit/ "Visual GUI for Windows & Git") a try. It actually makes the whole process rather painless.

**Summary:** Git is one confusion S.O.B when you first start using it, but it soon begins to make sense if you stick with it. Read the manuals, use the command line and try to stop thinking like a Subversion user. Ignore what you know about Subversion and learn Git like it is something brand new. If you can't forget about Subversion then head my advice here and save yourself the headaches I have suffered the last 2 weeks.
