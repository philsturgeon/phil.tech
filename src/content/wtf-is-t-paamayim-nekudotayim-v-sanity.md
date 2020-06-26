---
layout: post
author: [Phil]
title: WTF is T_PAAMAYIM_NEKUDOTAYIM
tags: [php]
excerpt: As somebody who has followed internals (and been hearing tales of woe from
  others) for a while, I've seen so many conversations with truly bizarre, irrelevant
  and trolly responses coming back from everyone all the way up to Rasmus himself.
  It was this sort of trolling and bullshit that lead to Anthony Ferrara's recent
  (and completely understandable) departure from the core. This walks through one
  example of trollolololing, as an exercise in eduction for anyone unaware of the
  madness that internals can host.
date: '2013-09-09 20:57:00'
comments: true
---

Anyone who has mentioned PHP Fractal of Bad Design to me knows I don't give it much credit. It's a list of complaints about loose-typing in general, some "it's not Python" rants, lots of complaints about bugs that have been fixed, suggestions PHP doesn't have features which it has had for years and a _few_ examples of quirks that need to be worked on.

Pretending PHP is perfect would obviously be ridiculous - it has its problems - but a list of issues being compiled gives interested developers a great chance to fix things. One such resource is [PHP Sadness](http://phpsadness.com/) brought to you by [Eric Wastl](http://twitter.com/topaz2078), to document valid bugs and freaky shit that PHP does. 

Whether it be the chicken or the egg, these items are one by one being scratched off as active core-contributors make RFCs and fight the good fight to get them merged. Think of this resource as a bug report system, but one that is entirely outside the control of people who might decide to just close it with a "wontfix" tag. If any of you guys have **valid** concerns with PHP that have been shot down or left inactive, you should consider sending them to Eric with full examples and use [3v4l.org](http://3v4l.org/) to test the output of 80+ PHP versions.

Sadly it is not always easy to clear these items, or add new features in general. As somebody who has followed internals (and been hearing tales of woe from others) for a while, I've seen so many conversations with truly bizarre, irrelevant and trolly responses coming back from everyone all the way up to Rasmus himself. It was this sort of trolling and bullshit that lead to [Anthony Ferrara](https://twitter.com/ircmaxell)'s recent (and completely understandable) [departure from the core](http://blog.ircmaxell.com/2013/09/rambling-on-internals.html).

## An Example

Looking at the top section of PHP Sadness are:

- [#1 Unexpected T\_PAAMAYIM\_NEKUDOTAYIM](http://phpsadness.com/sad/1)
- [#7 Parse error: syntax error, unexpected T_SL in…](http://phpsadness.com/sad/7)

Those are both essentially the same "sadness" being reported, that an unrecognisable token used to display instead of showing something useful. For those of you who don't know, in PHP `T_PAAMAYIM_NEKUDOTAYIM` is the token name for `::`, the static separator. It's Hebrew for double colon.

Both of these have been "fixed" in PHP 5.4, but only partially. There is a little caveat in both:

> PHP 5.4 still calls it `T_PAAMAYIM_NEKUDOTAYIM`, but includes '::' in the error message, making it only mildly less confusing

Everything in PHP is broken down from literal symbols into tokens, like `T_IF`, `T_ELSE`, `T_STRING`, `T_SL` and of course the crazy-looking `T_PAAMAYIM_NEKUDOTAYIM`. These are then handled by the parser, and if an unexpected order of things turns up you get an error message. That error message always used to be:

> Parse error: syntax error, unexpected (T\_PAAMAYIM\_NEKUDOTAYIM)

Since PHP 5.4 the output is:

> Parse error: syntax error, unexpected '::' (T\_PAAMAYIM\_NEKUDOTAYIM)

That is a little victory for sure, but as Eric points out it's pretty damn confusing to still see that token name in there.

Why is it not just:

> Parse error: syntax error, unexpected '::'

Or better yet:

> Parse error: syntax error, unexpected '::' double colon

I asked on IRC and got this answer:

> ekneuss: philsturgeon, the token name was kept around because conservative people felt that removing it would be too much of a change, and might confuse users.

I understand that to get the `'::'` in the guys implementing this RFC had to keep displaying the token name to appease the conservatives on internals. That is a compromise and it is fair enough on their part, but as a PHP user (not a core contributor) I do not feel like it is of any relevance to me whatsoever.

In other words: **I give zero fucks about the name of the token** - especially if it has a non-standard name. I understand that core developers want that, but it could easily be an extra logging output item, or some sort of default-off dev switch in the parser, or something.

I was interested, so I started digging into this decision and I came across an absolute gem on the mailing list.

### A Trolls Tale

A battle of epic proportions was held on PHP internals about this back in 2010, started off by ##php Freenode IRC operator [Chad Minick](http://twitter.com/cythrawll), suggesting that `T_PAAMAYIM_NEKUDOTAYIM` should be renamed. I don't care much about having it renamed because the core of PHP can do what it likes. I simply care about the separation of internals and user display. 

For the same reason the people using one of my web-apps don't need to know what I name my variables, I am equally uninterested what the parser decides to nickname a semi-colon or an angle bracket in the parser.

This conversation was a perfect example of internals trolls going full-blast, and is exactly the sort of situation that lead to Anthony's rage-quit. Let's have a look at the "highlights" of this conversation:

Chad opens with:

> WTF is `T_PAAMAYIM_NEKUDOTAYIM`?
> 
> This has to be THE most asked question by new php developers when they
come across it. Can we please change the token name to `T_DOUBLE_COLON`
so I don't have to hear about it constantly?
> 
> Those that disagree don't do enough PHP support to know how often it is
asked. it's worth it.

[Link](http://grokbase.com/p/php/php-internals/10ay7h1f2a/php-dev-rename-t-paamayim-nekudotayim-to-t-double-colon)

Probably not a great way to launch in, but he makes a valid point. His position as an operator on ##php means he would know what people are asking, and trying to resolve issues that bring up the most requests is a reasonable aim.

Daniel P. Brown is the first troll to take aim:

> Someone disagreeing with your request to change something does not
correlate to their doing "enough PHP support." There are many reasons
to disagree with a change request, no matter how much any one person
thinks of it as a necessity or an improvement.

[Link](http://grokbase.com/p/php/php-internals/10ay7h1f2a/php-dev-rename-t-paamayim-nekudotayim-to-t-double-colon)

His accuracy points must need leveling up, because that is not even vaguely what Chad said.

James Butler takes his turn (after a bunch of people argue about the fact Chad didn't have his full name displaying on the first post properly) and uses the good old fashioned "if it aint broke don't fix it" attack:

> Why should this be changed? Is it broken? Is it something that 1 second on google can't answer?
If somebody is advanced enough to be using classes (I think about the only time you would use a double colon) then they should know what it means.

[Link](http://grokbase.com/p/php/php-internals/10aysaywpa/php-dev-rename-t-paamayim-nekudotayim-to-t-double-colon)

Even in 2010, referencing a static class is hardly considered "advanced" usage. Copy, paste, mistype, `T_PAAMAYIM_NEKUDOTAYIM`. And it is broken, if you have to Google a parser error because its written in Hebrew then the parser is fucking broken. 

This is roughly where PHP's closest thing to a BDFL [Rasmus Lerdorf](https://twitter.com/rasmus) beams into the conversation with a little history:

> There are two reasons this term will stay. It is a tip of the hat to
the amount of PHP work that came out of Israel, and it is a good
reminder that there are a lot of other languages in the world. People
whose first language is not English, myself included, are forced to work
with unfamiliar terms every day. I wouldn't mind having a few more
non-English identifiers in PHP actually.
>  
> Well, and a third reason, I like it.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon#20101030gqhakkjqq1e9c5cpvc2kqr0870)

There are three things wrong with this.

1. I'm really glad to hear that international contributions are doing well. This is a great sign that our community is wide reaching, but we're not naming a fucking bridge here. A link in some credits or a README would do a wonderful job of thanking people for their contributions - like every other open-source project ever.
2. The fact that many programmers are forced to learn English (or at least recognize English keywords) is a [tricky subject](http://www.codinghorror.com/blog/2009/03/the-ugly-american-programmer.html), but lets stick to forcing one language down peoples throat and not randomly make different keywords in different languages for the sake of it.
3. Plenty of people clearly don't like it, so how about a vote?

As I said above PHP's users do not give a shit about token names, so the fact that this bizarre message is being displayed to every single PHP user just because the founder of the language likes it is ridiculous.

Let's keep going.

Stan Vass appears out of nowhere in a flash as a thunderbolt claps around internals, temporarily stunning the trolls with a flash of fucking logic:

> It's amazing to me this has become such a long discussion. The facts are
simple:
>
> 1) People don't ask for the other parse errors even half as often as they as
for `T_PAAMAYIM_NEKUDOTAYIM`  
> 2) They do so because it looks like gibberish to them, so it looks unlikely 
> to be a common thing you can Google, nor it gives something recognizable to start with  
> 3) Yes, to all who are not sure, more people know English than Hebrew.  
> 4) Yes, we all acknowledge it's an easter egg joke that refers to the 
creators of PHP. But that particular joke has outworn its welcome in the
community after repeatedly causing support issues.
>
> `T_DOUBLE_COLON` already exists as a constant in userland, so the jump to it
won't be an epic change. Let's do it as a proof that we're not a nerd
gridlock bound to argue forever about even the most minor and obviously
positive changes PHP can implement.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon#20101101bmxe2dwm54v13x9qqjfj15agwr)

Boom. Mic-drop. PEACE!

Right? Nope.

Dennis Haarbrink has this to say:

> Come on people, what exactly is the problem with a once-in-a-lifetime investment of 5 seconds of your time to google some stupid error message. Something you, as a developer, spend your life doing.
> 
> Please, stop complaining about a minor (yes, it is minor, use the fricking search engine!) annoyance and accept php's heritage.
> 
> And please understand, I do get where all the opponents are coming from, it is an unnecessary complicated error message (I agree that the language argument is a moot point, in the world of internet and programming in particular, English is the standard), but you google it once in your life and then you 'forget' about it. And if you can't remember the meaning of something like that, I hardly doubt you'd be a decent programmer anyway.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon#20101101xqghahzfyzb7wzfyvjz65ks5gc)

Really Dennis? 

What is the problem with Googling a "stupid" error message? _The fact that I have to Google a stupid error message is the problem with having to Google a stupid error message! You even call it an "unnecessary complicated error message" in the same post.

Minor problems are still problems. 

An excellent retort from Alexander Schrijver combines humor with "you're wrong" perfectly: 

> Its a minor change and an annoyance to a lot of people. Yes, by not changing
this you'r annoying thousands of people.
>
> This isn't an easteregg either. This is a "lesson" as someone explained.
eastereggs aren't visible to normal users.
>
> If you want teach people about Hebrew you obviously can do so. I don't see how
that is the goal of a programming language, but that is an other issue. But
don't come along and insult us with this bullshit.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon#2010110195t2y8e2wt39x6m44d1nn0xvpg)

_**Side Note:** This line of conversation was mostly being slammed down with suggestions that the entire thing was "Cosmetic Nonsense", and instead folks were redirected to the [Lemon parser](https://wiki.php.net/rfc/lemon), which has been marked as "In progress" for years. I asked around and it turns out it was abandoned, so I poked the author to change the status to Abandoned so folks know whats up in the future._

The whole idea that the ONLY way to resolve this is to go with a brand-new parser is potentially ridiculous. They were really suggesting there is NOTHING in the parser that could easily do a backwards look-up on the parser to say `T_PAAMAYIM_NEKUDOTAYIM` is `::`, and output it as part of the error?

Andi Gutmans casts a pro-PAAMAYIM attack along with some elitist drivel:

> The first google entry when you search for it gives you the answer. It is actually unbelievably easy to find the answer via search. If a new PHP developer can't find it then maybe they shouldn't be writing code.
>
> This is a piece of history from the PHP 3 days and think it adds some character, a story (and history) to PHP. Don't think we should take this out after a good 12 years.
>
> I would prefer this was not changed.

Oh good, it adds some character? That seems like a valid reason to keep speaking Hebrew to our international community for no reason, whilst keeping PHP the laughing stock of the entire same international community - except for _some_ of PHP internals crew. Thanks for that Andi.

Even PHPUnit PHP-extraordinaire [Sebastian Bergmann](https://twitter.com/s_bergmann) and phpDocumentor member (and Editor of [PSR-5](https://github.com/phpDocumentor/fig-standards/blob/master/proposed/phpdoc.md) which I'm currently listed as Co-ordinator for) [Mike Van Riel](http://twitter.com/mvriel) support[ed] this argument.

It might be part of PHP's history, but this is one of this memories that would be nice to move away from, like how your granddad probably doesn't still wear that nose-ring and crazy tattoos he had when he was a rebellious punk teenager.

And if we need to keep the shitty tattoo, can we at least make sure it's not visible to everyone?

Chad is revived and comes back to fight on:

> It's the same argument everyone else is giving, and really it all comes
down to this.:
> 
> Nostalgia is valued over clarity and consistency.
> 
> Do you guys REALLY want to claim that?

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/nested/page/2#20101030kvbc589enh40bg00hcxzng3yam)


That produces a lot more "it aint broke so…" responses so I wont bother to highlight all of them. It's said by 4 different people and I'm getting bored of copying and pasting, but James Butler returns with his second "if it aint broke". He needs that printed on a t-shirt or something:

> If it ain't broken don't fix it.
>
> Change for the sake of it is a bad thing. It does things like introduce bugs etc.
>
> Q1) is it broken?  
> Q2) if yes exactly what is broken  
> Q3) does the proposes fix solve the root cause?  
>
> I'm not sure changing the token name is the correct fix to people not knowing what the error means.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/nested/page/2#201010307v0ty3w0y3km2ynjfq1qn3wp68)

Let it be noted that at this point MULTIPLE people had suggested not actually renaming the token, but changing the error message. 

Chad keeps on pushing through, like a snow-plow running on jet fuel:

> Q1) yes, it is broken, people have to Google or ask around for a very
unclear error message when for the most parts errors are (and should be)
self explanatory.
>
> Q2) Two things are broken: Either the token is named badly, or the
token names shouldn't show up in error messages at all and be replaced
with something a bit more friendly.
>
> Q3) those two fixes above would probably fix that, yes.
>
> What is so hard to believe when people see UNEXPECTED T\_DOUBLE\_COLON on
LINE 23 they are gonna look for a double colon on line 23? because they DO.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/nested/page/2#2010103041s4d4hmh9h8s1ykw15kswz1j4)

Right. If no change to the token is gonna happen, at least hide it. I read this as "lets do SOMETHING instead of just arguing!!". And yes, the fact that what should (and obviously could) be such a simple error message requires a google is an error in itself.

James Butler tries saying something different to his usual slogan but it doesn't really work out:

> Are you supporting users who you provide a shared hosting embodiment too, and do you control binary installations on the environments? If so then possibly patching source for you installs maybe the easiest and quickest solution.
If we knew the nature of your support requirements, then we could possibly suggest a better solution or be won round. (although internals isn't the place for that really)
>
> This is not meant to bait but possibly an improvement in your support process or docs might yield a solution?

[Link](http://grokbase.com/p/php/php-internals/10ayn648kk/php-dev-rename-t-paamayim-nekudotayim-to-t-double-colon)

Really? If you don't want error messages in Hebrew you should patch PHP and install this custom version on your own server, and maintain it with updates, etc.

Fuck everything about that. I'm stunned.

## A Hero Emerges

When all seems lost, a savior swoops down from the clouds riding atop a magical griffin. He is known to some as "Felipe Pena", and on his mighty sword was inscribed a phrase which was unreadable to the trolls. It was an unknown language, but after a quick Google search the trolls learned the message turned out to be Hebrew, and translated roughly to "Let's just fucking fix it instead of bitching about things for a solid month."

> Instead of renaming the token, I prefer to associate a literal string to
each token, to have a legible error message, without the T_ being shown.
>
> For example, we could use in the Bison grammar file:
%token T\_PAAMAYIM\_NEKUDOTAYIM "::"
>
> So that the error message become:
>
> $ sapi/cli/php -r '::'
> Parse error: syntax error, unexpected :: in Command line code on line 1
>
> Instead of the known "unexpected T\_PAAMAYIM\_NEKUDOTAYIM" one.

[Link](http://grokbase.com/p/php/php-internals/10b1ew2nn4/php-dev-rename-t-paamayim-nekudotayim-to-t-double-colon)

Rasmus agrees:

> Years and years ago that was the intent. I didn't think there was a
clean way to do that in yacc though.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/nested/page/2#20101101rh86zyhkd7vxq9gaztw344e13c)

Stunned silence...

Ferenc Kovacs is so confused he has to ask if its really happening, then posts a summary - which identifies all of my feelings about this thread:

> Thanks Felipe, you are my hero.
> Anybody else thinks that this thread is very similar to the last array
dereferencing discussion?
http://www.mail-archive.com/internals@lists.php.net/msg46789.html
>
> Somebody brought up the idea, most of the veterans tried to dismiss without
discussion, pointing out, that its an old topic, and nothing will change,
status quo, others tried to bend the thread to the lemon patch.
and Felipe solved the original problem that everybody thought impossible, or
much harder, than it was actually.
>
> so I think we should ask Felipe more about the unsolvable problems in PHP,
and maybe we shouldn't stop discussions about old topics, because maybe the
environment around the problems changed with time.

[Link](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/nested/page/2#201011026aae6t4yw3x7fyqj6cpfx8emaw)

And now, PHP 5.4 has literal symbols in its error messages.

If anyone would like to read the whole thing you can see this madness in its entirety [here](http://grokbase.com/t/php/php-internals/10ayegjgg4/rename-t-paamayim-nekudotayim-to-t-double-colon/10ay7h1f2a). 


## Debrief

This tale was brought to you to highlight some of the top-level pointless trolling that can be found perpetuated by SOME of the core developers of PHP, in a bid to help people understand why some things in PHP are the way they are. If anyone was confused about Anthony leaving, they shouldn't be anymore with shit like this going on. This was by no means an isolated incident.

Not everybody who disagreed with this suggestion was being an idiot, or a troll, but there were certainly a few contenders.

## Return of the Trolls

Recently something pretty similar has been happening with [Named Parameters](http://news.php.net/php.internals/68976), but [Nikita](https://twitter.com/nikita_ppv) is still doing his thing - and he's doing it well. RFC means request for comments, its a place for discussions to be had, merits to be discussed fairly and pros/cons to be listed and **understood**, not a place for Status Quo fans to gang up on purveyors of change and improvement for the sake of it.

Anthony: We feel for you buddy. Every PHP developer I've spoken to since your decision to go is sad to see you leave. Internals needs more like you, and less of the "if it aint broke" jerks. We don't need things to be recoded every week, but we certainly want a little more progress than maintaining bullshit Hebrew error messages because nostalgia is fun for a few core contributors.

## The Bright Side

This is a good time to point out, I'm extremely grateful for the hard work of anyone contributing on PHP internals with useful features and constructive discussion. To name just a few (in no particular order): Sara Golemon, Nikita Popov, Igor Wiedler, Xinchen Hui, Ralph Schindler, Zeev Suraski, Pierre Joye and Andrey Andreev, keep it up. We lost one, but we have plenty more.
