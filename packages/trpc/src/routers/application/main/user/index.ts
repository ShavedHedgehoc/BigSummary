import { TRPCError } from '@trpc/server';
import { publicProcedure, router } from '../../../../trpc';
import {
  applicationChangeUserAccessInputSchema,
  applicationChangeUserAccessOutputSchema,
  applicationChangeUserPasswordInputSchema,
  applicationChangeUserPasswordOutputSchema,
  applicationDeleteUserInputSchema,
  applicationDeleteUserOutputSchema,
  applicationResetUserPasswordInputSchema,
  applicationResetUserPasswordOutputSchema,
  applicationUpdateUserInputSchema,
  applicationUpdateUserOutputSchema,
  applicationUpdateUserRolesInputSchema,
  applicationUpdateUserRolesOutputSchema,
  applicationUserListOutputSchema,
  getApplicationUserListInputSchema,
} from '@repo/schemas';

export const applicationMainUserRouter = router({
  getUserList: publicProcedure
    .input(getApplicationUserListInputSchema)
    .output(applicationUserListOutputSchema.nullable())
    .query(async ({ ctx, input }) => {
      return ctx.applicationUserService.getUserList(input);
    }),

  updateUser: publicProcedure
    .input(applicationUpdateUserInputSchema)
    .output(applicationUpdateUserOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.updateUser(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),

  changeUserAccess: publicProcedure
    .input(applicationChangeUserAccessInputSchema)
    .output(applicationChangeUserAccessOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.changeUserAccess(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),

  resetUserPassword: publicProcedure
    .input(applicationResetUserPasswordInputSchema)
    .output(applicationResetUserPasswordOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.resetUserPassword(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),

  changeUserPassword: publicProcedure
    .input(applicationChangeUserPasswordInputSchema)
    .output(applicationChangeUserPasswordOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.changeUserPassword(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
  deleteUser: publicProcedure
    .input(applicationDeleteUserInputSchema)
    .output(applicationDeleteUserOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.deleteUser(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
  updateUserRoles: publicProcedure
    .input(applicationUpdateUserRolesInputSchema)
    .output(applicationUpdateUserRolesOutputSchema)
    .mutation(async ({ input, ctx }) => {
      try {
        return await ctx.applicationUserService.updateUserRoles(input);
      } catch (error: any) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: error.message || 'Ошибка обновления',
          cause: error,
        });
      }
    }),
});
