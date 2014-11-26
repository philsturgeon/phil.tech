---
layout: post
title: Deploying sites with SVN
category: 
permalink: blog/2008/10/Deploying-sites-with-SVN
excerpt: Ever got fed up with FTP uploading multiple sites and forgetting which files
  need to go where? Sure you could delete the whole thing and upload it all, but that
  way you have downtime. I found a solution recently that works perfectly and is quick
  as hell.
date: '2008-10-02 07:14:00'
comments: 'true'
disqus_identifier: Deploying-sites-with-SVN
---

I have a working copy on my dev site and the live site. live will be trunk, dev will be the branch I am working on or trunk depending on what I want to test on that environment.

It might sound a little nuts, but having SVN working copy on your server means you can easily deploy the new version of the site. Commit your local changes to the repo, then just SSH in and update!

This step-by-step guide will assume [SVN binaries are already installed](http://blog.andrewbeacock.com/2005/08/installing-subversion-svn-on-linux.html) and you have SSH access.

1.) [Log in via Putty or Terminal](http://intranet.cs.man.ac.uk/software/cs-ssh/cs-ssh-ref.php):

{% highlight console %}
$ ssh user@yoursite.com
{% endhighlight %}

2.) Get to your `public_web` root. This will probably be something like `/home/user/public_html/` but could vary.

{% highlight console %}
$ cd /home/user/public\_html
{% endhighlight %}

3.) Then simply check the repo out.

{% highlight console %}
$ svn co http://svn.whatever.com/repo/trunk .
{% endhighlight %}

DONT forget the full stop as that says to use the current directory and not create a new sub-directory.

4.) Do work.

5.) Update your site:

{% highlight console %}
$ svn update
{% endhighlight %}

And there you have it. Each update you make will be deployed to your site when you run the svn update, minimum fuss.

