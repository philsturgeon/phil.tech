---
layout: post
author: [Phil]
title: 'NinjAuth: The Social Integration Package PHP has been dying for'
tags: [fuelphp]
excerpt: "In the past I have never needed to implement oAuth into a PHP project.
  I have done it in Rails and boy it was easy thanks to OmniAuth. OmniAuth abstracts
  away so much of the grunt work that it takes about 5 minutes to add a new social
  network to your site, and 4 of those minutes are spent signing up for the API keys.
  What options do we have in the world of PHP? A bunch of screwy hacks or provider
  specific classes like TwitterOAuth. I don't want to hunt down 20 libraries with
  different methods, I want to get a key, bang it in and go to the pub. Well, now
  I can! "
date: '2011-09-17 12:13:00'
comments: true
disqus_identifier: ninjauth-social-integration-php
alias: blog/2011/09/ninjauth-social-integration-php/
alias_1: fuelphp/2011/09/17/ninjauth-social-integration-php/
---

In the past I have never needed to implement oAuth into a PHP project. I have done it in Rails and boy it was easy thanks to [OmniAuth](https://github.com/intridea/omniauth). OmniAuth abstracts away so much of the grunt work that it takes about 5 minutes to add a new social network to your site, and 4 of those minutes are spent signing up for the API keys. What options do we have in the world of PHP? A bunch of screwy hacks or provider specific classes like TwitterOAuth. I don't want to hunt down 20 libraries with different methods, I want to get a key, bang it in and go to the pub. Well, now I can!

[NinjAuth](https://github.com/happyninjas/fuel-ninjauth) - named after my company [HappyNinjas](http://happyninjas.com/) - is a package which provides abstraction layer over various strategies such as oAuth and oAuth2 and sits on top of the built in Auth driver for handling users and registration. Multiple "authentications" can be made meaning you have a single user who has Twitter, Facebook, Instagram, etc all attached to his account so you can start doing fun things with their data.

[fuel-oauth](https://github.com/fuel-packages/fuel-oauth) - A basic package which contains the providers for the oAuth strategy. This was a port of the great work done by shadowhand with his [Kohana oAuth](https://github.com/kohana/oauth) package. This is an open source world and I feel time can be better spent improving on existing code than re-inventing the wheel more than you need to. This code has been tweaked and improved upon and will get better over time.

[fuel-oauth2](https://github.com/fuel-packages/fuel-oauth2) - Another simplistic package which has providers in the same format as fuel-oauth. Some of this code was provided by Calvin Froedge who supplied the codeigniter-oauth spark.

Using abstraction of strategies and providers to this level means we can easily add in OpenID or XAuth (pull request anyone?) and support new systems without needing to totally rewrite our apps. How many of you have had to recode the f\*\*k out of your sites because of the upcoming [Facebook oAuth2 Migration](http://developers.facebook.com/blog/post/497/)? Well if we had this system we would have just moved the Facebook class from one to the other, tweaked it and your application would have seamlessly switched over as you updated the package.

### How do I use NinjAuth?!

The most important thing about this is that it is insanely easy.

1. Install the package via Zip, Git or use Oil, whatever.
2. Enable ninjauth, oauth, oauth2, orm and auth in config.php
3. Create an authentication controller. I use "auth.php":

~~~php
class Controller_Auth extends \NinjAuth\Controller {}
~~~

4. Add keys and secrets for all the providers you wish to use in config/ninjauth.php by either modifying the file in the package or copy it to the app/config folder:

~~~php
'providers' => array(


	'facebook' => array(
		'id' => '',
		'secret' => '',
		'scope' => '',
	),


	'github' => array(
		'id' => '',
		'secret' => '',
		'scope' => 'user,public_repo',
	),


	'twitter' => array(
		'key' => '',
		'secret' => '',
	),
~~~

5. Go to http://example.com/auth/session/facebook
6. Laugh about how easy it all was.

Currently NinjAuth supports:

- Dropbox
- Twitter
- Flickr
- Google
- GitHub
- LinkedIn
- Facebook
- YouTube

More can be added pretty easily by adding them to the correct oauth package then modifying ninjauth/classes/strategy.php and adding to the array which lists which provider uses which strategy. Then add it to the bootstrap.php and send me a pull request.

### Whats next?

The oauth2 package has been [ported to CodeIgniter](https://github.com/philsturgeon/codeigniter-oauth2) and Calvin is working on making the [codeigniter-oauth](http://getsparks.org/packages/codeigniter-oauth/versions/HEAD/show) Spark more awesome. Porting NinjAuth for CodeIgniter would be remarkably simple, but without a user package it's pretty pointless. I'll probably just write a blog about how to make your own in CI and use whatever user system you like. PyroCMS can expect to pick up a few sweet features from this code, potentially for v1.4 or v1.5.

These packages were the fruit of some freelance work done in London for the last few weeks (keeping up my [Nomadic Web Development](https://phil.tech/blog/2011/08/nomadic-web-development) lifestyle of hostel living with hot French girls) and they will all become crucial parts of the next few applications I build.

What I want from people reading this is for them to download it, give it a go and provide feedback, build support for new providers (try Foursquare it's pretty easy but I refuse to sign up for an account) and help me make it even better. I firmly believe OmniAuth is one of the best projects in Rails-world and there is no reason PHP users shouldn't have something so damned useful.

**Update:** _As Adam Fairholm quite rightly pointed out this is only for v1.1 which is still in development, but I have been using it for every client project in Fuel and it seems fine to me._
