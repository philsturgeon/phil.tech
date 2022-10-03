---
layout: post
author: [Phil]
title: Global Namespace Collision Detection in PHP
date: 2022-10-03
tags: [php, codeigniter, php7, php8]
---


[Namespaces](https://www.php.net/manual/en/language.namespaces.rationale.php) have existed in PHP since version 5.3 to avoid two classes with the same in different parts of the codebase from conflicting with each other, and to avoid us having to do awful `Acme_Some_Module_Class_Name` prefixing. Nobody needs to tell you to use them, you almost certainly already do. CodeIgniter 3 does not, and for one client that was causing problems with PHP-DI and APC caching. How can we find all the global namespaces that collide so we can hack them to have different class names? 

## What is a Global Namespace Collision

Maybe you have two classes called User. One in `application/controllers/user.php`, and one in `application/libraries/User.php`, both of which are named `class User {}` and for _reasons_ they are not using namespaces.

Depending on how you have PHP configured, and how you are loading these classes, this is either going to be completely fine or a fatal error. PHP might load them up in different requests and forget about them, but there's a good chance that if you have something like PHP-DI and it's caching classes with something like APCu then you're about to have a bad time. 

This happened for a client as they switched from PHP-DI v5 to v6, which dropped support for one form of caching and meant switching to APCu, which then meant collisions started happening. 

As the application was using the super-old CodeIgniter v3 which doesn't have any way to namespace controllers, we needed to get creative. 

## Can CodeIgniter 3.0 Use Namespaces

As with anything in CodeIgniter there's a core extension/replacement knocking around that you can use to completely change how it works. The excellent [@kenjis](https://github.com/kenjis) has created [codeigniter3-namespaced-controller](https://github.com/kenjis/codeigniter3-namespaced-controller) which can be used to support namespaced controllers, but it's more of a hack than a feature, and it would have caused some of the other core extensions to fail. 

## Detecting Collisions

There must be a way to detect collisions other than "shove it into production and see what breaks", right?

My friend Cees-Jan Kiewiet has built a great little package called `wyrihaximus/list-classes-in-directory`, which nearly did exactly what I wanted, but not quite. I needed a bit more information back than just then name of the class, and thankfully its built on top of a package that would let me do that: [Roave/BetterReflection](https://github.com/Roave/BetterReflection).

```
composer require roave/better-reflection
```

This worked perfectly, and as I was in a hurry to get this done and get back out into the woods to cut down a bunch of invasive species knackering the place, I slapped together a quick and dirty procedural PHP file. Ready? 

```php
<?php

require 'vendor/autoload.php';

// -- Configure -- 

$directories = [
    __DIR__ . '/application/controllers',
    __DIR__ . '/application/core',
    __DIR__ . '/application/libraries',
    __DIR__ . '/application/models',
    __DIR__ . '/application/modules',
];

use Roave\BetterReflection\BetterReflection;
use Roave\BetterReflection\Reflection\ReflectionClass;
use Roave\BetterReflection\Reflector\{ClassReflector, DefaultReflector};
use Roave\BetterReflection\SourceLocator\Type\{AggregateSourceLocator, AutoloadSourceLocator, DirectoriesSourceLocator};

// These two list functions are from https://github.com/WyriHaximus/php-list-classes-in-directory
// Copied and pasted wholesale. I just changed `yield $class->getName()` to `yield $class` so I'd have
// access to other methods.
// https://github.com/sponsors/WyriHaximus

/**
 * get a list of all classes in the given directories.
 *
 * Based on: https://github.com/Roave/BetterReflection/blob/396a07c9d276cb9ffba581b24b2dadbb542d542e/demo/parsing-whole-directory/example2.php.
 *
 * @return iterable<ReflectionClass>
 */
function listClassesInDirectories(string ...$directories): iterable
{
    $sourceLocator = new AggregateSourceLocator([
        new DirectoriesSourceLocator(
            $directories,
            (new BetterReflection())->astLocator()
        ),
        // ↓ required to autoload parent classes/interface from another directory than /src (e.g. /vendor)
        new AutoloadSourceLocator((new BetterReflection())->astLocator()),
    ]);

    foreach (listClassesInSourceLocator($sourceLocator) as $class) {
        yield $class;
    }
}

/**
 * @return iterable<ReflectionClass>
 */
function listClassesInSourceLocator(AggregateSourceLocator $sourceLocator): iterable
{
    /**
     * @phpstan-ignore-next-line
     * @psalm-suppress UndefinedClass
     */
    yield from class_exists(ClassReflector::class) ? (new ClassReflector($sourceLocator))->getAllClasses() : (new DefaultReflector($sourceLocator))->reflectAllClasses();
}

// 

$allClasses = listClassesInDirectories(...$directories);

$classNames = [];
$fileMap = [];

foreach ($allClasses as $class) {
    $className = $class->getName();
    $fileName = $class->getFileName();

    // If it's in a namespace its fine
    if ($class->inNamespace()) {
        continue;
    }

    // A nice list of all classes, and let duplicates in
    $classNames[] = $className;
    
    if (!isset($fileMap[$className])) {
        $fileMap[$className] = [];
    }

    // Now we know which files contain which classes, which is used to report duplicates
    $fileMap[$className][] = $fileName;
}

natsort($classNames);

// Count how many instances there are off that class name, and if there's more than 1 lets worry about it
$allDuplicateClassNames = array_filter(array_count_values($classNames), fn($count) => $count > 1);

foreach ($allDuplicateClassNames as $className => $count) {
    echo "class $className has been defined $count times in root namespace:";
    echo PHP_EOL, "  -- ", implode(PHP_EOL.'  -- ', $fileMap[$className]);
    echo PHP_EOL, PHP_EOL;
}

echo "These following classes will need to be renamed:", PHP_EOL;

foreach ($allDuplicateClassNames as $className => $count) {
    echo implode(PHP_EOL, $fileMap[$className]), PHP_EOL;
}
```

When I ran this I got a LOT of feedback. 

```
class Api has been defined 3 times in root namespace:
  -- controllers/test/Api.php
  -- controllers/behat/Api.php
  -- controllers/crons/Api.php

class Api_Payment has been defined 2 times in root namespace:
  -- controllers/api_v1_1/Api_payment.php
  -- controllers/api/Api_payment.php

class Api_Reservation has been defined 2 times in root namespace:
  -- controllers/api_v1_1/Api_reservation.php
  -- controllers/api/Api_reservation.php

class Api_Room has been defined 2 times in root namespace:
  -- controllers/api_v1_1/Api_room.php
  -- controllers/api/Api_room.php
```

The list goes on.

This lead to several discussions about how to handle testing, how to handle versioning, how to handle prefixing, and in the end a lot of controllers were renamed with manual routes added instead of relying on CodeIgniter magic. That's all another story, [one from a long time ago](https://phil.tech/2013/beware-the-route-to-evil/). 

Anyway, Yaaaay, job done. 

Seeing as I couldn't find anything when I was googling I thought I would share this. If somebody wants to turn it into a little package go right ahead, just slap some attribution on there, and consider making it [Treeware](https://treeware.earth/). 

Speaking of trees, if this blog post helped you and you'd like to support my work, the climate action charity I co-founded [Protect Earth](https://protect.earth/) is planting ~40,000 trees across the U.K. this winter (actually doing the work ourselves not farming it out to somebody else) so please [chuck us a few quid](https://protect.earth/donate?utm_source=phil.tech). 

Now I'm off to smash some invasive bamboo with a machete. Bye for now! 
