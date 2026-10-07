/// <reference types='vite-react-ssg' />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],

  ssgOptions: {
    /* `nested` gera pasta/index.html em vez de pasta.html — e o que faz as
       URLs com barra final (/about/) funcionarem em qualquer servidor
       estatico, como no site original. */
    dirStyle: 'nested',
    formatting: 'none',
    /* o conteudo de cada pagina ja vai no HTML; a hidratacao e so para o
       mega menu, os contadores e os formularios */
    script: 'async',
  },

  build: {
    /* Uma pagina carrega o JS de todas as 84 — separar o conteudo em chunks
       por rota evita o bundle unico de ~1,5 MB. */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('src/content/pages/')) {
            const m = id.match(/src\/content\/pages\/([^/]+)\.ts/);
            if (m && m[1] !== 'index') return `page-${m[1]}`;
          }
          if (id.includes('node_modules')) {
            if (id.includes('react-router')) return 'vendor-router';
            if (id.includes('react')) return 'vendor-react';
          }
          return undefined;
        },
      },
    },
  },
});
