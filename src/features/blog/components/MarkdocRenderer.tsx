import Markdoc, { type Node as MarkdocNode } from '@markdoc/markdoc';
import { createElement, Fragment, type ReactNode } from 'react';

interface MarkdocRendererProps {
  node: MarkdocNode;
  className?: string;
}

export function MarkdocRenderer({ node, className }: MarkdocRendererProps) {
  const errors = Markdoc.validate(node);
  if (errors.length > 0) {
    console.error(errors);
    throw new Error('Invalid Markdoc content');
  }

  const renderable = Markdoc.transform(node);
  const content = Markdoc.renderers.react(renderable, {
    createElement,
    Fragment,
  }) as ReactNode;

  return <div className={className}>{content}</div>;
}
