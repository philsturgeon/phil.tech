---
layout: post
title: 'Build API''s That You Wont Hate: Part 1 - Useful Database Seeding'
category: php
permalink: blog/2013/11/build-apis-part-1-useful-database-seeding
excerpt: A little while back I produced an article called Building a Decent API which
  was mostly a tongue-in-cheek list of things that I'd come across in other APIs that
  pissed me off, or that I had done myself and used my super-power of hindsight combined
  with sarcasm to make a set of rules for you to live by when building APIs. Now I'll
  write more in-depth on various aspects of API development that you need to know
  if you're going to build something that isn't a total mess.
date: '2013-11-08 18:32:00'
comments: true
disqus_identifier: build-apis-part-1-useful-database-seeding
---

A little while back I produced an article called [Building a Decent API][] which was mostly a tongue-in-cheek list of things that I'd come across in other APIs that pissed me off, or that I had done myself and used my super-power of hindsight combined with sarcasm to make a set of rules for you to live by when building APIs. 

The combination of cheek and naughty words made that "eat your greens" article go down a lot more smoothly, but it certainly lacked a little substance but I always wanted to turn that into a much more in depth of blog posts.

Let's start at the very beginning. Well, an entity-relationship diagram is probably the first step unless you're a lunatic cowboy, but they're boring as hell. Whatever, let's start with seeding your database.

## What is Database Seeding?

The idea is fairly simple. You have your database scheme built somehow, via a .sql file you imported, or a series of migrations, or it's mongo and your application will just magically build it for you, whatever, but you have an empty database and you need to fill it with data. This is often referred to as "dummy data".

This data could be the categories for your application, test users, content entries with a bunch of comments, fake locations available for checkin, fake notifications to display in the iPhone app (one of each type) or credit-card payments at various stages of processing - with some complete, some half done and some super-fraudulent looking ones.

This is all very helpful so you don't need to waste time creating this manually over and over again, because the data you enter like that is almost always half-arsed and will often miss out things you really should have considered already.

