import * as React from "react";
import { observer } from "mobx-react-lite";

import { Box, Typography } from "@mui/joy";
import MainInput from "./MainInput";
import { Context } from "../../main";
import { checkBarcode, parseBoilCard, parseProductCard } from "../../helpers/checkers";
import { ProcessMessages } from "../../http/processMessages";
import { HistoriePayload } from "../../store/HistoriesStore";
import LoadingComponent from "../loadingComponent/LoadingComponent";
import MessageWindow from "./MessageWindow";

function MainFormComponent() {
  const { store } = React.useContext(Context);

  const handleInput = async (value: string) => {
    store.EmployeeStore.employee ? await processLabel(value) : await processBarcode(value);
  };

  const processLabel = async (barcode: string) => {
    store.EmployeeStore.employee &&
      store.EmployeeStore.employee.occupation.value === "TECHNOLOGIST" &&
      processBoilCard(barcode);
    store.EmployeeStore.employee &&
      store.EmployeeStore.employee.occupation.value === "OPERATOR" &&
      processProductCard(barcode);
  };
  const processBarcode = async (value: string) => {
    const isBarcode = checkBarcode(value);
    if (isBarcode) {
      await store.EmployeeStore.getEmployeeByBarcode(value);
      store.EmployeeStore.error.length === 0 &&
        !store.EmployeeStore.employee &&
        processMessage(ProcessMessages.USER_NOT_FOUND, "fail");
      store.EmployeeStore.error.length !== 0 && processMessage(store.EmployeeStore.error, "fail");
      store.EmployeeStore.employee &&
        !store.EmployeeStore.employee.occupation &&
        processMessage(ProcessMessages.ROLE_NOT_FOUND, "fail");
      return;
    }
    processMessage(ProcessMessages.NOT_USER_BARCODE, "fail");
  };

  const processBoilCard = async (value: string) => {
    if (!store.EmployeeStore.employee) {
      processMessage(ProcessMessages.EMPLOYEE_UNDEFINED, "fail");
      return;
    }
    const [boil, baseCode] = parseBoilCard(value);
    if (boil && baseCode) {
      const payload: HistoriePayload = {
        record_id: null,
        code: null,
        base_code: baseCode,
        //insert base code here
        boil_value: boil,
        historyType: "base_check",
        userId: null,
        employeeId: store.EmployeeStore.employee.id,
        note: ProcessMessages.NOTE,
      };
      await processHistory(payload);
      return;
    }
    processMessage(ProcessMessages.NOT_BOIL_BARCODE, "fail");
  };

  const processProductCard = async (value: string) => {
    if (!store.EmployeeStore.employee) {
      processMessage(ProcessMessages.EMPLOYEE_UNDEFINED, "fail");
      return;
    }
    const [code, boil] = parseProductCard(value);
    if (code && boil) {
      const payload: HistoriePayload = {
        record_id: null,
        boil_value: boil,
        code: code,
        base_code: null,
        userId: null,
        employeeId: store.EmployeeStore.employee.id,
        historyType: "product_check",
        note: ProcessMessages.NOTE,
      };
      await processHistory(payload);
      return;
    }
    processMessage(ProcessMessages.NOT_PRODUCT_BARCODE, "fail");
  };

  const processHistory = async (payload: HistoriePayload) => {
    await store.HistoriesStore.addHistories(payload).then(() => {
      store.EmployeeStore.clearEmployee();
      if (store.HistoriesStore.isError) {
        processMessage(store.HistoriesStore.error, "fail");
      } else {
        processMessage(ProcessMessages.SUCCESS_ADD, "success");
        store.RecordsStore.fetchRecords();
      }
    });
  };

  const processMessage = (msg: string, severity: "fail" | "success") => {
    showInfo(msg, severity);
    store.EmployeeStore.clearEmployee();
  };
  const [showMessage, setShowMessage] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState<string>("");
  const [severity, setSeverity] = React.useState<"fail" | "success">("fail");

  const showInfo = (msg: string, severity: "fail" | "success") => {
    setShowMessage(true);
    setSeverity(severity);
    setInfoMessage(msg);
    setTimeout(() => {
      setShowMessage(false);
      setInfoMessage("");
    }, 3000);
  };

  function MainForm() {
    return (
      <React.Fragment>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography level="h3" color="warning">
            {store.EmployeeStore.employee
              ? `Пользователь: ${store.EmployeeStore.employee.name}`
              : "Требуется авторизация"}
          </Typography>
        </Box>

        <Box sx={{ ml: 30, mr: 30 }}>
          <MainInput handleInput={(value) => handleInput(value)} isDisable={showMessage} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography level="h4">
            {!store.EmployeeStore.employee ? ProcessMessages.BARCODE_SCAN_PROMPT : ProcessMessages.LABEL_SCAN_PROMPT}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", ml: 30, mr: 30 }}>
          <Typography color="neutral">
            В процессе работы, сканируйте штрихкод со своего бейджа, затем - штрихкод с варочного листа или ярлыка
            продукта, в заивисмости от назначенной роли. При необходимости повторите несколько раз.
          </Typography>
        </Box>
      </React.Fragment>
    );
  }

  const ObservedMainForm = observer(MainForm);

  const pending = store.EmployeeStore.pending || store.HistoriesStore.pending;
  const showForm = !pending && !showMessage;
  const showMessageWindow = !pending && showMessage;

  return (
    <React.Fragment>
      {showForm && <ObservedMainForm />}
      {showMessageWindow && <MessageWindow severity={severity} infoMessage={infoMessage} />}
      {pending && <LoadingComponent />}
    </React.Fragment>
  );
}

export default observer(MainFormComponent);