import { defineCollection, z } from 'astro:content';

const businessState = defineCollection({
  type: 'content',
  schema: z.object({
    businessType: z.string(),
    state: z.string(),
  }),
});

export const collections = {
  'business-state': businessState,
};
