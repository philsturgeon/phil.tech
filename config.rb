set :site_title, 'Phil Sturgeon'
set :site_root, 'https://philsturgeon.uk'
set :logo, "/images/logo.jpg"
set :cover, "/images/ciderphpants.jpg"
set :description, 'I used to contribute to the PHP-FIG, The League of Extraordinary Packages, PHP The Right Way, CodeIgniter, FuelPHP, PyroCMS and a bunch of other stuff, but I gave it all up to join the circus.'

set :author, {
  name: 'Phil Sturgeon',
  image: '/images/author.jpg',
}

# social icons and sharing options
set :social, {
  twitter: {
    icon:	'twitter',
    url:	'https://twitter.com/philsturgeon',
    desc: 'Follow me on twitter',
    share_url: 'https://twitter.com/share',
    share_title: '?text=',
    share_link: "&amp;url=",
  },
  facebook: {
    icon:	'facebook',
    share_url: 'https://www.facebook.com/sharer.php',
    share_title: '?t=',
    share_link: "&amp;u=",
  },
  github: {
    icon:	'github',
    url:	'https://github.com/philsturgeon',
    desc:	'Fork me on GitHub',
  }
}

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

set :markdown_engine, :kramdown
set :markdown, :fenced_code_blocks => true, :smartypants => true

activate :alias
activate :syntax, :wrap => true

###
# Blog settings
###

# Time.zone = "UTC"

activate :blog do |blog|
  blog.layout = "layouts/post"
  blog.permalink = "{category}/{year}/{month}/{day}/{title}"
  blog.summary_length = 250
  blog.summary_generator = Proc.new { |article, length, ellipsis|
    if article.data.excerpt
      article.data.excerpt
    else
      Nokogiri::HTML.parse(article.body).css('p').first.text
    end
  }

  blog.taglink = "stuff/{tag}.html"
  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  blog.per_page = 10
  blog.page_link = "page/{num}"
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.remote   = 'origin'
  deploy.branch   = 'master'
end

# activate :similar, algorithm: :'word_frequency/mecab'

###
# Page options, layouts, aliases and proxies
###

page "/feed.xml", layout: false

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

activate :directory_indexes

helpers do
  def share_link(network, resource)
    network = config.social[network]
    "#{network[:share_url]}#{network[:share_title]}#{h(resource.title)}#{network[:share_link]}#{config.site_root}#{resource.url}"
  end
end

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
end
