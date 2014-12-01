---
layout: post
title: Give CodeIgniter's Parser library more kick with Dwoo
category: codeigniter
permalink: blog/2009/11/Give-CodeIgniters-Parser-library-more-kick-with-Dwoo
excerpt: 'Dwoo is a PHP based templating engine aimed as a replacement for Smarty
  2.x using similar and alternative syntax. This implementation basically overrides
  the logic of the default parser with this more powerful system. '
date: '2009-11-23 21:54:00'
comments: true
disqus_identifier: Give-CodeIgniters-Parser-library-more-kick-with-Dwoo
---

Anyone who has used the CodeIgniter Parser library will agree it is damn basic. The library is literally just a way to use variables and foreach loops in your views without using PHP syntax. I have never found that too helpful, and when I started looking for a way to enable a template parser for the PyroCMS page manager, what I ended up with was [**HelpfulParser**](http://github.com/philsturgeon/codeigniter-helpfulparser). That allowed us to use helpers and other PHP functions, but was also pretty basic.

Not wanting to spend too much time re-inventing the wheel I had a look at existing templating engines and decided to use [Dwoo](http://dwoo.org/ "Dwoo - A PHP5 template engine positioned as an alternative to Smarty"). It is a lightweight, PHP 5 only templating engine intended as a replacement for Smarty. The main reason I picked Dwoo over another alternative like [Twig](http://www.twig-project.org/ "Twig - The flexible, fast, and secure template language for PHP") was the syntax. If BDU's are going to using this, it needs to be as easy as possible to learn.

Surprisingly the Dwoo download came with a CodeIgniter implementation already, bundled as a very simple wrapper library with syntax such as $this->dwootemplate->assign('foo', 'bar') and $this->dwootemplate->display(). I don't you about you folks, but I hate putting the name of a third-party anything in my code when it can be avoided.

So after a little head-scratching, we now have CodeIgniter-Dwoo. DwooParser? DwooIgniter? Whatever we call it, my new Dwoo implementation for CodeIgniter sits in with "the CodeIgniter way" perfectly and the only code you will need to change within your application is the Parser file and your view files. No changes to your controllers at all!

The Lead Developer of Dwoo contacted me about this implementation and it may way well be included in the Dwoo 1.2 release in place of the old one, so please test this out and let me know if you have any issues or suggestions.

**[Dwoo implementation](/code/codeigniter-dwoo)** for CodeIgniter

