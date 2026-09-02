import { publicProcedure, router } from '../../../trpc';
import { getPlantByValueSchema, plantByValueOutputSchema } from '@repo/schemas';

export const workstationPlantRouter = router({
  getPlantByValue: publicProcedure
    .input(getPlantByValueSchema)
    .output(plantByValueOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.workstationPlantService.getPlantByValue(input);
    }),
});
