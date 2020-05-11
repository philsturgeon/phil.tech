import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

import { Seo } from '../components/Seo';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import Pagination from '../components/Pagination';
import { PostCard } from '../components/PostCard';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  PostFeed,
  Posts,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
  SiteHeaderStyles,
} from '../styles/shared';
import config from '../website-config';
import { PageContext } from './post';

export interface IndexProps {
  pageContext: {
    currentPage: number;
    numPages: number;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    header: {
      childImageSharp: {
        fixed: FixedObject;
      };
    };
    allMarkdownRemark: {
      edges: Array<{
        node: PageContext;
      }>;
    };
  };
}

const IndexPage: React.FC<IndexProps> = props => {
  const { width, height } = props.data.header.childImageSharp.fixed;
  const featuredPosts = props.data.allMarkdownRemark.edges.filter(edge => edge.node.frontmatter.featured);
  const allPosts = props.data.allMarkdownRemark.edges.filter(edge => !edge.node.frontmatter.featured);

  return (
    // <IndexLayout css={HomePosts}>
    <IndexLayout>
      <Seo
        width={width}
        height={height}
        description={config.description}
        title={config.title}
        path={props.path}
        image={`${props.data.header.childImageSharp.fixed.src}`}
      />
      <Wrapper>
        <div
          css={[outer, SiteHeader, SiteHeaderStyles]}
          className="site-header-background"
          style={{
            backgroundImage: `url('${props.data.header.childImageSharp.fixed.src}')`,
          }}
        >
          <div css={inner}>
            <SiteNav isHome />
            <SiteHeaderContent className="site-header-conent">
              <SiteTitle className="site-title">
                {props.data.logo ? (
                  <img
                    style={{ maxHeight: '55px' }}
                    src={props.data.logo.childImageSharp.fixed.src}
                    alt={config.title}
                  />
                ) : (
                  config.title
                )}
              </SiteTitle>
            </SiteHeaderContent>
          </div>
        </div>
        <SiteDescription css={outer}>
          <div css={inner}>
            <h2>{config.description}</h2>
          </div>
        </SiteDescription>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={[inner, Posts]}>
            {featuredPosts.length > 0 && <h3 css={HomeSubtitles}>Featured Posts</h3>}
            <div css={[PostFeed]}>
              {featuredPosts.map((post, index) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} large={true} />
                  )
                );
              })}
            </div>
            <h3 css={HomeSubtitles}>All Posts</h3>
            <div css={[PostFeed]}>
              {allPosts.map((post, index) => {
                // filter out drafts in production
                return (
                  (post.node.frontmatter.draft !== true ||
                    process.env.NODE_ENV !== 'production') && (
                    <PostCard key={post.node.fields.slug} post={post.node} />
                  )
                );
              })}
            </div>
          </div>
        </main>
        {props.children}
        {props.pageContext.numPages > 1 && (
          <Pagination
            currentPage={props.pageContext.currentPage}
            numPages={props.pageContext.numPages}
          />
        )}
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

// NOTE: for logo, add below to query
// logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
//   childImageSharp {
//     # Specify the image processing specifications right in the query.
//     # Makes it trivial to update as your page's design changes.
//     fixed {
//       ...GatsbyImageSharpFixed
//     }
//   }
// }
export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    header: file(relativePath: { eq: "img/cover.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 2000, quality: 100) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, layout: {eq: "post"} } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            draft
            excerpt
            featured
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fluid(quality: 100, srcSetBreakpoints: [40, 80, 120]) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

const HomeSubtitles = css`
  font-weight: 600;
`;

// const HomePosts = css`
//   @media (min-width: 795px) {
//     .post-card-large {
//       flex: 1 1 100%;
//       flex-direction: row;
//       padding-bottom: 40px;
//       min-height: 280px;
//       border-top: 0;
//     }

//     .post-card-large .post-card-title {
//       margin-top: 0;
//       font-size: 3.2rem;
//     }

//     .post-card-large:not(.no-image) .post-card-header {
//       margin-top: 0;
//     }

//     .post-card-large .post-card-image-link {
//       position: relative;
//       flex: 1 1 auto;
//       margin-bottom: 0;
//       min-height: 380px;
//     }

//     .post-card-large .post-card-image {
//       position: absolute;
//       width: 100%;
//       height: 100%;
//     }

//     .post-card-large .post-card-content {
//       flex: 0 1 361px;
//       justify-content: center;
//     }

//     .post-card-large .post-card-title {
//       margin-top: 0;
//       font-size: 3.2rem;
//     }

//     .post-card-large .post-card-content-link {
//       padding: 0 0 0 40px;
//     }

//     .post-card-large .post-card-meta {
//       padding: 0 0 0 40px;
//     }

//     .post-card-large .post-card-excerpt p {
//       margin-bottom: 1.5em;
//       font-size: 1.8rem;
//       line-height: 1.5em;
//     }
//   }
// `;

export default IndexPage;
