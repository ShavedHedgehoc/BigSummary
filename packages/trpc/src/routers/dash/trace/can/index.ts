import {
  dashTraceCanDataListInputSchema,
  dashTraceCanDataListOutputSchema,
  dashTraceCanVolumeListOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';

export const dashTraceCanRouter = router({
  getCanVolumesList: publicProcedure
    .output(dashTraceCanVolumeListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.dashTraceCanService.getCanVolumesList();
    }),
  getCanDataList: publicProcedure
    .input(dashTraceCanDataListInputSchema)
    .output(dashTraceCanDataListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashTraceCanService.getCanDataList(input);
    }),
});
