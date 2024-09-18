import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import { useParams } from "react-router-dom";
import { Params } from "../../router/AppRouter";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import RecordDetailTable from "../tables/record_detail_table/RecordDetailTable";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Option,
  Select,
  Typography,
} from "@mui/joy";
import { DbRoles } from "../../dbRoles";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { HistoryCreateDirectDto, HistoryCreateDto } from "../../services/HistoryService";

interface GoModeModalProps {
  open: boolean;
  onClose(): void;
}

const ObservedSelector = observer(function Selector() {
  const { store } = React.useContext(Context);
  return (
    store.HistoryTypeStore.historyTypes.length > 0 &&
    store.HistoryTypeStore.currentHystoryTypeExists && (
      <Select
        //  size={props.mobile ? "lg" : "sm"}
        size="sm"
        // sx={[props.mobile && { width: "100%" }]}
        placeholder="Выберите статус"
        defaultValue={store.HistoryTypeStore.currentHistoryType?.id}
        slotProps={{
          button: { sx: { whiteSpace: "nowrap" } },
          listbox: { sx: { zIndex: 999999 } },
        }}
        onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
          event && newValue && store.HistoryTypeStore.setCurrentHistoryType(newValue);
        }}
      >
        {store.HistoryTypeStore.selectorOptions.map((historyType) => (
          <Option value={historyType.id} key={historyType.id}>
            {historyType.description}
          </Option>
        ))}
      </Select>
    )
  );
});

function GodModeModal(props: GoModeModalProps) {
  const GodModeForm = () => {
    const { store } = React.useContext(Context);
    return (
      <React.Fragment>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <Box>
            <ObservedSelector />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 3 }}>
            <Button
              color="success"
              fullWidth
              // startDecorator={<CachedIcon />}
              size={"sm"}
              sx={{ fontWeight: "normal", fontSize: "small" }}
              onClick={() => {
                if (store.RecordDetailStore.record && store.HistoryTypeStore.currentHistoryType) {
                  const data: HistoryCreateDirectDto = {
                    record_id: store.RecordDetailStore.record.id,
                    historyType: store.HistoryTypeStore.currentHistoryType.value,
                    userId: store.AuthStore.user.id,
                    employeeId: null,
                    note: "Создано из тестовой обработки",
                  };
                  console.log(data);
                  store.HistoryStore.createHistoryDirect(data)
                    .then(() => {
                      if (store.RecordDetailStore.record) {
                        store.RecordDetailStore.updateHistories(store.RecordDetailStore.record.id.toString());
                      }
                    })
                    .then(() => props.onClose());
                }
              }}
            >
              Записать
            </Button>

            <Button
              color="danger"
              fullWidth
              // startDecorator={<CachedIcon />}
              size={"sm"}
              sx={{ fontWeight: "normal", fontSize: "small" }}
              onClick={() => props.onClose()}
            >
              Отмена
            </Button>
          </Box>
        </Box>
      </React.Fragment>
    );
  };
  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={props.open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === "closeClick") {
            props.onClose();
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999,
        }}
      >
        <ModalOverflow>
          <ModalDialog layout="center">
            <DialogTitle>Добавление записи</DialogTitle>
            <DialogContent>
              <Typography level="body-xs" color="danger">
                ВНИМАНИЕ!!! Использовать только в тестовом режиме!
              </Typography>
            </DialogContent>
            <GodModeForm />
            <ModalClose />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}

export default function RecordDetail() {
  const [initial, setInitial] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const { store } = React.useContext(Context);
  const params = useParams<Params.RECORD_PARAMS>();
  const recordId: string | undefined = params.record_id;

  const reloadData = () => {
    if (recordId) {
      // store.RecordDetailStore.fetchRecordById(recordId);
      store.RecordDetailStore.updateHistories(recordId);
    }
  };

  React.useEffect(() => {
    if (recordId) {
      store.RecordDetailStore.fetchRecordById(recordId)
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
            "Планировщик",
            "Список сводок",
            store.RecordDetailStore.record
              ? `${store.RecordDetailStore.record.doc.plants.value} - ${store.RecordDetailStore.stringDate}`
              : "",
            store.RecordDetailStore.record
              ? `${store.RecordDetailStore.record?.product.marking} - Партия: ${store.RecordDetailStore.record.boil.value} - Конвейер: ${store.RecordDetailStore.record.conveyor.value}`
              : "",
          ]}
        />
      )}

      {initial && store.RecordDetailStore.record && (
        <MainPageHeaderWithRenewProp
          title={`Записи по ${store.RecordDetailStore.record?.product.marking} - Партия: ${store.RecordDetailStore.record.boil.value} - Конвейер: ${store.RecordDetailStore.record.conveyor.value} (${store.RecordDetailStore.record.doc.plants.value} - ${store.RecordDetailStore.stringDate})`}
          renewData={() => reloadData()}
        />
      )}
      {store.AuthStore.user && store.AuthStore.user.roles.includes(DbRoles.GODMODE) && <GodModeComponent />}
      {initial && <RecordDetailTable />}
      {initial && <GodModeModal open={openModal} onClose={() => setOpenModal(false)} />}
    </React.Fragment>
  );
}
