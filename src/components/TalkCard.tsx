import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { css } from '@emotion/core';

import { TalkButtons } from '../components/TalkButtons';

export interface TalkCardProps {
  talk: {
    city: string;
    country: string;
    event: {
      dates: string;
      name: string;
      url: string;
    };
    talks: Array<{
      feedback: string;
      slides: string;
      slug: string;
      video: string;
    }>
  }
}

export const TalkCard: React.FC<TalkCardProps> = ({ talk }) => {

  const { allTalksYaml } = useStaticQuery(
    graphql`
      query {
        allTalksYaml {
          nodes {
            short
            slug
            title
          }
        }
      }
    `
  )

  const dateAndPlace = `${talk.event.dates} in ${talk.city}, ${talk.country}`;

  return (
    <article className='talk-card' css={TalkCardStyles}>
      <header>
        <h2>
          <a href={talk.event.url}>{talk.event.name}</a>
        </h2>
        <p>{dateAndPlace}</p>
      </header>
      <div className='talk-content' css={TalkCardContent}>
        {talk.talks.map((talkInfo, index) => {
          const talkData = allTalksYaml.nodes.filter(info => info.slug === talkInfo.slug)[0]

          if(talkData){
            return (
              <div key={index}>  
                <h3>{talkData.title}</h3>
                <p>{talkData.short}</p>
                <TalkButtons buttons={talkInfo} />
              </div>
            )
          }
        })}
      </div>
    </article>
  );
};

const TalkCardStyles = css`
  margin-bottom: 4rem;
`;

const TalkCardContent = css`
  div {
    margin-bottom: 1rem;

    p {
      margin-bottom: 2rem;
    }
  }
`;