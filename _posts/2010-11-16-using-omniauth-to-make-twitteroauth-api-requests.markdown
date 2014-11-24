---
layout: post
title: Using OmniAuth to make Twitter/oAuth API requests
category: rails
permalink: blog/2010/11/using-omniauth-to-make-twitteroauth-api-requests
excerpt: " \n\tUsing the brilliant user system Devise and a gem called OmniAuth you
  can make a Rails application that logs in or registers users via Twitter, Facebook,
  Foursquare, etc with amazing ease. But once the user has authenticated their account,
  how do you go about actually interacting with the API? This article will answer
  that for you, with some shiny code examples. "
date: '2010-11-16 20:18:00'
comments: 'true'
disqus_identifier: using-omniauth-to-make-twitteroauth-api-requests
---

Using the brilliant user system gem [Devise](https://github.com/plataformatec/devise) and a gem called [OmniAuth](http://github.com/intridea/omniauth) you can make a Rails application that logs in or registers users via Twitter, Facebook, Gowalla, etc with amazing ease. But once the user is logged in, how do you go about actually interacting with the API on behalf of the account that has just been authorized?

This article starts where RailsCasts leaves off, so if you are not already up and running with Devise and OmniAuth then you might want to watch:

- [RailsCast #209: Introducing Devise](http://railscasts.com/episodes/209-introducing-devise)
- [RailsCast #235: OmniAuth Part 1](http://railscasts.com/episodes/235-omniauth-part-1)
- [RailsCast #236: OmniAuth Part 2](http://railscasts.com/episodes/236-omniauth-part-2)

So, assuming we are all about at the point that the third video ends on, we are all ready to go. I'll be using the example of Twitter but really any of the providers using oAuth will use the same approach. Like in the "ye-olden days" when we used the Twitter username and password to authenticate an API request, we now use a Access Token and Token Secret. You can think of these as being basically the same thing as for the purpose of authenticating API requests, to us, they are.

To get the token and secret you need to add some fields to your authentications table:

    rails g migration AddTokenToAuthentications token:string secret:string
    rake db:migrate

Now the database is ready to save the credentials we can change the authentication code to populate the fields. Assuming you placed the method in user.rb like [RailsCast #236: OmniAuth Part 2](http://railscasts.com/episodes/236-omniauth-part-2) suggested then open user.rb and modify the following line:

    authentications.build(:provider => omniauth['provider'], :uid => omniauth['uid'])

and replace it with:

    authentications.build(
        :provider => omniauth['provider'],
        :uid => omniauth['uid'],
        :token => omniauth['credentials']['token'],
        :secret => omniauth['credentials']['secret']
    )

Now whenever anybody authenticates their account we can save their credentials which are passed back from the internal hidden magic that is OmniAuth.

The next step is to actually make some requests using these saved credentials, which is described almost perfectly in the [Twitter Developer Documentation](http://dev.twitter.com/pages/oauth_single_token#ruby). You'll want to install the oauth gem (put it in your Gemfile and run bundle install) then you can use the following code to test-dump a list of tweets from the user:

    class TwitterController < ApplicationController
    
    
        def recent_tweets
            # Exchange your oauth_token and oauth_token_secret for an AccessToken instance.
    
    
            def prepare_access_token(oauth_token, oauth_token_secret)
                consumer = OAuth::Consumer.new("APIKey", "APISecret"
                    { :site => "http://api.twitter.com"
                    })
                # now create the access token object from passed values
                token_hash = { :oauth_token => oauth_token,
                                             :oauth_token_secret => oauth_token_secret
                                         }
                access_token = OAuth::AccessToken.from_hash(consumer, token_hash )
                return access_token
            end
    
    
            auth = current_user.authentications.find(:first, :conditions => { :provider => 'twitter' })
    
    
            # Exchange our oauth_token and oauth_token secret for the AccessToken instance.
            access_token = prepare_access_token(auth['token'], auth['secret'])
    
    
            # use the access token as an agent to get the home timeline
            response = access_token.request(:get, "http://api.twitter.com/1/statuses/user_timeline.json")
    
    
            render :json => response.body
        end
    end

By pulling the content from current\_user.authentications (im finding the first as in my application they should only have one) I can grab the credentials and have full permissions to get their recent tweets, post new ones, see friends tweets, etc.

Now I can tweak this, get stuff saved, faff with the JSON and take what I need. Working with Facebook or any other oAuth provider will work in an almost identical way, or you can install specific gems to interact with their API's if the direct approach is not as smooth as you'd like.

