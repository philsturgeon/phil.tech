---
layout: post
title: 'PHP Wars: Attack of the Clones'
category: php
permalink: blog/2014/10/php-wars-attack-of-the-clones
excerpt: 'In the last article I said I wanted to write about when its a good idea
  to release a component. A lot of this comes down to: is there one out there that
  does what I want, and if so, can I use it? Should I release a PR or make my own?
  Why should I maybe avoid writing something that already exists?'
date: '2014-10-20 16:20:00'
comments: 'true'
disqus_identifier: php-wars-attack-of-the-clones
---

In the last article I said I wanted to write about when its a good idea to release a component. A lot of this comes down to: is there one out there that does what I want, and if so, can I use it?

This blog post is going to touch on a lot of points already made well by Anthony Ferrera. His article [Reinvent The Wheel!](http://blog.ircmaxell.com/2012/08/reinvent-wheel.html) says many of the same things, so if you only have time to read one article right now, go and read that.

I've been talking with various people on Twitter about how I see a lot of people building what I consider to be clones. Common packages like routers, HTTP clients, validation, currency converters, dependency injection containers, etc. 

Sometimes these are carbon copies of other packages, but often they are feature-weak versions of established packages.

While talking about this sort of thing, people seem to jump to some incorrect conclusions. I would like to take this chance to highlight what I am not talking about first:

* Panic that the Internet might run out of space
* Concern that GitHub will use up all their repos
* I think I can tell people what code to write
* I want to stop people building what they want
* I'm super angry that people are building things I don't like
* I hate innovation

It should go without saying that I'm not trying to quash innovation; I just don't think building identical shit over and over again is innovation. I see people wasting their time, and I know that time could go to better use. 

Just like with framework dependent code, building out clones forces developers to spin their wheels. It forces developers that should be collaborating, to work in parallel. Splitting users, developer resource, documentation efforts, etc. 

These problems are still found in the community due to NIH. Despite huge leaps forward in framework agnostic code, the same time-wasting is still happening. Instead of laravel-foo and fuelphp-foo, we just have 18 pages of foo with no discernible differences. 

## Not Against Innovation

People are providing Laravel as an argument against these views. They say that it started its life rather similar to CodeIgniter and FuelPHP. 

Folks concern with my "dont reinvent the wheel" approach is that it would have stopped Laravel from progressing. I think that frameworks are bad example, and not what I am talking about. Frameworks cover such vast areas that alternatives are much more likely, especially with these factors taken into account:

* Is it convention based or configuration based
* Does it provide a default application structure or let you freeform
* Does it focus more on "developer speed" or performance?
* Does the dev team move at a blinding pace adding new features but breaking the API, or does it play it cool and focus more on maintaining BC

Many of these things are mutually exclusive, so you often have two different components or frameworks based on one difference. CodeIgniter might have failed to add anything useful for years, but it was reliable due to its lack of BC breaks. Other similar frameworks broke themselves in half with rewrites, but provided bleeding edge functionality for those not fussed about longevity (RAD types) or those in a position to keep up.

This overlaps with another article I want to write, on the topic of "Your software is not better." Due to the existence of these factors, its impossible for any one approach to be "better" as they are all contradictory.

I would like to remove larger systems like frameworks and CMS' from the conversation at this point, to focus on components. Due to their much smaller size, there is often not such a need for multiples.

Different here is key, and in the realm of a component it can often be hard to innovate. I see a lot of insanely similar code thrown on Packagist and Reddit, and get a bunch emailed directly to me for feedback. Maybe they could have worked together with the author of another package if they did a quick look around. Checking out the existing solutions should of course be step 1 for anyone anyway. Sadly, when I ask "How does this differ from X", the response is very often "Oh, I didn't see X!" or "Well... I prefer $route->get() over $route->register('GET'...)", or something else equally trivial.

The golden rule is: If they are different, then awesome! One example here would be Nikita Popov's [FastRoute], which is quicker than any other router around. It's got a slightly tricky API and is missing a dispatcher, so [Orno\Route] wraps it and gives it a pretty API. This means we have two routers, but one is super fast and one is just a wrapper.

Other than using a crazy approach to make the router more efficient, there are cannot be many innovations left in routing. Certainly not enough to demand [18 pages worth] of routers on Packagist.

_Since I started writing this yesterday we're now up to 19 pages of routers. Are you kidding me?_

If I search for [routing] then there are 23 pages. There might be some cross-over from people using "router" and "routing", but many are different. These too are only the components that brand themselves as a "router", and not the "micro-frameworks" which are just an autoloader, router, dispatcher and view layer slapped together. 

[FastRoute]: https://github.com/nikic/FastRoute
[Orno\Route]: https://github.com/orno/route
[18 pages worth]: https://packagist.org/search/?q=router
[routing]: https://packagist.org/search/?q=routing

## Learning by Building

If you are familiar with Anthony's article linked in the intro, you will know he approved of people learning by building.

I fully agree. Some people learn by seeing and some by doing. If you're a do'er then building a router, a dependency container, a geocoder, etc will give you a great understanding of how it all works. His article also explains that you probably should not release those experiments. 

Remember, there is a difference between shoving something on GitHub and releasing it. That normally suggests a website, Packagist, even a damn logo in some instances. This also suggests maintenance, and the expectation of others using it. That is a big investment you're making, and you have a responsibility to your users too.

Further to that, why do you _need_ to know how every moving part works? If you are a beginner, you do not need to know how every moving part inside a router or validation package works. You'd be better invested in building applications and getting your problem solving skills improved, than wasting your time mulling over something that's been done to death already.

After you have experience with how things work in general, it might be a great time to investigate things that interest you. At that point, pick apart any package you're interested in to see how it works. I learned how to code by pulling things apart and improving them. It's how I ended up building forum software, content management systems, HTTP clients and much more.

## Use First

People suggested that unless people tried building their own components, they'd never get ideas for innovation.

I do not entirely agree with this. Using existing components gives you the ability to see room for improvement much better than just building your own thing and landing in the same pit a month down the road.

Back to frameworks for a quick example; Using CodeIgniter and Kohana is what gave us the ideas for FuelPHP. We knew the system, we know how to improve it, and knew that we could not simply improve the original. If the improvements were trivial we could have PRed, but because they were large and politics was at play, we had to fork. The FuelPHP team built on top of those concepts and learned from their mistakes. The same should be true of components.

I would recommend searching for existing solutions first. Take the most popular on Packagist, or one with a whole load of stars on GitHub. Whatever metric you use, give it a go first.

If you find yourself coming up with ideas, send them a pull request. If you find you ideas are not welcomed, see if there is another similar component you could contribute to. 

If there is still nothing, it sounds like you have a great new idea, and maybe the PHP world will love your work!

This approach of trying not to start over gives you a lot of benefits.

* If your new ideas are only minor API tweaks, you might just get used to their API and eventually prefer it anyway.
* IF you still want to improve the API, send them a pull request and see if the maintainers like it. 
* Contributing to popular open-source projects will get your name out there. That for me has lead to work and some great speaking opportunities.
* Adding a few features is quicker than building the whole thing.
* You don't have to write as many unit-tests, because somebody else did that already.
* If you contribute regularly, you might make a few friends.
* There are other people around who can help with issues, not just you. 

There is nothing wrong with building your own solution to a problem, but my advice is that you really do try to find a solution first. 

## Curation

The solution to many to solve any of these "arg there are 10,000 X's, which one do I pick!" is to provide "better curation." I don't disagree here, but there are concerns. 

If Packagist for example ordered search results by ranking then it would end up being a constant feedback loop for whichever package happened to have the most at the time. In the future, new packages would have a hard time getting their foot in the door against competitors with more installs.

A few people (including Jordi off of Composer) suggested that The PHP League could be a curated list of third-party packages. That's something that might end up happening, just as a way to shepherd people in the general direction of good quality code. That I think would lead to even more [random complaints] than the organisation has already been getting, so I can't be sure.

Either way, hiding the fact that we have a huge chunk of our community wasting their time building out the same stuff over and over, is not the same as trying to suggest that we... just don't do that. These are two different areas that need improving, and it is not one or the other.

[random complaints]: /blog/2014/10/what-is-the-league-of-extraordinary-packages

## Other Communities

I've been using Ruby and Python for the last few years now, alongside the PHP work I've been doing. I often found myself porting Rails applications to PHP after their original developer gives up, and the client wants something they feel more at home with.

One of the most common problems I had was finding equivalent packages to those in the Rails community in PHP. This lead to a lot of what we now have in [The League of Extraordinary Packages].

We had [Faker], but it wasn't enough. Factory Girl is a great gem, and I ended up finding something called "Factory Muff." Muff is kinda offensive in the UK, and the code was fairly rough. I tried PRing a bunch of things, and in the end it found a new home at The League, with the maintainer moving it over and giving it a new name: [Factory Muffin].

[Faker]: https://github.com/fzaninotto/Faker
[Factory Muffin]: http://factory-muffin.thephpleague.com/

Rails has [ActiveModel Serializers] and Python had a few similar things, but PHP didn't have squat. I ended up making [Fractal] as I needed to fill that gap. 

[ActiveModel Serializers]: http://api.rubyonrails.org/classes/ActiveModel/Serialization.html
[Fractal]: http://fractal.thephpleague.com/

Ruby has [Fog], we now thanks to Frank have [Flysystem].

[Fog]: http://fog.io/
[Flysystem]: http://flysystem.thephpleague.com

Beyond what The League is up to, something the PHP world has been missing is any sort of focus on asynchronous behavior at a component level.

I mean, yes, there is [curl_multi_exec()], but the API for that is rough as a badgers arse, and it's only useful in some cases. Things like pthreads are available as an extension for threading, but thats a bit different.

[Guzzle 5] has shown how promises can create an asynchronous workflow, and this is an example others should follow.

[ReactPHP] has made great strides in this arena too, allowing me to [create a benchmark] showing PHP to be competitive to NodeJS in parsing the DOM of remote sites.

These are all things that we didn't have until recently, and all while we are still missing a half reasonable bloody Twitter client!

I feel like there are so many amazing things we could be building together as a community, and now instead of siloing our efforts based on framework, we're just building out clones for the sake of it. 

I want to see the PHP community focus more on teamwork. 

I want to see people merging projects, and sending more PRs to exiting ones.

Maybe even more importantly, I want to see people deprecating awful old code that has no place in our modern ecosystem.

<blockquote class="twitter-tweet" lang="en"><p>Gonna take <a href="https://twitter.com/philsturgeon">@philsturgeon</a>&#39;s advise and ditch my shitty GitHub API client and use an established one so I can get other shit done.</p>&mdash; Kristopher Wilson (@mrkrstphr) <a href="https://twitter.com/mrkrstphr/status/523544363713179648">October 18, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

You are undoubtedly free to do whatever it is that you want. Experiment with any code you want. Put anything on GitHub that you want. Put anything on Packagist that you want.

That said, please do not release this stuff just for the sake of it. Releasing the 10,000th version of some basic component will not make you rich and famous. It won't help anyone, and it will probably waste a lot of your time. 

Why build another clone, if you could instead go out and build something truly useful that the PHP community does not yet have?

That will get you some attention. 

I might try and poach you for the League, but regardless, you'll have something great to blog about and to talk about at conferences. Nobody wants to hear another talk about yet another bloody router component, but Frank has been touring Flysystem all over!

Build new and exciting things, and show the other communities we can build amazing components instead of releasing the same crap over and over again. 

Post a comment with anything new you've built which you think is unique. Alternatively let me know if you've deprecated a component because of this post.

[curl_multi_exec()]: https://php.net/curl_multi_exec
[Guzzle 5]: http://mtdowling.com/blog/2014/09/28/guzzle-ring/
[ReactPHP]: http://reactphp.org/
[create a benchmark]: /blog/2013/11/benchmarking-codswallop-nodejs-v-php
[The League of Extraordinary Packages]: http://thephpleague.com/