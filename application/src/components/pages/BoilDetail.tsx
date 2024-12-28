import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { Params } from "../../shared/router/AppRouter";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import RecordDetailTable from "../tables/record_detail_table/RecordDetailTable";
import { Box, Button } from "@mui/joy";
import { DbRoles } from "../../dbRoles";
import AddIcon from "@mui/icons-material/Add";
import { formatDateToString } from "../../utils";
import GodModeModal from "../modals/GodModeModal";

export default function BoilDetail() {
  const [initial, setInitial] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { store } = React.useContext(Context);
  const params = useParams<Params.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;

  const reloadData = () => {
    if (recordId) {
      store.RecordDetailStore.fetchHistoriesByRecId(recordId);
    }
  };

  React.useEffect(() => {
    if (recordId) {
      store.RecordDetailStore.fetchHistoriesByRecId(recordId)
        .then(() => store.HistoryTypeStore.fetchHistoryTypes())
        .then(() => setInitial(true));
    }
  });

  const GodModeComponent = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          startDecorator={<AddIcon />}
          size={"sm"}
          onClick={() => setOpenModal(true)}
          sx={{ fontWeight: "normal", fontSize: "small" }}
        >
          Добавить запись
        </Button>
      </Box>
    );
  };

  return (
    <React.Fragment>
      {initial && (
        <BreadCrumbHeader
          breadcrumbs={[
            "Детали записи",
            store.RecordDetailStore.record
              ? `${store.RecordDetailStore.record.plant} - ${formatDateToString(store.RecordDetailStore.record.date)}`
              : "",
            store.RecordDetailStore.record
              ? `${store.RecordDetailStore.record.product} - Партия: ${store.RecordDetailStore.record.boil} - Конвейер: ${store.RecordDetailStore.record.conveyor}`
              : "",
          ]}
        />
      )}
      {initial && store.RecordDetailStore.record && (
        <MainPageHeaderWithRenewProp
          title={`Записи по ${store.RecordDetailStore.record.product} - Партия: ${
            store.RecordDetailStore.record.boil
          } - Конвейер: ${store.RecordDetailStore.record.conveyor} (${
            store.RecordDetailStore.record.plant
          } - ${formatDateToString(store.RecordDetailStore.record.date)})`}
          renewData={() => reloadData()}
        />
      )}
      {store.AuthStore.user && store.AuthStore.user.roles.includes(DbRoles.GODMODE) && <GodModeComponent />}
      {initial && <RecordDetailTable />}
      {initial && <GodModeModal open={openModal} onClose={() => setOpenModal(false)} />}
    </React.Fragment>
  );
}
