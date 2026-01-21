import * as React from "react";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/params";
import TubeRecordDetailHeader from "./tube-record-detail-header";
import TubeRecordDetailMainView from "./tube-record-detail-main-view";
import TubeRecordMaterialModal from "./material-modal/tube-record-material-modal";

export default function TubeRecordDetail() {
  const params = useParams<Params.TUBE_RECORD_PARAMS>();
  const summary_id: string | undefined = params.id;

  return (
    <React.Fragment>
      <TubeRecordDetailHeader />
      <TubeRecordDetailMainView summary_id={summary_id} />
      <TubeRecordMaterialModal />
    </React.Fragment>
  );
}
