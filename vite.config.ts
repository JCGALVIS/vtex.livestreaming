import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';

export default (config: any) => {
  const isProdMode = config?.mode === 'production';

  return defineConfig({
    plugins: [
      viteCommonjs(),
      react(),
      ...(isProdMode
        ? [
            dts({ insertTypesEntry: true }),
            visualizer({ filename: 'bundle-size.html' }),
          ]
        : []),
    ],
    define: {
      'module.hot': false,
    },
    build: {
      emptyOutDir: true,
      minify: true,
      cssCodeSplit: true,
      lib: {
        entry: path.resolve(__dirname, 'src/lib/index.tsx'),
        name: '@jcgalvis/vtex.livestreaming',
        // formats: ["es", "umd"],
        formats: ['es'],
        fileName: format => `index.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          // assetFileNames: 'index.css',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
        // manualChunks(id) {
        //   if (id.includes('kuikpay-sdk/dist/index.css')) {
        //     return 'kuikpay-sdk.css';
        //   }
        // },
        // manualChunks: {
        //   gsap: ['gsap'],
        // },
      },
    },
    esbuild: {
      minify: true,
    },
  });
};
