---
layout: post
title: RESTful Deletions, Restorations and Revisions
category: rest
alias: blog/2014/05/restful-deletions-restorations-and-revisions/
excerpt: A friend asked me for some advice on how to approach building article revisions
  and restoring deleted content from API in a RESTful way. With most things, it didn't
  fit on Twitter, so I promised him a blog. 
date: '2014-05-25 14:20:00'
comments: true
disqus_identifier: restful-deletions-restorations-and-revisions
---

Two weeks ago I posted [RESTful URLs: Actions Need Not Apply](/blog/2014/05/restful-urls-actions-need-not-apply) which was all about how the only action/verb to appear in the HTTP Request should be the HTTP Method itself (GET, POST, PUT, DELETE, HEAD, etc). 

This was figured out as myself and others were working on complex use-cases which aren't the usual "apples" and "pears" crap a lot of API design material is based around. Simple APIs are simple, but trying to figure out "How do I make it RESTful" on more complex stuff like mass message sending can break your brain. 

Now that I'm "The REST Guy" to some in the PHP community, I've been getting a few questions about how to approach other challenges.

The rules are: 

* No verbs in the URL
* Input should look as much like output as possible
* Do not invent fields that only exist for input
* Use each HTTP method for its exact intended purpose

So, lets go!

## Deleting, then... undeleting?

<blockquote class="twitter-tweet" lang="en"><p>Hey <a href="https://twitter.com/philsturgeon">@philsturgeon</a> - what&#39;s the &quot;most RESTful&quot; way to restore/undelete a resource?</p>&mdash; Christopher Pitt (@followchrisp) <a href="https://twitter.com/followchrisp/statuses/469477939101597696">May 22, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

Chris had a set of routes like this:

* GET articles
* POST articles
* PATCH articles/{article}
* DELETE articles/{article}

Pretty straight forward so far right? Get them all, create one, update an existing one and delete one. Cool.

What happens if you want to restore a deleted article? 

Obviously if you have actually deleted it from the database (hard-delete) then tough cheese, but if the record exists in there somewhere
with a changed status or a deleted_at field like in Laravel (soft-delete) then you can do this easily enough.

The two approaches I can see that follow all of the rules are this:

### Archive then Hard-Delete

Delete should probably do what it says, actually delete the item. If delete is a destructive and unrecoverable action, then you will need to invent some other status for the article to exist in, which is still hidden from the API but not entirely gone from the database. 

~~~ http
PATCH /articles/foo HTTP/1.1  
Host: api.example.com  
Content-Type: application/json  

{ "status" : "archived" }  
~~~

This would keep it available everywhere in the API, and you could get it if you wanted, or ignore it with filters. For example, running a `GET /articles?status=archived` could very easily get you archived items, and running `GET /articles?status=published` would get you the live ones.

Making a `GET` request to an archived item still works fine, but you see `"status" : "archived"` in the body. 

If you then want to actually remove something from the system then you could use `DELETE /articles/foo` to remove it entirely.


## Soft-Delete and Restore

In this approach we use `DELETE` to delete stuff and do not play around with a status field initially. 

Once you delete it, it is gone. It will not show up in `GET /articles` regardless of any filter provided. If you try and call it up you get a 404 or a 410.

This article is no longer amongst the general population of the API. 

To win the game we need some way to see "deleted" content and restore them so maybe... just maybe `GET /articles/trashed`. 

The reason I think this works is because trashed items are a specific sub-set of articles. It does not just use a filter - because those articles are gone as far as the rest of the API is concerned - they are in a whole different place, and therefore a new resource with a new collection makes sense.

One you have found the item you could once again `PATCH` the status to `"published"` (or whatever):

~~~ http
PATCH /articles/trashed/foo HTTP/1.1  
Host: api.example.com  
Content-Type: application/json  

{ "status" : "published" }  
~~~

Alternatively you could use some sort of `is_trash` boolean field which always shows when you `GET` something, trash or not, then use `PATCH` with a body like `"is_trash" : false` to restore it. Regardless of choosing a bool field or a status field, patching it seems to work.

### Which to use?

I think I personally prefer the first approach. To me, a delete means delete. It's the most semantic. If your application is not actually deleting stuff then calling any of it delete is misleading.

Offering a way to "Trash" or "Archive" or "Ban" a resource by changing the status of the resource seems incredibly semantic too.


## Multiple Revisions

Another thing Chris asked about was how to promote and demote various revisions that relate to an article. 

He has these routes:

* GET articles/{article}/revisions
* POST articles/{article}/revisions
* PATCH articles/{article}/revisions/{article-revision}
* DELETE articles/{article}/revisions/{article-revision}

One rule mentioned above is:

* Input should look as much like output as possible

To me, it would be pretty handy if all revisions had a `"is_current"` value to let me know if this was the current revision. You can 
add new ones and they might be promoted to the current automatically, or somebody might want to roll back the revision through an interface somewhere, but whatever happens the interface and the output will need to highlight the current revision. 

_**Aside:** This does not mean you literally need a field in the database called `is_current`. Maybe your articles table has a `revision_id` field in there pointing to the current revision in use. Your JSON input and output should not be a direct mapping or your SQL schema, so do not feel obliged to make this field._

Because we have that field as output, it should not be that much of a stretch to assume we can PATCH on it. 

If article `foo` has three revisions, this should be possible to make revision 2 the current revision:

~~~ http
PATCH /articles/foo/revisions/2 HTTP/1.1  
Host: api.example.com  
Content-Type: application/json  

{ "is_current" : true }  
~~~

At that point maybe your internal logic updates that revision record with a `true` and set the other revisions for that article to be `false`, or maybe you go and update the articles table and set the `revision_id` to the ID provided. Whatever you do, this will now effect which is the current promoted revision and we've not had to make anything gross like `/articles/foo/revisions/promote/34` which I have seen suggested before.

## Summary

As I have said before, sometimes trying to make things RESTful for the sake of it is more a religious choice than a technical one. In some instances the most RESTful way is not initially the most obvious way, but that is only down to a decade of us being taught that shit like `/articles/foo/revisions/promote/34` is helpful. Maybe for a website, but a RESTful API is a platform of never-ending possibilities and not just a collection of functions with custom parameters like XML-RPC/SOAP. Once you start to grasp how this stuff works, a lot of the things that seemed pointless but RESTful actually start to seem much cleaner, and more flexible.
