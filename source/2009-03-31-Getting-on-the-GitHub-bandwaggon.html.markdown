---
layout: post
title: Getting on the GitHub bandwaggon
category: git
alias: blog/2009/03/Getting-on-the-GitHub-bandwaggon
excerpt: I have finally joined GitHub and I am pretty happy about the decision. It
  seemed like a bit of a silly fad at the start but it is definitely more than that
  and for me, solved a few problems in one. Mainly, how to run multiple projects based
  on one code-base without being stuck in the same repo; I'm looking at you SVN.
date: '2009-03-31 10:44:00'
comments: true
disqus_identifier: Getting-on-the-GitHub-bandwaggon
---

Whilst developing my recently nameless CMS I have been maintaining several sites from within the same SVN repository so I can do simple upgrades between CMS versions. This is fine for philsturgeon.co.uk and the still unfinished [serverofdoom.co.uk](http://serverofdoom.co.uk/), but for client sites it is a nightmare.

 
 

I have of course played with patch files but have had trouble with these between major CMS changes. Having to do all this over the command line due to the limitations of the SVN clients available on Mac OS X means they can be fiddly and un-reliable.for codebases where files may not be available and generally are not such a smooth way of handling upgrades.

 
 

So after a long time of wondering but I have finally decided the answer to my prayers is [Git](http://git-scm.com/) and the best provider for this to be [GitHub](http://github.com/). It's free for public work and only starts charging you when you want private projects and teams of collaborators.

 
 

I will not go into massive detail explaining the benefits of Git over SVN in this post but from my research and basic usage I have noticed the following.

 
 
- **Merging across separate repositories** - I can host my CMS in one, and philsturgeon.co.uk in another and still merge changes in.
- **Speed** - works much quicker than SVN
- **Easier merging** - Just enter the name of the branch you wish to merge to trunk and it does the rest.
- **Shorter commands** - don't need to write out full URL's for simple stuff like branching and merging, it works it out for you based on branch names alone.
 
 

As a downside, the only client I could find for Mac was [GitNub](http://wiki.github.com/Caged/gitnub) which is a repository viewer only. At least there is an Eclipse plugin for cross-platform support. I will write up how well that works out when I have got it set up.

 
 

Until I get this CMS ready for the world and into a public repository on GitHub, you can check out a few of my CodeIgniter libraries on my [GitHub profile](http://github.com/philsturgeon) and see what I'm up to.

 
 

In the mean-time, if you are wondering about getting started with Git, check out GitHub's wonderful [list of guides](http://github.com/guides/home) covering everything on how to get started, to how to become a pro.

