import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { css } from '@emotion/core';
import { colors } from '../styles/colors';

export interface TalkButtonsProps {
  buttons: {
    feedback: string;
    slides: string;
    slug: string;
    video: string;
  }
}

export const TalkButtons: React.FC<TalkButtonsProps> = ({ buttons }) => {  
  // console.log("BUTTONS: ", buttons);

  return (
    <div className="button-group">
      {Object.keys(buttons).map(key => {
          if(buttons[key] && key !== 'slug'){
            return(
              <a className="talk-button" href={buttons[key]}>{key}</a>
            )
          }
      })}
    </div>
  );
};