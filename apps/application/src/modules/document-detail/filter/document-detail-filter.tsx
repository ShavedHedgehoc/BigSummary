import PageFilterLayout from "../../../shared/layouts/page-filter-layout";
import DocumentDetailFilterBatchInput from "./document-detail-filter-batch-input";
import DocumentDetailFilterCodeInput from "./document-detail-filter-code-input";
import DocumentDetailFilterConveyorInput from "./document-detail-filter-conveyor-input";
import DocumentDetailFilterMarkingInput from "./document-detail-filter-marking-input";
import DocumentDetailFilterStateSelector from "./document-detail-filter-state-selector";
import DocumentDetailFilterClearButton from "./document-detail-filter-clear-button";

export default function DocumentDetailFilter() {
  return (
    <PageFilterLayout>
      <PageFilterLayout.Left>
        <DocumentDetailFilterCodeInput />
        <DocumentDetailFilterMarkingInput />
        <DocumentDetailFilterBatchInput />
        <DocumentDetailFilterConveyorInput />
        <DocumentDetailFilterStateSelector />
      </PageFilterLayout.Left>
      <PageFilterLayout.Right>
        <DocumentDetailFilterClearButton />
      </PageFilterLayout.Right>
    </PageFilterLayout>
  );
}
