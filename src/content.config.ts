import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const businessState = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/business-state' }),
  schema: z.object({
    businessType: z.string(),
    state: z.string(),
  }),
});

export const collections = {
  'business-state': businessState,
};
