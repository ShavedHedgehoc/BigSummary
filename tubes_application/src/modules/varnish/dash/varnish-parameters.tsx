import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, { type ParameterCardProps } from "../../../shared/components/cards/parameter-card";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { ParameterUnits } from "@/shared/helpers/parameter-units";

export default function VarnishParameters({ summaryData }: { summaryData: ISummary | null }) {
  const paramsData = summaryData?.varnishParams ?? null;
  const tresholdsData = summaryData?.varnishTresholds ?? null;

  const varnishMachineSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_VARNISH_MACHINE_SPEED,
    value: paramsData?.varnish_machine_speed ?? null,
    minValue: tresholdsData?.varnish_machine_speed_min ?? null,
    maxValue: tresholdsData?.varnish_machine_speed_max ?? null,
    unit: ParameterUnits.VARNISH_VARNISH_MACHINE_SPEED,
    variant: "numeric",
  };
  const totalAirPressureCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_TOTAL_AIR_PRESSURE,
    value: paramsData?.total_air_pressure ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_TOTAL_AIR_PRESSURE,
    variant: "numeric",
  };
  const feedCanAirPressureCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_FEED_CAN_AIR_PRESSURE,
    value: paramsData?.feed_can_air_pressure ?? null,
    minValue: tresholdsData?.feed_can_air_pressure_min ?? null,
    maxValue: tresholdsData?.feed_can_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_FEED_CAN_AIR_PRESSURE,
    variant: "numeric",
  };
  const nozzleRegulatorAirPressureCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_NOZZLE_REGULATOR_AIR_PRESSURE,
    value: paramsData?.nozzle_regulator_air_pressure ?? null,
    minValue: tresholdsData?.nozzle_regulator_air_pressure_min ?? null,
    maxValue: tresholdsData?.nozzle_regulator_air_pressure_max ?? null,
    unit: ParameterUnits.VARNISH_NOZZLE_REGULATOR_AIR_PRESSURE,
    variant: "numeric",
  };
  const cellsSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_CELLS_SPEED,
    value: paramsData?.cells_speed ?? null,
    minValue: tresholdsData?.cells_speed_min ?? null,
    maxValue: tresholdsData?.cells_speed_max ?? null,
    unit: ParameterUnits.VARNISH_CELLS_SPEED,
    variant: "numeric",
  };
  const injectionAStartPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_A_START_POSITION,
    value: paramsData?.injection_a_start_position ?? null,
    minValue: tresholdsData?.injection_a_start_position_min ?? null,
    maxValue: tresholdsData?.injection_a_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_A_START_POSITION,
    variant: "numeric",
  };
  const injectionBStartPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_B_START_POSITION,
    value: paramsData?.injection_b_start_position ?? null,
    minValue: tresholdsData?.injection_b_start_position_min ?? null,
    maxValue: tresholdsData?.injection_b_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_B_START_POSITION,
    variant: "numeric",
  };
  const injectionCStartPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_C_START_POSITION,
    value: paramsData?.injection_c_start_position ?? null,
    minValue: tresholdsData?.injection_c_start_position_min ?? null,
    maxValue: tresholdsData?.injection_c_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_C_START_POSITION,
    variant: "numeric",
  };

  const injectionDStartPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_D_START_POSITION,
    value: paramsData?.injection_d_start_position ?? null,
    minValue: tresholdsData?.injection_d_start_position_min ?? null,
    maxValue: tresholdsData?.injection_d_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_D_START_POSITION,
    variant: "numeric",
  };
  const injectionAEndPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_A_END_POSITION,
    value: paramsData?.injection_a_end_position ?? null,
    minValue: tresholdsData?.injection_a_end_position_min ?? null,
    maxValue: tresholdsData?.injection_a_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_A_END_POSITION,
    variant: "numeric",
  };
  const injectionBEndPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_B_END_POSITION,
    value: paramsData?.injection_b_end_position ?? null,
    minValue: tresholdsData?.injection_b_end_position_min ?? null,
    maxValue: tresholdsData?.injection_b_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_B_END_POSITION,
    variant: "numeric",
  };
  const injectionCEndPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_C_END_POSITION,
    value: paramsData?.injection_c_end_position ?? null,
    minValue: tresholdsData?.injection_c_end_position_min ?? null,
    maxValue: tresholdsData?.injection_c_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_C_END_POSITION,
    variant: "numeric",
  };

  const injectionDEndPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INJECTION_D_END_POSITION,
    value: paramsData?.injection_d_end_position ?? null,
    minValue: tresholdsData?.injection_d_end_position_min ?? null,
    maxValue: tresholdsData?.injection_d_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_INJECTION_D_END_POSITION,
    variant: "numeric",
  };
  const tubeMoldingStartPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_TUBE_MOLDING_START_POSITION,
    value: paramsData?.tube_molding_start_position ?? null,
    minValue: tresholdsData?.tube_molding_start_position_min ?? null,
    maxValue: tresholdsData?.tube_molding_start_position_max ?? null,
    unit: ParameterUnits.VARNISH_TUBE_MOLDING_START_POSITION,
    variant: "numeric",
  };
  const tubeMoldingEndPositionCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_TUBE_MOLDING_END_POSITION,
    value: paramsData?.tube_molding_end_position ?? null,
    minValue: tresholdsData?.tube_molding_end_position_min ?? null,
    maxValue: tresholdsData?.tube_molding_end_position_max ?? null,
    unit: ParameterUnits.VARNISH_TUBE_MOLDING_END_POSITION,
    variant: "numeric",
  };
  const polimerizationFurnaceTempCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_POLIMERIZATION_FURNACE_TEMP,
    value: paramsData?.polimerization_furnace_temp ?? null,
    minValue: tresholdsData?.polimerization_furnace_temp_min ?? null,
    maxValue: tresholdsData?.polimerization_furnace_temp_max ?? null,
    unit: ParameterUnits.VARNISH_POLIMERIZATION_FURNACE_TEMP,
    variant: "numeric",
  };
  const internalVarnishPorosityCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INTERNAL_VARNISH_POROSITY,
    value: paramsData?.internal_varnish_porosity ?? null,
    minValue: tresholdsData?.internal_varnish_porosity_min ?? null,
    maxValue: tresholdsData?.internal_varnish_porosity_max ?? null,
    unit: ParameterUnits.VARNISH_INTERNAL_VARNISH_POROSITY,
    variant: "numeric",
  };

  const internalSectionalViewCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_INTERNAL_SECTIONAL_VIEW,
    booleanValue: paramsData?.internal_sectional_view ?? null,
    variant: "boolean",
  };
  const aluminiumClearanceLackCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_ALUMINIUM_CLEARANCE_LACK,
    booleanValue: paramsData?.aluminium_clearance_lack ?? null,
    variant: "boolean",
  };
  const unpaintingLackCardProps: ParameterCardProps = {
    title: ParameterNames.VARNISH_UNPAINTING_LACK,
    booleanValue: paramsData?.unpainting_lack ?? null,
    variant: "boolean",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...varnishMachineSpeedCardProps} />
        <ParameterCard {...totalAirPressureCardProps} />
        <ParameterCard {...feedCanAirPressureCardProps} />
        <ParameterCard {...nozzleRegulatorAirPressureCardProps} />
        <ParameterCard {...cellsSpeedCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...injectionAStartPositionCardProps} />
        <ParameterCard {...injectionBStartPositionCardProps} />
        <ParameterCard {...injectionCStartPositionCardProps} />
        <ParameterCard {...injectionDStartPositionCardProps} />
        <ParameterCard {...injectionAEndPositionCardProps} />
        <ParameterCard {...injectionBEndPositionCardProps} />
        <ParameterCard {...injectionCEndPositionCardProps} />
        <ParameterCard {...injectionDEndPositionCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...tubeMoldingStartPositionCardProps} />
        <ParameterCard {...tubeMoldingEndPositionCardProps} />
        <ParameterCard {...polimerizationFurnaceTempCardProps} />
        <ParameterCard {...internalVarnishPorosityCardProps} />
        <ParameterCard {...internalSectionalViewCardProps} />
        <ParameterCard {...aluminiumClearanceLackCardProps} />
        <ParameterCard {...unpaintingLackCardProps} />
      </HStack>
    </VStack>
  );
}
