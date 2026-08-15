import { publicProcedure, router } from '../../../trpc';
import { getDashPlantByValueSchema, dashPlantByValueOutputSchema } from '@repo/schemas';

export const dashPlantRouter = router({
    getPlantByValue: publicProcedure
        .input(getDashPlantByValueSchema)
        .output(dashPlantByValueOutputSchema.nullable())
        .query(async ({ ctx, input }) => {
            return ctx.dashPlantService.getPlantByValue(input);
        }),
});


