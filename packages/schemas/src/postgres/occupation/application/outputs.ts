import { z } from 'zod';

export const applicationOccupationListItemSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  description: z.string(),
});

export const applicationOccupationListOutputSchema = z
  .array(applicationOccupationListItemSchema)
  .nullable();

export type TApplicationOccupationListItem = z.infer<typeof applicationOccupationListItemSchema>;
export type TApplicationOccupationListResponse = z.infer<
  typeof applicationOccupationListOutputSchema
>;
