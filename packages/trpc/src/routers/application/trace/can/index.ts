import {
  applicationTraceCanDataListInputSchema,
  applicationTraceCanDataListOutputSchema,
  applicationTraceCanLocationDataListOutputSchema,
  applicationTraceCanVolumeListOutputSchema,
} from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';

export const applicationTraceCanRouter = router({
  getCanVolumesList: publicProcedure
    .output(applicationTraceCanVolumeListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationTraceCanService.getCanVolumesList();
    }),
  getCanDataList: publicProcedure
    .input(applicationTraceCanDataListInputSchema)
    .output(applicationTraceCanDataListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationTraceCanService.getCanDataList(input);
    }),
  getCanLocationDataList: publicProcedure
    .output(applicationTraceCanLocationDataListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationTraceCanService.getCanLocationDataList();
    }),
});
