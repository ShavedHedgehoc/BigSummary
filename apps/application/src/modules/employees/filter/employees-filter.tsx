import EmployeesFilterNameInput from "./employees-filter-name-input";
import EmployeesFilterOcupationSelector from "./employees-filter-occupation-selector";
import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import EmployeesFilterClearButton from "./employees-filter-clear-button";
import EmployeesFilterAddButton from "./employees-filter-add-button";

export default function EmployeesFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <EmployeesFilterNameInput />
        <EmployeesFilterOcupationSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <EmployeesFilterAddButton />
        <EmployeesFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
