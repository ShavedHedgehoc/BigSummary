import { TubeRecordDetailDataExtrusion } from "../../../shared/api/services/tube-records-service";
import TubeRecordDetailExtrusionParamsTable from "./tube-record-detail-extrusion-params-table";
import TubeRecordDetailDefect from "../tube-record-detail-defect";
import NotFoundComponent from "../../../shared/components/not-found-component";
import TubeDetailViewLayout from "../../../shared/layouts/tube-detail-view-layout";
import TubeRecordDetailPostState from "../tube-record-detail-post-state";
import TubeRecordDetailOperationsTable from "../operations/tube-record-detail-operations-table";

export default function TubeRecordDetailExtrusionView({
  extrusionData,
}: {
  extrusionData: TubeRecordDetailDataExtrusion | null;
}) {
  if (!extrusionData) return <NotFoundComponent />;
  return (
    <TubeDetailViewLayout>
      <TubeRecordDetailPostState state={extrusionData.status} />
      <TubeRecordDetailExtrusionParamsTable paramsData={extrusionData.params} />
      <TubeRecordDetailDefect defect={extrusionData.defect} />
      <TubeRecordDetailOperationsTable operationsData={extrusionData.operations} />
    </TubeDetailViewLayout>
  );
}
