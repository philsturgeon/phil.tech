---
layout: post
title: Fractal v0.8.0, now with Serializers
category: php
permalink: blog/2014/05/fractal-v080-now-with-serializers
excerpt: A new version of Fractal is out, which is a package aimed at making life
  easier to API developers handling output. At a basic level it acts as a way to typecast
  an array of data, like array_map() but defined in classes, but at most it can do
  much more. It can help include other resources inside the response based on user
  input, so /books?include=author,comments for example will give you exactly what
  you expect without hardcoding it to always display. The new version provides some
  serializers, to allow you to change the way that data is represented as output.
date: '2014-05-29 14:13:00'
comments: 'true'
disqus_identifier: fractal-v080-now-with-serializers
---

A new version of [Fractal](http://fractal.thephpleague.com) is out, which is a package aimed at making life easier to API developers handling output.

At a basic level it acts as a way to typecast an array of data, like array_map() but defined in classes, but at most it can do much more. It can help include other resources inside the response based on user input, so /books?include=author,comments for example will give you exactly what you expect without hardcoding it to always display.

Until [v0.8.0](https://github.com/thephpleague/fractal/releases/tag/0.8.0) - when Jason Lewis got involved with a series of pull requests - the data structure had always been rather hardcoded. You could not change how pagination looked, and I was using a `data` namespace which people wanted to remove. Serializers were always on the todo list, but Jason jumped in there and sorted things out like a champ.

So, I'm gonna repost the new documentation page I just wrote up.

A <em>Serializer</em> structures your <em>Transformed</em> data in certain ways. There are many output
structures for APIs, two popular ones being [HAL] and [JSON-API]. Twitter and Facebook output data
differently to each other, and Google does it differently too. Most of the differences between these
serializers are how data is namespaced.

<em>Serializer</em> classes let you switch between various output formats with minimal effect on your <em>Transformers</em>.

[HAL]: http://stateless.co/hal_specification.html
[JSON-API]: http://jsonapi.org/

A very basic usage of Fractal will look like this, as has been seen in other sections:

{% highlight php %}
use Acme\Model\Book;
use Acme\Transformer\BookTransformer;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use League\Fractal\Serializer\DataArraySerializer;

$manager = new Manager();
$manager->setSerializer(new DataArraySerializer());

// Some sort of ORM call
$book = Book::find(1);

// Make a resource out of the data and 
$resource = new Item($book, new BookTransformer(), 'book');

// Run all transformers
$manager->createData($resource)->toArray();

// Outputs:
// [
//     'data' => [
//         'id' => 'Foo',
//         'title' => 'Foo',
//         'year' => 1991,
//     ],
// ];
{% endhighlight %}

What is new here is the `$manager->setSerializer(new DataArraySerializer());` part. 
`DataArraySerializer` is the name of the default serializer in Fractal, but there are more.

## DataArraySerializer

This serializer is not to everyones tastes, because it adds a `'data'` namespace to the output:

{% highlight php %}
// Item
[
    'data' => [
        'foo' => 'bar'
    ],
];

// Collection
[
    'data' => [
        [
            'foo' => 'bar'
        ]
    ],
];
{% endhighlight %}

This is handy because it allows space for meta data (like pagination, or totals) in both Items and Collections. 

{% highlight php %}
// Item with Meta
[
    'data' => [
        'foo' => 'bar'
    ],
    'meta' => [
        ...
    ]
];

// Collection with Meta
[
    'data' => [
        [
            'foo' => 'bar'
        ]
    ],
    'meta' => [
        ...
    ]
];
{% endhighlight %}

This fits in nicely for meta and included resources, using the `'data'` namespace. This means meta data can be added for those included resources too.

{% highlight php %}
// Item with included resource using meta
[
    'data' => [
        'foo' => 'bar'
        'comments' => [
            'data' => [
                ...
            ],
            'meta' => [
                ...
            ]
        ]
    ],
];
{% endhighlight %}


## ArraySerializer

Sometimes people want to remove that `'data'` namespace, and that can be done using the `ArraySerializer`,
which is mostly the same other than that namespace.

{% highlight php %}
use League\Fractal\Serializer\ArraySerializer;
$manager->setSerializer(new ArraySerializer());
{% endhighlight %}

{% highlight php %}
// Item
[
    'foo' => 'bar'
];

// Collection
[
    [
        'foo' => 'bar'
    ]
];
{% endhighlight %}

Meta data is is fine for items, but gets a little confusing for collections:

{% highlight php %}
// Item with Meta
[
    'foo' => 'bar'
    'meta' => [
        ...
    ]
];

// Collection with Meta
[
    [
        'foo' => 'bar'
    ]
    'meta' => [
        ...
    ]
];
{% endhighlight %}

Adding a named key to what is otherwise just a list confuses JSON:

> {"0":{"foo":"bar"},"meta":{}}

That `"0"` is there because you cannot mix index keys and non-indexed keys without JSON deciding to make
it a structure (object) instead of a list (array).

This is why ArraySerialzier is not recommended, but if you are not using meta data then... carry on.


## JsonApiSerializer

This is a work in progress representation of the [JSON-API] standard. It is included as it is partially working, but has some work left. 

There are few differences with the `JsonApiSerializer`. The first is that it uses "side-loading" to include
other related resources, which is different from the "embedding" approach that is used to include resources
by the other two serializers.

The second is that it requires a _Resource Key_, which the other two do not. 

{% highlight php %}
use League\Fractal\Serializer\JsonApiSerializer;
$manager->setSerializer(new JsonApiSerializer());

// Important, notice the Resource Key in the third parameter:
$resource = new Item($book, new GenericBookTransformer(), 'book');
$resource = new Collection($books, new GenericBookTransformer(), 'books');
{% endhighlight %}

That resource key is used to give it a named namespace:

{% highlight php %}
// Item
[
    'book' => [
        'foo' => 'bar'
    ],
];

// Collection
[
    'books' => [
        [
            'foo' => 'bar'
        ]
    ],
];
{% endhighlight %}

Just like `DataArraySerializer`, this works nicely for meta data:

{% highlight php %}
// Item with Meta
[
    'book' => [
        'foo' => 'bar'
    ],
    'meta' => [
        ...
    ]
];

// Collection with Meta
[
    'books' => [
        [
            'foo' => 'bar'
        ]
    ],
    'meta' => [
        ...
    ]
];
{% endhighlight %}

Adding a resource to a item response would look like this:

{% highlight php %}
// Item with Meta
[
    'book' => [
        'foo' => 'bar'
    ],
    'linked' => [
        'author' => [
            [
                'name' => 'Dave'
            ]
        ]
    ]
];
{% endhighlight %}

## Custom Serializers

You can make your own Serializers by implementing [SerializerAbstract]. 

{% highlight php %}
use Acme\Serializer\CustomSerializer;
$manager->setSerializer(new CustomSerializer());
{% endhighlight %}

The structure of serializers will change at some point, to allow items and collections to be handled differently
and to improve side-loading logic. Keep an eye on the change log, but do not be afraid to make one.

[SerializerAbstract]: https://github.com/thephpleague/fractal/blob/master/src/Serializer/SerializerAbstract.php

There is some work to go on serializers, but they are already pretty handy. If you are using Fractal and would like to implement a new serializer, let me know if it doesn't cover your use case and try to help me out with a PR if at all possible. I have added some features I needed for a client project, but I cannot work on too many more if I am going to hit this deadline.