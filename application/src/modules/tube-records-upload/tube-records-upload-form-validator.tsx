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
      serie: { type: "string", minLength: 1 },
      product_marking: { type: "string", minLength: 1 },
      product_name: { type: "string", minLength: 1 },
      batch: { type: "string", minLength: 1 },
      plan: { type: "string", minLength: 1 },
      conveyor: { type: "string", minLength: 1 },
      assembly: { type: "string", minLength: 1 },
      press_speed_min: { type: "string", minLength: 1 },
      press_speed_max: { type: "string", minLength: 1 },
      molding_time_min: { type: "string", minLength: 1 },
      molding_time_max: { type: "string", minLength: 1 },
      turning_automate_speed_min: { type: "string", minLength: 1 },
      turning_automate_speed_max: { type: "string", minLength: 1 },
      annealing_furnace_temp_min: { type: "string", minLength: 1 },
      annealing_furnace_temp_max: { type: "string", minLength: 1 },
      cap_machine_speed_min: { type: "string", minLength: 1 },
      cap_machine_speed_max: { type: "string", minLength: 1 },
      cap_machine_air_pressure_min: { type: "string", minLength: 1 },
      cap_machine_air_pressure_max: { type: "string", minLength: 1 },
      grips_forward_min: { type: "string", minLength: 1 },
      grips_forward_max: { type: "string", minLength: 1 },
      grips_opening_left_min: { type: "string", minLength: 1 },
      grips_opening_left_max: { type: "string", minLength: 1 },
      grips_opening_right_min: { type: "string", minLength: 1 },
      grips_opening_right_max: { type: "string", minLength: 1 },
      grips_closing_min: { type: "string", minLength: 1 },
      grips_closing_max: { type: "string", minLength: 1 },
      injection_start_min: { type: "string", minLength: 1 },
      injection_start_max: { type: "string", minLength: 1 },
      injection_end_min: { type: "string", minLength: 1 },
      injection_end_max: { type: "string", minLength: 1 },
      tube_start_position_min: { type: "string", minLength: 1 },
      tube_start_position_max: { type: "string", minLength: 1 },
      tube_end_position_min: { type: "string", minLength: 1 },
      tube_end_position_max: { type: "string", minLength: 1 },
      padding_machine_speed_min: { type: "string", minLength: 1 },
      padding_machine_speed_max: { type: "string", minLength: 1 },
      padding_machine_air_pressure_min: { type: "string", minLength: 1 },
      padding_machine_air_pressure_max: { type: "string", minLength: 1 },
      padding_furnace_temp_min: { type: "string", minLength: 1 },
      padding_furnace_temp_max: { type: "string", minLength: 1 },
      offset_furnace_temp_min: { type: "string", minLength: 1 },
      offset_furnace_temp_max: { type: "string", minLength: 1 },
      printer_motor_speed_min: { type: "string", minLength: 1 },
      printer_motor_speed_max: { type: "string", minLength: 1 },
      holders_motor_speed_min: { type: "string", minLength: 1 },
      holders_motor_speed_max: { type: "string", minLength: 1 },
      station_motor_speed_min: { type: "string", minLength: 1 },
      station_motor_speed_max: { type: "string", minLength: 1 },
      ink_injection_time_min: { type: "string", minLength: 1 },
      ink_injection_time_max: { type: "string", minLength: 1 },
      lacquer_machine_speed_min: { type: "string", minLength: 1 },
      lacquer_machine_speed_max: { type: "string", minLength: 1 },
      lacquer_machine_air_pressure_min: { type: "string", minLength: 1 },
      lacquer_machine_air_pressure_max: { type: "string", minLength: 1 },
      feed_can_air_pressure_min: { type: "string", minLength: 1 },
      feed_can_air_pressure_max: { type: "string", minLength: 1 },
      nozzle_regulator_air_pressure_min: { type: "string", minLength: 1 },
      nozzle_regulator_air_pressure_max: { type: "string", minLength: 1 },
      cells_speed_min: { type: "string", minLength: 1 },
      cells_speed_max: { type: "string", minLength: 1 },
      injection_AB_start_position_min: { type: "string", minLength: 1 },
      injection_AB_start_position_max: { type: "string", minLength: 1 },
      injection_CD_start_position_min: { type: "string", minLength: 1 },
      injection_CD_start_position_max: { type: "string", minLength: 1 },
      injection_ABCD_end_position_min: { type: "string", minLength: 1 },
      injection_ABCD_end_position_max: { type: "string", minLength: 1 },
      tube_molding_start_position_min: { type: "string", minLength: 1 },
      tube_molding_start_position_max: { type: "string", minLength: 1 },
      tube_molding_end_position_min: { type: "string", minLength: 1 },
      tube_molding_end_position_max: { type: "string", minLength: 1 },
      polimerization_furnace_temperature_min: { type: "string", minLength: 1 },
      polimerization_furnace_temperature_max: { type: "string", minLength: 1 },
    },
    required: [
      "code1C",
      "serie",
      "product_marking",
      "product_name",
      "batch",
      "plan",
      "conveyor",
      "assembly",
      "press_speed_min",
      "press_speed_max",
      "molding_time_min",
      "molding_time_max",
      "turning_automate_speed_min",
      "turning_automate_speed_max",
      "annealing_furnace_temp_min",
      "annealing_furnace_temp_max",
      "cap_machine_speed_min",
      "cap_machine_speed_max",
      "cap_machine_air_pressure_min",
      "cap_machine_air_pressure_max",
      "grips_forward_min",
      "grips_forward_max",
      "grips_opening_left_min",
      "grips_opening_left_max",
      "grips_opening_right_min",
      "grips_opening_right_max",
      "grips_closing_min",
      "grips_closing_max",
      "injection_start_min",
      "injection_start_max",
      "injection_end_min",
      "injection_end_max",
      "tube_start_position_min",
      "tube_start_position_max",
      "tube_end_position_min",
      "tube_end_position_max",
      "padding_machine_speed_min",
      "padding_machine_speed_max",
      "padding_machine_air_pressure_min",
      "padding_machine_air_pressure_max",
      "padding_furnace_temp_min",
      "padding_furnace_temp_max",
      "offset_furnace_temp_min",
      "offset_furnace_temp_max",
      "printer_motor_speed_min",
      "printer_motor_speed_max",
      "holders_motor_speed_min",
      "holders_motor_speed_max",
      "station_motor_speed_min",
      "station_motor_speed_max",
      "ink_injection_time_min",
      "ink_injection_time_max",
      "lacquer_machine_speed_min",
      "lacquer_machine_speed_max",
      "lacquer_machine_air_pressure_min",
      "lacquer_machine_air_pressure_max",
      "feed_can_air_pressure_min",
      "feed_can_air_pressure_max",
      "nozzle_regulator_air_pressure_min",
      "nozzle_regulator_air_pressure_max",
      "cells_speed_min",
      "cells_speed_max",
      "injection_AB_start_position_min",
      "injection_AB_start_position_max",
      "injection_CD_start_position_min",
      "injection_CD_start_position_max",
      "injection_ABCD_end_position_min",
      "injection_ABCD_end_position_max",
      "tube_molding_start_position_min",
      "tube_molding_start_position_max",
      "tube_molding_end_position_min",
      "tube_molding_end_position_max",
      "polimerization_furnace_temperature_min",
      "polimerization_furnace_temperature_max",
    ],
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
