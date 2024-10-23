import * as React from "react";
import { Typography, useColorScheme } from "@mui/joy";
import { IBoilsListItem, IHistory } from "../../types";
import TableSkeleton from "../tables/TableLayout";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import TableLoaderComponent from "../tables/TableLoaderComponent";
import TableNotFoundComponent from "../tables/TableNotFoundComponent";
import { formatDateToString, formatTimeToString, statusCondition } from "../../utils";
import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModalLayout, { ModalLayoutProps } from "./ModalLayout";

interface BoilHistoriesListModalProps {
  open: boolean;
  boil: IBoilsListItem;
  showNote(noteId: number): void;
  onClose(): void;
}

function BoilHistoriesListModal(props: BoilHistoriesListModalProps) {
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();
  const selClass = (item: IHistory) => {
    const status = item.historyType.value;
    return statusCondition(status);
  };

  const BoilHistoriesListTable = observer(() => {
    const commonThead = [
      { width: 50, value: "Дата" },
      { width: 50, value: "Время" },
      { width: 100, value: "Статус записи" },
      { width: 80, value: "Автор записи" },
      { width: 50, value: "Комментарий" },
    ];

    return (
      <React.Fragment>
        <TableSkeleton>
          <thead>
            <tr>
              {commonThead.map((item, key) => (
                <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
                  {item.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {store.BoilDetailStore.histories.map((row) => (
              <tr key={row.id}>
                <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 100, textAlign: "center", padding: "12px 6px" }}>
                  <Typography
                    level="body-xs"
                    sx={() => ({
                      color:
                        mode === "dark"
                          ? selClass(row) === "fail"
                            ? "danger.plainColor"
                            : selClass(row) === "success"
                            ? "success.plainColor"
                            : selClass(row) === "wait"
                            ? "warning.plainColor"
                            : "neutral"
                          : "neutral",
                    })}
                  >
                    {row.historyType.description}
                  </Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">
                    {row.user ? row.user.name : row.employee ? row.employee.name : "-"}
                  </Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
                  {row.note_id && (
                    <IconButton variant="plain" size="sm" onClick={() => props.showNote(row.note_id)}>
                      <InfoOutlinedIcon />
                    </IconButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableSkeleton>
      </React.Fragment>
    );
  });

  const contentComponent = (
    <>
      {store.BoilDetailStore.pending && <TableLoaderComponent />}
      {store.BoilDetailStore.noHistoriesFound && <TableNotFoundComponent />}
      {store.BoilDetailStore.renderTable && <BoilHistoriesListTable />}
    </>
  );

  const modalProps: ModalLayoutProps = {
    open: props.open,
    onClose: () => props.onClose(),
    title: `История статусов по варке ${props.boil.value}`,
    content: contentComponent,
    height: 400,
    minHeight: 400,
    width: 800,
    onlyCloseButton: true,
    buttons: <></>,
  };
  return <ModalLayout {...modalProps} />;
}

export default observer(BoilHistoriesListModal);
