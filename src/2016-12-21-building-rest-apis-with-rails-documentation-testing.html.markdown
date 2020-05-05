---
title: "Building APIs with Rails: Documentation Testing"
date: 2016-12-21 11:59:23 UTC
category: api
tags: building-rest-apis-in-rails, http, api, video, dredd
comments: true
---

Now that we've started building a very basic API, we should make sure that the documentation is kept up to date with our progress. Even better, we can use our documentation as a basic contract test, to make sure we aren't lying about what our API offers.

I've written tutorials in the past about [how Dredd works](https://phil.tech/api/2015/01/28/dredd-api-testing-documentation/), so this video will just go over this stuff in a bit more detail.

<iframe width="560" height="315" src="https://www.youtube.com/embed/dJXTWVuE89Q" frameborder="0" allowfullscreen></iframe>

**[Source Code](https://github.com/philsturgeon/livecoding-apisyouwonthate/tree/master/episode-04-contract-testing-with-dredd)**

<hr/>

## Notes

You can easily install dredd using npm:

~~~ shell
npm install -g dredd
~~~

Once installed, you can use its init function to set things up:

~~~
dredd init
~~~

With the correct values added, running dredd is a single command. The output can be a little verbose, so I like to pipe it to a log file:

~~~
dredd > log/dredd.log
~~~

For dredd to work, there needs to be data in the database. If you make a request to `/products/1` and there is no record with ID=1 in the database, then it will return a `404` response, instead of a `200` response with all the expected attributes.

To solve this we can use database seeding. A lot of apps use seeding for other things, so it can be really useful to make a custom seed out of the way of anything else:

~~~ ruby
# lib/tasks/custom_seeds.rake
namespace :db do
  namespace :seed do
    Dir[File.join(Rails.root, 'db', 'seeds', '*.rb')].each do |filename|
      task_name = File.basename(filename, '.rb').intern
      task task_name => :environment do
        load(filename) if File.exist?(filename)
      end
    end
  end
end
~~~

Now, we can populate the seeds with really basic record creation. In fact, this is the same stuff we used in episode 3:

~~~ ruby
# db/seeds/dredd.rb

manufacturer = Manufacturer.create(name: "Thatchers", about: "Pretty solid cider makers who are randomly moving their factories in the south west and going to Ireland...", city: "Dublin", country: "Ireland")

Product.create(manufacturer: manufacturer, name: 'Katies', description: "Unnecessarily strong fizzy cider that sells for the same price as normal ciders.", apv: 7.6, product_type: 'cider')

Product.create(manufacturer: manufacturer, name: 'Thatchers Dry', description: "As the name suggests this is dry, and a little tangy.", apv: 6.5, product_type: 'cider')
~~~

To check that works, you can run it with the following command:

~~~ shell
rake db:seed:dredd
~~~

In isolation, that is not very helpful. We also don't want to mess with our development database. Using the entire following command, you can use the testing database, create a fresh DB every time, load the schema up, then run dredd.

~~~ shell
RAILS_ENV=test rake db:drop db:create db:migrate db:seed:dredd && dredd
~~~

This would be a fairly annoying command to have to remember, wrap it up in a simple `Makefile`:

~~~ shell
# Makefile
.PHONY: docs_test
docs_test:
		@echo "Seeding database for documentation testing"
		@RAILS_ENV=test rake db:drop db:create db:migrate db:seed:dredd
		@echo "Running dredd... check logs/dredd.log for more information"
		@RAILS_ENV=test dredd > log/dredd.log && echo "Documentation is all good!"
~~~

With that `Makefile` in your project root, you can simply run this:

~~~ shell
$ make docs_test
~~~

We'll be making a few more make commands over the next few videos. They're really useful!

## Interested in a Proper Series?

These rough videos will be replaced with a nicely recorded series, and to get updates about that, just let me know your email address.

<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
<style type="text/css">
	#mc_embed_signup{background:#fff; clear:left; font:14px; width:100%;}
	/* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
	   We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//apisyouwonthate.us10.list-manage.com/subscribe/post?u=f5c5ff66d95d11dec1b88cf54&amp;id=bef95bfd48" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">

	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_f5c5ff66d95d11dec1b88cf54_bef95bfd48" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
