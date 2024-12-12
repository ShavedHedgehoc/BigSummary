import React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";

import Ajv, { SchemaObject } from "ajv/dist/jtd";
import * as XLSX from "xlsx";
import { Box, Button, FormControl, Typography } from "@mui/joy";

function validate(file: File) {
  let errs: string[] = [];
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
  const reader = new FileReader();
  reader.onload = function (event) {
    const data = event.target?.result;
    let valResult = true;
    let json: BaseRow[] = [];
    try {
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      json = XLSX.utils.sheet_to_json(ws, { raw: false });

      for (let i = 0; i < json.length; i++) {
        const parsedData = parse(JSON.stringify(json[i]));
        if (parsedData === undefined) {
          const errMsg = `Ошибка в строке ${i + 2}...`;
          valResult = false;
          errs = [...errs, errMsg];
        }
      }
    } catch (error) {
      console.log(error);
    }
    if (valResult) {
      return { data: json, valid: true, errs: errs };
    }
    return { data: {}, valid: false, errs: errs };
  };
  file && reader.readAsArrayBuffer(file);
}

export default function UpdateBases() {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<File>();
  const [dataForUpload, setDataForUpload] = React.useState({} as BulkUpdateBasesDto);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
  };
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Обновление основ"]} />
      <MainPageHeader pageTitle={"Обновление основ"} />
      <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
        <FormControl size="sm">
          <input
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            style={{ display: "none" }}
            id="raised-button-file"
            type="file"
            value={fileName}
            disabled={file !== undefined}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileSelect(e)}
          />
          <label htmlFor="raised-button-file">
            <Button
              size="sm"
              component="span"
              disabled={file !== undefined}
              sx={{ display: file !== undefined ? "none" : "block" }}
            >
              Выберите файл
            </Button>
          </label>
        </FormControl>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderRadius: 5,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          px: 2,
          py: 2,
          width: "100%",
        }}
      >
        <Typography color="neutral" level="h4">
          Валидация
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {/* {!props.isValid && props.errs.length === 0 && (
            <Typography level="body-sm" color="neutral">
              Проверьте файл перед загрузкой
            </Typography>
          )}
          {props.isValid && props.errs.length === 0 && (
            <Typography level="body-sm" color="success">
              Файл успешно проверен... Можно грузить...
            </Typography>
          )}
          {props.errs.length > 0 && (
            <Typography level="body-sm" color="danger">
              При проверке обнаружены ошибки...
            </Typography>
          )}

          <Button
            size="sm"
            disabled={file === undefined || errs.length > 0 || props.isValid}
            sx={{ display: "block" }}
            onClick={() => validate()}
          >
            Проверить файл
          </Button> */}
        </Box>
      </Box>
    </React.Fragment>
  );
}