Uses for dummy data are testing (that's the next article), getting freelancers/new hires up to speed with useful content, and avoiding the temptation to copy live data over to your development environments.

## Why is using production data in development bad?

Have you ever been writing a script that sends out emails and used some dummy copy while you're building it? Ever used some cheeky words in that content? Ever accidentally sent that email out to 10,000 real customers email addresses? Ever been fired for losing a company north of £200,000? 

I haven't, but I know a guy that has. Don't be that guy.

## F**k that. What data do we use? 

Garbage! Use absolute nonsense for your development database, but nonsense of the correct data type, size, and format. That can be done with a fun little library called [Faker][] by [François Zaninotto](https://twitter.com/francoisz/) which is a wonderful little library that can essentially bullshit for Queen and country.

Kapture uses Laravel which has the joys of having [Database Seeding][] baked in. This is essentially a tarted up CLI task which almost any modern PHP framework will have (or bloody well should do) so the principles are applicable to all.

Break your Database Seeders down into chunks. This doesn't need to be "one seeder-per-table" but it can be. The reason I don't try to stick to that rule is that sometimes your data needs to be built at the same time as other types of data, so for us Users are created in the same "seeder" as their settings, oauth tokens, and friendship data is made. Putting that stuff into multiple seeders purely to keep things tidy would be an exercise in futility, and slow everything down for no reason. 

So, this is a drastically simplified version of our user seeder all in one go, ignoring the Laravel specific structure. _If you're using L4, just shove this in your `run()` method._

{% highlight php %}
    $faker = Faker\Factory::create();

    for ($i = 0; $i < Config::get('seeding.users'); $i++) {

        $user = User::create([
            'name'               => $faker->name,
            'email'              => $faker->email,
            'active'             => $i === 0 ? true : rand(0, 1),
            'gender'             => rand(0, 1) ? 'male' : 'female',
            'timezone'           => mt_rand(-10, 10),
            'birthday'           => rand(0, 1) ? $faker->dateTimeBetween('-40 years', '-18 years') : null,
            'location'           => rand(0, 1) ? "{$faker->city}, {$faker->state}" : null,
            'had_feedback_email' => (bool) rand(0, 1),
            'sync_name_bio'      => (bool) rand(0, 1),
            'bio'                => $faker->sentence(100),
            'picture_url'        => $this->picture_url[rand(0, 19)],
        ]);
    }
{% endhighlight %}

So what do we have here? Let's go through this section at a time:

{% highlight php %}
    $faker = Faker\Factory::create();
{% endhighlight %}
	
An instance of Faker, our bullshit artist for-hire.

{% highlight php %}
    for ($i = 0; $i < Config::get('seeding.users'); $i++) {
{% endhighlight %}

We're going to want a certain number of users, but I'd recommend you have a few less on development than you do on testing or staging, because time.

{% highlight php %}
        $user = User::create([
            'name'               => $faker->name,
            'email'              => $faker->email,
{% endhighlight %}

Make a random name and random email. We don't have to define the pool of random data it uses, because ITS MAGIC!

{% highlight php %}
            'active'             => $i === 0 ? true : rand(0, 1),
{% endhighlight %}
				
Ok I lied, our garbage is not 100% random. We want user number 1 to be active for tests later on.

{% highlight php %}
            'gender'             => rand(0, 1) ? 'male' : 'female',
{% endhighlight %}
				
Gender equality is important.

{% highlight php %}
            'timezone'           => mt_rand(-10, 10),
{% endhighlight %}
				
Our original developer decided that saving timezones as an integer was a clever thing to do. Bellend. How you gonna handle countries with +4.45 timezones bro? I still need to refactor this, but it's fine for now.

{% highlight php %}
            'birthday'           => rand(0, 1) ? $faker->dateTimeBetween('-40 years', '-18 years') : null,
{% endhighlight %}

Users of all of our target age demographic. 

{% highlight php %}
            'location'           => rand(0, 1) ? "{$faker->city}, {$faker->state}" : null,
{% endhighlight %}
				
Give us a city name and a state name. This works fine with foreign countries too which is cool.

{% highlight php %}
            'had_feedback_email' => (bool) rand(0, 1),
            'sync_name_bio'      => (bool) rand(0, 1),
{% endhighlight %}
            
Some user flags we don't care much about. True or false, whatever.

{% highlight php %}
            'bio'                => $faker->sentence(100),
{% endhighlight %}

Make a sentence with 100 characters in it. 


## That's about it

You will end up making a lot of these files, and you'll want to populate pretty much every table you have with data. You'll also want to tell your Database Seeder to wipe all the tables you're going to populate. Do this globally right at the start of the process, don't wipe each table at the top of each seeder or you'll be wiping out content in that table from other seeders in the same process.

Example of a overall system in Laravel 4:

{% highlight php %}
class DatabaseSeeder extends Seeder
{
    public function run()
    {
        if (App::environment() === 'production') {
            exit('I just stopped you getting fired. Love Phil');
        }

        Eloquent::unguard();

        $tables = [
            'locations',
            'merchants',
            'opps',
            'opps_locations',
            'moments',
            'rewards',
            'users',
            'oauth_sessions',
            'notifications',
            'favorites',
            'settings',
            'friendships',
            'impressions',
        ];

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        $this->call('MerchantTableSeeder');
        $this->call('PlaceTableSeeder');
        $this->call('UserTableSeeder');
        $this->call('OppTableSeeder');
        $this->call('MomentTableSeeder');
    }
}
{% endhighlight %}

This wipes everything, then runs other seeder classes to do their thing. 

Then I just run `$ php artisan db:seed` and it goes about it's business.

## When to run this

This is run whenever a developer on the team wants fresh data in their system, at random intervals on the staging server and automatically on the jenkins testing server when we deploy new builds of the api.

More on testing automationy goodness with Jenkins and Behat coming up soon, and a lot more to come after that including how to represent your data output, how to handle nesting data (respecting context and avoiding unlimited nesting and memory-leaks) and authentication with [OAuth 2 Server](https://github.com/php-loep/oauth2-server) from [The PHP League of Extraordinary Packages](http://www.thephpleague.com/).

[Building a Decent API]: /blog/2013/07/building-a-decent-api
[Faker]: https://github.com/fzaninotto/Faker
[Database Seeding]: http://laravel.com/docs/migrations#database-seeding