import React from "react";
import BreadCrumbHeader from "../../components/headers/BreadCrumbHeader";
import MainPageHeader from "../../components/headers/MainPageHeader";

import Ajv, { SchemaObject } from "ajv/dist/jtd";
import * as XLSX from "xlsx";
import { Box, Button, DialogContent, FormControl, Modal, ModalDialog, ModalOverflow, Typography } from "@mui/joy";
import { useUpdateBases } from "../../shared/api/use-update-bases";

interface IXLSData {
  code: string;
  marking: string;
}
export interface PendingModalProps {
  open: boolean;
  height: number;
  minHeight: number;
  width: number;
}

function PendingModal({ props, children }: { props: PendingModalProps; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999,
        }}
      >
        <ModalOverflow>
          <ModalDialog
            layout="center"
            variant="solid"
            sx={[
              {
                display: "flex",
                borderRadius: "sm",
                borderWidth: "1px",
                backgroundColor: "var(--joy-palette-background-level1)",
              },
            ]}
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  overflow: "hidden",
                  maxHeight: `${props.height}px`,
                  minHeight: `${props.minHeight}px`,
                  minWidth: `${props.width}px`,
                  maxWidth: `${props.width}px`,
                }}
              >
                {children}
              </Box>
            </DialogContent>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
export default function UpdateBases() {
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState<File>();

  const [dataForUpload, setDataForUpload] = React.useState({} as BulkUpdateBasesDto);

  const [isValid, setIsValid] = React.useState(false);

  const [errs, setErrs] = React.useState<Array<string>>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.value);
    setFile(e.target.files?.[0]);
  };

  const { updateBases, isPending } = useUpdateBases();

  const handleValidationComplete = (json: IXLSData[]) => {
    const rows: BaseRow[] = json;
    setDataForUpload({ bases: rows });
    setIsValid(true);
  };

  const clearData = () => {
    setIsValid(false);
    setDataForUpload({} as BulkUpdateBasesDto);
    setFile(undefined);
    setFileName("");
    setErrs(() => []);
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

  const modalProps: PendingModalProps = {
    open: isPending,
    height: 150,
    minHeight: 150,
    width: 600,
  };

  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Планировщик", "Обновление основ"]} />
      <MainPageHeader pageTitle={"Обновление основ"} />
      <PendingModal props={modalProps}>
        <div>Loading</div>
      </PendingModal>

      <Box
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <Box sx={{ gap: 3, display: "flex", flexDirection: "column", width: "100%" }}>
          {/* <UploadPendingModal />
        <ErrorModal />

        <ValidationErrorModal /> */}

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
              Выбор файла
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
              <Typography level="body-sm">{fileName.split("\\").slice(-1)[0] || "Файл не выбран"}</Typography>
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
              <Button
                size="sm"
                disabled={file === undefined}
                sx={{ display: file === undefined ? "none" : "block" }}
                // onClick={() => props.clearFileSelect()}
                onClick={() => clearData()}
              >
                Очистить
              </Button>
            </Box>
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

              <Button
                size="sm"
                disabled={file === undefined || errs.length > 0 || isValid}
                sx={{ display: "block" }}
                onClick={() => validate()}
              >
                Проверить файл
              </Button>
            </Box>
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
              Загрузка
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
              <Typography level="body-sm" color="neutral">
                Загрузите сводку
              </Typography>

              <Button
                size="sm"
                disabled={!isValid}
                sx={{ display: "block" }}
                onClick={() => updateBases(dataForUpload)}
              >
                Загрузка
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 2,
              px: 2,
              py: 2,
              width: "100%",
            }}
          >
            {/* <SummaryUploadStepper file={props.file} isValid={props.isValid} errs={props.errs} /> */}
          </Box>
        </Box>
      </Box>

      {errs.length > 0 && errs.map((err) => <div>{err}</div>)}
    </React.Fragment>
  );
}
