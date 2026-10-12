import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui';
import { TApplicationUserItem } from '@repo/schemas';
import { UserActionsTab } from './user-actions-tab';
import { UserEditTab } from './user-edit-tab';
import { UserRolesTab } from './user-roles-tab';

interface IProcessUserFormProps {
  row?: TApplicationUserItem;
}

export function ProcessUserTabs({ row }: IProcessUserFormProps) {
  return (
    <Tabs defaultValue="edit" className="w-full h-full flex flex-col min-h-0 px-4">
      <TabsList className="grid w-full grid-cols-3 mb-4">
        <TabsTrigger value="edit">Изменить</TabsTrigger>
        <TabsTrigger value="roles">Роли </TabsTrigger>
        <TabsTrigger value="actions">Действия </TabsTrigger>
      </TabsList>

      <TabsContent value="edit" className="grow min-h-0 m-0 flex flex-col">
        <UserEditTab row={row} />
      </TabsContent>

      <TabsContent value="roles" className="grow min-h-0 m-0 flex flex-col overflow-hidden ">
        <UserRolesTab row={row} />
      </TabsContent>
      <TabsContent value="actions" className="grow min-h-0 m-0 flex flex-col ">
        <UserActionsTab row={row} />
      </TabsContent>
    </Tabs>
  );
}
