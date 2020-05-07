import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { css } from '@emotion/core';
import { colors } from '../styles/colors';

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
  console.log("TALK: ", talk);
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
  console.log("TEST: ", allTalksYaml);
  const dateAndPlace = `${talk.event.dates} in ${talk.city}, ${talk.country}`;

  return (
    <article className='talk-card' css={TalkCardStyles}>
      <header css={TalkCardHeader}>
        <h2>
          <a href={talk.event.url}>{talk.event.name}</a>
        </h2>
        <p>{dateAndPlace}</p>
      </header>
      <div className='talk-content' css={TalkCardContent}>
        {talk.talks.map(talkInfo => {
          console.log("INFO: ", talkInfo);
          const talkData = allTalksYaml.nodes.filter(info => info.slug === talkInfo.slug)[0]
          console.log("DATA: ", talkData);

          if(talkData){
            return (
              <div>  
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
  // display: grid;
  // grid-template-columns: 1fr 3fr;
  // column-gap: 1em;
  // grid-template-areas: 
  //     "book-header book-header"
  //     "book-image book-content";
`;

const TalkCardHeader = css`
  grid-area: talk-header;
`;

const TalkCardContent = css`
  grid-area: talk-content;

  a.book {
    border: 1px solid silver;
    border-radius: 3px;
    padding: 4px 6px;
    box-shadow: none;
  }
`;