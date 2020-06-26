import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { css } from '@emotion/core';

import { Seo } from '../components/Seo';
import { Footer } from '../components/Footer';
import { TalkCard } from '../components/TalkCard';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const Talks: React.FC = props => {
  const { allEventsYaml } = useStaticQuery(
    graphql`
      query {
        allEventsYaml {
          nodes {
            city
            country
            event {
              dates
              name
              url
            }
            past
            talks {
              slides
              video
              slug
            }
          }
        }
      }
    `,
  );

  // separate past and upcoming talks
  const pastDates = allEventsYaml.nodes.filter(date => date.past);
  const upcomingDates = allEventsYaml.nodes.filter(date => !date.past);

  return (
    <IndexLayout>
      <Seo
        title="Talks"
        description="Various talks from the past and future."
        path={props.path}
      />
      <Wrapper css={PageTemplate}>
        <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
          <div css={[outer, SiteNavMain]}>
            <div css={inner}>
              <SiteNav isHome={false} />
            </div>
          </div>
        </header>
        <main id="site-main" className="site-main" css={[SiteMain, outer]}>
          <div css={inner}>
            <article className="post page" css={[PostFull, NoImage]}>
              <PostFullHeader className="post-full-header">
                <PostFullTitle className="post-full-title">Talks</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">

                  {upcomingDates.len > 0 && <section>
                    <h2>Upcoming</h2>
                    {upcomingDates.map((talk: object, index: number) => {
                      return (
                        <TalkCard key={index} talk={talk} />
                      );
                    })}
                    </section>}

                  {pastDates && <section>
                    <h2>Past</h2>
                    {pastDates.map((talk: object, index: number) => {
                      return (
                        <TalkCard key={index} talk={talk} />
                      );
                    })}
                   </section>}

                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
};

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

export default Talks;
