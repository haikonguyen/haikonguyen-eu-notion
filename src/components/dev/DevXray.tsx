'use client';

import { Xray } from '@stinsky/xray';
import { useEffect } from 'react';

// Guard against non-Node targets (e.g. window, document, null) passed to Node.prototype.contains
if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
  const originalContains = Node.prototype.contains;
  Node.prototype.contains = function (otherNode: unknown): boolean {
    if (!otherNode || !(otherNode instanceof Node)) {
      return false;
    }
    return originalContains.call(this, otherNode as Node);
  };
}

export function DevXray() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        e.key.toLowerCase() === 'x' &&
        e.key === 'X'
      ) {
        window.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: 'x',
            code: 'KeyX',
            shiftKey: true,
            metaKey: e.metaKey,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            bubbles: true,
          }),
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return <Xray color="#06b6d4" />;
}
