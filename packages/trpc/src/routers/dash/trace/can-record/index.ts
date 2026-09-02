import {
  dashTraceCanRecordListInputSchema,
  dashTraceCanRecordListOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';

export const dashTraceCanRecordRouter = router({
  getLastCanRecordListByCanId: publicProcedure
    .input(dashTraceCanRecordListInputSchema)
    .output(dashTraceCanRecordListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashTraceCanRecordService.getLastCanRecordListByCanId(input);
    }),
});
