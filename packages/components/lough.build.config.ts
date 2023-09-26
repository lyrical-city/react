import { defineConfig } from '@lough/build-cli';

export default defineConfig({
  external: [
    'react',
    'react-dom',
    'lucide-react',
    '@lyrical/effects',
    '@logically/dom-calc',
    '@lyrical/react-directive',
    '@logically/coding-advanced'
  ],
  globals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    'lucide-react': 'LucideReact',
    '@lyrical/effects': 'lyricalEffects',
    '@logically/dom-calc': 'logicallyDomCalc',
    '@lyrical/react-directive': 'lyricalReactDirective',
    '@logically/coding-advanced': 'logicallyCodingAdvanced'
  },
  style: true,
  input: 'src/index.ts'
});
