import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';
import type { ImageDataLike } from 'gatsby-plugin-image';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { Seo } from '../../components/Seo';
import { Footer } from '../../components/Footer';
import SiteNav from '../../components/header/SiteNav';
import { PostCard } from '../../components/PostCard';
import { Wrapper } from '../../components/Wrapper';
import IndexLayout from '../../layouts';
import {
  AuthorProfileImage,
  inner,
  outer,
  PostFeed,
  SiteHeader,
  SiteHeaderContent,
  SiteTitle,
  SiteMain,
  SiteArchiveHeader,
  NoImage,
  SiteNavMain,
} from '../../styles/shared';
import { PageContext } from '../../templates/post';
import config from '../../website-config';

type AuthorPageProps = PageProps<{
  allMarkdownRemark: {
    totalCount: number;
    edges: Array<{
      node: PageContext;
    }>;
  };
  authorYaml: {
    id: string;
    website?: string;
    twitter?: string;
    facebook?: string;
    location?: string;
    bio?: string;
    avatar: {
      gatsbyImageData: ImageDataLike;
    };
  };
}>;

const AuthorPage: React.FC<AuthorPageProps> = props => {
  const author = props.data.authorYaml;

  const edges = props.data.allMarkdownRemark.edges.filter(edge => {
    const isDraft = edge.node.frontmatter.draft !== true || process.env.NODE_ENV === 'development';

    let authorParticipated = false;
    if (edge.node.frontmatter.author) {
      edge.node.frontmatter.author.forEach(element => {
        if (element.id === author.id) {
          authorParticipated = true;
        }
      });
    }

    return isDraft && authorParticipated;
  });
  const totalCount = edges.length;

  const avatarImage = getImage(props.data.authorYaml.avatar.gatsbyImageData);

  return (
    <IndexLayout>
      <Seo
        title={`${author.id} - ${config.title}`}
        description={author.bio}
        path={props.location.pathname}
      />
      <Wrapper css={NoImage}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>

          <div css={outer} className="site-header-background no-image">
            <div css={inner}>
              <SiteHeaderContent css={AuthorHeader} className="site-header-content">
                {avatarImage && (
                  <GatsbyImage
                    style={{ marginTop: '8px' }}
                    css={[AuthorProfileImage, AuthorProfileBioImage, HiddenMobile]}
                    image={avatarImage}
                    alt={author.id}
                  />
                )}
                <AuthHeaderContent className="author-header-content">
                  <SiteTitle className="site-title">{author.id}</SiteTitle>
                  {author.bio && <AuthorBio className="author-bio">{author.bio}</AuthorBio>}
                  <div css={AuthorMeta} className="author-meta">
                    {author.location && (
                      <div className="author-location" css={[HiddenMobile]}>
                        {author.location}
                      </div>
                    )}
                    <div className="author-stats" css={[HiddenMobile]}>
                      {totalCount > 1 && `${totalCount} posts`}
                      {totalCount === 1 && '1 post'}
                      {totalCount === 0 && 'No posts'}
                    </div>
                    {author.website && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={author.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Website
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
                    )}
                    {author.twitter && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={`https://twitter.com/${author.twitter}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Twitter
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
                    )}
                    {author.facebook && (
                      <AuthorSocialLink className="author-social-link">
                        <AuthorSocialLinkAnchor
                          href={`https://www.facebook.com/${author.facebook}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Facebook
                        </AuthorSocialLinkAnchor>
                      </AuthorSocialLink>
                    )}
                  </div>
                </AuthHeaderContent>
              </SiteHeaderContent>
            </div>
          </div>
        </header>
        <main id="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <div css={[PostFeed]}>
              {edges.map(({ node }) => {
                return <PostCard key={node.fields.slug} post={node} />;
              })}
            </div>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

export const pageQuery = graphql`
  query AuthorPage($id: String!) {
    authorYaml(id: { eq: $id }) {
      id
      website
      twitter
      bio
      location
      avatar {
        childImageSharp {
          gatsbyImageData(layout: FIXED, breakpoints: [40, 80, 120])
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { draft: { ne: true }, layout: { eq: "post" } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2000
    ) {
      edges {
        node {
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
            draft
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 3720)
              }
            }
            author {
              id
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    gatsbyImageData(layout: FIXED)
                  }
                }
              }
            }
          }
          fields {
            layout
            slug
          }
        }
      }
    }
  }
`;

const HiddenMobile = css`
  @media (max-width: 500px) {
    display: none;
  }
`;

const AuthorHeader = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10vw 0 10px;
  align-items: center;

  h2 {
    max-width: 760px;
  }

  @media (max-width: 500px) {
    padding: 10px 0 0;

    /* no image */
    padding-bottom: 10px;
  }
`;

const AuthorMeta = css`
  z-index: 10;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin: 0 0 0 1px;
  font-size: 1.2rem;
  font-weight: 400;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  white-space: nowrap;

  .author-location + .author-stats:before,
  .author-stats + .author-social-link:before,
  .author-social-link + .author-social-link:before {
    content: '•';
    display: inline-block;
    margin: 0 12px;
    color: #fff;
    opacity: 0.6;
  }

  @media (max-width: 500px) {
    margin-top: 8px;
  }

  @media (max-width: 700px) {
    .author-location,
    .author-stats,
    .author-stats + .author-social-link:first-of-type:before {
      display: none;
    }
  }
`;

const AuthorSocialLink = styled.span`
  display: inline-block;
  margin: 0;
  padding: 6px 0;
`;

const AuthorBio = styled.h2`
  z-index: 10;
  flex-shrink: 0;
  margin: 6px 0 0;
  max-width: 46em;
  font-size: 2rem;
  line-height: 1.3em;
  font-weight: 400;
  opacity: 0.8;
`;

const AuthHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5px 0 0 30px;
  @media (max-width: 500px) {
    align-items: center;
    margin: 16px 0 0 0;
  }
`;

const AuthorProfileBioImage = css`
  z-index: 10;
  flex-shrink: 0;
  margin: -4px 0 0;
  width: 110px;
  height: 110px;
  box-shadow: rgba(255, 255, 255, 0.1) 0 0 0 6px;
  border-radius: 100%;
`;

const AuthorSocialLinkAnchor = styled.a`
  color: #fff;
  font-weight: 600;

  :hover {
    opacity: 1;
  }
`;

export default AuthorPage;
