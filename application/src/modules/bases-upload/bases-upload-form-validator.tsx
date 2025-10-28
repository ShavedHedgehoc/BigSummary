import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/shallow";
import Ajv, { SchemaObject } from "ajv/dist/jtd";
import { read, utils } from "xlsx";
import { IXLSBasesData, useBasesUploadFormStore } from "./store/use-bases-upload-form-store";

export default function BasesUploadFormValidator() {
  const isValid = useBasesUploadFormStore(useShallow((state) => state.isValid));
  const setIsValid = useBasesUploadFormStore(useShallow((state) => state.setIsValid));
  const errs = useBasesUploadFormStore(useShallow((state) => state.errs));
  const addErrs = useBasesUploadFormStore(useShallow((state) => state.addErrs));
  const file = useBasesUploadFormStore(useShallow((state) => state.file));
  const setErrsModalShow = useBasesUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const setDataForUpload = useBasesUploadFormStore(useShallow((state) => state.setDataForUpload));

  const handleValidationComplete = (json: IXLSBasesData[]) => {
    setDataForUpload(json);
    setIsValid(true);
  };

  const ajv = new Ajv({ allErrors: true });

  const valSchema: SchemaObject = {
    properties: {
      code: { type: "string" },
      marking: { type: "string" },
    },
  };

  const parse = ajv.compileParser(valSchema);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      let json: IXLSBasesData[] = [];
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
