---
layout: post
title: 'Blooie: Chat has Changed'
category: fuelphp
alias: blog/2012/07/blooie-chat-has-changed/
excerpt: 'The last few months have been pretty mad for me. As well as the usual client
  work for HappyNinjas, I''ve been flying backwards and forwards to America for various
  reasons, building business around PyroCMS as it spins off into its own American
  "LLC", creating a 15-part screencast series for FuelPHP and the most exciting: working
  on a few startups with friends.'
date: '2012-07-24 12:57:00'
comments: true
disqus_identifier: blooie-chat-has-changed
---

The last few months have been pretty mad for me. As well as the usual client work for [HappyNinjas][hn], I've been flying backwards and forwards to America for various reasons, building business around [PyroCMS][pyro] as it spins off into its own American "LLC", creating a 15-part [screencast series for FuelPHP][tutsplus] and the most exciting: working on a few startups with friends.

The main startup I have been involved with these last few months is [Blooie][blooie], and while it is still early days I am incredibly excited to tell you: it has launched! 

<div style="width: 100%; padding: 10px 0; text-align:center">
<iframe id="youtube" width="496" height="279" src="https://www.youtube.com/embed/CA6UTg52mN4?&theme=light&showinfo=0&controls=1&autohide=1&rel=0&amp;wmode=transparent" frameborder="0" allowfullscreen></iframe>
</div>

[Blooie][blooie] is a conversational platform that integrates with blogs and content rich websites, to help deliver an experience that is vastly more engaging than the usual comment threads or Twitter conversations. Think about when you read that awesome new post on Lifehacker, or see a new post about what the next iPhone might look like on MacRumours. If you like it you might leave a comment, but that is mainly for formed opinions and there is rarely any sort of conversation other than a free-for-all of people repeating their opinion. It's not much of a conversation.

Another regular habit is to push these pieces of content out to social networks, but when you throw up a link on Twitter anyone wishing to give their opinion in return only gets about 135 characters, or less if they have a long name. If a third follower gets involved you're trying to fit a conversation into about 100 characters, or less if they have long names. Even if you write multiple tweets, you're just spamming your timeline with loads of tweets about the same thing. Not great.

You could talk about it on Facebook, but what if you don't have many friends who are interested in that content? I am very interested in computers and kayaking, and only a few of my friends share those interests. If I post an article about an awesome command-line static code testing tool I have discovered, or want a second opinion on some obscure gear I have read a review about then the usual Facebook reply is "What the f**k are you talking about Phil?"

So, Blooie manages to fill this gap nicely. Blooie is being installed on a large number of blogs and other websites and sits there unassumingly just like the Facebook and Twitter "Share" widgets. When you click the "Blooie button" you'll be asked to create a Blooie account with Twitter or Facebook (or Vintage Mode) then log in and click Start and you're away! That social integration code is all done using FuelPHP and my [OAuth][oauth], [OAuth 2][oauth2] and [NinjAuth][ninjauth] packages.

After that everything gets handed off to [NodeJS][node] where all sorts of crazy madness is happening in the background. You're automatically connected to somebody else who you don't know, but unlike randomised chat platforms Blooie actually pairs you up with your potential new best friend. By analysing the content of the site, chewing through the meta data and doing some magic on your conversations, it's able to find somebody who is engaged with not just the exact same page, but with similar content too. This is all done with web-sockets and the chat is real-time, which NodeJS is very very good at.

When this concept was explained to me months ago I was concerned about the potential big-brother angle but the actual conversations are never saved. They aren't even backed up! The conversations are analysed for keywords and various metrics are recorded to see how interested in the conversation you were. After that everything goes in the bin.

This has been an amazing project to work on and the team is awesome. If you have a website then [sign up][signup] for access to the BETA. If you want to give it a try just click the Blooie button below. Follow [@Bloo\_ie][twit-blooie] and I'd recommend following the two main guys [@Mark\_V\_Ryan][twit-mark] and [@real\_ate][twit-chris] too. 

  [pyro]: http://www.pyrocms.com/
  [hn]: http://happyninjas.com/
  [tutsplus]: https://tutsplus.com/course/fuelphp-essentials/
  [blooie]: http://bloo.ie/
  [signup]: http://client.bloo.ie/signup/
  [oauth]: https://github.com/fuel-packages/fuel-oauth
  [oauth2]: https://github.com/fuel-packages/fuel-oauth2
  [ninjauth]: https://github.com/happyninjas/fuel-ninjauth
  [node]: http://nodejs.org/
  [twit-blooie]: https://twitter.com/bloo_ie
  [twit-mark]: https://twitter.com/Mark_V_Ryan
  [twit-chris]: https://twitter.com/real_ate
