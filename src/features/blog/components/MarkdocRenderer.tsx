import Markdoc, {
  type Config,
  type Node as MarkdocNode,
} from '@markdoc/markdoc';
import { createElement, Fragment, type ReactNode } from 'react';
import { R2CmsImage } from './R2CmsImage';

interface MarkdocRendererProps {
  node: MarkdocNode;
  className?: string;
}

const markdocConfig: Config = {
  tags: {
    R2Image: {
      render: 'R2Image',
      selfClosing: true,
      attributes: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        caption: { type: String },
      },
    },
  },
};

export function MarkdocRenderer({ node, className }: MarkdocRendererProps) {
  const errors = Markdoc.validate(node, markdocConfig);
  if (errors.length > 0) {
    console.error(errors);
    throw new Error('Invalid Markdoc content');
  }

  const renderable = Markdoc.transform(node, markdocConfig);
  const content = Markdoc.renderers.react(
    renderable,
    {
      createElement,
      Fragment,
    },
    {
      components: {
        R2Image: R2CmsImage,
      },
    },
  ) as ReactNode;

  return <div className={className}>{content}</div>;
}
