import React from 'react';
import tw, { styled } from 'twin.macro';
import { PageContentWrapperProps } from './types';

const StyledContainer = styled.div`
  section {
    ${tw`py-5`}
    hr {
      ${tw`pb-5`}
    }
  }
`;

const PageContentWrapper = ({ children, isPost }: PageContentWrapperProps) => {
  return (
    <StyledContainer
      css={isPost ? tw`max-w-3xl` : tw`max-w-6xl`}
      className="my-10 mx-auto"
    >
      {children}
    </StyledContainer>
  );
};

export default PageContentWrapper;
