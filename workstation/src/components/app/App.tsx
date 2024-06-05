/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import "@fontsource/roboto";
import classes from "./app.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { checkBarcode, parseBoilCard, parseProductCard } from "../../helpers/checkers";
import { HistoriePayload } from "../../store/HistoriesStore";
import { ProcessMessages } from "../../http/processMessages";
import Message from "../message/Message";
import MainInput from "../mainInput/MainInput";
import Records from "../records/Records";

// 064290#NZ#1074D4#22.04.2024#0 nz
//064007#A/GD100#1074D4#22.04.2024#12#3282404251603361

//054238#BBY/S30#1065D4#01.04.2024#60#3282404251603361 gp
//054238#LO#1065D4#01.04.2024#60#3282404251603361 gp

function App() {
  const { store } = React.useContext(Context);

  const handleInput = async (value: string) => {
    store.EmployeeStore.employee.name ? await processLabel(value) : await processBarcode(value);
  };

  const processBarcode = async (value: string) => {
    const isBarcode = checkBarcode(value);
    if (isBarcode) {
      await store.EmployeeStore.getEmployeeByBarcode(value);
      store.EmployeeStore.error.length === 0 &&
        !store.EmployeeStore.employee.name &&
        handleErrorInput(ProcessMessages.USER_NOT_FOUND, "fail");
      store.EmployeeStore.error.length !== 0 && handleErrorInput(store.EmployeeStore.error, "fail");
      store.EmployeeStore.employee.name &&
        !store.EmployeeStore.employee.occupation &&
        handleErrorInput(ProcessMessages.ROLE_NOT_FOUND, "fail");
      return;
    }
    handleErrorInput(ProcessMessages.NOT_USER_BARCODE, "fail");
  };

  const processLabel = async (barcode: string) => {
    store.EmployeeStore.employee.occupation.value === "TECHNOLOGIST" && processBoilCard(barcode);
    store.EmployeeStore.employee.occupation.value === "OPERATOR" && processProductCard(barcode);
  };

  const processBoilCard = async (value: string) => {
    const boil = parseBoilCard(value);
    if (boil) {
      const payload: HistoriePayload = {
        boil: boil,
        code: null,
        userId: null,
        employeeId: store.EmployeeStore.employee.id,
        historyType: "base_check",
        note: ProcessMessages.NOTE,
      };
      await store.HistoriesStore.addHistories(payload);
      store.HistoriesStore.error === "" && store.RecordsStore.fetchRecords();
      store.HistoriesStore.error !== "" && handleErrorInput(store.HistoriesStore.error, "fail");
      store.HistoriesStore.error === "" &&
        store.HistoriesStore.histories.length > 0 &&
        handleErrorInput(ProcessMessages.SUCCESS_ADD + store.HistoriesStore.histories.length, "success");
      return;
    }
    handleErrorInput(ProcessMessages.NOT_BOIL_BARCODE, "fail");
  };

  const processProductCard = async (value: string) => {
    const [code, boil] = parseProductCard(value);
    if (code && boil) {
      const payload: HistoriePayload = {
        boil: boil,
        code: code,
        userId: null,
        employeeId: store.EmployeeStore.employee.id,
        historyType: "product_check",
        note: ProcessMessages.NOTE,
      };
      await store.HistoriesStore.addHistories(payload);
      store.HistoriesStore.error === "" && store.RecordsStore.fetchRecords();
      store.HistoriesStore.error !== "" && handleErrorInput(store.HistoriesStore.error, "fail");
      store.HistoriesStore.error === "" &&
        store.HistoriesStore.histories.length > 0 &&
        handleErrorInput(ProcessMessages.SUCCESS_ADD + store.HistoriesStore.histories.length, "success");
      return;
    }
    handleErrorInput(ProcessMessages.NOT_PRODUCT_BARCODE, "fail");
  };

  const handleErrorInput = (msg: string, severity: string) => {
    showInfo(msg, severity);
    store.EmployeeStore.clearEmployee();
  };

  const [showMessage, setShowMessage] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("fail");

  const showInfo = (msg: string, severity: string) => {
    setShowMessage(true);
    setSeverity(severity);
    setInfoMessage(msg);
    setTimeout(() => {
      setShowMessage(false);
      setInfoMessage("");
    }, 3000);
  };

  React.useEffect(() => {
    store.HealthStore.checkHealth();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      store.HealthStore.checkHealth();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {store.HealthStore.error.length !== 0 && (
        <div className={classes.disconnect}>
          <h1>¯\_(ツ)_/¯</h1>
          <h1> Сервер упал и давай валяться...</h1>
        </div>
      )}
      {store.HealthStore.error.length === 0 && (
        <div className={classes.main_container}>
          <div className={classes.center_window}>
            <div className={classes.icon}>
              <svg viewBox="0 0 500 500">
                <rect width="430" height="54" rx="10" ry="10" x="35" y="0" />
                <rect width="430" height="54" rx="10" ry="10" x="35" y="446" />
                <path d="M428,72q-6,101-134,178q128,77,134,178h-356q6-101,134-178q-128-77-134-178z" />
              </svg>
            </div>
            <div className={classes.header}>
              <h2>Фиксация времени подачи проб</h2>
            </div>
            <div className={classes.prompt}>
              <h3>
                {!store.EmployeeStore.employee.name
                  ? ProcessMessages.BARCODE_SCAN_PROMPT
                  : ProcessMessages.LABEL_SCAN_PROMPT}
              </h3>
            </div>
            <div className={classes.main_input}>
              <MainInput handleInput={(value) => handleInput(value)} isDisable={showMessage} />
            </div>
            <div className={classes.help_text}>
              <p>
                Отсканируйте штрихкод со своего бейджа, затем - штрихкод с варочного листа или ярлыка продукта. При
                необходимости повторите несколько раз.
              </p>
            </div>
          </div>
          <div className={classes.message_pane}>
            {showMessage && <Message severity={severity} message={infoMessage} />}
          </div>
          <div className={classes.side_pane}>
            <Records />
          </div>
        </div>
      )}
    </>
  );
}

export default observer(App);
