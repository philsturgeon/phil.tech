---
layout: post
author: [Phil]
title: 'PyroCMS reaches final: v1.0'
tags: [pyrocms]
excerpt: "Today we are incredibly pleased to announce the biggest update to PyroCMS
  in it's 14 months of it's open-source history. v1.0 may seem like a small jump in
  numbers from v0.9.9.7 but really this is more like a 2.0! Everything has been logically
  restructured, Dwoo has been replaced with an amazingly powerful Tags and Plugin
  syntax and its all running much quicker, while looking considerably sexier. "
date: '2010-11-26 17:16:00'
comments: true
disqus_identifier: pyrocms-reaches-final-v1.0
alias: blog/2010/11/pyrocms-reaches-final-v1.0/
alias_1: pyrocms/2010/11/26/pyrocms-reaches-final-v1.0/
---

_This article is a re-post from [pyrocms.com](http://pyrocms.com/), so when I say "we" I mean the PyroCMS development team and all of our [45ish amazing contributors](https://github.com/pyrocms/pyrocms/contributors)._

Today we are incredibly pleased to announce the biggest update to PyroCMS in it's 14 months of it's open-source history. v1.0 may seem like a small jump in numbers from v0.9.9.7 but really this is more like a 2.0! Everything has been logically restructured, Dwoo has been replaced with an amazingly powerful [Tags and Plugin](http://pyrocms.com/documentation/#designers/tags.html) syntax and its all running much quicker, while looking considerably more awesome.

The upgrade process from v0.9.9.7 is a little tricky but we made it as easy as we possible could with the upgrade script and a full [Upgrade Guide](http://pyrocms.com/documentation/#general/upgrades/0997_1.html) in the [new Documentation](http://pyrocms.com/documentation/).

Mow for those of you who like Change-logs, here it is:

- New control panel design
- Added File module. This will replace the photos module and allow for Images, Video, Audio and Documents.
- Removed Dwoo and added Tags and Plugins.
- Rewrite of Settings module to allow module developers easier access and CRUD of site settings.
- Big structure rewrite and added an addons folder for modules, helpers, libraries, widgets, etc.
- Added "Save" and "Save & Exit" buttons to Page manager so you can go back to the same page on save.
- Widgets can now go in modules and any packages, not just /addons.
- Logged in users will no longer see the stupid website box on comments, it will use their profile value.
- Theme views and layouts must now use .html not .php.
- If comment moderation is disabled you will only see a list of comments, no "unapproved" stuff.
- Merged old categories module into news module.
- Moved "Permission Roles" to a new Groups module.
- Removed the crazy complicated and rather broken Permissions module. Replaced it with a VERY simple module.
- Added class prefix to all Widgets\_ to stop namespace collisions.
- Replaced TinyMCE with CKEditor 3.4.
- Removed dependency on $this->data so controllers in modules can use whatever $data variable they like.
- Renamed $this->module\_data to $this->module\_details to match details.php name.
- Added a hook to check if installed, automatically redirecting to the installer if not. This can be disabled in config/hooks.php.
- $this->data is no longer required. Thats right, use whatever variables you like in your controllers.
- Template library upgraded so mobile themes work!

When put in this list, the rewrite doesn't seem as big but trust me, this has been absolutely massive! We've re-written pretty much every line of code and taken care of a ridiculous number of issues. We have more languages, better designs, better usability and everything is a whole bunch more slick.

PyroCMS now supports the following languages:

- Arabic
- Brazilian
- Chinese (Traditional)
- Dutch
- English
- French
- German
- Italian
- Polish
- Russian
- Spanish

What's next? Well we still have lots to do. While most of PyroCMS was rewritten in this upgrade we still have lots of work to do on some of the core modules. Pages, News and Navigation need a lot of love and one of the main features we are asked for over and over again is "multi-level navigation". Yes, that is a priority in v1.1, just be patient. This upgrade was a massive structural re-work, now we can go and make our modules brilliant.

We'll also start to populate our [Add-on Store](http://pyrocms.com/store) over the next few days to contain some brilliant new modules for your PyroCMS websites.

**Download:** [v1.0](https://github.com/pyrocms/pyrocms/archives/v1.0)

Other links of interest:

- [Documentation](http://pyrocms.com/documentation/)
- [Forums](http://pyrocms.com/forums) (new and improved)
- [Upgrade Guide](http://pyrocms.com/documentation/#general/upgrades/0997_1.html)
- [Designers Guide](http://pyrocms.com/documentation/#designers/index.html)
