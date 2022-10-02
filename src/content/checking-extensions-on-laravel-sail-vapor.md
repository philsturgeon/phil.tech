---
layout: post
author: [Phil]
title: Checking Extensions on Laravel Sail and Vapor
date: 2022-10-02
tags: [laravel, php, docker]
---

One of the [Protect Earth API](https://docs.protect.earth/docs/protect-earth-api) volunteers was looking into using [Laravel Excel](https://laravel-excel.com/) to add "Download CSV" functionality to [Protect Earth's](https://protect.earth/) amazing new [Laravel Nova](https://nova.laravel.com/)-powered backend to finally replace [Airtable](https://airtable.com/), and they said "It needs the GD extension, which I don't think Sail or Vapor have enabled?" Let's find out how to check.

## Find Enabled Extensions on Laravel Sail

Sail, being mostly just Docker, lets you run arbitrary commands, like `php -m` which will list all the modules its got enabled. As we're looking for a specific module let's slice that list down a bit with `grep`.

```
$ sail php -m | grep gd
gd
```

Nice, sail has gd installed and enabled by default. 

## Find Enabled Extensions on Laravel Vapor

The first thing I tried was doing exactly that through Vapor CLI, but I was getting some odd results. 

```
$ vapor command --command="php -m"

Output:

   ERROR  Command "php" is not defined.
```

Welp, I hope it is, but perhaps the command command has changed and it only wants to talk to actual commands? Whatever, let's try this another way.

```
$ vapor tinker --code="dd(phpinfo());" | grep GD

GD Support => enabled
GD Version => bundled (2.1.0 compatible)
GD imaging => Rasmus Lerdorf, Stig Bakken, Jim Winstead, Jouni Ahto, Ilia Alshanetsky, Pierre-Alain Joye, Marcus Boerger, Mark Randall
```

Wahey! There we go. Thanks.

Finally, my reforestation charity [Protect Earth](https://www.protect.earth/) is free of Airtable, which served us well for the first few years but now we're up to 40,000 trees with another 40,000+ coming this winter, it's getting a bit unwieldy. 
