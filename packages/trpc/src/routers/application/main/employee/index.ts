import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../../trpc';
import {
  applicationCreateEmployeeInputSchema,
  applicationCreateEmployeeOutputSchema,
  applicationDeleteEmployeeInputSchema,
  applicationDeleteEmployeeOutputSchema,
  applicationEmployeeListOutputSchema,
  applicationUpdateEmployeeInputSchema,
  applicationUpdateEmployeeOutputSchema,
  getApplicationEmployeeListInputSchema,
} from '@repo/schemas';

export const applicationMainEmployeeRouter = router({
  getEmployeeList: publicProcedure
    .input(getApplicationEmployeeListInputSchema)
    .output(applicationEmployeeListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationEmployeeService.getEmployeeList(input);
    }),
  updateEmployee: publicProcedure
    .input(applicationUpdateEmployeeInputSchema)
    .output(applicationUpdateEmployeeOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationEmployeeService.updateEmployee(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
  createEmployee: publicProcedure
    .input(applicationCreateEmployeeInputSchema)
    .output(applicationCreateEmployeeOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationEmployeeService.createEmployee(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
  deleteEmployee: publicProcedure
    .input(applicationDeleteEmployeeInputSchema)
    .output(applicationDeleteEmployeeOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationEmployeeService.deleteEmployee(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
});
