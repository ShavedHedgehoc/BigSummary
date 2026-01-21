import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import TubeRecordsListFilterClearButton from "./tube-records-list-filter-clear-button";
import TubeRecordsListFilterConveyorSelector from "./tube-records-list-filter-conveyor-selector";
import TubeRecordsListFilterEndDateInput from "./tube-records-list-filter-end-date-input";
import TubeRecordsListFilterStartDateInput from "./tube-records-list-filter-start-date-input";
import TubeRecordsListFilterStateSelector from "./tube-records-list-filter-states-selector";
import TubeRecordsListFilterTodayButton from "./tube-records-list-filter-today-button";

export default function TubeRecordsListFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <TubeRecordsListFilterStartDateInput />
        <TubeRecordsListFilterEndDateInput />
        <TubeRecordsListFilterConveyorSelector />
        <TubeRecordsListFilterStateSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <TubeRecordsListFilterTodayButton />
        <TubeRecordsListFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
