---
layout: post
author: [Phil]
title: "Made in Production II: Learning and Improving"
date: 2016-01-22 00:08:00+00:00
tags: [madeinproduction, doubleclaw, php]
image: img/2016-01-22-made-in-production-ii-learning-and-improving/beautiful-ben-marks-double-claw.jpg
comments: true
disqus_identifier: made-in-production-ii-learning-and-improving
alias_1: 2016/01/22/made-in-production-ii-learning-and-improving/
---

[Made in Production](http://madeinproduction.com/) has been something that my BFF [Zack](https://twitter.com/zackkitzmiller) and I have been working on for a while. We had the idea to start selling super-niche programming t-shirts in 2013, we finally got the store up and running on some janky Python in 2014, then shut it down after a few months due to a slew of unforeseen problems. Now the site is back and better than ever, and I thought I'd tell you lot a story. 

If you don't want to hear a gripping yarn of ups and downs, complications with international shipping, more "but I was deported!" excuses and who knows what else, you can have a short story of cool new stuff. 

[Made in Production](http://madeinproduction.com) now has womens t-shirts, hoodies to survive "NYC Snowpocalypse 2016: Hyperbole Never Dies but You Might" and some awesome new designs:

[![Amazing new PHP 6 Certified design, brainvented by Gary Hockin, the best thing he's even done.](img/2016-01-22-made-in-production-ii-learning-and-improving/php-6-certified-unisex-asphault.png)](http://madeinproduction.com/collections/php-6-certified)

Go see the [rest of our store](http://madeinproduction.com/collections/all). There is some great stuff, and a _lot_ more coming soon.

## Mistakes

I feel it's important to blog about mistakes. It's hard to do, because if you only blog about success then people call you a braggart or a egotistical muppet, but if you blog about problems they try and use it against you or make fun of you. 

Well stuff those people. Here's a story of things Zack and I learned getting Made in Production back online, that you can hopefully use if you ever try doing something similar. 

### Lean Startup is Hard

We wanted to try doing this entirely by ourselves, without spending anything more than we had to. It was a silly side-project, and not a VC-backed startup in the valley. It was literally Zack and I playing with the idea over beers on his sofa with children and dogs hanging off of us. 

We figured a Lean Startup approach would be a good idea, and before we get too much further we should see if anyone wanted to buy this stuff. So we did that. We got our awesome friend Laura Bohill to make our first design, then we shoved it on a static HTML page and use a tiny bit of Python and the Stripe SDK. We figured "If a few people actually buy one of these shirts, we can put in an order and get them sent out. IF anyone bothers. Lol."

That seemed fine, until 40 orders came in and we didn't have any bloody t-shirts. Oops. Ahh well, we'll just put in an order with the API-driven supplier we looked at. Can't be too hard, we'll just use their API...

### Shirts.io was awful

Shirts.io has now rebranded to [ScalablePress](https://scalablepress.com/). It was terrible. Their API was so complicated I could barely work out what to do, and the documentation was as useful as a chocolate teapot. After days of failing to build a script that could take our orders from the PostgreSQL database and turn them into API orders on Shirts.io, I just gave up and tried doing it manually.

Two weeks later, I still couldn't send the damn order off. Their website didn't work. It's a bit better now, but a sample order with them a few months back took a month to fulfill, and that was only after I phoned them up asking what was taking so long. "Oops we forgot!" is not a cool answer for a supplier. They lost their original support guy, who was the best part of the old company. He was on speed dial and recognized my voice when I called. So many problems there.

I tried [Merchify](http://www.merchify.com/) (hilariously after meeting the guy that runs [Engrish.com](http://www.engrish.com/) at Thanksgiving dinner) but it's buggy, their packaging is non-customizable, I couldn't add womens variants and they try to be the one source of truth for all data instead of just syncing with your store. 

No, I would strongly recommend [Printful](https://www.theprintful.com/a/61467:779304a8944d10bf23761cd2f9717520). 

They offer a _huge_ selection of products from t-shirts to beanies, and from posters to pillow cases. Amazing stuff. 

## UPS and FedEx are nuts, and USPS is almost useless

Sending a t-shirt to the UK from a Brooklyn, NY UPS vendor was about $60. Are you kidding me? FedEx wasn't much better. Even at their slowest options, they're just undoable. 

No, you have to use USPS. They're ok domestically, but going to the post office is an experience I would not want to inflict on anyone. I had all the time in the world after Kapture went beeswax, but it was still killing me. They'd be about $10 to get the shirts international and $2-4 domestically. 

Not bad, but they'll happily post stuff off to literally any country but not tell you if it even got on the plane heading there. Plenty of stuff went missing, and we had to swallow the cost to send the customer a refund. Nobody got screwed over but us, we saw to that. 

## Stamps.com is a bargain

[Stamps.com](http://stamps.com/) is a massive discount sending via USPS, and it means I don't have to cycle a bag full of shirts to the post office. We still had the "no idea if it will get there" issue, and we also had to buy a printer to print the labels! And we had to get the scales, and this meant only one of us could send them all out.

If I went away to a conference, I had to make sure Zack had enough t-shirts to get the job done. Ugh. 

Sod manual shipping. Just don't do it. Don't manage stock at all. Get them to fulfill entirely for you. Not only is it easier, but it reduces how much you are truly spending on shipping. If you get one massive box of t-shirts sent to you, then post those t-shirts back off elsewhere, you've doubled the amount you're spending on shipping. 

## Lower the Unit Price in Scalable Way

Shirts.io did this thing where if you order a few its about $20 a shirt, but if you get to say 20 they're $12 a shirt. Or whatever it was. Basically if we had a slow week (4 orders) we'd just order up more than we needed and have them sent out to my place. Then I could manually post out whatever was needed and problem solved.

This would be awesome if I could have got a script running with their API, but in all that time I never could because it was awful. Theoretically I could have built something to post off known customer orders to specific places, then the rest would come to me, and I'd mail things out of stock until we needed more for others.

Splitting automated fulfillment and manual fulfillment is not something you want to get into. It's near impossible to achieve, time consuming, hard to remember who has what, and even the funkiest spreadsheet is going to get out of date. 

Find a supplier (like [Printful](https://www.theprintful.com/a/61467:779304a8944d10bf23761cd2f9717520)) who will handle fulfillment entirely for you. Sure it's more expensive, but complicating the whole problem just to micro-optimize on unit price is not worth the trouble.

In one week we've got Made in Production revenue to $1,300, and if we can get it up to $5,000 we'll get a 5% discount on the base price of most items. We get that discount (and it'll increase as revenue does) all without having to have a massive box of t-shirts in my apartment, getting all chewed up by my turtle. 

Your time has to factor in as well, and doing literally nothing is the best option.

## DIY Doesn't Help

As programmers Zack and I obviously thought we could do it ourselves. The problem to e-commerce is its much larger than you think. The feature requirements are almost infinite, and there is no such thing as a simple store.

We built a simple store that sold a single t-shirt originally. Then we needed women's variants. And different products. And different shipping speeds. 

Wouldn't it be cool if we could add coupons? What about referral links? How about tracking abandoned carts? What about PayPal? And Bitcoin?!

If we were working on this as a full time job it would make sense, but that's not how Lean Startup stuff works, and that wasn't the goal. The original site sold 100 shirts ever, so if we spent all this time building it ourselves we wouldn't have made a penny. Remember, our time is worth something too. 

No. Use an existing solution, and make sure it has integration for the supplier you're using. 

[Shopify](https://www.shopify.com/) and [Printful](https://www.theprintful.com/a/61467:779304a8944d10bf23761cd2f9717520) work together like a charm.

The monthly cost of the store should be redeemable within a few sales a month. And if you can't build up sales enough on your store to cover $15-30, then you might need to rethink your store.

## Automatically Fulfillment Can Cost

One downside with the automatic fulfillment is that you can be without the customers money for a few days while it winds its way through the Internets and into your bank account. It's not like they pay you and that money goes straight to whoever is making the t-shirt. If only it were so easy.

- Customer completes checkout on Shopify, paying you via:
    * Stripe: The money won't be in your bank account for a few days but does happen automatically.
    * PayPal: The money won't be in your bank account for a few days and you have to remember to withdraw it. 
- The fulfillment company is paid immediately from whichever payment source you chose:
    * Bank account: Remember there's no money in there yet and waiting adds several more days, which will not make the customer happy.
    * PayPal: The company withdraws money momentarily before Shopify puts it into your account, which could hit your bank or credit card for the money before the customers PayPal money gets in there.
    * Credit card: Pretty cool if you get cash-back rewards on purchases, but if you get 100 sales you could have a scary credt card statement, and you have to hope there aren't any bank holidays getting in the way of Stripe/PayPal getting your money to your account in time for you to pay off the credit card...

We have it set up to take money from PayPal, and PayPal should then hit my CC as a backup source. If that was what PayPal was actually bloody doing it would be fine, but it seems to arbitrarily take it from any account it wants. 

![Mint is properly confused about my new printing habit](img/2016-01-22-made-in-production-ii-learning-and-improving/mint-says-wut.png)

Setting up a separate PayPal with a separate bank account, and having all money go into that PayPal or that bank, then using PayPal as the payment source with the separate bank account as the backup seems like a winner. You might need a credit card in there somehow early on, until you have enough profits in the PayPal account to act as a buffer for a large surge in Stripe payments happening within that X days waiting period. 

Until we have that going, telling Printful to let me manually confirm orders and select either PayPal if it has money, or my CC if it does not, seems like a winner approach. 

Complicated huh?

## Don't Rush International

International sales are really hard. Just dealing with VAT for the EU and HST for Canada is enough of a PITA, but the last thing I need is the Chinese government on my ass for not paying enough duty tax because the shipment was over RMB 50 and an angry customer wondering where their t-shirt has gone. 

We currently are confident shipping to the USA, Canada and the EU. As we learn more we'll grow that list out as much as possible, but right now I am not prepared to sit around working out how much tax I have to pay Azerbaijan at the end of their tax year due to the one sale we made there.

Folks will be sad you don't ship to them, and quite rightly so, but just politely usher them towards a mailing list in the meantime. Over extending your shipping is just going to lead to chargebacks and headaches, and is a solid way to end your online shop before it has a chance to spread its wings.

## Summary

I'm excited about [the new store](http://madeinproduction.com/). We've put a lot more research into things this time, and we've overcome literally all the problems we had before. It has turned a profit in the first few weeks, and we're no longer randomly losing money or wasting huge amounts of time lugging boxes around.

The plan now is just to make more designs and get them up on the store. We have a couple of Python ones, another PHP shirt, one on maintaining the "status quo" (deep) and some silly API related stuff. Fun times!

I'm sure there will be a few people out there having a snootymock at how much trouble we had selling t-shirts, but I'll tell you it's really not as easy as it looks - especially at small scale. Throwing something on Teespring for a one-time round of shirts that everyone has to wait months to get (if ever) is one thing, but building a self-sustaining store with multiple variants, colours, product types, etc. is another. 

If you have any feedback on the store, potential design ideas or want to get a bulk of any of them for your conference/meetup/usergroup, then get in touch in any of the usual ways.
