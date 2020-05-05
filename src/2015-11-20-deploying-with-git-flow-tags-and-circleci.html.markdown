---
title: Deploying with Git-Flow, Tags and CircleCI
date: 2015-11-20 23:53 UTC
tags:
---

Want an integrated deployment process that sends tags off to the right environment (QA or Production) automatically as soon as they're pushed to Git? Read on!

Back in the day I escaped FTP deployments by [using SVN](/2008/10/02/Deploying-sites-with-SVN/), which was "ok", and later I switched to [deploying using Git](/git/2010/02/23/Deploying-websites-with-Git/). Since then I've played with Capistrano, used Chef to deploy to AWS and tried all sorts of other services that aim to make deployments easier.

Nothing has ever been easier than using PaaS systems like Heroku. For some small client sites, or this blog, or whatever else, I used to just `alias yolo='git push heroku master'`. That was a solid replacement for the SVN/Git deploys I hacked together in the past, but larger teams need a bit more than that. 

When you're building a complex application where multiple versions are being built in tandem, a QA team with multiple day review periods and a production server that might need hotfixes deployed regardless of whats in QA, this "do stuff then push" approach does't hold up.

At Ride, we use Heroku, and for a while we used [GitHub-flow](https://guides.github.com/introduction/flow/). When a PR was merged to `master` it would go straight to the Heroku staging environment, then, we had a `qa` and `production` branch that would go off to the appropriate environment when we were ready to deploy those versions.

CircleCI supports [branch based deployment](https://circleci.com/docs/configuration#deployment) nicely, and their [Heroku deployments](https://circleci.com/docs/continuous-deployment-with-heroku) are incredibly easy. This was ok but having a `qa` and `production` branch lead to a lot of confusion. The branching model of the code should not be mixed in with implementation details of deployment. People were sending PRs from QA to Production and sometimes hotfixes had to be merged back and things got missed and... it was just a mess.

I wanted to use tags for this, and more importantly I wanted to use them as more than just "here is a snapshot in case we have to roll back". I looked into having automated deployment that looked a bit more like this:

![Fancy diagram showing tag version-based deployments to QA/Prod](article_images/2015-11-20-deploying-with-git-flow-tags-and-circleci/fancy-diagram.jpg)

Annoyingly CircleCI wouldn't let me do this. Tags would not trigger a build on their system, so the deployments would not happen! I tweeted asking if they'd work on it, and 3 months later.. [they have tag-based deployments](https://circleci.com/docs/configuration#tags)! 

The [git-flow branch model](http://nvie.com/posts/a-successful-git-branching-model/) helps us create tags. Those tags can then be deployed, and based on the name of the tag, CircleCI will deploy them to QA and/or Production using a bit of regex in the `circle.yml`:

~~~ yaml
deployment:
  staging:
    branch: master
    heroku:
      appname: foo-app-staging
  qa:
    tag: /v[0-9]+(\.[0-9]+)+(-rc[0-9]+)?/ # v1.2.3 and v1.2.3-rc1
    heroku:
      appname: foo-app-qa
  production:
    tag: /v[0-9]+(\.[0-9]+)+/ # v1.2.3 only
    heroku:
      appname: foo-app
~~~

Technically, that is all you need to do. RC tags will go only to QA, and final tags will go to both. 

This is a guide I put together for folks at Ride, and hopefully it'll be helpful to some of you.

## Types of Release

There are two types of release. 

- A "Planned Release"
- A Hotfix

If there is a huge problem that needs to be fixed, make a hotfix. If it is not breaking the production systems, then it can be part of the next planned release.

Common sense is required for making that decision. Hotfixes will bypass QA, so use them sparingly.

## Making a Planned Release

A planned release is where we put new features, and anything that happens to be sat in `develop` branch. 

We always start a new minor (or a major) version, so planned releases will **not** be `1.6.1` or `1.6.2`. This leads to problems with hotfixes, which use those patch level version numbers, and we end up with two people trying to make different tags with the same name...

~~~
$ git pull origin develop           # Make sure you've got all the develop changes
$ git flow release start 1.6.0      # Increment the version number by at least 1 minor
$ vim CHANGELOG.md                  # Update the release information and whatever else
~~~

You can have any branch checked out when you run `git flow feature start`, and it will just make the branch from `develop` anyway.

At this point, we want to make a QA release, so that we can get our code tested.

~~~
$ git tag v1.6.0-rc1                # Create an RC1 version of this release so that QA can test it
$ git push origin v1.6.0-rc1        # Send to GitHub, and deploy via CircleCI if it works
~~~

If somebody else created the release branch and you don't have it locally, you can track the release branch instead of `start`ing it:

~~~
$ git flow release track 1.6.0      # This will grab the release/1.6.0 branch from origin and check it out
~~~

Now, if we get some feedback and our RC release has some bugs, we can make another. People can PR directly to the `release/1.6.0` branch (preferable), or commits can be cherry-picked from elsewhere.

~~~
$ git pull origin release/1.6.0     # Pull changes that were merged via PRs
$ git cherry-pick dfs7432r28r       # Optional: Take a cool fix from develop
$ git tag v1.6.0-rc2                # Create an RC2 version of this release
$ git push origin v1.6.0-rc2        # Send to GitHub, and auto-deploy via CircleCI if it works
~~~

If this RC is approved, we can go ahead and update the changelog one last time, then finish the release:

~~~
$ git flow release finish 1.6.0     # Git Flow will merge this to master and develop, and make the final tag
$ git push origin v1.6.0            # Send to GitHub, and auto-deploy via CircleCI if it works
~~~

Done! Well, except for a little cleanup:

~~~
$ git push origin master            # update master
$ git push origin develop           # aaand update develop
~~~

Sending things to QA and waiting for feedback can be a slow process. If production is broken and we need to deploy fast, we need to create a hotfix instead.

## Making a Hotfix Release

Instead of using the `git flow release` sub-command, we can switch out to use `git flow hotfix`. The difference here is mainly that the branch is made from master, which helps us avoid any new feature development, which might not be production ready. 

~~~
$ git flow hotfix start 1.6.1       # Makes a hotfix/1.6.1 branch
$ git cherry-pick sdfsha1234        # Pull or merge or cherry-pick in whichever commit(s) fix the issue
$ vim CHANGELOG.md                  # Update release notes with the bug fix
$ git flow hotfix finish 1.6.1      # Mark the hotfix as done and put it into master
$ git push origin v1.6.1            # Put that tag online for everyone to enjoy
$ git push origin master
~~~

## Summary

This looks like a lot of work for deployments, and I would absolutely prefer to have continuous deployment instead of having to craft and prepare versions, but that is not always possible. For that to work you need more than just unit and integration tests, but you need full, multi-system testing that is rather tricky to achieve. 

With more testing, versions will be less important, and tag-based deploys won't matter. In the meantime, this whole "use Git-Flow to make tags then let CircleCI shove them on the right environment" approach is pretty damn tastey if you ask me. 
