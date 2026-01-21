import { TubeRecordDetailDataSealant } from "../../../shared/api/services/tube-records-service";
import TubeRecordDetailSealantParamsTable from "./tube-record-detail-sealant-params-table";
import TubeRecordDetailDefect from "../tube-record-detail-defect";
import NotFoundComponent from "../../../shared/components/not-found-component";
import TubeDetailViewLayout from "../../../shared/layouts/tube-detail-view-layout";
import TubeRecordDetailPostState from "../tube-record-detail-post-state";
import TubeRecordDetailOperationsTable from "../operations/tube-record-detail-operations-table";

export default function TubeRecordDetailSealantView({
  sealantData,
}: {
  sealantData: TubeRecordDetailDataSealant | null;
}) {
  if (!sealantData) return <NotFoundComponent />;
  return (
    <TubeDetailViewLayout>
      <TubeRecordDetailPostState state={sealantData.status} />
      <TubeRecordDetailSealantParamsTable paramsData={sealantData.params} />
      <TubeRecordDetailDefect defect={sealantData.defect} />
      <TubeRecordDetailOperationsTable operationsData={sealantData.operations} />
    </TubeDetailViewLayout>
  );
}
