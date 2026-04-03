import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  adapter: cloudflare(),
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind(),
    sitemap(),
  ],
});
