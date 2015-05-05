---
layout: page
title: Books
permalink: /books/
---

Look, I know every developer out there is trying to jam their book down your throat and wanging on about how it will change your life, but I'm not going to do that.

These books are there to help you with certain problems. If they sound good, grab a copy and help me pay off two years worth of bloody tax after the last job utterly arsed my finances by selfishly going beeswax.

{% for book in site.data.books %}
<div class="book">
  <h1>{{ book.title | xml_escape }}</h1>
  <h2>{{ book.slogan | xml_escape | markdownify }}</h2>
  <div class="book-image">
    <figure class="image">
      <img src="{{ book.cover }}" alt="{{ book.title | xml_escape }} Cover" data-no-caption>
    </figure>
  </div>
  <div class="book-content">
    {{ book.description | xml_escape | markdownify }}
    
    <div class="button-group">
      {% if book.ebook_url %}
      <a href="{{ book.ebook_url }}">
        <button class="buy-book ebook">Buy eBook</button>
      </a>
      {% endif %}
      {% if book.paperback_url %}
      <a href="{{ book.paperback_url }}">
        <button class="buy-book paperback">Buy Paperback</button>
      </a>
      {% endif %}
    </div>
  </div>
</div>
{% endfor %} 
