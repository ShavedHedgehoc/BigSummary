import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import UsersFilterBannedSelector from "./users-filter-banned-selector";
import UsersFilterClearButton from "./users-filter-clear-button";
import UsersFilterEmailInput from "./users-filter-email-input";
import UsersFilterNameInput from "./users-filter-name-input";
import UsersFilterRolesSelector from "./users-filter-roles-selector";

export default function UsersFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <UsersFilterNameInput />
        <UsersFilterEmailInput />
        <UsersFilterRolesSelector />
        <UsersFilterBannedSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <UsersFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
