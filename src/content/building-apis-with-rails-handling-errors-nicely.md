---
layout: post
author: [Phil]
title: "Building APIs with Rails: Handling Errors Nicely"
date: 2017-01-03
tags: [building-rest-apis-in-rails, rspec, rails, video]
# comments: true
---

Ignoring one session covering [basic CRUD and deserialization](https://www.youtube.com/watch?v=GpNEbw33GL8) using [ActiveModel::Serializer](https://github.com/rails-api/active_model_serializers/blob/master/docs/general/deserialization.md
), we get to a more interesting session: Handling Errors Nicely.

Handling errors is tough, and often overlooked. A lot of people think returning errors is
just a case of spitting `{ "error": "Whatever went wrong." }` out to the browser with a HTTP
status code, but there is a lot more to it than that. Errors need to be human readable, and computer readable.

Outputting a string is a good way to make it human readable, but is not good enough for computers. Do not force other developers to substring match your error messages just because you were lazy.

A HTTP status code can help computers get an idea of what _sort_ of error is happening, but [is not enough by itself](https://phil.tech/http/2015/09/23/http-status-codes-are-not-enough/).
Status codes are only a category of error. In most applications, multiple errors on the same endpoint could
share the same status code, so an application-specific error code should be used too.

<iframe width="560" height="315" src="https://www.youtube.com/embed/bHUjkQz6hxI" frameborder="0" allowfullscreen></iframe>

**[Source Code](https://github.com/philsturgeon/livecoding-apisyouwonthate/tree/master/episode-06-handling-errors-nicely)**

<hr/>

[JSON-API](http://jsonapi.org/) has some pretty good ideas about [how errors should look](http://jsonapi.org/format/#errors), so let's use that.


Firstly, let's create a convenience method in our `ApplicationController` which will let specify a status code and an error code to create an error:

~~~ ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base

  # ...

  def render_json_error(status, error_code, extra = {})
    status = Rack::Utils::SYMBOL_TO_STATUS_CODE[status] if status.is_a? Symbol

    error = {
      title: I18n.t("error_messages.#{error_code}.title"),
      status: status,
      code: I18n.t("error_messages.#{error_code}.code")
    }.merge(extra)

    detail = I18n.t("error_messages.#{error_code}.detail", default: '')
    error[:detail] = detail unless detail.empty?

    render json: { errors: [error] }, status: status
  end

end
~~~

Then we should populate a locale file, so we have that copy written down:

~~~ yaml
# config/locale/errors.yml

en:
  error_messages:

    # Products
    product_not_found:
      code: 20101
      title: "Could not find product"
      detail: "This product does not exist, or has been deleted. Product can be removed by manufacturers or admins."

    # Manufacturers
    manufacturers_not_found:
      code: 20201
      title: "Could not find manufacturer"
      detail: "This manufacturer is no longer available."
~~~

Now, we can call it from any of of controller methods, or rescue in the controller for exceptions we expect to see from multiple methods:

~~~ ruby
# app/controllers/products_controller.rb

class ProductsController < ApplicationController

  rescue_from ActiveRecord::RecordNotFound do |e|
    render_json_error :not_found, :product_not_found
  end

  # ...

  def show
    product = Product.find(params[:id])
    render json: product
  end

end
~~~

This covers specifying errors manually, but what about validation messages?

Validation errors should be considered errors, nothing less. A validation error means the thing the caller tried to do didn't work, so that needs to be an error, and it should be as clear as possible what the issue was.

Seeing as we're already using `ActiveModel::Serializer` in other places, it seems only sensible to utilize its built in JSON-API error support.

Let's make another convenience method:

~~~ ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base

  # ...

  def render_json_validation_error(resource)
    render json: resource, status: :bad_request, adapter: :json_api, serializer: ActiveModel::Serializer::ErrorSerializer
  end

end
~~~

This method takes a `resource`, which for the purposes of this video will be an ActiveRecord model, but could be anything that handles `#errors` in a similar fashion.

We can then simply call this method with a resource that has failed to save:

~~~ ruby
# app/controllers/products_controller.rb

class ProductsController < ApplicationController

  # ...

  def create
    product = Product.new(create_params)

    if !product.save
      render_json_validation_error product
      return
    end

    render json: product, status: :created
  end

end
~~~

The output that `ActiveModel::Serializer` gives you is not ideal, but for now it's taking care of the basics, and making it clear
what the problems are.

~~~ json
{
  "errors": [
    {
      "source": {
        "pointer": "/data/attributes/name"
      },
      "detail": "can't be blank"
    },
    {
      "source": {
        "pointer": "/data/attributes/description"
      },
      "detail": "can't be blank"
    }
  ]
}
~~~

I'll improve on this output at a later time, but this will do for this draft.

The next session will cover RSpec testing!

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
