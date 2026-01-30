import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm', 'cjs'],
  dts: false,
  clean: true,
  sourcemap: false,
  external: ['fs-extra', 'inquirer', 'smol-toml', 'yargs', 'path', 'url', 'fs/promises'],
  bundle: true,
  splitting: false,
  minify: false,
  shims: true,
  target: 'node18',
  platform: 'node',
});
