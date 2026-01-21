import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TubeEmployeesFilterAddButton from "./tube-employees-filter-add-button";
import TubeEmployeesFilterBannedSelector from "./tube-employees-filter-banned-selector";
import TubeEmployeesFilterClearButton from "./tube-employees-filter-clear-button";
import TubeEmployeesFilterNameInput from "./tube-employees-filter-name-input";
import TubeEmployeesFilterRankSelector from "./tube-employees-filter-rank-selector";

export default function TubeEmployeesFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TubeEmployeesFilterNameInput />
        <TubeEmployeesFilterRankSelector />
        <TubeEmployeesFilterBannedSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TubeEmployeesFilterAddButton />
        <TubeEmployeesFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
