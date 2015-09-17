---
layout: post
title: Testing and Contributing with Composer Packages
category: php
alias: blog/2013/05/testing-contributing-composer-packages/
excerpt: While Composer has been around for a while now, many packages are still in
  their infancy (&lt; 1.0) or sometimes are just not as feature filled as they could
  be. Pull requests are going to be a common thing for the PHP community to be doing
  to these packages and this needs to be done safely, with unit-testing. So, how do
  you run their test suite and add your own tests?
date: '2013-05-01 18:24:00'
comments: true
disqus_identifier: testing-contributing-composer-packages
---

While Composer has been around for a while now, many packages are still in their infancy (< 1.0) or sometimes are just not as feature filled as they could be. To be fair there is always more to be done. It can always do more, or do the same thing more efficiently.

Whatever the case, pull requests are going to be a common thing for the PHP community to be doing to these packages and this needs to be done safely, with unit-testing.

So, how do you run their test suite and add your own tests?

## Composer the Composer

You want to go two levels deep for this one and install composer inside the package itself:

~~~console
cd myapp/vendor/laravel/framework
curl -sS https://getcomposer.org/installer | php
~~~
    
If you've installed Composer globally by renaming it to /usr/bin/composer then you can skip that of course.

Then you want to run Composer and have it install all of the packages dependencies. Normally these will be lumped into your main `myapp/vendor/` folder when you run the main composer install, but this will just install all the packages and any dev stuff it needs to complete its unit tests in the current directory:

~~~console
./composer.phar install --dev
~~~

## Testing the Package

With the --dev dependencies installed you can easily run whatever test suite the package developer has set up - which is most likely (at the very least) going to be PHPUnit.

~~~console
./vendor/bin/phpunit
~~~

This should run their tests, as long as the core of the package has a phpunit.xml file. If the phpunit.xml is elsewhere (maybe in a build/ folder for Jenkins or whatever) then simply reference the location with the -c option:

~~~console
./vendor/bin/phpunit -c build/phpunit.xml
~~~

It's important to run this before you start faffing around with their code, because writing your own code gets much more difficult if theirs is not even working. 

If you get a red before doing anything fix that, THEN work on your own feature (or give up an find a better package, whichever).
    
## Adding Tests

Got a green light? Awesome. 

In which order you do the next bit is pretty unimportant, but I like to write the test first, then write the code:

~~~php
public function testSort()
{
    $data = new Collection(array(5, 3, 1, 2, 4));
    $data->sort(function($a, $b)
    { 
        if ($a === $b)
        {
            return 0;
        }
        return ($a < $b) ? -1 : 1;
    });

    $this->assertEquals(range(1, 5), array_values($data->all()));
}
~~~

This was just some new method for Laravel 4's Support\Collection class which lets you uasort() on a Collection. Not rocket science, but Taylor isn't going to merge this without tests, mostly because he knows what I'm like.

Running that gives me a big old red light, because the method doesn't even exist. So, I write the method, muddle through a few errors and then it goes green. YAAAAY!

## Sending the Pull Request

You've written the feature. Time to share it with the world!

Go to the main repo (in this case github.com/laravel/framework) and click Fork. Copy the Git+SSH URL then hop into the terminal and do this:

~~~console
git checkout -b feature/kittens
git add src/Fluffy.php src/Snuggles.php
git commit -m "More kittens."
git push git@github.com:philsturgeon/framework.git feature/kittens
~~~
  
Refresh your repo page and you'll see a Pull Request button next to the branch you just pushed. Click that, write a message, done.

## Using your fork

There is going to be some time in between you submitting this pull request and it getting merged into a release for you to use, and you need to be ok with that. Some projects merge quick, some take longer. Sometimes its because the package has slow release cycles, and sometimes the person in charge is just an asshole. Who knows!

Composer is completely ready to help you out here either way.

~~~js
{
    "repositories": [
        {
            "type": "vcs",
            "url": "git://github.com/philsturgeon/framework.git"
        }
    ],
    "require": {
        "laravel/framework": "dev-feature/kittens",
		"other/stuff" : "1.0.*@stable"
    },
    "minimum-stability": "dev"
}
~~~

Now when you composer update you're going to find yourself using your version of the code, not theirs. This means you can wait as long as it takes to do it. 

You can even merge all of these individual branches into the master branch of your fork, so you can use all your changes at the same time without mushing them into the same PR.
