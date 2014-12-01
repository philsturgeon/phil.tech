---
layout: post
title: Managing CodeIgniter Packages with Git Submodules
category: codeigniter
permalink: blog/2011/09/managing-codeigniter-packages-with-git-submodules
excerpt: " \n\tWith CodeIgniter moving to GitHub we are starting to see a lot of CodeIgniter
  developers wanting to learn more about Git, specifically how they can use it to
  improve their workflows, manage their applications and move away from the horrible
  days of copying and pasting updated libraries off a wiki. UCK. Sparks are helping
  us on the whole, but there is another method that we can use to manage our packages:
  Git Submodules. "
date: '2011-09-25 11:09:00'
comments: true
disqus_identifier: managing-codeigniter-packages-with-git-submodules
---

With CodeIgniter moving to GitHub we are starting to see a lot of CodeIgniter developers wanting to learn more about Git, specifically how they can use it to improve their workflows, manage their applications and move away from the horrible days of copying and pasting updated libraries off a wiki. UCK. Sparks are helping us on the whole, but there is another method that we can use to manage our packages: Git [Submodules](http://book.git-scm.com/5_submodules.html).

For those who have not heard of submodules in Git, I'll let the Git Book explain it:

> Git's submodule support allows a repository to contain, as a subdirectory, a
> checkout of an external project. Submodules maintain their own identity;
> the submodule support just stores the submodule repository location and
> commit ID, so other developers who clone the containing project
> ("superproject") can easily clone all the submodules at the same revision.
> Partial checkouts of the superproject are possible: you can tell Git to
> clone none, some or all of the submodules.

Great! So we can have our main application and other little packages can be installed as submodules which have their own repositories.

### Why bother?

It's a good question. This all sounds like a lot of extra work but if like me you are working on 5 different applications at any one time you might have started to notice something:

In each project you work on your are probably creating libraries or packages that can be used in multiple places. For example I recently built the [oauth2](https://github.com/philsturgeon/codeigniter-oauth2) package which I was using in two different applications. These were totally different applications for different clients on different servers and there was no way I could get away with symlinking, sharing folder structures, etc and I noticed that if i fixed a bug in one location I would have to copy it over to the other application. If I had 10 projects using the oauth2 package that would be a LOT of copying and pasting with huge potential for pooching the system.

Even if you are not in a situation where you need to copy between applications, you want to release your code to the world without having to copy it to a special "oauth2" folder which just contains those specific files. This is how I was releasing code for years: copy and paste. Bah!

Instead I created a new repo on GitHub for the oauth2 package, pushed my files in and set it up as a submodule in my clients application:

    $ cd Sites/example.com/
    $ git submodule add git://github.com/philsturgeon/codeigniter-oauth2.git application/third_party/oauth2

So we've put this into our application/third\_party folder, but this could just as easily have been in application/packages if you prefer the name. Whatever - the autoload.php config file can be changed to have whatever directory you want:

    $autoload['packages'] = array(APPPATH.'third_party');

Now we need to commit this so other developers have access to the code:

    $ git status
    
    
    # On branch oauth2
    # Changes to be committed:
    #
    #    new file:   .gitmodules
    #    new file:   application/third_party/oauth2

The .gitmodules file has been added and keeps a reference of all submodules in your application.

### "My designer just pulled and it's broked!"

Me too! So submodules can be a little funny when people pull for the first time. The .gitmodule file will know there is a new submodule but Git won't actually bother to do anything about it. This may seem odd but is easy to get around:

    $ git submodule init
    $ git submodule update

The first command will initialize any submodules listed in the .gitmodule file that is not already set up, and update will grab the latest commit for it.

### Committing fixes in your submodules

While developing an application with a submodule you are no doubt adding new stuff as you go. Whether this is fixing bugs or adding new features you're application is the best place to add these new features to your package because you can see when things are working.

If you have made some changes in your submodule you will notice that git status shows you this:

    $ git status
    
    
    # On branch master
    # Changes not staged for commit:
    #
    #    modified:   application/third_party/oauth2 (modified content)

We changed stuff! So let's go and commit it to our submodule.

    $ cd application/third_party/oauth2
    $ git status
    
    
    # Not currently on any branch.
    # Changes not staged for commit:
    #
    #    modified:   libraries/OAuth2.php

Woah there, not currently on any branch? What the dickens?

Each submodule has a specific commit used to reference which is the "current" commit that other applications should be on when they run git submodule update. Think of this much like a tag, but not actually a "tag". We want to move out of this "no branch" and use master (or develop if you wan't to get all crazy with Git-Flow).

    $ git checkout master

Awesome, now commit as usual and push back to the repo. If you cloned using a read-only remote (suggested if you want to deploy to PHPFog, etc) then you will need to do something like:

    $ git remote add upstream git@github.com:philsturgeon/codeigniter-oauth2.git

This will add the read/write remote to your system, but mean that deployment systems can still read the public remote when they look at origin. After that you push with:

    $ git push upstream master

Finally, if we hop back up to the root level of our application we'll see:

    $ git status
    
    
    # On branch master
    # Changes not staged for commit:
    #
    #    modified:   application/third_party/oauth2

Commit that and you're done. Yay!

### Summary

As with everything in Git it is initially confusing and potentially a little scary to try and work out, but once you get past the "WTFPALMFACE" section of learning you'll love this feature and find yourself using it all over the place.

