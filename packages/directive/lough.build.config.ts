import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: ['@logically/coding-model', 'react', 'react-dom'],
  globals: { '@logically/coding-model': 'logicallyCodingModel', react: 'React', 'react-dom': 'ReactDom' },
  terser: false,
  style: false,
  input: 'src/index.ts'
});
