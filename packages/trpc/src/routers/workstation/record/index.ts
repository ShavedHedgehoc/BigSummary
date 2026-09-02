import { publicProcedure, router } from '../../../trpc';
import {
  workstationRelatedRecordListInputSchema,
  workstationRelatedRecordListOutputSchema,
} from '@repo/schemas';

export const workstationRecordRouter = router({
  getRelatedRecords: publicProcedure
    .input(workstationRelatedRecordListInputSchema)
    .output(workstationRelatedRecordListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.workstationRecordService.getRelatedRecords(input);
    }),
});
