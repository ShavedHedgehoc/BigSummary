import { Box, Button, Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";
import Ajv from "ajv";
import { read, utils } from "xlsx";
import { ValError, useTubeRecordsUploadFormStore } from "./store/use-records-upload-form-store";
import { IXLSXTubeRecordRowData } from "../../shared/api/services/tube-records-service";

export default function TubeRecordsUploadFormValidator() {
  const isValid = useTubeRecordsUploadFormStore(useShallow((state) => state.isValid));
  const setIsValid = useTubeRecordsUploadFormStore(useShallow((state) => state.setIsValid));
  const errs = useTubeRecordsUploadFormStore(useShallow((state) => state.errs));
  const addErrs = useTubeRecordsUploadFormStore(useShallow((state) => state.addErrs));
  const file = useTubeRecordsUploadFormStore(useShallow((state) => state.file));
  const formData = useTubeRecordsUploadFormStore(useShallow((state) => state.formData));
  const setErrsModalShow = useTubeRecordsUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const setDataForUpload = useTubeRecordsUploadFormStore(useShallow((state) => state.setDataForUpload));

  const handleValidationComplete = (json: IXLSXTubeRecordRowData[]) => {
    if (formData.dateForUpload) {
      setDataForUpload(json);
      setIsValid(true);
    }
  };

  const ajv = new Ajv({ allErrors: true });

  const valSchema = {
    type: "object",
    properties: {
      code1C: { type: "string", pattern: "^[0-9]{6}$" },
      product_marking: { type: "string", minLength: 1 },
      batch: { type: "string", minLength: 1 },
      plan: { type: "string", minLength: 1 },
      conveyor: { type: "string", minLength: 1 },
      specification: { type: "string", minLength: 1 },
    },
    required: ["code1C", "product_marking", "batch", "plan", "conveyor", "specification"],
  };
  // const parse = ajv.compileParser(valSchema);
  const parse = ajv.compile(valSchema);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      // let json: IXLSData[] = [];
      let json: IXLSXTubeRecordRowData[] = [];
      try {
        const wb = read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        json = utils.sheet_to_json(ws, { raw: false });

        for (let i = 0; i < json.length; i++) {
          // const parsedData = parse(JSON.stringify(json[i]));
          const parsedData = parse(json[i]);

          // if (parsedData === undefined) {
          if (!parsedData) {
            parse.errors?.map((item) => {
              const err: ValError = {
                row: i + 2,
                field: item.instancePath.substring(1),
                error: item.message ? item.message : "",
              };
              addErrs(err);
            });

            valResult = false;
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
