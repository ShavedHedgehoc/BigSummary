import { publicProcedure, router } from '../../../../trpc';
import {
  docDetailOutputSchema,
  getDashDocCurrentInputSchema,
  getDashDocDataCurrentAppInputSchema,
  getDashDocRowInputSchema,
  recordDetailOutputSchema,
} from '@repo/schemas';

export const dashMainDocRouter = router({
  getDocDataCurrent: publicProcedure
    .input(getDashDocCurrentInputSchema)
    .output(docDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashDocService.getDocDataCurrent(input);
    }),
  getDocDataCurrentApp: publicProcedure
    .input(getDashDocDataCurrentAppInputSchema)
    .output(docDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashDocService.getDocDataCurrentApp(input);
    }),
  getDocRecord: publicProcedure
    .input(getDashDocRowInputSchema)
    .output(recordDetailOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.dashDocService.getDocRecord(input);
    }),
});
