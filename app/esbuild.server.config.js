import esbuild from 'esbuild';
import path from 'path';

const __dirname = import.meta.dirname;

esbuild.build({
  entryPoints: ['api/boot.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);"
  },
  resolveExtensions: ['.ts', '.js'],
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@contracts': path.resolve(__dirname, './contracts'),
    '@db': path.resolve(__dirname, './db'),
    'db': path.resolve(__dirname, './db'),
  },
  external: ['@aws-sdk/client-s3', '@aws-sdk/s3-request-presigner'],
  logLevel: 'info'
}).catch(() => process.exit(1));
