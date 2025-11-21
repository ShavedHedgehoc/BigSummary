import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";

import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { ParameterUnits } from "@/shared/helpers/parameter-units";
import { useVarnishInputStore, VarnishInputParams } from "../store/use-varnish-input-store";
import useVarnishEntriesHandleCardsClick from "./use-varnish-entries-handle-cards-click";

export default function VarnishEntries({ summaryData }: { summaryData: ISummary | null }) {
  const data = useVarnishInputStore(useShallow((state) => state.data));
  const { handleCardClick, handleBooleanCardClick } = useVarnishEntriesHandleCardsClick();

  const tresholdsData = summaryData?.varnishTresholds ?? null;
  const lastCounterValue = summaryData?.varnishParams ? summaryData.varnishParams.counter_value : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: VarnishInputParams.COUNTER_VALUE,
    title: ParameterNames.COUNTER_VALUE,
    value: Number(data.counter_value) ?? null,
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: ParameterUnits.COUNTER_VALUE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const varnishMachineSpeedCardProps: AddParameterCardProps = {
    id: VarnishInputParams.VARNISH_MACHINE_SPEED,
    title: ParameterNames.VARNISH_VARNISH_MACHINE_SPEED,
    value: Number(data.varnish_machine_speed) ?? null,
    minValue: tresholdsData?.varnish_machine_speed_min ?? null,
    maxValue: tresholdsData?.varnish_machine_speed_max ?? null,
    unit: ParameterUnits.VARNISH_VARNISH_MACHINE_SPEED,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const totalAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TOTAL_AIR_PRESSURE,
    title: ParameterNames.VARNISH_TOTAL_AIR_PRESSURE,
    value: Number(data.total_air_pressure) ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_TOTAL_AIR_PRESSURE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const feedCanAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.FEED_CAN_AIR_PRESSURE,
    title: ParameterNames.VARNISH_FEED_CAN_AIR_PRESSURE,
    value: Number(data.feed_can_air_pressure) ?? null,
    minValue: tresholdsData?.feed_can_air_pressure_min ?? null,
    maxValue: tresholdsData?.feed_can_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_FEED_CAN_AIR_PRESSURE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const nozzleRegulatorAirpressureCardProps: AddParameterCardProps = {
    id: VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE,
    title: ParameterNames.VARNISH_NOZZLE_REGULATOR_AIR_PRESSURE,
    value: Number(data.nozzle_regulator_air_pressure) ?? null,
    minValue: tresholdsData?.nozzle_regulator_air_pressure_min ?? null,
    maxValue: tresholdsData?.nozzle_regulator_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_NOZZLE_REGULATOR_AIR_PRESSURE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const cellsSpeedCardProps: AddParameterCardProps = {
    id: VarnishInputParams.CELLS_SPEED,
    title: ParameterNames.VARNISH_CELLS_SPEED,
    value: Number(data.cells_speed) ?? null,
    minValue: tresholdsData?.cells_speed_min ?? null,
    maxValue: tresholdsData?.cells_speed_max ?? null,
    unit: ParameterUnits.VARNISH_CELLS_SPEED,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionAStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_A_START_POSITION,
    title: ParameterNames.VARNISH_INJECTION_A_START_POSITION,
    value: Number(data.injection_a_start_position) ?? null,
    minValue: tresholdsData?.injection_a_start_position_min ?? null,
    maxValue: tresholdsData?.injection_a_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_A_START_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionBStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_B_START_POSITION,
    title: ParameterNames.VARNISH_INJECTION_B_START_POSITION,
    value: Number(data.injection_b_start_position) ?? null,
    minValue: tresholdsData?.injection_b_start_position_min ?? null,
    maxValue: tresholdsData?.injection_b_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_B_START_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionCStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_C_START_POSITION,
    title: ParameterNames.VARNISH_INJECTION_C_START_POSITION,
    value: Number(data.injection_c_start_position) ?? null,
    minValue: tresholdsData?.injection_c_start_position_min ?? null,
    maxValue: tresholdsData?.injection_c_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_C_START_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionDStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_D_START_POSITION,
    title: ParameterNames.VARNISH_INJECTION_D_START_POSITION,
    value: Number(data.injection_d_start_position) ?? null,
    minValue: tresholdsData?.injection_d_start_position_min ?? null,
    maxValue: tresholdsData?.injection_d_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_D_START_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionAEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_A_END_POSITION,
    title: ParameterNames.VARNISH_INJECTION_A_END_POSITION,
    value: Number(data.injection_a_end_position) ?? null,
    minValue: tresholdsData?.injection_a_end_position_min ?? null,
    maxValue: tresholdsData?.injection_a_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_A_END_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionBEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_B_END_POSITION,
    title: ParameterNames.VARNISH_INJECTION_B_END_POSITION,
    value: Number(data.injection_b_end_position) ?? null,
    minValue: tresholdsData?.injection_b_end_position_min ?? null,
    maxValue: tresholdsData?.injection_b_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_B_END_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionCEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_C_END_POSITION,
    title: ParameterNames.VARNISH_INJECTION_C_END_POSITION,
    value: Number(data.injection_c_end_position) ?? null,
    minValue: tresholdsData?.injection_c_end_position_min ?? null,
    maxValue: tresholdsData?.injection_c_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_C_END_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const injectionDEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INJECTION_D_END_POSITION,
    title: ParameterNames.VARNISH_INJECTION_D_END_POSITION,
    value: Number(data.injection_d_end_position) ?? null,
    minValue: tresholdsData?.injection_d_end_position_min ?? null,
    maxValue: tresholdsData?.injection_d_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_D_END_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeMoldingStartPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TUBE_MOLDING_START_POSITION,
    title: ParameterNames.VARNISH_TUBE_MOLDING_START_POSITION,
    value: Number(data.tube_molding_start_position) ?? null,
    minValue: tresholdsData?.tube_molding_start_position_min ?? null,
    maxValue: tresholdsData?.tube_molding_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_TUBE_MOLDING_START_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const tubeMoldingEndPositionCardProps: AddParameterCardProps = {
    id: VarnishInputParams.TUBE_MOLDING_END_POSITION,
    title: ParameterNames.VARNISH_TUBE_MOLDING_END_POSITION,
    value: Number(data.tube_molding_end_position) ?? null,
    minValue: tresholdsData?.tube_molding_end_position_min ?? null,
    maxValue: tresholdsData?.tube_molding_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_TUBE_MOLDING_END_POSITION,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const polimerizationFurnaceTempCardProps: AddParameterCardProps = {
    id: VarnishInputParams.POLIMERIZATION_FURNACE_TEMP,
    title: ParameterNames.VARNISH_POLIMERIZATION_FURNACE_TEMP,
    value: Number(data.polimerization_furnace_temp) ?? null,
    minValue: tresholdsData?.polimerization_furnace_temp_min ?? null,
    maxValue: tresholdsData?.polimerization_furnace_temp_max ?? null,
    unit: ParameterUnits.VARNISH_POLIMERIZATION_FURNACE_TEMP,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };
  const internalVarnishPorosityCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INTERNAL_VARNISH_POROSITY,
    title: ParameterNames.VARNISH_INTERNAL_VARNISH_POROSITY,
    value: Number(data.internal_varnish_porosity) ?? null,
    minValue: tresholdsData?.internal_varnish_porosity_min ?? null,
    maxValue: tresholdsData?.internal_varnish_porosity_max ?? null,
    unit: ParameterUnits.VARNISH_INTERNAL_VARNISH_POROSITY,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const internalSectionalViewCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INTERNAL_SECTIONAL_VIEW,
    title: ParameterNames.VARNISH_INTERNAL_SECTIONAL_VIEW,
    booleanValue: data.internal_sectional_view ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const aluminiumClearanceLackCardProps: AddParameterCardProps = {
    id: VarnishInputParams.ALUMINIUM_CLEARANCE_LACK,
    title: ParameterNames.VARNISH_ALUMINIUM_CLEARANCE_LACK,
    booleanValue: data.aluminium_clearance_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  const unpaintingLackCardProps: AddParameterCardProps = {
    id: VarnishInputParams.INTERNAL_SECTIONAL_VIEW,
    title: ParameterNames.VARNISH_INTERNAL_SECTIONAL_VIEW,
    booleanValue: data.internal_sectional_view ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };
  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...varnishMachineSpeedCardProps} />
        <AddParameterCard {...totalAirpressureCardProps} />
        <AddParameterCard {...feedCanAirpressureCardProps} />
        <AddParameterCard {...nozzleRegulatorAirpressureCardProps} />
        <AddParameterCard {...cellsSpeedCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...injectionAStartPositionCardProps} />
        <AddParameterCard {...injectionAEndPositionCardProps} />
        <AddParameterCard {...injectionBStartPositionCardProps} />
        <AddParameterCard {...injectionBEndPositionCardProps} />
        <AddParameterCard {...injectionCStartPositionCardProps} />
        <AddParameterCard {...injectionCEndPositionCardProps} />
        <AddParameterCard {...injectionDStartPositionCardProps} />
        <AddParameterCard {...injectionDEndPositionCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...tubeMoldingStartPositionCardProps} />
        <AddParameterCard {...tubeMoldingEndPositionCardProps} />
        <AddParameterCard {...polimerizationFurnaceTempCardProps} />
        <AddParameterCard {...internalVarnishPorosityCardProps} />
        <AddParameterCard {...internalSectionalViewCardProps} />
        <AddParameterCard {...aluminiumClearanceLackCardProps} />
        <AddParameterCard {...unpaintingLackCardProps} />
      </HStack>
    </VStack>
  );
}
