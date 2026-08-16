import { publicProcedure, router } from '../../../trpc';
import {
  getWorkstationConveyorByBarcodeSchema,
  workstationConveyorByBarcodeOutputSchema,
} from '@repo/schemas';

export const workstationConveyorRouter = router({
  getConveyorByBarcode: publicProcedure
    .input(getWorkstationConveyorByBarcodeSchema)
    .output(workstationConveyorByBarcodeOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.workstationConveyorService.getConveyorByBarcode(input);
    }),
});
