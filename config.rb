set :site_title, 'Phil Sturgeon'
set :site_root, 'https://philsturgeon.uk'
set :logo, "/images/logo.jpg"
set :cover, "/images/cover.jpg"
set :description, 'I build API Design tools for Stoplight.io, write about REST/RPC/GraphQL APIs, live on a bike, and occasionally upset hordes of mens rights activists on Reddit.'

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

activate :alias
activate :syntax, wrap: true

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

  blog.taglink = "tag/{tag}.html"
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
