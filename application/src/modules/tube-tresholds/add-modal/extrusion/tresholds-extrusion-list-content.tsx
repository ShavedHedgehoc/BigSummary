import { Stack } from "@mui/joy";
import { ExtrusionTresholdsParams } from "../store/use-tube-extrusion-tresholds-store";
import { TresholdsMinMaxEntry } from "../shared/tresholds-min-max-entry";
import TresholdsSelectEntry from "../shared/tresholds-select-entry";
import { TresholdsStringEntry } from "../shared/tresholds-string-entry";
import { useExtrusionTresholds } from "./use-extrusion-tresholds";
import { ParameterNames } from "../shared/parameter-names";

export default function TresholdsExtrusionListContent() {
  const { tresholds, rondelSelectorOptions, setSelectedRondelOption, selectedRondelOption, changeTresholds } =
    useExtrusionTresholds();

  return (
    <Stack spacing={2}>
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.PRESS_SPEED_MIN}
        idMax={ExtrusionTresholdsParams.PRESS_SPEED_MAX}
        title={`${ParameterNames.EXTRUSION_PRESS_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.press_speed_min}
        maxValue={tresholds.press_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.BLOW_TIME_MIN}
        idMax={ExtrusionTresholdsParams.BLOW_TIME_MAX}
        title={`${ParameterNames.EXTRUSION_BLOW_TIME}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.blow_time_min}
        maxValue={tresholds.blow_time_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.TURNING_MACHINE_SPEED_MIN}
        idMax={ExtrusionTresholdsParams.TURNING_MACHINE_SPEED_MAX}
        title={`${ParameterNames.EXTRUSION_TURNING_MACHINE_SPEED}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.turning_machine_speed_min}
        maxValue={tresholds.turning_machine_speed_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.ANNEALING_FURNACE_TEMP_MIN}
        idMax={ExtrusionTresholdsParams.ANNEALING_FURNACE_TEMP_MAX}
        title={`${ParameterNames.EXTRUSION_ANNEALING_FURNACE_TEMP}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.annealing_furnace_temp_min}
        maxValue={tresholds.annealing_furnace_temp_max}
        onChange={changeTresholds}
      />
      <TresholdsSelectEntry
        id={ExtrusionTresholdsParams.RONDEL_ID}
        title={`${ParameterNames.EXTRUSION_RONDEL_TYPE}: `}
        value={selectedRondelOption}
        options={rondelSelectorOptions}
        setSelected={setSelectedRondelOption}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_LENGTH_MIN}
        idMax={ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_LENGTH_MAX}
        title={`${ParameterNames.EXTRUSION_TUBE_CILINDRICAL_SECTION_LENGTH}: `}
        isInteger={true}
        required={true}
        minValue={tresholds.tube_cilindrical_section_length_min}
        maxValue={tresholds.tube_cilindrical_section_length_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.TUBE_DIAMETER_MIN}
        idMax={ExtrusionTresholdsParams.TUBE_DIAMETER_MAX}
        title={`${ParameterNames.EXTRUSION_TUBE_DIAMETER}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.tube_diameter_min}
        maxValue={tresholds.tube_diameter_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_THICKNESS_MIN}
        idMax={ExtrusionTresholdsParams.TUBE_CILINDRICAL_SECTION_THICKNESS_MAX}
        title={`${ParameterNames.EXTRUSION_TUBE_CILINDRICAL_THICKNESS}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.tube_cilindrical_section_thickness_min}
        maxValue={tresholds.tube_cilindrical_section_thickness_max}
        onChange={changeTresholds}
      />
      <TresholdsMinMaxEntry
        idMin={ExtrusionTresholdsParams.TUBE_RIGIDITY_MIN}
        idMax={ExtrusionTresholdsParams.TUBE_RIGIDITY_MAX}
        title={`${ParameterNames.EXTRUSION_TUBE_RIGIDITY}: `}
        isInteger={false}
        required={true}
        minValue={tresholds.tube_rigidity_min}
        maxValue={tresholds.tube_rigidity_max}
        onChange={changeTresholds}
      />
      <TresholdsStringEntry
        id={ExtrusionTresholdsParams.EXTERNAL_THREAD_VALUE}
        title={`${ParameterNames.EXTRUSION_EXTERNAL_THREAD_QUALITY}: `}
        required={true}
        value={tresholds.external_thread_value}
        onChange={changeTresholds}
      />
    </Stack>
  );
}
