import { healthCheckOutputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../trpc';

export const healtRouter = router({
  check: publicProcedure.output(healthCheckOutputSchema.nullable()).query(async ({ ctx }) => {
    return ctx.healthService.check();
  }),
});
