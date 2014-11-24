---
layout: post
title: Deploying websites with Git
category: git
permalink: blog/2010/02/Deploying-websites-with-Git
excerpt: Use Git to deploy your web applications without having to faff with FTP syncronisation
  or manually working out which files need to be uploaded.
date: '2010-02-23 14:59:00'
comments: 'true'
disqus_identifier: Deploying-websites-with-Git
---

Back in 2008 I wrote an article describing how you can [use Subversion as a very simple deployment method](/blog/2008/10/deploying-sites-with-svn "Deploying sites with Subversion (SVN)") from your local box, through testing environments to your live servers. Since then I have been using Git to track all client work and personal projects, so I modified this approach to work with Git.

It sounds a little crazy to some people, but really deploying websites with a version control system makes a lot of sense. When you develop on your local box you can change any number of files throughout a codebase and trying to manually remember what files have been changed can be a pain in the nadgers.

You either need to use your VCS ( [Subversion](http://subversion.apache.org/ "Apache Subversion"), [Git](http://git-scm.com/ "Git: Fast VErsion Control"), [Mercurial](http://mercurial.selenic.com/ "Mercurial: Distributed Source Control Management"), etc) to give you a list of changes files so you can manually go around re-uploading each of them, but this can take a long time on a large application.

Another option is re-uploading your entire site through FTP which is even more annoying, if not potentially dangerous to live servers as it can destroy file permissions, remove user-uploaded content, confuse cache systems and show programming errors throughout the site as files are deleted and replaced by the FTP client.

FTP clients tried making this easier for us by adding Syncronize features but they just compare dates so they are as useful as a chocolate teapot if you are trying to do careful deployments.

We clearly need another option, and thats where VCS deployments come in. In this case, Git.

### I'm convinced, so how can I do it?

The best part is that if you are already working with Git on your local box then this is pretty damn easy to set up.

#### Step 1: SSH into your server

    $ ssh user@example.com

#### Step 2: Install Git

    $ sudo apt-get install git

Or use yum, aptitude, compile from source, etc.

#### Step 3: Setup your repo's

    $ cd /home/user/public_html$ git init$ git remote add origin git@github.com:philsturgeon/somerepo.git

This next command gets a little tricky if you already have your site running on this server. I have always used this method from the first deployment of Git managed sites, but you will probably need to delete any folders that will be managed by Git so they can be replaced. Of course be careful with backups and save any user uploaded content, but once that is done you wont have to worry about losing changes ever again.

    $ git pull orgin master

#### Step 4: Deploy new changes

Once you have made some changes you will need to send them back to your main repository

    $ git commit -a -m "Lazy commit of new stuff"$ git push origin master

That will push everything to your repository, then SSH back into your live/testing server and pull the new changes.

    $ git pull origin master

That will pull the changes from the main repository to the local repo on the live/testing site.

#### Last minute brainwave

I always SSH'ed in the pulled as that was how I used to do things when deploying with Subversion, but last night I had a sudden brainwave that cuts that step out completely.

You can push directly from your local box to the live website, or the testing server you are running Git on. On your local box you can simply add testing and live servers as another remote:

    $ git remote add testing ssh://user@example.com/home/example/public_html$ git remote add live ssh://user@example.com/home/example/public_html$ git push origin master$ git push testing master

And then when you have tested these changes had no screwy effects on your testing server:

    $ git push live master

That means any time you make a change, you can commit it, push it back to the main codebase (GitHub, CodeBaseHQ, etc) then push it to the correct server(s). Sorted!

_ **Update:** After posting it came to my attention that directly pushing to a repository like this appears to work from the push end, but it wont actually update the files on the live server. To get this to happen you need to create a post-recieve hook._

    $ ssh user@example.com$ cd /home/example/public_html$ vim .git/hooks/post-receive

The only thing in my post-recieve hook was the default example, so I deleted it and added this:

> #!/bin/sh  
>    
> # Update the working tree after changes have been pushed here  
> cd ..  
> env -i git reset --hard

Save that with Escape then :wq and you need to permission the hook so it can be executed:

    $ chmod +x .git/hooks/post-receive

That's the hook completed.

### Summary

The posibilities with Git are insane. These are two very useful ways to deploy your websites and i'm sure there are other methods. If you have an even better way to get your code from local, through testing and then to live with minumum fuss, please let me know!

_ **Note:** This article assumes you have [SSH keys set up](http://help.github.com/key-setup-redirect "Generating SSH Keys"). You will need too add your local SSH public key to the Git repository server and add your live servers SSH key to the Git repository server for the live server to contact it. If you wish to deploy directly from local to live, then you can add your local SSH key to the live server but most servers by default will just ask for your user password._

