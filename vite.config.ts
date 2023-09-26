import lough from '@lough/vite-plugin-import';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), lough({ libList: [{ name: '@lyrical/react-components', directory: 'es/components' }] })]
});
