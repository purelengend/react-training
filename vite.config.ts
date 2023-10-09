import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: {
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets')}`,
      '@constants': `${path.resolve(__dirname, './src/constants')}`,
      '@context': `${path.resolve(__dirname, './src/context')}`,
      '@helpers': `${path.resolve(__dirname, './src/helpers')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks')}`,
      '@layout': `${path.resolve(__dirname, './src/layout')}`,
      '@pages': `${path.resolve(__dirname, './src/pages')}`,
      '@services': `${path.resolve(__dirname, './src/services')}`,
      '@store': `${path.resolve(__dirname, './src/store')}`,
      '@src': `${path.resolve(__dirname, './src/')}`
    }
  }
});
