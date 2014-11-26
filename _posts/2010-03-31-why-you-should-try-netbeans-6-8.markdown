---
layout: post
title: Why you should try Netbeans 6.8
category: 
permalink: blog/2010/03/why-you-should-try-netbeans-6-8
excerpt: For a long time I have had the opinion that NetBeans sucked. When  somebody
  asked me what exactly I didn't like about NetBeans I couldn't  remember any reasons,
  so decided to give it another try. The result of  my test? Why the hell have I not
  been using longer?!
date: '2010-03-31 16:03:58'
comments: 'true'
disqus_identifier: why-you-should-try-netbeans-6-8
---

For a long time I have had the opinion that NetBeans sucked. When somebody asked me what exactly I didn't like about NetBeans I couldn't remember any reasons, so decided to give it another try. The result of my test? _Why the hell have't I been using longer?!_

To set the scene, I have been using Eclipse in some form for years. [EasyEclipsePHP](http://www.easyeclipse.org/site/distributions/php.html), [Eclipse PDT](http://www.eclipse.org/pdt/) and [Aptana](http://www.aptana.com/) are some of the easiest pre-built but there have been other manual combinations too. After almost 5 years of using Eclipse on Windows, Linux and Mac it was amazing how many bugs I had just "got used to". Slow performance, buggy, some buttons and features not working for several releases in a row - put simply, a pile of junk.

After firing up NetBeans and opening a few files it did not take me long to remember what I missed about Eclipse. These two key-board shortcuts alone are brilliant. ![netbeans keyprofiles](/application/uploads/default/assets/cache/4_454_254_90.png)

- CTRL / CMD + Shift + R: Really powerful workspace-wide "Go to File".
- CTRL / CMD + D: Delete line. Really cannot live without this one.

As it turns out, NetBeans has "Key Binding" profiles, one of which is named "Eclipse". Wow! So NetBeans can have all the same shortcuts you are used to in Eclipse.

With that sorted I already felt at home with NetBeans and wanted to explore further. Here are just a few of the things that I have discovered to work really well in the week I have been using NetBeans as my primary IDE.

### Language Support

You can download packages to provide support for various languages. There are plugins for all sorts of languages, the most notable being Python, Ruby, Java and C++. I simply downloaded the base PHP package and added in Python and "Ruby and Rails" plugins.

### Plugins

There are a _huge _number of plugins for NetBeans which add plenty more than just language support. They can be installed through the Tools > Plugins interface or downloaded from third-party sites and loaded manually. There is all sorts of crazy plugins that I don't have time to go through, but they support stuff like Database IDE panels, Copy and Paste history, OpenOffice.org API (whatever that involves!) and plenty more.

### Subversion, Mercurial and Git

Out of the box NetBeans has support for two of the most popular VCS systems in use. And CVS... This allows you to create new projects from repositories, make commits, view changes and revert based on history. This was especially handy for me as [CodeIgniter 2.0](http://bitbucket.org/ellislab/codeigniter/) is now on Mercurial so not having to worry about finding a new client was a great help. I can of course use the command line, but if I don't have to bother that's more potential time at the pub.

I was initially disappointed that it lacked support for Git but found that the plugin [nbgit](http://nbgit.org/) would add support to the same ![netbeans git push](/application/uploads/default/assets/cache/3_403_229_90.png)standard as the others. This strangely does not offer push support, but that can be added in with a "Custom action" on the Team > Git > Custom action > New... tree. Simply place a path to your git binary and pass "push" or push "origin master" as your arguments. Of course this doesn't replace the power of working with Git through the command line but it can be good for quick cheeky commits.

### What about the basics?

Ok so we know it can support all the crazy "new trends" like Rails and Git but how does it handle the baiscs like HTML and CSS?

Once again the answer is "Really fucking well". When editing HTML it will suggest closing tags for you but it wont automatically shove them in unless you hit Enter. NetBeans will also auto-indent your HTML and provide validation for unknown tags, incorrect attributes and it can do all of this even if you are working on HTML in a .php file. It will sense what you are writing and react accordingly instead of simply "this is a PHP file, treat is as such".

The support for CSS is just as good, possibly better. When writing properties are autocompleted, documentation for possible values shows up in tool-tips and it will validate incorrect values.

There is even a GUI for adding properties if you are a massive n00b, but I wouldn't like to use that.

### But what about "uber-magic CodeIgniter auto-completez"?

Firstly, im not entirely sure what everyone is talking about when they mention "CodeIgniter auto-complete" but apparently, version 7.0 will have it...

As I see it, auto-complete is useful for things like writing $this and having a list of possible options being shown up, but when you write $this->load the auto-complete stops. I assume thats where the magic "CodeIgntier support" would kick in and list helper/library/model/etc?

Whatever, the PHP OOP auto-complete in 6.8 is already helpful enough.

### Summary

You won't very often hear me admit I'm wrong, but it does happen now and then. This is one case where I am perfectly happy to admit I am wrong and say that NetBeans is a vastly supiror IDE. It uses more memory than any other I have tried, but at the end of the day everything works perfectly and exactly how you would expect it to. That is enough for me to ignore the memory hogging and upgrade.

[Try NetBeans 6.8 today](http://netbeans.org/downloads/index.html). It's free and you will be very happy, especially if you are currently "putting up with" Eclipse or one of its ugly sisters.

