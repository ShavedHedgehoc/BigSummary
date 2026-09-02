import { z } from 'zod';

export const publicApiConveyorListItemSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  barcode: z.string().optional().nullable(),
});

export const publicApiConveyorListOutputSchema = z
  .array(publicApiConveyorListItemSchema)
  .nullable();

export const publicApiConveyorTaskListItemSchema = z.object({
  date: z.coerce.date(),
  record_id: z.number().int(),
  conveyor_name: z.string().nullable(),
  code_1C: z.string().nullable(),
  marking: z.string().nullable(),
  boil_value: z.string().nullable(),
  plan: z.number().int().positive(),
  state: z.string().nullable(),
  state_description: z.string().nullable(),
  plant: z.string().nullable(),
});

export const publicApiConveyorTaskListOutputSchema = z
  .array(publicApiConveyorTaskListItemSchema)
  .nullable();

export type TPublicApiConveyorListItem = z.infer<typeof publicApiConveyorListItemSchema>;

export type TPublicApiConveyorListResponse = z.infer<typeof publicApiConveyorListOutputSchema>;

export type TPublicApiConveyorTaskListItem = z.infer<typeof publicApiConveyorTaskListItemSchema>;

export type TPublicApiConveyorTaskListResponse = z.infer<
  typeof publicApiConveyorTaskListOutputSchema
>;
