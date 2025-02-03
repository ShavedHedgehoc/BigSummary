import { Box, Button, Typography } from "@mui/joy";
import { useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { useShallow } from "zustand/shallow";
import Ajv, { SchemaObject } from "ajv/dist/jtd";
import * as XLSX from "xlsx";
import { IXLSDocsRowData } from "../../shared/api/services/record-service";
// import { IXLSData } from "../../types";

export default function DocsUploadFormValidator() {
  const isValid = useDocsUploadFormStore(useShallow((state) => state.isValid));
  const setIsValid = useDocsUploadFormStore(useShallow((state) => state.setIsValid));
  const errs = useDocsUploadFormStore(useShallow((state) => state.errs));
  const addErrs = useDocsUploadFormStore(useShallow((state) => state.addErrs));
  const file = useDocsUploadFormStore(useShallow((state) => state.file));
  const formData = useDocsUploadFormStore(useShallow((state) => state.formData));
  const setErrsModalShow = useDocsUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const setDataForUpload = useDocsUploadFormStore(useShallow((state) => state.setDataForUpload));

  const handleValidationComplete = (json: IXLSDocsRowData[]) => {
    if (formData.plant && formData.dateForUpload) {
      setDataForUpload(json);
      setIsValid(true);
    }
  };

  const ajv = new Ajv({ allErrors: true });

  const valSchema: SchemaObject = {
    properties: {
      code1C: { type: "string" },
      serie: { type: "string" },
      product: { type: "string" },
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
      // added
      semi_product: { type: "string" },
      org_base_min_weight: { type: "string" },
      org_base_max_weight: { type: "string" },
      water_base_min_weight: { type: "string" },
      water_base_max_weight: { type: "string" },
      per_box: { type: "string" },
      box_per_row: { type: "string" },
      row_on_pallet: { type: "string" },
      gasket: { type: "string" },
      seal: { type: "string" },
      technician_note: { type: "string" },
      packaging_note: { type: "string" },
      marking_sample: { type: "string" },
      marking_feature: { type: "string" },
      ink_color: { type: "string" },
    },
  };
  const parse = ajv.compileParser(valSchema);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      // let json: IXLSData[] = [];
      let json: IXLSDocsRowData[] = [];
      try {
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        json = XLSX.utils.sheet_to_json(ws, { raw: false });

        for (let i = 0; i < json.length; i++) {
          const parsedData = parse(JSON.stringify(json[i]));
          if (parsedData === undefined) {
            const errMsg = `Ошибка в строке ${i + 2}...`;
            valResult = false;
            addErrs(errMsg);
          }
        }
      } catch (error) {
        console.log(error);
      }
      valResult ? handleValidationComplete(json) : setIsValid(false);
    };

    file && reader.readAsArrayBuffer(file);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {!isValid && errs.length === 0 && (
        <Typography level="body-sm" color="neutral">
          Проверьте файл перед загрузкой
        </Typography>
      )}
      {isValid && errs.length === 0 && (
        <Typography level="body-sm" color="success">
          Файл успешно проверен... Можно грузить...
        </Typography>
      )}
      {errs.length > 0 && (
        <Typography level="body-sm" color="danger">
          При проверке обнаружены ошибки...
        </Typography>
      )}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Button
          color="neutral"
          variant="outlined"
          size="sm"
          component="span"
          disabled={file === undefined || errs.length > 0 || isValid}
          sx={{
            display: "flex",
            fontWeight: "normal",
            fontSize: "small",
            width: "200px",
          }}
          onClick={() => validate()}
        >
          Проверить файл
        </Button>
        {errs.length > 0 && (
          <Button
            color="neutral"
            variant="outlined"
            size="sm"
            component="span"
            sx={{
              display: "flex",
              fontWeight: "normal",
              fontSize: "small",
              width: "200px",
            }}
            onClick={() => setErrsModalShow(true)}
          >
            Просмотр ошибок
          </Button>
        )}
      </Box>
    </Box>
  );
}
