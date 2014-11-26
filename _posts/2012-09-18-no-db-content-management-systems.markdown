---
layout: post
title: No-DB Content Management Systems
category: 
permalink: blog/2012/09/no-db-content-management-systems
excerpt: If you're following many designers on Twitter then you'll notice that they've
  just started noticing flat-file (or "No-DB") content management systems. The basic
  idea is you swap out the database and complicated admin panels for a simple file
  and folder structure and use Markdown files instead of clunky WYSIWYG boxes to manage
  your content. These have some pros and cons, but can definitely be an awesome tool
  to have in your arsenal.
date: '2012-09-18 20:33:00'
comments: 'true'
disqus_identifier: no-db-content-management-systems
---

If you're following many designers on Twitter then you'll notice that they've just started noticing flat-file (or "No-DB") content management systems. The basic idea is you swap out the database and complicated admin panels for a simple file and folder structure and use Markdown files instead of clunky WYSIWYG boxes to manage your content.

This is a great idea as it means you can knock the database requirement out of your site, and run a blog and basic page structure with barely any effort what-so-ever. 

## Hitched to that bandwagon

Two notable projects I've worked on recently using flat-file CMS' are [PHP The Right Way][phptrw] and [PHP-FIG][phpfig]. Both of these sites are using the Ruby system [Jekyll][jekyll].

> What now? PHP websites run using a Ruby CMS? Heresy! 

Sssh there troll, it makes perfect sense. GitHub Pages support Jekyll, meaning we can make an entire website just by pushing some text-files to GitHub. We can therefore skip the process of working out who has admin access to the control panel, who looks after the root passwords, who is in charge of making changes, and people can send in pull requests to add new content or fix spelling mistakes. The best part is that all of the hosting is free. EPIC!

For a decreased workload like that I couldn't care less what language it was written in, even if it does seem a little ironic.

## PHP is cool too

I know of a few that have been around in PHP for ages now:

* **Rick Ellis** (from CodeIgniter, [FileDriver][filedriver])
* **Adam Fairholm** (from PyroCMS, called [Fizl][fizl])
* **Ian Lindsman** (from Laravel, called [Kudos][kudos])

Some have slightly different features and got to various different stages, but are for the most part the same as Jekyll.

I've been using Fizl for the [PyroCMS Documentation][pyrodocs] as flat-files allow documentation to be distributed with ease, but Jekyll was out of the question as it needed to share most of the requirements as PyroCMS itself - therefore requiring PHP so folks could run it locally. 

In both situations this is done so the content is easily accessible, can be modified via Git and skips the need for a database. This all makes sense so far.

## New kids on the block

Two systems making waves right now are [Statamic][statamic] and [Kirby][kirby]. Both are closed-source with price-tags from $19 to $99. Kirby seems like a PHP port of Jekyll, no different from many of the ones listed above. 

Kirby requires you to have hosting and a FTP client to send the code up, so you've paid for the software + a VPS, instead of running your site _entirely free_ using GitHub Pages.

Well ok, we're not all nerds who love Git and they've said they are aimed at designers, but I know plenty of designers who are happily using Git with tools like [SourceTree][sourcetree] or [GitHub for Mac][gitformac]. 

So back to Statamic. This one has a Control Panel, which means instead of opening a FTP client you can drag and drop your navigation items around. This cuts out the need for a FTP client to move things, and the Control Panel does seem handy, but now we have to worry about user authentication - something I loved not having in flat-file content management systems. It looks like we've looped back around.

## Blogging First

Well here we are with some tools that are getting a lot of hype from designers, which are very good at basic blogging and page management, but not a lot else. That sounds like...

Holy shitballs these guys just invented WordPress without a database!

WordPress has only recently got to a point where it's starting to get decent at doing things other than blogs and pages, and we've swung back around to square one.

The only difference this time, is what happens when you want to add in more? In the past you could install an addon, which would have access to a MySQL database and therefore could do pretty much anything. e-Commerce, Social Integration (storing tokens and whatnot), image galleries, whitepaper downloads and all of the other random things that clients decide they "need" a few months down the line?

Well the two suggestions from Statamic fans are:

* Recode it with something else
* Add a Database

Huh...

## Use Cases

Choosing the CMS for the job - like everything - comes down to the project. 

If you're happy with Git then you might as well do it for free using Jekyll and GitHub.

If you're a designer who wants to get something basic running on your favourite site and you're cool with Coda's FTP syncing then use something like Kirby - but that's going to suck as soon as you've got two people on the site, as FTP syncing is well known for wiping out changes when two folks edit a file.

If you're not going to be FTP syncing (*headpat*) then Statamic might make sense, and if you need more power under the hood then use a more classic CMS. 

## Summary 

While this surely looks like I am just hating on any project not coded by me, my main point here is to think about which tool is right for the job and raise the questions you should be asking yourself during the selection process.

Don't make the mistake of falling into the "WordPress & Co." trap again where you have an awesome blog built on a trendy system but have to sacrifice a goat, install a bazillion add-ons or screw around with nasty code to make it do anything useful. 

That said while it is great that different systems approach the same goal in different ways a lot of this does feel like buzzword bingo. 

Next these guys will add a MongoDB database and act like that is some AWESOME new advance in CMS, which has a heap of its own quirks and use-cases too - and of course nullifies the primary benefit of using a flat-file system in the first place.

Try everything, use what you like, just don't fall victim to buzz-word bingo and try things out before you start putting clients on a product.

  [fizl]: http://parse19.com/fizl/
  [filedriver]: https://vimeo.com/20223857
  [kudos]: https://github.com/ianlandsman/Kudos
  [pyrodocs]: http://docs.pyrocms.com/2.1/manual/
  [phptrw]: http://phptherightway.com/
  [phpfig]: http://www.php-fig.org/
  [jekyll]: https://github.com/mojombo/jekyll/wiki
  [adam]: https://twitter.com/adamfairholm
  [kirby]: http://getkirby.com/
  [statamic]: http://statamic.com/
  [sourcetree]: http://www.sourcetreeapp.com/
  [gitformac]: http://mac.github.com/
