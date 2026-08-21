import { tracePlantListOutputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';


export const dashTracePlantRouter = router({
    getAllPlants: publicProcedure
        .output(tracePlantListOutputSchema.nullable())
        .query(async ({ ctx }) => {
            return ctx.dashTracePlantService.getAllPlants()
        }),
});
