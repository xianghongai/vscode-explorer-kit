import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/extension.ts'],
  format: 'cjs',
  outDir: 'dist',
  external: ['vscode'],
  noExternal: ['lodash-es'],
  sourcemap: process.argv.includes('--watch'),
  clean: true,
});
