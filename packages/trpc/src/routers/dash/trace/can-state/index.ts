import { traceCanStateListOutputSchema } from '@repo/schemas';
import { publicProcedure, router } from '../../../../trpc';


export const dashTraceCanStateRouter = router({
    getAllCanStates: publicProcedure
        .output(traceCanStateListOutputSchema.nullable())
        .query(async ({ ctx }) => {
            return ctx.dashTraceCanStateService.getAllCanStates()
        }),
});
