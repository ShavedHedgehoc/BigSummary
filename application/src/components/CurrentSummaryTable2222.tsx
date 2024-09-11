import * as React from "react";
import { Box, Button, Sheet, Table, Typography, useColorScheme } from "@mui/joy";
import { IRecord } from "../types";
import { observer } from "mobx-react-lite";
import { Context } from "../main";
import { HistoryCreateDto } from "../services/HistoryService";

export interface CurrentSummaryTableProps {
  role: "user" | "technologist" | "laboratory";
}

function CurrentSummaryTable(props: CurrentSummaryTableProps) {
  const { mode, systemMode } = useColorScheme();
  systemMode;
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    console.log("object");
    store.PlantStore.fetchPlants();
  }, []);

  React.useEffect(() => {
    console.log("object2");
    store.SummaryStore.fetchRecords(store.PlantStore.currentPlant?.id?.toString());
  }, [store.PlantStore.currentPlant]);

  const makeHistoryRecord = (boil: string, code: string | null, historyType: string, id: number) => {
    const data: HistoryCreateDto = {
      boil: boil,
      historyType: historyType,
      code: code,
      userId: store.AuthStore.user.id,
      employeeId: null,
      note: null,
    };

    store.HistoryStore.createHistory(data).then(() => store.SummaryStore.updateRecord(id));
  };

  const renderNoRecordsFoundInfo = () => (
    <React.Fragment>
      <Box
        className="NoRecordsFoundContainer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Typography color="neutral" level="title-md" variant="plain">
          Записей не найдено
        </Typography>
      </Box>
    </React.Fragment>
  );

  const renderPendingInfo = () => (
    <React.Fragment>
      <Box
        className="PendingInfoContainer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Typography color="neutral" level="title-md" variant="plain">
          Загружаю
        </Typography>
        {/* <LinearProgress color="primary" size="lg" variant="solid" /> */}
      </Box>
    </React.Fragment>
  );

  const selClass = (item: IRecord) => {
    if (item.histories.length == 0) {
      return "list-group-item list-group-item-light";
    }
    const status = item.histories[item.histories.length - 1]?.historyType.value;
    switch (status) {
      case "base_fail":
        return "fail";
      case "product_fail":
        return "fail";
      case "base_check":
        return "wait";
      case "product_check":
        return "wait";

      case "plug_pass":
        return "success";
      case "product_pass":
        return "success";
      case "cancelled":
        return "cancelled";

      default:
        return "und";
    }
  };
  const TableRow = observer((row: IRecord) => {
    return (
      <tr key={row.id}>
        <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.product.code1C}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.product.marking}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.boil.value}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.plan}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.apparatus.value}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.can.value}</Typography>
        </td>
        <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
          <Typography level="body-xs">{row.conveyor.value}</Typography>
        </td>
        {props.role === "user" && (
          <td scope={selClass(row)} style={{ width: 200, textAlign: "justify", padding: "12px 6px" }}>
            <Typography level="body-xs">{row.note}</Typography>
          </td>
        )}

        {store.SummaryStore.recordPending && store.SummaryStore.updateRecordId == row.id ? (
          <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
            <Typography level="body-xs">Обновление...</Typography>
          </td>
        ) : (
          <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
            <Typography level="body-xs">
              {row.histories.length ? row.histories[row.histories.length - 1].historyType.description : "-"}
            </Typography>
          </td>
        )}
        {props.role === "technologist" && (
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.histories.length <= 0 && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Подключение
                </Typography>
              </Button>
            )}
          </td>
        )}
        {props.role === "laboratory" && (
          <td scope={selClass(row)} style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
            {row.histories.length > 0 && row.histories[row.histories.length - 1].historyType.value === "base_check" && (
              <Button
                variant="outlined"
                color="success"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "plug_pass", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="success">
                  Подключение
                </Typography>
              </Button>
            )}

            {row.histories.length > 0 &&
              row.histories[row.histories.length - 1].historyType.value === "product_check" && (
                <Button
                  variant="outlined"
                  color="success"
                  size="sm"
                  onClick={() => makeHistoryRecord(row.boil.value, row.product.code1C, "product_pass", row.id)}
                >
                  <Typography level="body-xs" variant="plain" color="success">
                    Фасовка
                  </Typography>
                </Button>
              )}
          </td>
        )}

        {props.role === "laboratory" && (
          <td scope={selClass(row)} style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Button
                variant="outlined"
                color="danger"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil.value, null, "base_fail", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="danger">
                  Основа
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="danger"
                size="sm"
                onClick={() => makeHistoryRecord(row.boil.value, null, "product_fail", row.id)}
              >
                <Typography level="body-xs" variant="plain" color="danger">
                  Продукт
                </Typography>
              </Button>
            </Box>
          </td>
        )}
      </tr>
    );
  });

  const renderTable = () => (
    <React.Fragment>
      <Sheet
        className="CurrenSummaryTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", lg: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={[
            {
              "--TableCell-headBackground": "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            },
            (theme) => ({
              "& td[scope='fail'] ": { bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg" },
              "& td[scope='wait'] ": { bgcolor: mode === "light" ? "warning.softBg" : "neutral.softBg" },
              "& td[scope='success'] ": { bgcolor: mode === "light" ? "success.softBg" : "neutral.softBg" },
              "& td[scope='cancelled'] ": {
                // bgcolor: mode === "light" ? `rgba(${theme.vars.palette.neutral.lightChannel})` : "neutral.softBg",
                bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg",
              },
              //   "& td[scope='und'] ": { bgcolor: `rgba(${theme.vars.palette.success.lightChannel}/0.6)` },
              '& th[scope="col"]': theme.variants.soft.neutral,
              //   "& td": theme.variants.soft.neutral,
            }),
          ]}
          variant="soft"
        >
          <thead>
            <tr>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Код 1С
              </th>
              <th scope="col" style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
                Артикул
              </th>
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Партия
              </th>
              <th scope="col" style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                План
              </th>
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Аппарат
              </th>
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Емкость
              </th>
              <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                Конвейер
              </th>
              {props.role === "user" && (
                <th scope="col" style={{ width: 200, padding: "12px 6px" }}>
                  Примечание
                </th>
              )}

              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Статус
              </th>
              {props.role === "technologist" && (
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Допуск
                </th>
              )}
              {props.role === "laboratory" && (
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Допуск
                </th>
              )}
              {props.role === "laboratory" && (
                <th scope="col" style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
                  Карантин
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {store.SummaryStore.records.map((row) => (
              <TableRow {...row} />
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );

  const renderTableMd = () => (
    <React.Fragment>
      <Sheet
        className="CurrenSummaryTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial", lg: "none" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={[
            {
              "--TableCell-headBackground": "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            },
            (theme) => ({
              "& td[scope='fail'] ": { bgcolor: "danger.softBg" },
              "& td[scope='wait'] ": { bgcolor: "warning.softBg" },
              "& td[scope='success'] ": { bgcolor: "success.softBg" },
              "& td[scope='und'] ": { bgcolor: `rgba(${theme.vars.palette.success.lightChannel}/0.6)` },
              '& th[scope="col"]': theme.variants.soft.neutral,
              //   "& td": theme.variants.soft.neutral,
            }),
          ]}
        >
          <thead>
            <tr>
              <th style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>Код 1С</th>
              <th style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>Артикул</th>
              <th style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>Партия</th>
              <th style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>План</th>
              <th style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>Конвейер</th>
              <th style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {store.SummaryStore.records.map((row) => (
              <tr key={row.id}>
                <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.product.code1C}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.product.marking}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.boil.value}</Typography>
                </td>
                <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.plan}</Typography>
                </td>

                <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">{row.conveyor.value}</Typography>
                </td>

                <td scope={selClass(row)} style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  <Typography level="body-xs">
                    {row.histories.length ? row.histories[row.histories.length - 1].historyType.description : "-"}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </React.Fragment>
  );

  if (!store.PlantStore.plants.length && store.PlantStore.pendingComplete) {
    return <></>;
  }
  const MyTable = observer(() => {
    return (
      <React.Fragment>
        <Sheet
          className="CurrenSummaryTableContainer"
          variant="outlined"
          sx={{
            display: { xs: "none", lg: "initial" },
            width: "100%",
            borderRadius: "sm",
            flexShrink: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={[
              {
                "--TableCell-headBackground": "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground": "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px",
              },
              (theme) => ({
                "& td[scope='fail'] ": { bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg" },
                "& td[scope='wait'] ": { bgcolor: mode === "light" ? "warning.softBg" : "neutral.softBg" },
                "& td[scope='success'] ": { bgcolor: mode === "light" ? "success.softBg" : "neutral.softBg" },
                "& td[scope='cancelled'] ": {
                  // bgcolor: mode === "light" ? `rgba(${theme.vars.palette.neutral.lightChannel})` : "neutral.softBg",
                  bgcolor: mode === "light" ? "danger.softBg" : "neutral.softBg",
                },
                //   "& td[scope='und'] ": { bgcolor: `rgba(${theme.vars.palette.success.lightChannel}/0.6)` },
                '& th[scope="col"]': theme.variants.soft.neutral,
                //   "& td": theme.variants.soft.neutral,
              }),
            ]}
            variant="soft"
          >
            <thead>
              <tr>
                <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  Код 1С
                </th>
                <th scope="col" style={{ width: 96, textAlign: "center", padding: "12px 6px" }}>
                  Артикул
                </th>
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Партия
                </th>
                <th scope="col" style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
                  План
                </th>
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Аппарат
                </th>
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Емкость
                </th>
                <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                  Конвейер
                </th>
                {props.role === "user" && (
                  <th scope="col" style={{ width: 200, padding: "12px 6px" }}>
                    Примечание
                  </th>
                )}

                <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  Статус
                </th>
                {props.role === "technologist" && (
                  <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                    Допуск
                  </th>
                )}
                {props.role === "laboratory" && (
                  <th scope="col" style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
                    Допуск
                  </th>
                )}
                {props.role === "laboratory" && (
                  <th scope="col" style={{ width: 160, textAlign: "center", padding: "12px 6px" }}>
                    Карантин
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {store.SummaryStore.records.map((row) => (
                <TableRow {...row} />
              ))}
            </tbody>
          </Table>
        </Sheet>
      </React.Fragment>
    );
  });
  return (
    <React.Fragment>
      {/* {store.SummaryStore.records.length > 0 && !store.SummaryStore.pending && <MyTable />} */}
      {store.SummaryStore.records.length > 0 && !store.SummaryStore.pending && renderTable()}
      {store.SummaryStore.records.length > 0 && !store.SummaryStore.pending && renderTableMd()}
      {store.SummaryStore.records.length === 0 &&
        !store.SummaryStore.pending &&
        !store.PlantStore.pendingComplete &&
        renderNoRecordsFoundInfo()}
      {store.SummaryStore.pending && renderPendingInfo()}
    </React.Fragment>
  );
}
export default observer(CurrentSummaryTable);
