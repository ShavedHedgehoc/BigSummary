import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, { type ParameterCardProps } from "../../../shared/components/cards/parameter-card";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { ParameterUnits } from "@/shared/helpers/parameter-units";

export default function OffsetParameters({ summaryData }: { summaryData: ISummary | null }) {
  const paramsData = summaryData?.offsetParams ?? null;
  const tresholdsData = summaryData?.offsetTresholds ?? null;

  const printingMachineSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_PRINTING_MACHINE_SPEED,
    value: paramsData?.printing_machine_speed ?? null,
    minValue: tresholdsData?.printing_machine_speed_min ?? null,
    maxValue: tresholdsData?.printing_machine_speed_max ?? null,
    unit: ParameterUnits.OFFSET_PRINTING_MACHINE_SPEED,
    variant: "numeric",
  };
  const totalAirpressureCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_TOTAL_AIR_PRESSURE,
    value: paramsData?.total_air_pressure ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.OFFSET_TOTAL_AIR_PRESSURE,
    variant: "numeric",
  };
  const paddingFurnaceTempCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_PADDING_FURNACE_TEMP,
    value: paramsData?.padding_furnace_temp ?? null,
    minValue: tresholdsData?.padding_furnace_temp_min ?? null,
    maxValue: tresholdsData?.padding_furnace_temp_max ?? null,
    unit: ParameterUnits.OFFSET_PADDING_FURNACE_TEMP,
    variant: "numeric",
  };
  const offsetFurnaceTempCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_OFFSET_FURNACE_TEMP,
    value: paramsData?.offset_furnace_temp ?? null,
    minValue: tresholdsData?.offset_furnace_temp_min ?? null,
    maxValue: tresholdsData?.offset_furnace_temp_max ?? null,
    unit: ParameterUnits.OFFSET_OFFSET_FURNACE_TEMP,
    variant: "numeric",
  };
  const printerMotorCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_PRINTER_MOTOR,
    value: paramsData?.printer_motor ?? null,
    minValue: tresholdsData?.printer_motor_min ?? null,
    maxValue: tresholdsData?.printer_motor_max ?? null,
    unit: ParameterUnits.OFFSET_PRINTER_MOTOR,
    variant: "numeric",
  };
  const baseCoverHoldersMotorCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_BASE_COVERS_HOLDERS_MOTOR,
    value: paramsData?.base_covers_holders_motor ?? null,
    minValue: tresholdsData?.base_covers_holders_motor_min ?? null,
    maxValue: tresholdsData?.base_covers_holders_motor_max ?? null,
    unit: ParameterUnits.OFFSET_BASE_COVERS_HOLDERS_MOTOR,
    variant: "numeric",
  };
  const baseCoversStationMotorCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_BASE_COVERS_STATION_MOTOR,
    value: paramsData?.base_covers_station_motor ?? null,
    minValue: tresholdsData?.base_covers_station_motor_min ?? null,
    maxValue: tresholdsData?.base_covers_station_motor_max ?? null,
    unit: ParameterUnits.OFFSET_BASE_COVERS_STATION_MOTOR,
    variant: "numeric",
  };
  const printedBox1CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_1,
    value: paramsData?.imprint_quantity_printed_box_1 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_1_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_1_max ?? null,

    variant: "numeric",
  };
  const printedBox2CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_2,
    value: paramsData?.imprint_quantity_printed_box_2 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_2_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_2_max ?? null,

    variant: "numeric",
  };
  const printedBox3CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_3,
    value: paramsData?.imprint_quantity_printed_box_3 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_3_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_3_max ?? null,
    variant: "numeric",
  };
  const printedBox4CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_4,
    value: paramsData?.imprint_quantity_printed_box_4 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_4_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_4_max ?? null,
    variant: "numeric",
  };
  const printedBox5CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_5,
    value: paramsData?.imprint_quantity_printed_box_5 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_5_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_5_max ?? null,
    variant: "numeric",
  };
  const printedBox6CardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_IMPRINT_QUANTITY_PRINTED_BOX_6,
    value: paramsData?.imprint_quantity_printed_box_6 ?? null,
    minValue: tresholdsData?.imprint_quantity_printed_box_6_min ?? null,
    maxValue: tresholdsData?.imprint_quantity_printed_box_6_max ?? null,
    variant: "numeric",
  };

  const inkSupplyTimeCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_INK_SUPPLY_TIME,
    value: paramsData?.ink_supply_time ?? null,
    minValue: tresholdsData?.ink_supply_time_min ?? null,
    maxValue: tresholdsData?.ink_supply_time_max ?? null,
    unit: ParameterUnits.OFFSET_INK_SUPPLY_TIME,
    variant: "numeric",
  };
  const designMatchCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_DESIGN_MATCH,
    booleanValue: paramsData?.design_match ?? null,
    variant: "boolean",
  };
  const tubeAppearanceCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_TUBE_APPEARANCE,
    booleanValue: paramsData?.tube_apperarance ?? null,
    variant: "boolean",
  };
  const tubeEdgeDeformationLackCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_TUBE_EDGE_DEFORMATION_LACK,
    booleanValue: paramsData?.tube_edge_deformation_lack ?? null,
    variant: "boolean",
  };
  const aluminiumClearanceCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_ALUMINIUM_CLEARANCE_LACK,
    booleanValue: paramsData?.aluminium_clearance_lack ?? null,
    variant: "boolean",
  };
  const dripsLackCardProps: ParameterCardProps = {
    title: ParameterNames.OFFSET_DRIPS_LACK,
    booleanValue: paramsData?.drips_lack ?? null,
    variant: "boolean",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...printingMachineSpeedCardProps} />
        <ParameterCard {...totalAirpressureCardProps} />
        <ParameterCard {...paddingFurnaceTempCardProps} />
        <ParameterCard {...offsetFurnaceTempCardProps} />
        <ParameterCard {...printerMotorCardProps} />
        <ParameterCard {...baseCoverHoldersMotorCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...printedBox1CardProps} />
        <ParameterCard {...printedBox2CardProps} />
        <ParameterCard {...printedBox3CardProps} />
        <ParameterCard {...printedBox4CardProps} />
        <ParameterCard {...printedBox5CardProps} />
        <ParameterCard {...printedBox6CardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...baseCoversStationMotorCardProps} />
        <ParameterCard {...inkSupplyTimeCardProps} />
        <ParameterCard {...designMatchCardProps} />
        <ParameterCard {...tubeAppearanceCardProps} />
        <ParameterCard {...tubeEdgeDeformationLackCardProps} />
        <ParameterCard {...aluminiumClearanceCardProps} />
        <ParameterCard {...dripsLackCardProps} />
      </HStack>
    </VStack>
  );
}
