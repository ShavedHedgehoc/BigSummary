import * as React from "react";
import { Context } from "../../main";
import { IPlant, ISummary, ISummaryUploadData, IXLSData } from "../../types";
import Ajv, { SchemaObject } from "ajv/dist/jtd";
import * as XLSX from "xlsx";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import MainPageHeader from "../headers/MainPageHeader";
import SummaryUploadForm, { SummaryUploadFormProps } from "../forms/SummaryUploadForm";
import { observer } from "mobx-react-lite";
import { getTomorrowDate } from "../../utils";

function SummaryUpload() {
  const { store } = React.useContext(Context);
  const [plants, setPlants] = React.useState({} as IPlant[]);
  const [selectedPlant, setSelectedPlant] = React.useState<IPlant>();
  const [summaryDate, setSumaryDate] = React.useState(() => getTomorrowDate());
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [isValid, setIsValid] = React.useState(false);
  const [dataForUpload, setDataForUpload] = React.useState({} as ISummaryUploadData);
  const [errs, setErrs] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    console.log("render upload");
    store.PlantStore.fetchPlants()
      .then(() => setPlants([...store.PlantStore.plants]))
      .then(() => setSelectedPlant(store.PlantStore.plants?.[0]));
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
  };

  const clearData = () => {
    setIsValid(false);
    setDataForUpload({} as ISummaryUploadData);
    setFile(undefined);
    setFileName("");
    setErrs(() => []);
  };
  const ajv = new Ajv({ allErrors: true });

  const valSchema: SchemaObject = {
    properties: {
      code1C: { type: "string" },
      serie: { type: "string" },
      product: { type: "string" },
      // boil: { type: "string" },
      batch: { type: "string" },
      plan: { type: "string" },
      apparatus: { type: "string" },
      can: { type: "string" },
      conveyor: { type: "string" },
      bbf: { type: "string" },
      note: { type: "string" },
      workshop: { type: "string" },
      boil1: { type: "string" },
      boil2: { type: "string" },
    },
  };
  const parse = ajv.compileParser(valSchema);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      let json: IXLSData[] = [];
      try {
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        json = XLSX.utils.sheet_to_json(ws, { raw: false });

        for (let i = 0; i < json.length; i++) {
          const parsedData = parse(JSON.stringify(json[i]));
          if (parsedData === undefined) {
            const errMsg = `Ошибка в строке ${i + 2}...`;
            valResult = false;
            setErrs((arr) => [...arr, errMsg]);
          }
        }
      } catch (error) {
        console.log(error);
      }
      valResult ? handleValidationComplete(json) : setIsValid(false);
    };

    file && reader.readAsArrayBuffer(file);
  };

  const handleValidationComplete = (json: IXLSData[]) => {
    if (selectedPlant && summaryDate) {
      fillUploadData(json, selectedPlant.id.toString(), summaryDate);
      setIsValid(true);
    }
  };

  const fillUploadData = (json: ISummary[], plantId: string, summaryDate: string) => {
    const rows: ISummary[] = json;
    setDataForUpload({ plantId: plantId, summaryDate: summaryDate, rows: rows });
  };

  const upload = async () => {
    await store.SummaryStore.uploadData(dataForUpload);
    clearData();
  };

  const changePlant = (id: number) => {
    setSelectedPlant(plants.find((x) => x.id === id));
  };

  const summaryUploadFormProps: SummaryUploadFormProps = {
    plants: plants,
    selectedPlant: selectedPlant,
    changePlant: (id: number) => changePlant(id),
    changeDate: (val: string) => setSumaryDate(val),
    handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => handleFileSelect(e),
    clearData: () => clearData(),
    validate: () => validate(),
    plantPending: store.PlantStore.pending,
    plantPendingComplete: store.PlantStore.pendingComplete,
    summaryDate: summaryDate,
    file: file,
    filename: fileName,
    isValid: isValid,
    errs: errs,
    upload: () => upload(),
    pending: store.SummaryStore.pending,
    uploadErrs: store.SummaryStore.error,
    clearUploadErrors: () => store.SummaryStore.clearError(),
  };

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Загрузка сводок"]} />
      <MainPageHeader pageTitle={"Загрузка сводок"} />
      <SummaryUploadForm {...summaryUploadFormProps} />
    </React.Fragment>
  );
}

export default observer(SummaryUpload);
