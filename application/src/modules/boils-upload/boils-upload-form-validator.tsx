import { Box, Button, Typography } from "@mui/joy";

import { useShallow } from "zustand/shallow";
import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import * as XLSX from "xlsx";

import { ValError, useBoilsUploadFormStore } from "./store/use-boils-upload-form-store";
import { useBoilsUploadValidateModalStore } from "./store/use-boils-upload-validate-modal-store";
import { IXLSBoilsRowData } from "../../shared/api/services/direct-trace-service";

interface IXLSBoilsSheetRow {
  date: string;
  fin_productid: string;
  marking: string;
  batch: string;
  apparatus: string;
  plan: string;
  productid: string;
  productname: string;
  quantity: string;
  plant: string;
}

export default function BoilsUploadFormValidator() {
  const isValid = useBoilsUploadFormStore(useShallow((state) => state.isValid));
  const setIsValid = useBoilsUploadFormStore(useShallow((state) => state.setIsValid));
  const errs = useBoilsUploadFormStore(useShallow((state) => state.errs));
  const addErrs = useBoilsUploadFormStore(useShallow((state) => state.addErrs));
  const file = useBoilsUploadFormStore(useShallow((state) => state.file));

  const setErrsModalShow = useBoilsUploadFormStore(useShallow((state) => state.setErrsModalShow));
  const setDataForUpload = useBoilsUploadFormStore(useShallow((state) => state.setDataForUpload));
  const setOpenVaildateModal = useBoilsUploadValidateModalStore(useShallow((state) => state.setOpen));
  const formatDateString = (dateString: string) => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };
  const handleValidationComplete = (json: IXLSBoilsSheetRow[]) => {
    let res: IXLSBoilsRowData[] = [];
    json.map((item) => {
      const _row = { productid: item.productid, productname: item.productname, quantity: item.quantity };
      if (res.some((resItem) => resItem["document"]["batch_record"]["_attributes"]["batch"] === item.batch)) {
        const existsItem = res.filter(
          (resItem) => resItem["document"]["batch_record"]["_attributes"]["batch"] === item.batch
        )[0];

        const _attr = existsItem["document"]["batch_record"]["_attributes"];
        const rows = existsItem["document"]["batch_record"]["row"];
        const updatedItem: IXLSBoilsRowData = {
          document: { batch_record: { _attributes: { ..._attr }, row: [...rows, { ..._row }] } },
        };
        const resWithoutUpdated = res.filter(
          (fItem) => fItem["document"]["batch_record"]["_attributes"]["batch"] !== item.batch
        );
        res = [...resWithoutUpdated, updatedItem];
      } else {
        const attr = {
          apparatus: item.apparatus,
          batch: item.batch,
          date: formatDateString(item.date),
          fin_productid: item.fin_productid,
          marking: item.marking,
          plan: item.plan,
          plant: item.plant,
        };
        const _doc: IXLSBoilsRowData = { document: { batch_record: { _attributes: { ...attr }, row: [{ ..._row }] } } };
        res = [...res, { ..._doc }];
      }
    }, {});
    setDataForUpload(res);
    setIsValid(true);
    setOpenVaildateModal(false);
  };

  const handleValidationFail = () => {
    setIsValid(false);
    setOpenVaildateModal(false);
  };

  const ajv = ajvErrors(new Ajv({ allErrors: true }));

  ajv.addKeyword({
    keyword: "MustBeNumeric",
    type: "string",
    validate: function (schema: any, data: any) {
      if (schema === true) {
      }
      return typeof data === "string" && !Number.isNaN(Number(data));
    },
    error: {
      message: "Значение должно быть числом",
    },
  });
  ajv.addKeyword({
    keyword: "IsNotEmpty",
    type: "string",
    validate: function (schema: any, data: any) {
      if (schema === true) {
      }
      if (typeof data === "string") return data.trim() !== "";
      return data != null;
    },
    error: {
      message: "Значение должно быть числом",
    },
  });
  ajv.addKeyword({
    keyword: "NotZeroValue",
    type: "string",
    validate: function (schema: any, data: any) {
      if (schema === true) {
      }
      return Number(data) !== 0;
    },
    error: {
      message: "Значение не может быть равно нулю",
    },
  });
  const valSchema = {
    type: "object",
    properties: {
      date: { type: "string" },
      fin_productid: { type: "string", MustBeNumeric: "prefix", minLength: 1 },
      marking: { type: "string", minLength: 1 },
      batch: { type: "string", minLength: 1 },
      apparatus: { type: "string", MustBeNumeric: "prefix", minLength: 1 },
      plan: { type: "string", MustBeNumeric: "prefix", NotZeroValue: "prefix", minLength: 1 },
      productid: { type: "string", MustBeNumeric: "prefix", minLength: 1 },
      productname: { type: "string", minLength: 1 },
      quantity: { type: "string", MustBeNumeric: "prefix", NotZeroValue: "prefix", minLength: 1 },
      plant: { type: "string", minLength: 1 },
    },
    required: [
      "date",
      "fin_productid",
      "marking",
      "batch",
      "apparatus",
      "plan",
      "productid",
      "productname",
      "quantity",
      "plant",
    ],
    errorMessage: {
      required: {
        date: `Значение в столбце "date" не может быть пустым`,
        fin_productid: `Значение в столбце "fin_productid" не может быть пустым`,
        marking: `Значение в столбце "marking" не может быть пустым`,
        batch: `Значение в столбце "batch" не может быть пустым`,
        apparatus: `Значение в столбце "apparatus" не может быть пустым`,
        plan: `Значение в столбце "plan" не может быть пустым`,
        productid: `Значение в столбце "productid" не может быть пустым`,
        productname: `Значение в столбце "productname" не может быть пустым`,
        quantity: `Значение в столбце "quantity" не может быть пустым`,
        plant: `Значение в столбце "plant" не может быть пустым`,
      },
    },
  };
  // const parse = ajv.compileParser(valSchema);
  const parse = ajv.compile(valSchema, true);

  const validate = () => {
    const reader = new FileReader();
    reader.onloadstart = function (event) {
      event && setOpenVaildateModal(true);
    };
    reader.onload = function (event) {
      const data = event.target?.result;
      let valResult = true;
      let json: IXLSBoilsSheetRow[] = [];
      try {
        const wb = XLSX.read(data);
        const ws = wb.Sheets[wb.SheetNames[0]];
        json = XLSX.utils.sheet_to_json(ws, { raw: false });

        let count = 0;
        const limit = 30;
        for (let i = 0; i < json.length; i++) {
          if (count >= limit) {
            break;
          }
          const parsedData = parse(json[i]);
          if (!parsedData) {
            count++;
            parse.errors?.map((item) => {
              console.log(item.message);
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
      } catch (error) {}
      valResult ? handleValidationComplete(json) : handleValidationFail();
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
