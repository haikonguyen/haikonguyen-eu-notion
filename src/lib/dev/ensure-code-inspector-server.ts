import { createRequire } from 'node:module';
import path from 'node:path';
import { startServer } from '@code-inspector/core';
import { xrayDevOptions } from './xray-dev-options';

// Must match code-inspector-plugin's output dir so startServer() and the
// Turbopack loaders share the same record.json port state.
const codeInspectorOutput = path.dirname(
  createRequire(import.meta.url).resolve('code-inspector-plugin'),
);

const record = { port: 0, entry: '', output: codeInspectorOutput };

// Pre-bind port 5678 before Turbopack compiles .tsx files in parallel.
// Each xray loader also calls startServer(); without this, they race and
// throw EADDRINUSE even with a single `next dev` process.
export async function ensureCodeInspectorServer(): Promise<void> {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  await startServer(xrayDevOptions, record);
}
