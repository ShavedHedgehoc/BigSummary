import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  // LinearProgress,
  // Modal,
  Option,
  Select,
  // Sheet,
  // Table,
  Typography,
} from "@mui/joy";
import { IPlant } from "../../types";

import SummaryUploadStepper from "../SummaryUploadStepper";

export interface SummaryUploadFormProps {
  plants: IPlant[];
  selectedPlant: IPlant | undefined;
  changePlant(val: number): void;
  changeDate(val: string): void;
  handleFileSelect(e: React.ChangeEvent<HTMLInputElement>): void;
  clearData(): void;
  validate(): void;
  plantPending: boolean;
  plantPendingComplete: boolean;
  summaryDate: string;
  file: File | undefined;
  filename: string;
  isValid: boolean;
  errs: string[];
  upload(): void;
  pending: boolean;
  uploadErrs: string[];
  clearUploadErrors(): void;
}

export default function SummaryUploadForm(props: SummaryUploadFormProps) {
  // function UploadPendingModal() {
  //   return (
  //     <React.Fragment>
  //       <Modal open={props.pending} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  //         <Sheet
  //           variant="plain"
  //           sx={{
  //             maxWidth: 500,
  //             borderRadius: "md",
  //             p: 3,
  //             // boxShadow: "lg",
  //           }}
  //         >
  //           <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  //             <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
  //               Загрузка сводки
  //             </Typography>
  //             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  //               <Typography id="modal-desc" level="body-md">
  //                 Загружается сводка на площадку "{props.selectedPlant?.value}" на дату {props.summaryDate}
  //               </Typography>
  //               <LinearProgress color="primary" size="lg" variant="solid" />
  //             </Box>
  //           </Box>
  //         </Sheet>
  //       </Modal>
  //     </React.Fragment>
  //   );
  // }
  // function ErrorModal() {
  //   return (
  //     <React.Fragment>
  //       <Modal
  //         open={props.uploadErrs.length > 0}
  //         sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
  //       >
  //         <Sheet
  //           variant="plain"
  //           sx={{
  //             maxWidth: 500,
  //             borderRadius: "md",
  //             p: 3,
  //             // boxShadow: "lg",
  //           }}
  //         >
  //           <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  //             <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
  //               Ошибка!
  //             </Typography>
  //             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  //               <Typography id="modal-desc" level="body-md">
  //                 {props.uploadErrs}
  //               </Typography>
  //               <Button onClick={() => props.clearUploadErrors()}>Понятно</Button>
  //             </Box>
  //           </Box>
  //         </Sheet>
  //       </Modal>
  //     </React.Fragment>
  //   );
  // }

  // function ValidationErrorModal() {
  //   return (
  //     <React.Fragment>
  //       <Modal open={props.errs.length > 0} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  //         <Sheet
  //           variant="plain"
  //           sx={{
  //             maxWidth: 500,
  //             borderRadius: "md",
  //             p: 3,
  //             // boxShadow: "lg",
  //           }}
  //         >
  //           <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
  //             <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
  //               При проверке файла обнаружены ошибки!
  //             </Typography>
  //             <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
  //               <Sheet
  //                 variant="outlined"
  //                 sx={{
  //                   display: "initial",
  //                   width: "100%",
  //                   borderRadius: "sm",
  //                   flexShrink: 1,
  //                   overflow: "auto",
  //                   minHeight: 0,
  //                   maxHeight: "200px",
  //                 }}
  //               >
  //                 <Table variant="plain">
  //                   <tbody>
  //                     {props.errs.map((item, id) => (
  //                       <tr key={id}>
  //                         <td>{item}</td>
  //                       </tr>
  //                     ))}
  //                   </tbody>
  //                 </Table>
  //               </Sheet>
  //               <Button onClick={() => props.clearData()}>Понятно</Button>
  //             </Box>
  //           </Box>
  //         </Sheet>
  //       </Modal>
  //     </React.Fragment>
  //   );
  // }

  const renderFilters = () => (
    <React.Fragment>
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
            Данные загрузки
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
            <FormControl size="sm">
              <Select
                size="sm"
                placeholder="Выберите площадку"
                defaultValue={props.selectedPlant?.id}
                slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
                // onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
                onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
                  newValue && props.changePlant(newValue);
                }}
              >
                {props.plants.map((plant) => (
                  <Option value={plant.id} key={plant.id}>
                    {plant.value}
                  </Option>
                ))}
              </Select>
            </FormControl>
            <FormControl size="sm">
              <Input
                type="date"
                name="currentDate"
                size="sm"
                value={props.summaryDate}
                onChange={(e) => {
                  if (e.target.value) {
                    props.changeDate(e.target.value);
                  }
                }}
              />
            </FormControl>
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
            <Typography level="body-sm">{props.filename.split("\\").slice(-1)[0] || "Файл не выбран"}</Typography>
            <FormControl size="sm">
              <input
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                value={props.filename}
                disabled={props.file !== undefined}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.handleFileSelect(e)}
              />
              <label htmlFor="raised-button-file">
                <Button
                  size="sm"
                  component="span"
                  disabled={props.file !== undefined}
                  sx={{ display: props.file !== undefined ? "none" : "block" }}
                >
                  Выберите файл
                </Button>
              </label>
            </FormControl>
            <Button
              size="sm"
              disabled={props.file === undefined}
              sx={{ display: props.file === undefined ? "none" : "block" }}
              // onClick={() => props.clearFileSelect()}
              onClick={() => props.clearData()}
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
            {!props.isValid && props.errs.length === 0 && (
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
              disabled={props.file === undefined || props.errs.length > 0 || props.isValid}
              sx={{ display: "block" }}
              onClick={() => props.validate()}
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

            <Button size="sm" disabled={!props.isValid} sx={{ display: "block" }} onClick={() => props.upload()}>
              Загрузка
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "1px solid",
            // borderRadius: 5,
            // borderColor: "divider",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // justifySelf: "flex-end",
            gap: 2,
            px: 2,
            py: 2,
            // mt: 3,
            width: "100%",
          }}
        >
          <SummaryUploadStepper file={props.file} isValid={props.isValid} errs={props.errs} />
        </Box>
      </Box>
    </React.Fragment>
  );

  // if (!props.plants.length && props.plantPendingComplete) {
  //   return <></>;
  // }

  return (
    <React.Fragment>
      <Box
        className="PlantSelector-tabletUp"
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
        {props.plants.length > 0 && props.plantPendingComplete && renderFilters()}
      </Box>
    </React.Fragment>
  );
}
