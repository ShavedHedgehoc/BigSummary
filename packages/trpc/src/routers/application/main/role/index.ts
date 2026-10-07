import { publicProcedure, router } from '../../../../trpc';
import { applicationRoleListOutputSchema } from '@repo/schemas';

export const applicationMainRoleRouter = router({
  getRoleList: publicProcedure
    .output(applicationRoleListOutputSchema.nullable())
    .query(async ({ ctx }) => {
      return ctx.applicationRoleService.getRoleList();
    }),
});
