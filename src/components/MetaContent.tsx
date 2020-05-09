import React from 'react';
import { lighten } from 'polished';
import { Link } from 'gatsby';

import { colors } from '../styles/colors';
import styled from '@emotion/styled';

import { Author } from '../templates/post';

export interface MetaContentProps {
  author: Author[];
  datetime: string;
  displayDatetime: string;
  home: boolean;
  tags: Array<string>;
  timeToRead: number;
}

export const MetaContent: React.FC<MetaContentProps> = ({author, datetime, displayDatetime, home, tags, timeToRead}) => {
  const displayTags = home? tags[0]: tags.join(', ');

  return (
    <MetaContentDiv className="post-card-byline-content">
      {author && <span>
        {author.map((author, index) => {
          return (
            <React.Fragment key={author.id}>
              <Link to={`/author/${_.kebabCase(author.id)}/`}>{author.id}</Link>
              {author.length - 1 > index && ', '}
            </React.Fragment>
          );
        })}
        <span className="bull">&bull;</span>
      </span>}
      <span className="post-card-byline-date">
        <time dateTime={datetime}>{displayDatetime}</time>
        <span className="bull">&bull;</span>{timeToRead} min read
        <span className="bull">&bull;</span>
        {tags && (
          <PrimaryTag className="post-card-primary-tag">
            {displayTags}
          </PrimaryTag>
        )}
      </span>
    </MetaContentDiv>
  );
};

const PrimaryTag = styled.div`
  display: inline-block;
  color: ${colors.orange};
  font-weight: 500;
  text-transform: capitalize;
`;

const MetaContentDiv = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: row;
  align-content: center;
  color: ${lighten('0.1', colors.midgrey)};
  font-size: 1.4rem;
  line-height: 1.4em;
  letter-spacing: 0.2px;

  span > span {
    margin: 0 5px ;
    font-size: 10px;
  }

  a {
    color: ${lighten('0.2', colors.darkgrey)};
    font-weight: 600;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;