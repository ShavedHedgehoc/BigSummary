import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/shallow";
import Ajv, { SchemaObject } from "ajv/dist/jtd";
import { read, utils } from "xlsx";
import { IXLSRegulationsData, useRegulationsUpsertFormStore } from "./store/use-regulations-upsert-form-store";

export default function RegulationsUpsertFormValidator() {
  const isValid = useRegulationsUpsertFormStore(useShallow((state) => state.isValid));
  const setIsValid = useRegulationsUpsertFormStore(useShallow((state) => state.setIsValid));
  const errs = useRegulationsUpsertFormStore(useShallow((state) => state.errs));
  const addErrs = useRegulationsUpsertFormStore(useShallow((state) => state.addErrs));
  const file = useRegulationsUpsertFormStore(useShallow((state) => state.file));
  const setErrsModalShow = useRegulationsUpsertFormStore(useShallow((state) => state.setErrsModalShow));
  const setDataForUpload = useRegulationsUpsertFormStore(useShallow((state) => state.setDataForUpload));

  const handleValidationComplete = (json: IXLSRegulationsData[]) => {
    setDataForUpload(json);
    setIsValid(true);
  };

  const ajv = new Ajv({ allErrors: true });

  const valSchema: SchemaObject = {
    properties: {
      code: { type: "string" },
      serie: { type: "string" },
      marking: { type: "string" },
      name: { type: "string" },
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
    },
  };

  const parse = ajv.compileParser(valSchema);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      let json: IXLSRegulationsData[] = [];
      try {
        const wb = read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        json = utils.sheet_to_json(ws, { raw: false });

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
