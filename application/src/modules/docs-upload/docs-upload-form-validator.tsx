import { Box, Button, Typography } from "@mui/joy";
import { ValError, useDocsUploadFormStore } from "./store/use-docs-upload-form-store";
import { useShallow } from "zustand/react/shallow";
// import Ajv, { SchemaObject } from "ajv/dist/jtd";
import Ajv from "ajv";
import { read, utils } from "xlsx";
import { IXLSDocsRowData } from "../../shared/api/services/record-service";

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

  const valSchema = {
    type: "object",
    properties: {
      code1C: { type: "string", pattern: "^[0-9]{6}$" },
      serie: { type: "string", minLength: 1 },
      product: { type: "string", minLength: 1 },
      batch: { type: "string", minLength: 1 },
      plan: { type: "string", minLength: 1 },
      apparatus: { type: "string", minLength: 1 },
      can: { type: "string", minLength: 1 },
      conveyor: { type: "string", minLength: 1 },
      bbf: { type: "string", minLength: 1 },
      dm: { type: "string", minLength: 1 },
      note: { type: "string", maxLength: 1024 },
      workshop: { type: "string", minLength: 1 },
      boil1: { type: "string", minLength: 1 }, //add patterns here
      boil2: { type: "string", minLength: 1 }, //add patterns here
      // added
      semi_product: { type: "string", minLength: 1 },
      org_base_min_weight: { type: "string", minLength: 1 },
      org_base_max_weight: { type: "string", minLength: 1 },
      water_base_min_weight: { type: "string", minLength: 1 },
      water_base_max_weight: { type: "string", minLength: 1 },
      per_box: { type: "string", minLength: 1 },
      box_per_row: { type: "string", minLength: 1 },
      row_on_pallet: { type: "string", minLength: 1 },
      gasket: { type: "string", minLength: 1 },
      seal: { type: "string", minLength: 1 },
      technician_note: { type: "string", minLength: 1 },
      packaging_note: { type: "string", minLength: 1 },
      marking_sample: { type: "string", minLength: 1 },
      marking_feature: { type: "string", minLength: 1 },
      ink_color: { type: "string", minLength: 1 },
    },
    required: [
      "serie",
      "code1C",
      "product",
      "batch",
      "plan",
      "apparatus",
      "can",
      "conveyor",
      "bbf",
      "dm",
      "note",
      "workshop",
      "boil1",
      "boil2",
      "semi_product",
      "org_base_min_weight",
      "org_base_max_weight",
      "water_base_min_weight",
      "water_base_max_weight",
      "per_box",
      "box_per_row",
      "row_on_pallet",
      "gasket",
      "seal",
      "technician_note",
      "packaging_note",
      "marking_sample",
      "marking_feature",
      "ink_color",
    ],
  };
  // const parse = ajv.compileParser(valSchema);
  const parse = ajv.compile(valSchema, true);

  const validate = () => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      // let json: IXLSData[] = [];
      let json: IXLSDocsRowData[] = [];
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
