---
title: "HTTP Status Codes Are Not Enough"
date: '2015-09-23 21:00:00'
category: http
tags: http, api
comments: true
excerpt: "Don't be fooled into thinking you can use HTTP status codes on their own. You need to supplement them using error messages, with maybe some specific error codes of your own and links to documentation explaining what the problem is."
---

I spotted an article called [Just learn Rails (Part 3) HTTP status codes](http://jakeyesbeck.com/2015/09/20/rails-http-status-codes/). It started off good, and I liked that it was teaching people to avoid hardcoding their HTTP status codes in code, using `:conflict` instead of `409` and the like.

That is a good message to send, which is why I wrote an article on [exactly that](https://philsturgeon.uk/http/2015/08/16/avoid-hardcoding-http-status-codes/) last month.

The article also stresses that you must not return errors on `200`, which only the insanity wolf would do.

[![Insanity wolf hates errors on a 200](article_images/2015-09-23-http-status-codes-are-not-enough/insanity-wolf-errors.jpg)](https://speakerdeck.com/philsturgeon/api-pain-points-confoo-2015?slide=29)

The problem with the article is when it gets to sarcastically pointing out error messages are an overly verbose waste of time, or needless novella. I pointed out the flaw in this logic using some jovially hyperbolic wording as I'm known to do, and in the end the chap suggested I didn't understand the article.

I understand the article perfectly, and it's a damaging message to send.

> Instead, Ruby on Rails gives us very helpful symbols that can be used to accurately convey the appropriate response to end users.
>
> To only return the correct HTTP status code, the books controller can be rewritten to:

~~~ ruby
class BooksController < ApplicationController
  before_filter :authenticate_user

  def show
    if @user.nil?
      return head :unauthorized
    end

    render json: Book.find(params[:id])
  end
end
~~~

Fuck that! Am I unauthorized because I didn't provide a key or because the key was invalid? A developer can spend forever debugging
that alone.

> Alternatively, if extremely verbose and tedious error messages are the cat's pajamas to you, it is possible to use these symbols in conjunction with response bodies:

~~~ ruby
class BooksController < ApplicationController
  before_filter :authenticate_user

  def show
    if @user.nil?
      response = { error: 'User is not logged in' }
      status = :unauthorized
    else
      response = Book.find(params[:id])
      status = :ok
    end

    render json: response, status: status
  end
end
~~~

Error messages are not some over-the-top exercise, creating tedious reading and understanding for everyone involved. They are fundafuckingmental to having any sort of half useful API.

> ### Brevity is underrated
> This example has exposed the difference between a decent API and one that understands how HTTP should work. While the specific problem could be solved with CanCanCan, it is important to understand how and why those libraries work the way that they do.

Absolutely, a good API should definitely use status codes appropriately, but the suggestion throughout this article is that suplimenting that HTTP status messages are a pain, or uneccessary.

Bunk. Bunk I say!

Take a look at this:

~~~ json
{
  "errors" : [{
    "code"   : 20002,
    "title"  : "There are no savings for this user.",
    "status" : 400
  }]
}
~~~

How the flying shit would I know from just a 400 that that user doesn't have any savings? Especially when that same endpoint could also return:

~~~ json
{
  "errors" : [{
    "code"   : 20010,
    "title"  : "Invalid geopoints for simulated savings.",
    "status" : 400
  }]
}
~~~

The whole API does not rely on 400 errors over here, no, but even if you did find a more suitable status code I still would not know _exactly_ what was happening.

If you make me work with an API that does not have errors, I'm not coming to your birthday party.

> If one were to continue down the naive path, returning hashes or strings by default for all responses, things would become messy quickly. That response structure unjustly handcuffs the API clients to be unnecessarily tolerant of ad-hoc text responses. But, if the API conforms to HTTP standards, a client knows exactly what each response means. Nothing is left up to the imagination, and no bright new developer can accidentally change the error key to Error and ruin everyone's day.

Returning error messages is not in the HTTP specification, so best not to do it ever?

I'll concede that my jimmies do get a little rustled when I see people making their own random ad-hoc error formats, especially when error messages for APIs are a solved problem with some great solutions:

- [JSON-API: Errors](http://jsonapi.org/format/#errors)
- [HTTP Problems](https://www.mnot.net/blog/2013/05/15/http_problem)

Hilariously that last one [is an RFC](https://tools.ietf.org/html/rfc7807), written largely the same chap responsible for most of the modern day HTTP specification, so, if we're into following specs with our APIs then we should probably be doing that.

> Instead of capturing in text every single detail about why a request did not result in an expected response, use HTTP status codes and save the novella for another time.

I'll take vague hints, a brief description and a link to some docs, or any one of those at a pinch. None of that is novella. If you give me none of that, then you've released a useless pile of shit, and most developers will just use a different API by somebody else instead of integrating with your business.

## Nice Errors

The specifics of how you throw these vary by language, framework, and personal preference. Here is an approach we use in Rails:

~~~ ruby
class ApplicationController < ActionController::Base  
  rescue_from 'User::MissingPaymentDetails' do |exception|
    render_json_error(
      :match_accepted_by_non_paying_passenger,
      :precondition_failed,
      details: exception.message
    )
  end

  def render_json_error(code, status, options = {})
		status = Rack::Utils::SYMBOL_TO_STATUS_CODE[status] if status.is_a? Symbol

    error = {
      code: I18n.t("error_codes.#{code}.code"),
      title: I18n.t("error_codes.#{code}.message"),
      status: status
    }.merge(options)

    render json: { errors: [error] }, status: status
  end
end
~~~

Then in `config/locales/errors.en.yaml`:

~~~ yaml
en:
  error_codes:
    # ...
    match_accepted_by_non_paying_passenger:
      code: 19005
      message: It appears we're missing your payment details.
~~~

Using this approach, you can catch global exceptions at a very high level for really generic things like this, and handle very specific exceptions in controllers. Hitting the method yourself works too of course. We even have some logic that turns validation errors into standard errors in this way.

All of this allows for business logic to be translated into meaningful errors, all with useful computer _and_ human readable error codes, with a convenient `:match_accepted_by_non_paying_passenger` that corresponds to the full title and the error code. Then you're also providing the HTTP status via a symbol using `:precondition_failed` instead of just shoving a `412` in the controller.
