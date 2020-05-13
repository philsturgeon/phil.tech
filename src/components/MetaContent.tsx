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
  tags: Array<string>;
  timeToRead: number;
}

export const MetaContent: React.FC<MetaContentProps> = ({author, datetime, displayDatetime, tags, timeToRead}) => {

  return (
    <MetaContentDiv className="post-card-byline-content">
      <div className="post-card-byline-meta">
        {author && <span>
          {author.map((author, index) => {
            return (
              <React.Fragment key={author.id}>
                <Link to={`/author/${_.kebabCase(author.id)}/`} className="author">{author.id}</Link>
                {author.length - 1 > index && ', '}
              </React.Fragment>
            );
          })}
          <span className="bull">&bull;</span>
        </span>}
        <time dateTime={datetime}>{displayDatetime}</time>
        <span className="bull">&bull;</span>{timeToRead} min read
        {tags.length > 0 && <span className="bull">&bull;</span>}
        {tags.length > 0 && (
          <Tags className="post-card-tags">
            {tags.map(tag => {
              return(
                <Link to={`/tags/${_.kebabCase(tag)}`}>{tag}</Link>
              )
            })}
          </Tags>
        )}
      </div>
    </MetaContentDiv>
  );
};

const Tags = styled.div`
  display: inline;

  a {
    color: ${colors.orange};
    font-weight: 500;
    text-transform: capitalize;

    &::after {
      content: ", "
    }
    &:last-of-type::after {
      content: none
    }
  }
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

  div.post-card-byline-meta span.bull {
    margin: 0 5px ;
    font-size: 10px;
  }

  a.author {
    color: ${lighten('0.2', colors.darkgrey)};
    font-weight: 600;
  }

  @media (prefers-color-scheme: dark) {
    a {
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;