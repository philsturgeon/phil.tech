---
layout: post
title: Beware the Route to Evil
category: php
alias: blog/2013/07/beware-the-route-to-evil/
excerpt: As a programmer we should all be used to the fact that our personal preferences
  and habits are all subject to change. I used to be a big fan of Alman and tabs &gt;
  spaces, now I follow PSR-2 happily which contradicts those two rules and couldn't
  care less. Another contradiction to my personal preferences has been "automagical
  routing" verses "verbose routing", and this article explains why I changed my opinion
  on that.
date: '2013-07-23 19:53:00'
comments: true
disqus_identifier: beware-the-route-to-evil
---

As programmers we should all be used to the fact that our personal preferences and habits are all subject to change. I used to be a big fan of Alman and tabs > spaces, now I follow PSR-2 happily which contradicts those two rules and couldn't care less.

Another contradiction to my personal preferences has been "automagical routing" verses "verbose routing". CodeIgniter used to guess the route from a URL, and I loved that. All I'd need to get a controller working was make the file, add a method, call it up in the browser - it seemed so simple!

Then I worked on the [CodeIgniter Rest-Server](https://github.com/philsturgeon/codeigniter-restserver), which allowed users to suffix their methods with HTTP verbs, so `GET /users/profile/1` would go to `public function profile_get()`, and a profile could be updated by posting to it, the method of course being `public function profile_post()`. Everyone was happy, I used it to make about 5 million API's, the UN have code running on it, USA.gov are doing something with it, unicorns and rainbows everywhere.

BUT, when you start to rely on this automagical logic it can be a huge ball-ache down the line. Now, every single endpoint in my entire application has its own route, which I've created myself, specified the HTTP verb it should attach to (one at a time) and maybe even named it if I'm using something cool like [Laravel 4](http://laravel.com/docs/routing#named-routes).

Here are some reasons why relying on automagical route guesswork in your framework of choice is probably a bad idea.

## Project Inheritance

I've taken over projects using this sort of logic. Not just in CodeIgniter, but Kohana, Fuel and Laravel too. Because I am taking over from somebody else, first I need to work out all the URLs. Sometimes this would be an API with some outdated endpoint documentation, but more commonly it would be random applications with admin panels, AJAX endpoints, user dashboards, search forms and whatever else. 

When you get to this sort of project having auto-guesswork routes means you have to go through all the controllers, pick apart which endpoints are navigated to via the auto-guesswork and which have their own custom route (because the client wanted `/users/profiles/philstugeon` to be `/p/philsturgeon`). Yay.

## Duplicate Endpoints

Whenever you make a custom route like `/p/philsturgeon`, you still have `/users/profiles/philstugeon` active. As a "backwards compatibility" thing that might seem like a nice idea, but you don't want both URLs active indefinitely. In other examples you probably wont EVER want both to be active, so now your only real option is to specifically route `/users/profiles/{any}` to the toilet, which is growing your routes file for something you don't actually want…

## Route Evaluation Performance

Go and look at the CodeIgniter router and tell me if you think the number of `file_exists()` and `is_dir()` checks it performs to maintain that level of guesswork is a good idea. Even if they threw a cache in there, its complicated as f**k and totally unnecessary. With static routes you are saying "take this pattern, and send it to that action" which is super lightweight, compared to: "Is the first segment a directory, or a file? Is the second a directory, or a file, or a method in a file? Madness.

## Renaming Controllers

You want that whole thing to be called "channel" instead of "categories"? If your auto-guesswork was getting you to the "categories" controller, then you're faced with two options. A) Rage-quit B) Tell your boss to pick the right nomenclature first, then do A, C) Rename everything so the guesswork works, or D) Add some static routes, which you're starting to realize maybe you should have done in the first place.

## <strike>Resource</strike> RESTful Controllers

Even Laravel 4 is a little guilty of this, but you can do it either way. Every day I see people using their [RESTful Controllers](http://laravel.com/docs/controllers#restful-controllers) (which are incredibly similar to the Rest Server controllers I put together) which combine the HTTP verb and the URL segment to map to a method, then try to call it. 

This sounds great until people want to start using named routes, reverse routing, etc and all of a sudden the conventions clash. The answer in most cases is "Stop trying to be clever and manually list your routes.", and it works.

## Sub-Resources are impossible

Your magical route logic is never going to make this work:

~~~php
Route::get('users/{id}/friends', 'UsersController@friends');
~~~

So you're going to need to half and half, which is confusing.

## routes.php is Documentation

The advantages of manually specifying your routes is that you avoid all of the above issues, but another advantage is a simple one: Your routes.php is documentation. A developer can pick it up, know exactly what endpoints go where, what controllers are active and what is old junk.

It's even been suggested that you have the slight potential performance tweak of putting your most popular URLs at the top of the routes.php file, so you can ditch out of your router ASAP. I'm not 100% sold on the importance of that, but sometimes microseconds count.

As for the cost of developer time all you're really losing here is the 5 seconds it takes you to write:

~~~php
Route::post('me/settings', 'SettingsController@update');
~~~

It's not hard, and it avoids trying to mess around making subdirectories called "me" and renaming your controllers to try and match the URL.
