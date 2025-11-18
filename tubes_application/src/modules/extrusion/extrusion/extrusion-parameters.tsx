import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, { type ParameterCardProps } from "../../common/parameter-card";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { ParameterUnits } from "@/shared/helpers/parameter-units";

export default function ExtrusionParameters({ data }: { data: ISummary | null }) {
  const paramsData = data && data.extrusion_params.length ? data.extrusion_params[0] : null;
  const tresholdsData =
    data && data.production && data.production.extrusion_tresholds.length
      ? data.production.extrusion_tresholds[0]
      : null;

  const pressSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_PRESS_SPEED,
    value: paramsData?.press_speed ?? null,
    minValue: tresholdsData?.press_speed_min ?? null,
    maxValue: tresholdsData?.press_speed_max ?? null,
    unit: ParameterUnits.EXTRUSION_PRESS_SPEED,
    variant: "numeric",
  };
  const blowTimeCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_BLOW_TIME,
    value: paramsData?.blow_time ?? null,
    minValue: tresholdsData?.blow_time_min ?? null,
    maxValue: tresholdsData?.blow_time_max ?? null,
    unit: ParameterUnits.EXTRUSION_BLOW_TIME,
    variant: "numeric",
  };
  const turningMachineSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TURNING_MACHINE_SPEED,
    value: paramsData?.turning_machine_speed ?? null,
    minValue: tresholdsData?.turning_machine_speed_min ?? null,
    maxValue: tresholdsData?.turning_machine_speed_max ?? null,
    unit: ParameterUnits.EXTRUSION_TURNING_MACHINE_SPEED,
    variant: "numeric",
  };
  const annealingFurnaceTempCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_ANNEALING_FURNACE_TEMP,
    value: paramsData?.annealing_furnace_temp ?? null,
    minValue: tresholdsData?.annealing_furnace_temp_min ?? null,
    maxValue: tresholdsData?.annealing_furnace_temp_max ?? null,
    unit: ParameterUnits.EXTRUSION_ANNEALING_FURNACE_TEMP,
    variant: "numeric",
  };
  const tubeCilindricalSectionLengthCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TUBE_CILINDRICAL_SECTION_LENGTH,
    value: paramsData?.tube_cilindrical_section_length ?? null,
    minValue: tresholdsData?.tube_cilindrical_section_length_min ?? null,
    maxValue: tresholdsData?.tube_cilindrical_section_length_max ?? null,
    unit: ParameterUnits.EXTRUSION_TUBE_CILINDRICAL_SECTION_LENGTH,
    variant: "numeric",
  };
  const membraneThicknessCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_MEMBRANE_THICKNESS,
    value: paramsData?.membrane_thickness ?? null,
    minValue: tresholdsData?.membrane_thickness_min ?? null,
    maxValue: tresholdsData?.membrane_thickness_max ?? null,
    unit: ParameterUnits.EXTRUSION_MEMBRANE_THIKNESS,
    variant: "numeric",
  };
  const tubeDiameterCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TUBE_DIAMETER,
    value: paramsData?.tube_diameter ?? null,
    minValue: tresholdsData?.tube_diameter_min ?? null,
    maxValue: tresholdsData?.tube_diameter_max ?? null,
    unit: ParameterUnits.EXTRUSION_TUBE_DIAMETER,
    variant: "numeric",
  };
  const tubeCilindricalThicknessCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TUBE_CILINDRICAL_THICKNESS,
    value: paramsData?.tube_cilindrical_section_thickness ?? null,
    minValue: tresholdsData?.tube_cilindrical_section_thickness_min ?? null,
    maxValue: tresholdsData?.tube_cilindrical_section_thickness_max ?? null,
    unit: ParameterUnits.EXTRUSION_TUBE_CILINDRICAL_THICKNESS,
    variant: "numeric",
  };
  const tubeRigidityCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TUBE_RIGIDITY,
    value: paramsData?.tube_rigidity ?? null,
    minValue: tresholdsData?.tube_rigidity_min ?? null,
    maxValue: tresholdsData?.tube_rigidity_max ?? null,
    unit: ParameterUnits.EXTRUSION_TUBE_RIGIDITY,
    variant: "numeric",
  };

  const tubeCuttingQualityCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TUBE_CUTTING_QUALITY,
    booleanValue: paramsData?.tube_cutting_quality ?? null,
    variant: "boolean",
  };
  const tightnessCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_TIGHTNESS,
    booleanValue: paramsData?.tightness ?? null,
    variant: "boolean",
  };
  const rondelTypeCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_RONDEL_TYPE,
    stringValue: paramsData?.rondel_type.value ?? null,
    stringDefaultValue: tresholdsData?.rondel_type.value ?? null,
    variant: "string",
  };
  const externalThreadqualityCardProps: ParameterCardProps = {
    title: ParameterNames.EXTRUSION_EXTERNAL_THREAD_QUALITY,
    booleanValue: paramsData?.external_thread_quality ?? null,
    stringDefaultValue: tresholdsData?.external_thread_value ?? null,
    variant: "boolean",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...pressSpeedCardProps} />
        <ParameterCard {...blowTimeCardProps} />
        <ParameterCard {...turningMachineSpeedCardProps} />
        <ParameterCard {...annealingFurnaceTempCardProps} />
        <ParameterCard {...rondelTypeCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeCilindricalSectionLengthCardProps} />
        <ParameterCard {...membraneThicknessCardProps} />
        <ParameterCard {...tubeDiameterCardProps} />
        <ParameterCard {...tubeCilindricalThicknessCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeRigidityCardProps} />
        <ParameterCard {...tubeCuttingQualityCardProps} />
        <ParameterCard {...tightnessCardProps} />
        <ParameterCard {...externalThreadqualityCardProps} />
      </HStack>
    </VStack>
  );
}
