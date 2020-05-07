import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

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


const Speaking: React.FC = () => {
  // const { contentYaml } = useStaticQuery(
  //   graphql`
  //     query {
  //       contentYaml {
  //         past {
  //           city
  //           country
  //           event {
  //             dates
  //             name
  //             url
  //           }
  //           talks {
  //             feedback
  //             slides
  //             slug
  //             video
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  const { allSpeakingYaml } = useStaticQuery(
    graphql`
      query {
        allSpeakingYaml {
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
              slug
            }
          }
        }
      }
    `
  )
  console.log("SPEAKING: ", allSpeakingYaml);
  // TODO: Here filter for the past talks first
  const pastDates = allSpeakingYaml.nodes.filter(date => date.past);
  const upcomingDates = allSpeakingYaml.nodes.filter(date => !date.past);
  console.log(upcomingDates, pastDates);
  

  return( 
  <IndexLayout>
    <Helmet>
      <title>Speaking</title>
    </Helmet>
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
              <PostFullTitle className="post-full-title">Speaking</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                
                {upcomingDates.len > 0 && <section>
                  <h2>Upcoming</h2>
                  {upcomingDates.map((talk, index) => {
                    return (
                      <TalkCard key={index} talk={talk} />
                    );
                  })} 
                </section>}
                
                {pastDates && <section>
                  <h2>Past</h2>
                  {pastDates.map((talk, index) => {
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

export default Speaking;