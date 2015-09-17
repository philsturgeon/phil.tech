---
layout: post
title: 'Quick tip: Create a branch in Git with a dirty copy'
category: git
alias: blog/2009/06/Quick-tip-Create-a-branch-in-Git-with-a-dirty-copy/
excerpt: We've all done it. Started working on a task, ticket or issue and realised
  we have forgotten to create a branch. Using git stash we can easily hide these changes,
  create a branch and then get the changes back.
date: '2009-06-22 10:21:00'
comments: true
disqus_identifier: Quick-tip-Create-a-branch-in-Git-with-a-dirty-copy
---

We've all done it. Started working on a task, ticket or issue and realised we have forgotten to create a branch. Using git stash we can easily hide these changes, create a branch and then get the changes back.

**1.)** Save your changes using stash. This basically just hides your changes locally and lets you call them back later.

> git stash

**2.)** Create your new branch.

> git branch <branch\_name>

**3.)** Use your new branch.

> git checkout <branch\_name>

**4.)** Apply your saved hidden (or "stash"ed) changes.

> git stash apply

There you go, you are now ready to commit those files off to your new branch.
