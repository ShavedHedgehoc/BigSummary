import PageFilterLayout from "../../shared/layouts/page-filter-layout";
import DocumentsFilterClearButton from "./document-filter-clear-button";
import DocumentFilterEndDateInput from "./document-filter-end-date-input";
import DocumentsFilterPlantSelector from "./document-filter-plant-selector";
import DocumentFilterStartDateInput from "./document-filter-start-date-input";
import DocumentsFilterTodayButton from "./document-filter-today-button";

export default function DocumentsFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <DocumentFilterStartDateInput />
        <DocumentFilterEndDateInput />
        <DocumentsFilterPlantSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <DocumentsFilterTodayButton />
        <DocumentsFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
