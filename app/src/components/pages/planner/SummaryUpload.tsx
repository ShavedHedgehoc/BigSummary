import * as React from "react";
import classes from "./summaryUpload.module.css";
import { Context } from "../../../main";
import { IPlant } from "../../../services/PlantService";
import Ajv, { SchemaObject } from "ajv/dist/jtd";
import * as XLSX from "xlsx";

export interface ISummary {
  code1C: string;
  product: string;
  serie: string;
  boil: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
}
export interface ISummaryUploadData {
  plantId: string;
  summaryDate: string;
  rows: ISummary[];
}

export interface IXLSData {
  code1C: string;
  product: string;
  serie: string;
  boil: string;
  apparatus: string;
  can: string;
  plan: string;
  bbf: string;
  note: string;
  workshop: string;
}

export default function SummaryUpload() {
  const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toJSON().slice(0, 10);
  };
  const { store } = React.useContext(Context);
  const [plants, setPlants] = React.useState({} as IPlant[]);
  const [selectedPlant, setSelectedPlant] = React.useState<string>();
  const [summaryDate, setSumaryDate] = React.useState(() => getTomorrowDate());
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isValid, setIsValid] = React.useState(false);
  const [dataForUpload, setDataForUpload] = React.useState({} as ISummaryUploadData);
  const [errs, setErrs] = React.useState<Array<string>>([]);
  //   const [plant, setPlant] = React.useState(plantItems[0]);

  React.useEffect(() => {
    store.PlantStore.fetchPlants()
      .then(() => setPlants([...store.PlantStore.plants]))
      .then(() => setSelectedPlant(store.PlantStore.plants?.[0].id.toString()));
    //   .then(() => fillRecords(store.PlantStore.plants?.[0].id.toString()));
  }, []);

  const onChangeSelector = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlant(e.target.value);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
    setActiveIndex(1);
  };

  const clearData = () => {
    setIsValid(false);
    setDataForUpload({} as ISummaryUploadData);
    setFile(undefined);
    setFileName("");
    setActiveIndex(0);
    setErrs(() => []);
  };
  const ajv = new Ajv({ allErrors: true });

  const valSchema: SchemaObject = {
    properties: {
      code1C: { type: "string" },
      serie: { type: "string" },
      product: { type: "string" },
      boil: { type: "string" },
      plan: { type: "string" },
      apparatus: { type: "string" },
      can: { type: "string" },
      conveyor: { type: "string" },
      bbf: { type: "string" },
      note: { type: "string" },
      workshop: { type: "string" },
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
            const errMsg = `Ошибка в стороке ${i + 2}...`;
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
      fillUploadData(json, selectedPlant, summaryDate);
      setActiveIndex(2);
      setIsValid(true);
    }
  };

  const fillUploadData = (json: ISummary[], plantId: string, summaryDate: string) => {
    // const titleDate = getTransformedDate(summaryDate);
    // const title = `Сводка ${plant.name} ${titleDate}`;
    const rows: ISummary[] = json;
    setDataForUpload({ plantId: plantId, summaryDate: summaryDate, rows: rows });
  };

  const upload = async () => {
    await store.SummaryStore.uploadData(dataForUpload);
    clearData();
  };

  const items = [{ label: "Выбор файла" }, { label: "Валидация" }, { label: "Загрузка" }];

  return (
    <div className={classes.summary_upload__container}>
      <div className={classes.summary_upload__header}>Загрузка сводок</div>

      <div className="upload__form">
        <div className="upload__date_plant_picker">
          <div className="upload__picker">
            <div>
              <span>Выберите площадку:</span>
            </div>
            <div>
              {plants.length && (
                <select
                  className={classes.laboratory_page__plant_selector}
                  value={selectedPlant}
                  onChange={(e) => onChangeSelector(e)}
                >
                  {plants.map((plant) => (
                    <option value={plant.id} key={plant.id}>
                      {plant.value}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="upload__picker">
            <div>
              <span>Выберите дату:</span>
            </div>
            <div>
              <input
                type="date"
                value={summaryDate}
                // dateFormat="dd/mm/yy"
                onChange={(e) => {
                  if (e.target.value) {
                    setSumaryDate(e.target.value);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="upload-select-file">
          <div className={file === undefined ? "upload-input-file-wrapper" : "upload-input-file-wrapper-disabled"}>
            <h4> {fileName.split("\\").slice(-1)[0] || "Нажмите сюда для выбора файла..."}</h4>
            <input
              id="file"
              type="file"
              className="upload-input-file-input"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              value={fileName}
              disabled={file !== undefined}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileSelect(e)}
            />
            <div className={file === undefined ? "close-disabled" : "close"} onClick={() => clearData()}></div>
          </div>
        </div>
        <div className="upload-form-val-message">
          {isValid && errs.length === 0 && "Файл успешно проверен... Можно грузить..."}
          {errs.length > 0 && "При проверке обнаружены ошибки..."}
        </div>
        <div className={errs.length > 0 ? "upload-form-errors" : "upload-form-errors-disabled"}>
          {errs.length > 0 &&
            errs.map((item, id) => (
              <div key={id} className="upload-form-errors-error">
                {item}
              </div>
            ))}
        </div>
        <div className="upload-form-buttons">
          {file !== undefined && !isValid && errs.length === 0 && (
            <button
              className="upload-button"
              disabled={file === undefined || isValid || errs.length > 0}
              onClick={() => validate()}
            >
              Проверка
            </button>
          )}
          {file !== undefined && isValid && (
            <button className="upload-button" disabled={file === undefined || !isValid} onClick={() => upload()}>
              Загрузка
            </button>
          )}
        </div>
      </div>
      <div className="upload-step">
        {items.map((item) => (
          <p key={item.label}>
            {item.label}
            {activeIndex}
          </p>
        ))}
      </div>
    </div>
  );
}
