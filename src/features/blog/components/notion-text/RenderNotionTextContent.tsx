import React from 'react';
import { NotionTextProps } from './types';

const RenderNotionTextContent = ({ textContentBlocks }: NotionTextProps) => {
  return (
    <>
      {textContentBlocks?.map((value, index: number) => {
        const {
          annotations: { bold, code, color, italic, strikethrough, underline },
          text,
        } = value;
        return (
          <span
            key={index}
            className={[
              bold ? 'font-bold' : '',
              code ? 'font-mono py-0.5 px-1 bg-cyan-900 rounded-sm' : '',
              italic ? 'italic' : '',
              strikethrough ? 'line-through' : '',
              underline ? 'underline' : '',
            ].join(' ')}
            style={color !== 'default' ? { color } : {}}
          >
            {text.link ? (
              <a
                className="underline decoration-2 decoration-sky-500"
                href={text.link.url}
              >
                {text.content}
              </a>
            ) : (
              text.content
            )}
          </span>
        );
      })}
    </>
  );
};

export default RenderNotionTextContent;
