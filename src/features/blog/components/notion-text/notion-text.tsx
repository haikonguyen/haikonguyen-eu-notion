import RenderNotionTextContent from './RenderNotionTextContent';
import { NotionTextProps } from './types';

const NotionText = ({ textContentBlocks }: NotionTextProps) => {
  if (textContentBlocks) {
    return <RenderNotionTextContent textContentBlocks={textContentBlocks} />;
  }
  return null;
};

export default NotionText;
