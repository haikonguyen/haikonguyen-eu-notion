import { NotionTextProps } from './types';
import RenderNotionTextContent from './RenderNotionTextContent';

const NotionText = ({ textContentBlocks }: NotionTextProps) => {
  if (textContentBlocks) {
    return <RenderNotionTextContent textContentBlocks={textContentBlocks} />;
  }
  return null;
};

export default NotionText;
