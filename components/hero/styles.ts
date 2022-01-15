import { styled } from 'twin.macro';

const HeroWrapper = styled.section<{ isHomePage: boolean }>`
  height: ${({ isHomePage }) => (isHomePage ? '70vh' : '40vh')};

  .heroBgImage {
    filter: brightness(0.75) !important;
  }
`;

export default HeroWrapper;
