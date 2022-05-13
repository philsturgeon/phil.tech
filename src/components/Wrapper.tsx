import React from 'react';
import styled from '@emotion/styled';

interface WrapperProps {
  className?: string;
  children: any[];
}

export const Wrapper: React.FC<WrapperProps> = (props: any) => (
  <StyledWrapper className={props.className}>{props.children}</StyledWrapper>
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
