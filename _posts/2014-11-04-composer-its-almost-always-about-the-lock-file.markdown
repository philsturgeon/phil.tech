---
layout: post
title: 'Composer: It''s ALMOST Always About the Lock File'
category: php
redirect_from: /blog/2014/11/composer-its-almost-always-about-the-lock-file/
excerpt: When is it a good idea to commit your composer.lock file, and when should
  you leave it out? 
date: '2014-11-04 22:14:00'
comments: 'true'
disqus_identifier: composer-its-almost-always-about-the-lock-file
---

[Davey Shafik](https://twitter.com/dshafik) wrote a great article for [EngineYard](https://engineyard.com/) called [Composer: It’s All About the Lock File](https://blog.engineyard.com/2014/composer-its-all-about-the-lock-file).

The point of his article is to try and suggest people get a lot more used to committing their `composer.lock` files. 

Please, do go read his article now and for the love of god please start committing your lock files to applications. If you and your employees are a little vague with your `composer.json` specifications and you don't have a `composer.lock` then you can end up on different versions between you. Theoretically, if component developers are using [SemVer](http://semver.org/) and you're being careful then you should be fine, but keeping your lock in version control will make sure that the same version is on your dev teams computers. This will happen every time you run `$ composer install`. If you are on Heroku or EngineYard then this will be used for the deployment of your production components as a built in hook, which is _awesome_.

Side bonus: It makes composer installs much quicker, and checks your checksums too so you don't have issues where some muppet retagged a version of the component and now BOOM weird change. These things happen. 

You can learn a lot more about careful version selection and other bits of Composer advice from [Rafael Dohms](https://twitter.com/rdohms), who wrote recently about [Installing Composer Packages](http://blog.doh.ms/2014/10/13/installing-composer-packages/).

Now, I had one little bit of feedback to Davey's article:

> Always commit composer.lock for applications.  
> Never commit composer.lock for components.

When asked to explain that, I ended up realizing I was just parroting some Ruby logic I'd had knocking around in the back of my brain since 2010 when I was building out a few projects with Rails. 

The [advice in the Ruby community](http://yehudakatz.com/2010/12/16/clarifying-the-roles-of-the-gemspec-and-gemfile/) regarding lock files has always been to commit the `Gemfile` for applications, but to ignore the `Gemfile.lock` for building gems. This solves a lot of problems, from dependency hell, to just generally being a bit annoying.

My realization that I was just parroting this Ruby logic, I thought a bit harder and I've now moved from:

> Never commit composer.lock for components.

...to:

> Maybe commit composer.lock for components.

Why only sometimes? Well, there are two main problems here. Committing a `composer.lock` will solve one problem, but create another.

Some background.

## Component Development

When [developing and contributing to Composer packages](/blog/2013/05/testing-contributing-composer-packages), you could be working somewhere like `~/src/some-package`, where you just checked out the repo. You can also do it inside an application that is using Composer components, so if your component lived at `~/src/some-app/vendor/phil/some-package` then you could run `$ composer install` _in there_ and it would install `~/src/some-app/vendor/phil/some-package/vendor/phil/another-package`.

Composer doesn't care about that extra level of nested stuff, as it's just a folder structure. Wherever you are, `$ composer install` will look for a `composer.lock` or a `composer.json` and make a `./vendor/` directory to shove your dependencies in.

If you have a `composer.lock` file inside the `some-package` codebase and the lock file is demanding `1.1.5`, it doesn't matter at all if your `some-app` is demanding `1.1.5` or `2.0.0` of that same package. At all. 

This means you can have a lock for your component, and it only affects those working directly with that component. It does not force anyone installing that component into their application to in turn use the version of a dependency you have specified in that `composer.lock`. This might be a good idea for the development team working on a component, but it might cause another problem.

## How Strict Is Too Strict?

A component is supposed to work with a reasonable range of it's dependencies. For example, a component using Guzzle should be able to work with `4.0`, `4.1` or `4.2` without any confusion about whether it works. 

Now, if I commit a lock file and 4.2.0 happens to contain a breaking change - despite promising SemVer compliance, I'm going to start getting complaints from users that my package does not work with 4.2.0. If I'm traveling for a month thats going to be a right PITA. I wouldn't even know it fails because my component is specifically requiring `4.1.2` to run its tests on Travis-CI, as thats the last version that was out when my `composer.lock` was written to, and it would never have a chance to try and download `4.2.0`. Others depending on my package would get the newer version because their `$ composer install` is not looking deep enough into the folders to see my components `composer.lock` file, so they are ahead of my very strict requirements.

If I had been a little more loose with my components dependencies, I would have seen it error much sooner. Possibly on the first pull request that a contributor wrote, and who knows - maybe they'd fix that issue for me too as part of their PR. Then I can just click the green button and get on with my day, instead of sifting through changelogs to find out what the package happened to break. 

After that breaking change is catered for, I'd then need to bump my requirements for Guzzle from `~4.1` to `~4.2` in the `composer.json`, which would force users to upgrade too, which in turn _could_ end up leading to dependency hell.

My only solution would be to avoid doing `~4.1` in the first place, and stick to `4.1.*` for everything, which sucks for the 99% of cases where minor upgrades _do not_ break the API.

It is by no means unheard of for popular software projects to break backwards compatibility for components. SemVer is a promise at best. While it's a good promise, it's a promise that is sometimes broken. Sometimes intentionally and you just didn't realize a dependency didn't care about SemVer, or sometimes by a dependency that *does* promise SemVer then accidentally breaks it.

## Summary

I think committing your `composer.lock` file is _always_ an incredibly good idea for **applications**.

But, I would think really hard about whether you want to be that specific for your components. Maybe you do want to really lock it down, and you like the idea of specifying the *exact* version of a dependency that your component is last known to work with. It could certainly make testing easier, reduces "works on my machine", and you could force people to send in the update as part of the PR. All of that said, for me, it is a level of strictness that I am not interested in for my components.

Maybe that'll change for me over time. But for now, I'll keep the `.gitignore` entry for  `composer.lock` in my components.
