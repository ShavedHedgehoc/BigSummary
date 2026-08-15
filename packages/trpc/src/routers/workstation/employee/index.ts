import { publicProcedure, router } from '../../../trpc';
import { getWorkstationEmployeeByBarcodeSchema, workstationEmployeeByBarcodeOutputSchema } from '@repo/schemas';

export const workstationEmployeeRouter = router({
    getEmployeeByBarcode: publicProcedure
        .input(getWorkstationEmployeeByBarcodeSchema)
        .output(workstationEmployeeByBarcodeOutputSchema.nullable())
        .query(async ({ ctx, input }) => {
            return ctx.workstationEmployeeService.getEmployeeByBarcode(input);
        }),
});


