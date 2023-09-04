import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: ['react', 'react-router-dom'],
  globals: { react: 'React', 'react-router-dom': 'ReactRouterDom' },
  terser: false,
  style: false,
  input: 'src/index.ts'
});
