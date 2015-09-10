---
layout: post
title: 'Package Watch: Image Management'
category: php
alias: blog/2012/09/package-watch-image-management
excerpt: For years I was locked into using the same frameworks for everything, mainly
  because my clients were hiring me specifically to use CodeIgniter based on my reputation
  within the community.  Now that is not the case and I can build things however I
  damn well like, so I am doing it properly and that is using Composer. I tweeted
  about some useful libraries I found, so here is what they are with an explanation
  of the approach and why I used it.
date: '2012-09-19 07:19:00'
comments: true
disqus_identifier: package-watch-image-management
---

Sorry if I sound like a broken record, but packages are f**king brilliant. I've mentioned before that [packages are the future of PHP][future] and plenty of [other developers][brad] are [thinking the same thing][fortr].

For years I was locked into using the same frameworks for everything, mainly because my clients were hiring me specifically to use CodeIgniter based on my reputation within the community. 

Now that is not the case and I can build things however I damn well like, so I am doing it _properly_ and that is using Composer.

## No Framework?

Any project needs some sort of base; something needs to handle your HTTP requests, route them to a callback, or a controller, or something. 

This is one of the most basic objectives of a framework, and really it should be one of it's primary concerns. I could write all of this myself, but I have more interesting things to do so I needed to pick a framework.

If this was an API I would have used Slim or Silex, but this project needed a lot of CRUD, form validation and database interaction so I decided to use something that had a lot of that already: Laravel 4. 

## Why Laravel 4?

Taylor Otwell gets PSR packages. Laravel 4 is entirely built on top of Composer. The validation, sessions, database (Query Builder and Eloquent ORM), routing, etc are ALL Composer packages so I can pick and chose the bits that I need. 

It makes the choice of framework considerably less important, because I can use the Laravel ORM with… anything.

## But X framework doesn't do Y

A PHP framework should focus its attention on its core responsibilities, like routing, request, response, sessions, views, etc and NOT on random edge-case stuff. Much like the CodeIgniter Cart library which I want to see [killed off](https://github.com/EllisLab/CodeIgniter/issues/214), ORM's or even in this case image management.

Laravel 4 doesn't handle it, so I had to use some extra packages.

## Image Uploads & Management

To get this extra functionality I added two packages to my composer.json:

<script src="https://gist.github.com/3748717.js?file=full composer.json"></script>

The first is [Upload][upload] by [Josh Lockhart][josh] (who built [Slim][slim] and started [PHP The Right Way][phptrw]). It's currently very basic as it's not been alive long, but for the job I needed to do it worked perfectly:

<script src="https://gist.github.com/3748717.js?file=upload"></script>
	
Perfect. It's helped me validate size and mime-type with much less boilerplate code than native PHP would have required. This same package will work anywhere, and soon enough it will have other storage drivers so  this file can go straight to S3 when I hit upload. Nice.

Moving on, one it's uploaded I want to resize it and add a watermark to the corner. Erf, ok so getimagesize() then check if the height or width is larger, then try to resize in ratio if its bigger than a certain size, then add a new image by calculating the size of the new image, minus 10 pixels to offset it and… IM SO BORED ALREADY! 

Let's use a package:

<script src="https://gist.github.com/3748717.js?file=watermark"></script>
	
Phew, I almost had to think for a minute there. Thanks [Clément Guillemain](https://github.com/Sybio).

The think I love is that all of these packages fit into my application perfectly, and there is no "I wonder if they've updated recently, I'd better go back to their blog and check to see". Even more recently with GitHub managing all of those as Git submodules would have been a ballache.

Here is my entire composer.json for this project:

<script src="https://gist.github.com/3748717.js?file=composer.json"></script>
   
Easy right?

## Final Thoughts

I know it's early days but this is PHP renaissance. People are building an [ActiveMerchant port](https://github.com/adrianmacneil/tala-payments) (payment with 12+ gateways that will work perfectly in any framework), Alex Bilbie is combining all of our OAuth 2 client and server logic for CodeIgniter and FuelPHP to make one **epic** OAuth 2 package that will do everything, there are [Asset pipelines](https://github.com/CHH/pipe), [command line controllers](https://github.com/nategood/commando), [IMAP inbox readers](https://github.com/tedivm/Fetch), and all sorts of crazy and useful things.

Start using Composer on your next project and say "fuck you" to the frameworks that lock you in. If you spend all your time using that one framework, you'll have a horrible time using a different one. If you use packages you can take them with you to whatever framework you use for the next project. That reduces time wasted re-learning how YetAnotherORM works, or how YET ANOTHER ASSET LIBRARY works, helps reduce wasted code, help reduce bullshit tribalism in framework users, and helps PHP move forward as an ecosystem.  



  [future]: /blog/2012/03/packages-the-way-forward-for-php
  [brad]: http://www.bradleyproctor.com/composer-the-future-of-php/
  [fortr]: http://blog.fortrabbit.com/handle-your-dependencies-with-php-composer/
  [upload]: https://github.com/codeguy/Upload
  [josh]: https://www.joshlockhart.com/
  [slim]: https://github.com/codeguy/slim
  [phptrw]: http://www.phptherightway.com/