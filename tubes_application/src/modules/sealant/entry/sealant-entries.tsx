/* eslint-disable no-constant-binary-expression */
import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";

import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { ParameterUnits } from "@/shared/helpers/parameter-units";
import { useSealantInputStore, SealantInputParams } from "../store/use-sealant-input-store";
import useSealantEntriesHandleCardsClick from "./use-sealant-entries-handle-cards-click";

export default function SealantEntries({ summaryData }: { summaryData: ISummary | null }) {
  const data = useSealantInputStore(useShallow((state) => state.data));
  const { handleCardClick, handleIntegerCardClick, handleBooleanCardClick } = useSealantEntriesHandleCardsClick();

  const tresholdsData = summaryData?.sealantTresholds ?? null;
  const lastCounterValue = summaryData?.sealantParams ? summaryData.sealantParams.counter_value : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: SealantInputParams.COUNTER_VALUE,
    title: ParameterNames.COUNTER_VALUE,
    value: Number(data.counter_value) ?? null,
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: ParameterUnits.COUNTER_VALUE,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const capMachineSpeedCardProps: AddParameterCardProps = {
    id: SealantInputParams.CAP_MACHINE_SPEED,
    title: ParameterNames.SEALANT_CAP_MACHINE_SPEED,
    value: Number(data.cap_machine_speed) ?? null,
    minValue: tresholdsData?.cap_machine_speed_min ?? null,
    maxValue: tresholdsData?.cap_machine_speed_max ?? null,
    unit: ParameterUnits.SEALANT_CAP_MACHINE_SPEED,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const totalAirPressureCardProps: AddParameterCardProps = {
    id: SealantInputParams.TOTAL_AIR_PRESSURE,
    title: ParameterNames.SEALANT_TOTAL_AIR_PRESSURE,
    value: Number(data.total_air_pressure) ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.SEALANT_TOTAL_AIR_PRESSURE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const holdersForwardCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_FORWARD,
    title: ParameterNames.SEALANT_HOLDERS_FORWARD,
    value: Number(data.holders_forward) ?? null,
    minValue: tresholdsData?.holders_forward_min ?? null,
    maxValue: tresholdsData?.holders_forward_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_FORWARD,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const holdersOpeningLeftCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_OPENING_LEFT,
    title: ParameterNames.SEALANT_HOLDERS_OPENING_LEFT,
    value: Number(data.holders_opening_left) ?? null,
    minValue: tresholdsData?.holders_opening_left_min ?? null,
    maxValue: tresholdsData?.holders_opening_left_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_OPENING_LEFT,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const holdersOpeningRightCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_OPENING_RIGHT,
    title: ParameterNames.SEALANT_HOLDERS_OPENING_RIGHT,
    value: Number(data.holders_opening_right) ?? null,
    minValue: tresholdsData?.holders_opening_right_min ?? null,
    maxValue: tresholdsData?.holders_opening_right_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_OPENING_RIGHT,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const holdersClosingCardProps: AddParameterCardProps = {
    id: SealantInputParams.HOLDERS_CLOSING,
    title: ParameterNames.SEALANT_HOLDER_CLOSING,
    value: Number(data.holders_closing) ?? null,
    minValue: tresholdsData?.holders_closing_min ?? null,
    maxValue: tresholdsData?.holders_closing_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDER_CLOSING,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  const injectionAStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_A_START,
    title: ParameterNames.SEALANT_INJECTION_A_START,
    value: Number(data.injection_a_start) ?? null,
    minValue: tresholdsData?.injection_a_start_min ?? null,
    maxValue: tresholdsData?.injection_a_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_A_START,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionBStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_B_START,
    title: ParameterNames.SEALANT_INJECTION_B_START,
    value: Number(data.injection_b_start) ?? null,
    minValue: tresholdsData?.injection_b_start_min ?? null,
    maxValue: tresholdsData?.injection_b_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_B_START,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionAEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_A_END,
    title: ParameterNames.SEALANT_INJECTION_A_END,
    value: Number(data.injection_a_end) ?? null,
    minValue: tresholdsData?.injection_a_end_min ?? null,
    maxValue: tresholdsData?.injection_a_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_A_END,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionBEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_B_END,
    title: ParameterNames.SEALANT_INJECTION_B_END,
    value: Number(data.injection_b_end) ?? null,
    minValue: tresholdsData?.injection_b_end_min ?? null,
    maxValue: tresholdsData?.injection_b_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_B_END,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionTubeOrientationStartCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_TUBE_ORIENTATION_START,
    title: ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_START,
    value: Number(data.injection_tube_orientation_start) ?? null,
    minValue: tresholdsData?.injection_tube_orientation_start_min ?? null,
    maxValue: tresholdsData?.injection_tube_orientation_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_TUBE_ORIENTATION_START,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const injectionTubeOrientationEndCardProps: AddParameterCardProps = {
    id: SealantInputParams.INJECTION_TUBE_ORIENTATION_END,
    title: ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_END,
    value: Number(data.injection_tube_orientation_end) ?? null,
    minValue: tresholdsData?.injection_tube_orientation_end_min ?? null,
    maxValue: tresholdsData?.injection_tube_orientation_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_TUBE_ORIENTATION_END,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const isCapSurfaceSmoothCardProps: AddParameterCardProps = {
    id: SealantInputParams.IS_CAP_SURFACE_SMOOTH,
    title: ParameterNames.SEALANT_IS_CAP_SURFACE_SMOOTH,
    booleanValue: data.is_cap_surface_smooth ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const latexRingPaddingCardProps: AddParameterCardProps = {
    id: SealantInputParams.LATEX_RING_PADDING,
    title: ParameterNames.SEALANT_LATEX_RING_PADDING,
    value: Number(data.latex_ring_padding) ?? null,
    minValue: tresholdsData?.latex_ring_padding_min ?? null,
    maxValue: tresholdsData?.latex_ring_padding_max ?? null,
    unit: ParameterUnits.SEALANT_LATEX_RING_PADDING,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const latexRingWidthCardProps: AddParameterCardProps = {
    id: SealantInputParams.LATEX_RING_WIDTH,
    title: ParameterNames.SEALANT_LATEX_RING_WIDTH,
    value: Number(data.latex_ring_width) ?? null,
    minValue: tresholdsData?.latex_ring_width_min ?? null,
    maxValue: tresholdsData?.latex_ring_width_max ?? null,
    unit: ParameterUnits.SEALANT_LATEX_RING_WIDTH,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const tubeRigidityCardProps: AddParameterCardProps = {
    id: SealantInputParams.TUBE_RIGIDITY,
    title: ParameterNames.SEALANT_TUBE_RIGIDITY,
    value: Number(data.tube_rigidity) ?? null,
    minValue: tresholdsData?.tube_rigidity_min ?? null,
    maxValue: tresholdsData?.tube_rigidity_max ?? null,
    unit: ParameterUnits.SEALANT_TUBE_RIGIDITY,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };
  const capUnscrewingTorqueCardProps: AddParameterCardProps = {
    id: SealantInputParams.CAP_UNSCREWING_TORQUE,
    title: ParameterNames.SEALANT_CAP_UNSCREWING_TORQUE,
    value: Number(data.cap_unscrewing_torque) ?? null,
    minValue: tresholdsData?.cap_unscrewing_torque_min ?? null,
    maxValue: tresholdsData?.cap_unscrewing_torque_max ?? null,
    unit: ParameterUnits.SEALANT_CAP_UNSCREWING_TORQUE,
    onClick: (val) => handleIntegerCardClick(val),
    variant: "numeric",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...capMachineSpeedCardProps} />
        <AddParameterCard {...totalAirPressureCardProps} />
        <AddParameterCard {...holdersForwardCardProps} />
        <AddParameterCard {...holdersOpeningLeftCardProps} />
        <AddParameterCard {...holdersOpeningRightCardProps} />
        <AddParameterCard {...holdersClosingCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...injectionAStartCardProps} />
        <AddParameterCard {...injectionBStartCardProps} />
        <AddParameterCard {...injectionAEndCardProps} />
        <AddParameterCard {...injectionBEndCardProps} />
        <AddParameterCard {...injectionTubeOrientationStartCardProps} />
        <AddParameterCard {...injectionTubeOrientationEndCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...isCapSurfaceSmoothCardProps} />
        <AddParameterCard {...latexRingPaddingCardProps} />
        <AddParameterCard {...latexRingWidthCardProps} />
        <AddParameterCard {...tubeRigidityCardProps} />
        <AddParameterCard {...capUnscrewingTorqueCardProps} />
      </HStack>
    </VStack>
  );
}
