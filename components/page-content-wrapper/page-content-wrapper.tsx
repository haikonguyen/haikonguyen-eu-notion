import React from 'react';
import Container from '@mui/material/Container';
import tw, { styled } from 'twin.macro';
import { PageContentWrapperProps } from './types';

const StyledContainer = styled(Container)`
  section {
    ${tw`py-5`}
    hr {
      ${tw`pb-5`}
    }
  }
`;

const PageContentWrapper = ({ children }: PageContentWrapperProps) => {
  return (
    <StyledContainer className="my-10" fixed>
      {children}
    </StyledContainer>
  );
};

export default PageContentWrapper;
