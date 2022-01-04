/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Phil.tech',
    description: 'Computers, green tech, humans, and technical writing.',
    siteUrl: 'https://phil.tech', // full path to blog - no ending slash
  },
  mapping: {
    'MarkdownRemark.frontmatter.author': 'AuthorYaml',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
                  guid: `${site.siteMetadata.siteUrl}${edge.node.fields.slug}`,
                  custom_elements: [{ 'content:encoded': edge.node.html }] };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 10,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Phil.Tech',
            match: '^/[0-9]{4}/',
          },
        ],
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'src', 'content'),
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-graph',
            options: {
              language: 'mermaid', // default
              theme: 'forest', // could also be dark, forest, or neutral
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2000,
              quality: 100,
            },
          },
          {
            resolve: '@raae/gatsby-remark-oembed',
            options: {
              providers: {
                include: [
                  'Twitter',
                  'YouTube',
                  'Vimeo',
                ],
                settings: {
                  Twitter: {
                    align: 'center',
                    dnt: true,
                  },
                  YouTube: {
                    maxwidth: 740,
                  },
                },
              },
            },
          },
        ],
      },
    },
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: 'https://phil.tech/',
      },
    },
    'gatsby-transformer-yaml',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [require('postcss-color-function'), require('cssnano')()],
      },
    },
  ],
};
