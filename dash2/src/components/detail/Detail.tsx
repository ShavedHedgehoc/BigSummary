import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import { IRecord } from "../../services/SummaryService";

import { Button, Typography, Box, Fab, Grid, Divider, Icon } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ScienceIcon from "@mui/icons-material/Science";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PropaneTankIcon from "@mui/icons-material/PropaneTank";
import OilBarrelIcon from "@mui/icons-material/OilBarrel";
import AlignVerticalBottomIcon from "@mui/icons-material/AlignVerticalBottom";
import { observer } from "mobx-react-lite";
import Loading from "../ui/Loading";
import NotFound from "../ui/NotFound";
import SideMenu, { SideMenuProps } from "../sideMenu/SideMenu";
import { RouteNames } from "../../consts/routeNames";

import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { HistoryCreateDto } from "../../services/HistoryService";
import DetailHelper from "../helpers/DetailHelper";

function Detail() {
  const params = useParams<"record_id">();
  const recordId: string | undefined = params.record_id;

  const { store } = React.useContext(Context);
  const navigate = useNavigate();
  const [record, setRecord] = React.useState<IRecord>();
  const [cls, setCls] = React.useState<"good" | "fail" | "wait" | "undef">("undef");
  const [sideMenuOpen, setSideMenuOpen] = React.useState(false);
  const [expandData, setExpandData] = React.useState(false);

  const logout = () => {
    store.AuthStore.logout();
  };

  const fillRecord = () => {
    store.RecordStore.fetchRecordById(recordId)
      .then(() => setRecord(() => store.RecordStore.record))
      .then(() => setCls(() => selClass(store.RecordStore.record)));
  };

  const startProduct = (recType: "product_inprogress" | "product_finished") => {
    if (record) {
      const data: HistoryCreateDto = {
        boil: record.boil.value,
        code: record.product.code1C,
        historyType: recType,
        userId: store.AuthStore.user.id,
        employeeId: null,
        note: null,
      };
      store.HistoryStore.createHistory(data).then(() => fillRecord());
    }
  };

  const [openHelp, setOpenHelp] = React.useState(false);

  const selClass = (item: IRecord) => {
    if (!item) {
      return "undef";
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
        return "good";
      case "product_pass":
        return "good";
      default:
        return "undef";
    }
  };

  React.useEffect(() => {
    fillRecord();
  }, []);

  const sideMenuProps: SideMenuProps = {
    isAuth: store.AuthStore.isAuth,
    user: store.AuthStore.user,
    open: sideMenuOpen,
    navigateToLogin: () => navigate(RouteNames.LOGIN),
    logout: () => logout(),
    setOpen: (val) => setSideMenuOpen(val),
  };

  const DetailMenu = () => {
    return (
      <Grid
        container
        direction={"column"}
        alignItems={"center"}
        justifyContent={"space-between"}
        style={{
          bottom: "20px",
          top: "auto",
          position: "fixed",
        }}
        md={11}
        xs={11}
      >
        <Grid container direction={"row"} justifyContent={"space-between"}>
          <Grid item>
            <Fab size="large" color="warning" onClick={() => setSideMenuOpen(true)}>
              <PersonIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab size="large" color="warning" onClick={() => setExpandData(() => !expandData)}>
              <AspectRatioIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab size="large" color="warning" onClick={() => setOpenHelp(true)}>
              <QuestionMarkIcon />
            </Fab>
          </Grid>
          <Grid item>
            <Fab size="large" color="warning" onClick={() => navigate(-1)}>
              <ArrowBackIosNewIcon />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  if (store.RecordStore.pending) {
    return <Loading />;
  }

  if (!store.RecordStore.record && !store.RecordStore.pending && store.RecordStore.pendingComplete) {
    return (
      <>
        <NotFound />
        <Fab
          size="large"
          color="warning"
          style={{ margin: "0", top: "auto", right: "20px", bottom: "20px", left: "auto", position: "fixed" }}
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewIcon />
        </Fab>
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "20px ",
        flexDirection: "column",
      }}
    >
      <Grid direction={"column"} container gap={3} paddingBottom={"100px"}>
        <Grid container>
          <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
            <FactoryIcon />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Typography variant="h5">Конвейер:</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign={"end"}>
              {record?.conveyor.value}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
            <InvertColorsIcon />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Typography variant="h5">Продукт:</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign={"end"}>
              {record?.product.marking}
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Grid container>
          <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
            <ScienceIcon />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Typography variant="h5">Партия:</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign={"end"}>
              {record?.boil.value}
            </Typography>
          </Grid>
        </Grid>

        <Divider />
        <Grid container>
          <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
            <AlignVerticalBottomIcon />
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={4}>
            <Typography variant="h5">План:</Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={5}>
            <Typography variant="h5" textAlign={"end"}>
              {record?.plan}
            </Typography>
          </Grid>
        </Grid>
        {expandData && (
          <>
            <Divider />
            <Grid container>
              <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
                <PropaneTankIcon />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Аппарат:</Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <Typography variant="h5" textAlign={"end"}>
                  {record?.apparatus.value}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {expandData && (
          <>
            <Divider />
            <Grid container>
              <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
                <OilBarrelIcon />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Емкость:</Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <Typography variant="h5" textAlign={"end"}>
                  {record?.can.value}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {expandData && (
          <>
            <Divider />
            <Grid container>
              <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
                <CalendarMonthIcon />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Годен до:</Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={5}>
                <Typography variant="h5" textAlign={"end"}>
                  {record?.bbf}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {expandData && (
          <>
            <Divider />
            <Grid container>
              <Grid item xs={1} container justifyContent={"center"} alignItems={"center"}>
                <EventNoteIcon />
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={4}>
                <Typography variant="h5">Примечание:</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="subtitle2" textAlign={"justify"}>
                  {record?.note}
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        <Divider />
        <Grid container>
          <Grid item xs={2} container alignItems={"center"} justifyContent={"center"}>
            <Icon fontSize="large">
              {cls === "good" ? (
                <TaskAltIcon fontSize="large" color={"success"} />
              ) : cls === "wait" ? (
                <HourglassEmptyIcon fontSize="large" color="warning" />
              ) : cls === "fail" ? (
                <BlockIcon fontSize="large" color={"error"} />
              ) : (
                <HelpOutlineIcon fontSize="large" color={"secondary"} />
              )}
            </Icon>
          </Grid>
          <Grid item xs={10}>
            <Grid item xs={12}>
              <Typography variant="h5" textAlign={"center"}>
                Статус:
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" textAlign={"center"}>
                {record?.histories.length
                  ? record?.histories[record?.histories.length - 1]?.historyType.description
                  : "---"}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider />

        <Grid item>
          <Button
            sx={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "1.2rem" }}
            variant="contained"
            fullWidth
            size="large"
            color="success"
            disabled={
              record?.histories[record?.histories.length - 1]?.historyType.value !== "product_pass" ||
              !store.AuthStore.isAuth ||
              (store.AuthStore.user.roles && store.AuthStore.user.roles.indexOf("Мастер") === -1)
            }
            onClick={() => startProduct("product_inprogress")}
            key={`button_${record?.id}`}
          >
            Начало фасовки
          </Button>
        </Grid>
        <Grid item>
          <Button
            sx={{ paddingTop: "10px", paddingBottom: "10px", fontSize: "1.2rem" }}
            variant="contained"
            fullWidth
            size="large"
            color="success"
            disabled={
              record?.histories[record?.histories.length - 1]?.historyType.value !== "product_in_progress" ||
              !store.AuthStore.isAuth ||
              (store.AuthStore.user.roles && store.AuthStore.user.roles.indexOf("Мастер") === -1)
            }
            onClick={() => startProduct("product_finished")}
            key={`button_${record?.id}`}
          >
            Конец фасовки
          </Button>
        </Grid>
      </Grid>
      <DetailMenu />
      <SideMenu {...sideMenuProps} />
      <DetailHelper openDrawer={openHelp} toggleDrawer={() => setOpenHelp(false)} />
    </Box>
  );
}

export default observer(Detail);
