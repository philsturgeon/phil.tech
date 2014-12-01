---
layout: post
title: New CodeIgniter Documentation = Unicorn Party
category: codeigniter
permalink: blog/2011/10/new-codeigniter-documentation
excerpt: " \n\tThe CodeIgniter Community has been crying out for EllisLab and the
  development team to be more open and forward with information, developments, roadmaps,
  etc and EllisLab have taken this to heart. Yesterday they put up a \"nightly build\"
  of the new documentation which has been worked on in a GitHub branch for months
  and is not in develop and... the community said AAAAGGGGHHHHHHH! This post is an
  explanation of why the new documentation is amazing. "
date: '2011-10-06 09:37:00'
comments: true
disqus_identifier: new-codeigniter-documentation
---

The CodeIgniter Community has been crying out for EllisLab and the development team to be more open and forward with information, developments, roadmaps, etc and EllisLab have taken this to heart. Yesterday they put up a " [nightly build](http://codeigniter.com/nightly_user_guide/)" of the new documentation which has been worked on in a GitHub branch for months and is not in develop and... the community said AAAAGGGGHHHHHHH! This post is an explanation of why the new documentation is amazing and most of the arguments against it are ridiculous.

In case anyone missed it, the announcement is [here](http://codeigniter.com/news/new_user_guide_in_development). Notice the words in the header "in Development". Instead of the old hand-crafted HTML documentation we now have documents written in LaTex (similar to Markdown or Textile) which is parsed using a Python system called Sphinx and can generate HTML or PDF documentation.

### We need to install Python for docs?

NO! Python is the language used to build the documentation, and nobody is asking you to build the docs yourself. If you notice in the codebase the new latex files are stored in "user\_guide\_src/". What does this suggest? That they are the _source_ files and not the final. We can run the build script when CodeIgniter is in a release branch, so that means when we prep v2.1.0 for final release we run a command, have the source and the build copy and everyone is happy.

### But why Python? Why not a PHP system?

People should not be hung up on languages. The Ruby framework [Ramaze](http://ramaze.net/) uses Sphinx and they don't care, why should we? It's just a tool that does the job, and it happens to do the job better than any existing PHP systems.

### Oh... ok well they don't look as good!

Remember that this is the initial push. The fact is that the documentation can now be styled without rewriting every single document manually. This means iterative improvements can be made until it looks amazing. You could even change the design if you wanted to go crazy, the fact is that the option is there.

### Fine, but why is it still using Google Search?

Somebody complained that the new documentation was using Google for Search. The documentation has always used to use Google Search and currently it still does. Sphinx supports it's own built in search and that will get hooked up before things go live. Again, THIS IS AN EARLY PUSH.

### But I was translating the user guide!

Well that is unfortunate, but what if we left it another month before releasing this plan? You'd have spent even MORE time working on it. The fact of the matter is that now the source files only contain text with basic Markdown-style markup you'll find translating it SO MUCH easier! The documentation can be built in the same way and there, you have awesome styled HTML and PDF documentation written in whatever language you like.

### Anything else good about this?

As I've said, PDF export and search straight out of the box is bloody brilliant. We can theme the docs, we can now [open them in our editor easily](http://ericlbarnes.com/post/11086832943/ci-userguide) for reference, we have James Mathias working on the designs - and he can [clearly design](http://leihu.com/art) - and now we can build documentation quicker. A few times I've wanted to add a library but thought "Sure, but then I have to spend hours writing up all the bloody documentation". Now I can write that same documentation in minutes. Brilliant! The whole team feels the same and are glad to be able to write documentation quicker.

### Summary

This is happening and it's a good thing. Every person making a complaint about a specific thing could just as easily say "I don't like X because of Y, can we make it work like Z?". Or, get involved. CodeIgniter is an open-source project after all. [Send a pull request](http://codeigniter.com/news/contribution_guide)! [This guy did](https://github.com/EllisLab/CodeIgniter/pull/536/files).

