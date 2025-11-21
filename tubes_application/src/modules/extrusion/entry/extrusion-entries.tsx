import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";
import { useExtrusionInputStore, ExtrusionInputParams } from "../store/use-extrusion-input-current-parameters-store";

import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { ParameterUnits } from "@/shared/helpers/parameter-units";

import { useQuery } from "@tanstack/react-query";

import RondelService from "@/shared/api/services/rondel-service";
import useExtrusionEntriesHandleCardsClick from "./use-extrusion-entries-handle-cards-click";

export default function ExtrusionEntries({ summaryData }: { summaryData: ISummary | null }) {
  const data = useExtrusionInputStore(useShallow((state) => state.data));

  const fillRondelOptions = useExtrusionInputStore(useShallow((state) => state.fillRondelTypeSelectorOptions));

  useQuery({
    queryKey: ["rondels"],
    queryFn: async () => {
      const data = await RondelService.getRondels();
      if (data.rondels.length) {
        fillRondelOptions(data.rondels);
        return data;
      }
    },
  });

  const { handleCardClick, handleBooleanCardClick, handleRadioCardClick } = useExtrusionEntriesHandleCardsClick();

  const tresholdsData = summaryData?.extrusionTresholds ?? null;
  const lastCounterValue = summaryData?.extrusionParams ? summaryData.extrusionParams.counter_value : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.COUNTER_VALUE,
    title: ParameterNames.COUNTER_VALUE,
    value: Number(data.counter_value) ?? null,
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: ParameterUnits.COUNTER_VALUE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const pressSpeedCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.PRESS_SPEED,
    title: ParameterNames.EXTRUSION_PRESS_SPEED,
    value: Number(data.press_speed) ?? null,
    minValue: tresholdsData?.press_speed_min ?? 0,
    maxValue: tresholdsData?.press_speed_max ?? 0,
    unit: ParameterUnits.EXTRUSION_PRESS_SPEED,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const blowTimeCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.BLOW_TIME,
    title: ParameterNames.EXTRUSION_BLOW_TIME,
    value: Number(data.blow_time) ?? null,
    minValue: tresholdsData?.blow_time_min ?? 0,
    maxValue: tresholdsData?.blow_time_max ?? 0,
    unit: ParameterUnits.EXTRUSION_BLOW_TIME,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const turningMachineSpeedCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TURNING_MACHINE_SPEED,
    title: ParameterNames.EXTRUSION_TURNING_MACHINE_SPEED,
    value: Number(data.turning_machine_speed) ?? null,
    minValue: tresholdsData?.turning_machine_speed_min ?? 0,
    maxValue: tresholdsData?.turning_machine_speed_max ?? 0,
    unit: ParameterUnits.EXTRUSION_TURNING_MACHINE_SPEED,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const annealingFurnaceTempCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.ANNEALING_FURNACE_TEMP,
    title: ParameterNames.EXTRUSION_ANNEALING_FURNACE_TEMP,
    value: Number(data.annealing_furnace_temp) ?? null,
    minValue: tresholdsData?.annealing_furnace_temp_min ?? 0,
    maxValue: tresholdsData?.annealing_furnace_temp_max ?? 0,
    unit: ParameterUnits.EXTRUSION_ANNEALING_FURNACE_TEMP,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const rondelTypeCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.RONDEL_TYPE,
    title: ParameterNames.EXTRUSION_RONDEL_TYPE,
    // stringValue: data.rondel_type_id ?? null,
    expectedValue: tresholdsData?.rondel,
    stringValue: data.rondel_type ?? null,
    stringDefaultValue: tresholdsData?.rondel ?? null,
    onClick: (val) => handleRadioCardClick(val),
    variant: "string",
  };

  const tubeCilindricalSectionLengthCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH,
    title: ParameterNames.EXTRUSION_TUBE_CILINDRICAL_SECTION_LENGTH,
    value: Number(data.tube_cilindrical_section_length) ?? null,
    minValue: tresholdsData?.tube_cilindrical_section_length_min ?? 0,
    maxValue: tresholdsData?.tube_cilindrical_section_length_max ?? 0,
    unit: ParameterUnits.EXTRUSION_TUBE_CILINDRICAL_SECTION_LENGTH,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const membraneThicknessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.MEMBRANE_THICKNESS,
    title: ParameterNames.EXTRUSION_MEMBRANE_THICKNESS,
    value: Number(data.membrane_thickness) ?? null,
    minValue: tresholdsData?.membrane_thickness_min ?? 0,
    maxValue: tresholdsData?.membrane_thickness_max ?? 0,
    unit: ParameterUnits.EXTRUSION_MEMBRANE_THIKNESS,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeDiameterCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_DIAMETER,
    title: ParameterNames.EXTRUSION_TUBE_DIAMETER,
    value: Number(data.tube_diameter) ?? null,
    minValue: tresholdsData?.tube_diameter_min ?? 0,
    maxValue: tresholdsData?.tube_diameter_max ?? 0,
    unit: ParameterUnits.EXTRUSION_TUBE_DIAMETER,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeCilindricalThicknessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS,
    title: ParameterNames.EXTRUSION_TUBE_CILINDRICAL_THICKNESS,
    value: Number(data.tube_cilindrical_thikness) ?? null,
    minValue: tresholdsData?.tube_cilindrical_section_thickness_min ?? 0,
    maxValue: tresholdsData?.tube_cilindrical_section_thickness_max ?? 0,
    unit: ParameterUnits.EXTRUSION_TUBE_CILINDRICAL_THICKNESS,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeRigidityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_RIGIDITY,
    title: ParameterNames.EXTRUSION_TUBE_RIGIDITY,
    value: Number(data.tube_rigidity) ?? null,
    minValue: tresholdsData?.tube_rigidity_min ?? 0,
    maxValue: tresholdsData?.tube_rigidity_max ?? 0,
    unit: ParameterUnits.EXTRUSION_TUBE_RIGIDITY,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeCuttingQualityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TUBE_CUTTING_QUALITY,
    title: ParameterNames.EXTRUSION_TUBE_CUTTING_QUALITY,
    booleanValue: data.tube_cutting_quality ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const tightnessCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.TIGHTNESS,
    title: ParameterNames.EXTRUSION_TIGHTNESS,
    booleanValue: data.tightness ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const externalThreadqualityCardProps: AddParameterCardProps = {
    id: ExtrusionInputParams.EXTERNAL_THREAD_QUALITY,
    title: ParameterNames.EXTRUSION_EXTERNAL_THREAD_QUALITY,
    booleanValue: data.external_thread_quality ?? null,
    stringDefaultValue: tresholdsData?.external_thread_value ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  return (
    <VStack gap={2} h="full" w="full">
      <HStack h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...pressSpeedCardProps} />
        <AddParameterCard {...blowTimeCardProps} />
        <AddParameterCard {...turningMachineSpeedCardProps} />
        <AddParameterCard {...annealingFurnaceTempCardProps} />
        <AddParameterCard {...rondelTypeCardProps} />
      </HStack>
      <HStack h="full" w="full">
        <AddParameterCard {...tubeCilindricalSectionLengthCardProps} />
        <AddParameterCard {...membraneThicknessCardProps} />
        <AddParameterCard {...tubeDiameterCardProps} />
        <AddParameterCard {...tubeCilindricalThicknessCardProps} />
      </HStack>
      <HStack h="full" w="full">
        <AddParameterCard {...tubeRigidityCardProps} />
        <AddParameterCard {...tubeCuttingQualityCardProps} />
        <AddParameterCard {...tightnessCardProps} />
        <AddParameterCard {...externalThreadqualityCardProps} />
      </HStack>
    </VStack>
  );
}
