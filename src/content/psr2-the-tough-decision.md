---
layout: post
author: [Phil]
title: 'PSR-2: The Tough Decision'
tags: [psr2, php, php-fig]
excerpt: PSR-2 has been out for a while now, and even though developers from member
  projects (such as Joomla, Drupal, phpBB, CakePHP, Symfony and Zend) got together
  and took part in a entirely fair vote to decide if tabs or spaces should be involved,
  it soon became apparent that the group had made a mistake. Due to an overwhelming
  surge of complaints about the use of spaces for indentation instead of tabs in PSR-2,
  the PHP-FIG has had no choice but to reverse this decision. 
date: '2013-04-01 11:45:00'
comments: true
disqus_identifier: psr2-the-tough-decision
alias: blog/2013/04/psr2-the-tough-decision/
alias_1: php/2013/04/01/psr2-the-tough-decision/
---

[PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) has been out for a while now, and even though developers from member projects (such as Joomla, Drupal, phpBB, CakePHP, Symfony and Zend) got together and took part in a entirely fair vote to decide if tabs or spaces should be involved, it soon became apparent that the group had made a mistake.

Due to an overwhelming surge of complaints about the use of spaces for indentation instead of tabs in PSR-2, the [PHP-FIG](http://www.php-fig.org) has had no choice but to reverse this decision. 

This change of course comes at a cost. It means that every single PSR-2 supporting package will need to be updated if it wishes to maintain PSR-2 compatibility. It also means recoding the PHP-CS logic, and CS-Fixer along with that. Changing the website will take a while and educating the community will cause problems, and even though there are no technical benefits to be found in the change, the gains are clear:

_Now some of you will no longer have to change the default setting in your IDE's/editors from "Tabs" to "Spaces"._

We (the PHP-FIG) feel like the sacrifices listed above, alongside the reduction of the portability of any PSR-2 code are all small prices to pay for this very important pro. After all, having to change that setting - even if only once - really was a pain in the backside.

Now, we completely understand that only about half of you prefer tabs, and the other half were happy with spaces. If the users of Reddit don't all agree that this was the right decision we'll be happy to change it back again in a few months, because everyone having their own personal preference ratified in an optional standard is clearly more important than anything else the PHP-FIG could be working on. I understand.

Thanks for all the wonderful feedback on this topic, and we look forward to hearing constructive feedback during this difficult period of transition.
