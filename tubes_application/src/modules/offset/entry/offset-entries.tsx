import type { ISummary } from "@/shared/api/services/summary-service";
import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { useShallow } from "zustand/shallow";
import type { AddParameterCardProps } from "../../../shared/components/cards/add-parameter-card";

import { VStack, HStack } from "@chakra-ui/react";
import AddParameterCard from "../../../shared/components/cards/add-parameter-card";
import { ParameterUnits } from "@/shared/helpers/parameter-units";
import { OffsetInputParams, useOffsetInputStore } from "../store/use-offset-input-store";
import useOffsetEntriesHandleCardsClick from "./use-offset-entries-handle-cards-click";

export default function OffsetEntries({ summaryData }: { summaryData: ISummary | null }) {
  const data = useOffsetInputStore(useShallow((state) => state.data));
  const { handleCardClick, handleBooleanCardClick } = useOffsetEntriesHandleCardsClick();

  const tresholdsData = summaryData?.offsetTresholds ?? null;
  const lastCounterValue = summaryData?.offsetParams ? summaryData.offsetParams.counter_value : null;

  const counterValueCardProps: AddParameterCardProps = {
    id: OffsetInputParams.COUNTER_VALUE,
    title: ParameterNames.COUNTER_VALUE,
    value: Number(data.counter_value) ?? null,
    minValue: lastCounterValue ?? CountersTresholds.COUNTERS_MIN_TRESHOLD,
    maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
    unit: ParameterUnits.COUNTER_VALUE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printingMachineSpeedCardProps: AddParameterCardProps = {
    id: OffsetInputParams.PRINTING_MACHINE_SPEED,
    title: ParameterNames.OFFSET_PRINTING_MACHINE_SPEED,
    value: Number(data.printing_machine_speed) ?? null,
    minValue: tresholdsData?.printing_machine_speed_min ?? null,
    maxValue: tresholdsData?.printing_machine_speed_max ?? null,
    unit: ParameterUnits.OFFSET_PRINTING_MACHINE_SPEED,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const totalAirpressureCardProps: AddParameterCardProps = {
    id: OffsetInputParams.TOTAL_AIR_PRESSURE,
    title: ParameterNames.OFFSET_TOTAL_AIR_PRESSURE,
    value: Number(data.total_air_pressure) ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.OFFSET_TOTAL_AIR_PRESSURE,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const paddingFurnaceTempCardProps: AddParameterCardProps = {
    id: OffsetInputParams.PADDING_FURNACE_TEMP,
    title: ParameterNames.OFFSET_PADDING_FURNACE_TEMP,
    value: Number(data.padding_furnace_temp) ?? null,
    minValue: tresholdsData?.padding_furnace_temp_min ?? null,
    maxValue: tresholdsData?.padding_furnace_temp_max ?? null,
    unit: ParameterUnits.OFFSET_PADDING_FURNACE_TEMP,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const offsetFurnaceTempCardProps: AddParameterCardProps = {
    id: OffsetInputParams.OFFSET_FURNACE_TEMP,
    title: ParameterNames.OFFSET_OFFSET_FURNACE_TEMP,
    value: Number(data.offset_furnace_temp) ?? null,
    minValue: tresholdsData?.offset_furnace_temp_min ?? null,
    maxValue: tresholdsData?.offset_furnace_temp_max ?? null,
    unit: ParameterUnits.OFFSET_OFFSET_FURNACE_TEMP,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printerMotorCardProps: AddParameterCardProps = {
    id: OffsetInputParams.PRINTER_MOTOR,
    title: ParameterNames.OFFSET_PRINTER_MOTOR,
    value: Number(data.printer_motor) ?? null,
    minValue: tresholdsData?.printer_motor_min ?? null,
    maxValue: tresholdsData?.printer_motor_max ?? null,
    unit: ParameterUnits.OFFSET_PRINTER_MOTOR,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const baseCoverHoldersMotorCardProps: AddParameterCardProps = {
    id: OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR,
    title: ParameterNames.OFFSET_BASE_COVERS_HOLDERS_MOTOR,
    value: Number(data.base_covers_holders_motor) ?? null,
    minValue: tresholdsData?.base_covers_holders_motor_min ?? null,
    maxValue: tresholdsData?.base_covers_holders_motor_max ?? null,
    unit: ParameterUnits.OFFSET_BASE_COVERS_HOLDERS_MOTOR,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const baseCoversStationMotorCardProps: AddParameterCardProps = {
    id: OffsetInputParams.BASE_COVERS_STATION_MOTOR,
    title: ParameterNames.OFFSET_BASE_COVERS_STATION_MOTOR,
    value: Number(data.base_covers_station_motor) ?? null,
    minValue: tresholdsData?.base_covers_station_motor_min ?? null,
    maxValue: tresholdsData?.base_covers_station_motor_max ?? null,
    unit: ParameterUnits.OFFSET_BASE_COVERS_STATION_MOTOR,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox1CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_1,
    value: Number(data.imprint_quantity_printed_box_1) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_1_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_1_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox2CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_2,
    value: Number(data.imprint_quantity_printed_box_2) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_2_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_2_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox3CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_3,
    value: Number(data.imprint_quantity_printed_box_3) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_3_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_3_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox4CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_4,
    value: Number(data.imprint_quantity_printed_box_4) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_4_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_4_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox5CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_5,
    value: Number(data.imprint_quantity_printed_box_5) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_5_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_5_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const printedBox6CardProps: AddParameterCardProps = {
    id: OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6,
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_6,
    value: Number(data.imprint_quantity_printed_box_6) ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_6_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_6_max ?? null,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const inkSupplyTimeCardProps: AddParameterCardProps = {
    id: OffsetInputParams.INK_SUPPLY_TIME,
    title: ParameterNames.OFFSET_INK_SUPPLY_TIME,
    value: Number(data.ink_supply_time ?? null),
    minValue: tresholdsData?.ink_supply_time_min ?? null,
    maxValue: tresholdsData?.ink_supply_time_max ?? null,
    unit: ParameterUnits.OFFSET_INK_SUPPLY_TIME,
    onClick: (val) => handleCardClick(val),
    variant: "numeric",
  };

  const designMatchCardProps: AddParameterCardProps = {
    id: OffsetInputParams.DESIGN_MATCH,
    title: ParameterNames.OFFSET_DESIGN_MATCH,
    booleanValue: data.design_match ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const tubeAppearanceCardProps: AddParameterCardProps = {
    id: OffsetInputParams.TUBE_APPEARANCE,
    title: ParameterNames.OFFSET_TUBE_APPEARANCE,
    booleanValue: data.tube_apperarance ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const tubeEdgeDeformationLackCardProps: AddParameterCardProps = {
    id: OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK,
    title: ParameterNames.OFFSET_TUBE_EDGE_DEFORMATION_LACK,
    booleanValue: data.tube_edge_deformation_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const aluminiumClearanceCardProps: AddParameterCardProps = {
    id: OffsetInputParams.ALUMINIUM_CLEARANCE_LACK,
    title: ParameterNames.OFFSET_ALUMINIUM_CLEARANCE_LACK,
    booleanValue: data.aluminium_clearance_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  const dripsLackCardProps: AddParameterCardProps = {
    id: OffsetInputParams.DRIPS_LACK,
    title: ParameterNames.OFFSET_DRIPS_LACK,
    booleanValue: data.drips_lack ?? null,
    onClick: (val) => handleBooleanCardClick(val),
    variant: "boolean",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...counterValueCardProps} />
        <AddParameterCard {...printingMachineSpeedCardProps} />
        <AddParameterCard {...totalAirpressureCardProps} />
        <AddParameterCard {...paddingFurnaceTempCardProps} />
        <AddParameterCard {...offsetFurnaceTempCardProps} />
        <AddParameterCard {...printerMotorCardProps} />
        <AddParameterCard {...baseCoverHoldersMotorCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...printedBox1CardProps} />
        <AddParameterCard {...printedBox2CardProps} />
        <AddParameterCard {...printedBox3CardProps} />
        <AddParameterCard {...printedBox4CardProps} />
        <AddParameterCard {...printedBox5CardProps} />
        <AddParameterCard {...printedBox6CardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <AddParameterCard {...baseCoversStationMotorCardProps} />
        <AddParameterCard {...inkSupplyTimeCardProps} />
        <AddParameterCard {...designMatchCardProps} />
        <AddParameterCard {...tubeAppearanceCardProps} />
        <AddParameterCard {...tubeEdgeDeformationLackCardProps} />
        <AddParameterCard {...aluminiumClearanceCardProps} />
        <AddParameterCard {...dripsLackCardProps} />
      </HStack>
    </VStack>
  );
}
