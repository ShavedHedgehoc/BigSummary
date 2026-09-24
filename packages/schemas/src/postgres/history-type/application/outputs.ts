import { z } from 'zod';

export const applicationHistoryTypeListItemSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  description: z.string(),
  for_boil: z.boolean(),
});

export const applicationHistoryTypeListOutputSchema = z
  .array(applicationHistoryTypeListItemSchema)
  .nullable();

export type TApplicationHistoryTypeListItem = z.infer<typeof applicationHistoryTypeListItemSchema>;
export type TApplicationHistoryTypeListResponse = z.infer<
  typeof applicationHistoryTypeListOutputSchema
>;
