---
title: "Building APIs with Rails: Basic Serialization"
date: 2016-12-11 00:24:23 UTC
category: api
tags: building-rest-apis-in-rails, http, api, ams, video, serialization
comments: true
---

Third video in a pile of [LiveCoding.tv](http://livecoding.tv/philsturgeon/) videos, shows how to use [ActiveModel Serializer](https://github.com/rails-api/active_model_serializers/blob/master/docs/general/getting_started.md) to shape the output of your resources. I totally forgot how links work, so watch me flap around trying to get it working and chuckle as I flail.

<iframe width="560" height="315" src="https://www.youtube.com/embed/A4XLCSZBN24" frameborder="0" allowfullscreen></iframe>

<hr/>

## Notes

To get going, you'll need to include in your `Gemfile`:

~~~
gem 'active_model_serializers', '~> 0.10.0'
~~~

Install that by running bundle:

~~~ shell
$ bundle install
~~~

Now there will be a new generator available, called `resource`:

~~~ shell
$ rails g resource manufacturer name:string about:string city:string country:string manufacturer:references

$ rails g resource product name:string description:string product_type:string apv:float image_url:string references:products
~~~

These fields are taken from our API Blueprint documentation, and we already know the types.

~~~ shell
rake db:create db:migrate
~~~

Create and generate the tables from our migrations, turning them into actual schema we can populate using the rails console:

~~~ shell
$ rails console
~~~

~~~ ruby
manufacturer = Manufacturer.create(name: "Thatchers", about: "Pretty solid cider makers who are randomly moving their factories in the south west and going to Ireland...", city: "Dublin", country: "Ireland")

Product.create(manufacturer: manufacturer, name: 'Katies', description: "Unnecessarily strong fizzy cider that sells for the same price as normal ciders.", apv: 7.6, product_type: 'cider')

Product.create(manufacturer: manufacturer, name: 'Thatchers Dry', description: "As the name suggests this is dry, and a little tangy.", apv: 6.5, product_type: 'cider')
~~~

Go look at `./app/controllers` and `./app/serializers` for the rest... more notes later.

Don't forget to make `./config/initializers/serializers.rb` and fill it with:

~~~ ruby
ActiveModelSerializers.config.adapter = :json_api
~~~

Then shove this in `./config/application.rb`:

~~~ ruby
config.after_initialize do
  Rails.application.routes.default_url_options[:host] = ENV['HOST'] || 'localhost:3000'
end
~~~

By the time all that's done, you should have some slick JSON-API output:

~~~ json
{
   "data":{
      "id":"1",
      "type":"manufacturer",
      "attributes":{
         "name":"Thatchers",
         "about":"Pretty solid cider makers that are ditching their factories in the south west and going to Ireland...",
         "city":"Dublin",
         "country":"Ireland"
      },
      "relationships":{
         "products":{
            "data":[
               {
                  "id":"1",
                  "type":"product"
               }
            ]
         }
      },
      "links":{
         "self":"http://localhost:3000/manufacturers/1",
         "products":{
            "href":"/products?manufacturer=1"
         }
      }
   }
}
~~~

Cheers.

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
