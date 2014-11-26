---
layout: post
title: BitBucket or GitHub? Use both!
category: git
permalink: blog/2010/07/bitbucket-or-github
excerpt: 'Over the last few months I have seen several discussions by many developers
  - especially in the CodeIgniter community - about whether or not to convert their
  GitHub repo''s over to BitBucket. I say: why not use both?'
date: '2010-07-24 09:35:00'
comments: 'true'
disqus_identifier: bitbucket-or-github
---

Over the last few months I have seen several discussions by several developers - especially in the CodeIgniter community - about whether or not to convert their [GitHub](http://github.com/) repo's over to [BitBucket](http://bitbucket.org/). I say: why not use both?

That may initially sound confusing and like a lot of hard work, but using the brilliant [Hg-Git](http://hg-git.github.com/ "Hg (Mercurial) and Git plugin") plugin from the GitHub developers it really has been made easy to do. Essentially the Hg-Git plugin allows Hg to talk to a Git repository like it was a Mercurial repo.

I have recently done this with pretty much all of my repositories as I was split half and half between the two. Some code on GitHub and some on BitBucket. Now pretty much everything can be found on both profiles, including Modular Separation, Template and Dwoo parser. Even my CodeIgniter fork is on both!

A picture says a thousand words, a video says a gajillion more:

<object style="width: 780px; height: 510px; display: block; margin-left: auto; margin-right: auto;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="780" height="510" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">
<param name="src" value="http://blip.tv/play/g7lmgfDEbAA.m4v">
<param name="allowfullscreen" value="true">
<embed style="width: 780px; height: 510px; display: block; margin-left: auto; margin-right: auto;" width="780" height="510" src="http://blip.tv/play/g7lmgfDEbAA.m4v" type="application/x-shockwave-flash"></embed>
</object>

[iPhone version](http://blip.tv/file/get/Philsturgeon-BitBucketOrGitHubBoth754.mp4)

For those of you who don't have time to watch the whole video, or if you can't stand my accent here are the basic commands:

    $ hg clone git+ssh://git@github.com:philsturgeon/codeigniter-prowl.git
    $ mv codeigniter-prowl.git codeigniter-prowl
    $ cd codeigniter-prowl
    $ vim .hg/hgrc

When you are in the config edit mode change default = to github = then add a new line with your BitBucket ssh repo address. Then you can change some code and (without having to use a staging area you) you can simply do:

    $ hg commit -m "Stuff changed"
    $ hg push github
    $ hg push bitbucket

The one and only niggle I have spotted so far is that you can't delete your Git tags on a remote repo. I don't see that to be a major issue as normally you wouldn't need to delete one, you'd simply re-tag and push over the top. If you do the only option I have found is to quickly git clone your repo and remove it with git push origin :tagname.

Give this a try and let me know how it goes for you. I find it really helpful, do you?

