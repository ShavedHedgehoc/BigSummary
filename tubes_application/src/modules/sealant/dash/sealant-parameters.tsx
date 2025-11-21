import type { ISummary } from "@/shared/api/services/summary-service";
import { VStack, HStack } from "@chakra-ui/react";
import ParameterCard, { type ParameterCardProps } from "../../../shared/components/cards/parameter-card";
import { ParameterNames } from "@/shared/helpers/parameter-names";
import { ParameterUnits } from "@/shared/helpers/parameter-units";

export default function SealantParameters({ summaryData }: { summaryData: ISummary | null }) {
  const paramsData = summaryData?.sealantParams ?? null;
  const tresholdsData = summaryData?.sealantTresholds ?? null;

  const capMachineSpeedCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_CAP_MACHINE_SPEED,
    value: paramsData?.cap_machine_speed ?? null,
    minValue: tresholdsData?.cap_machine_speed_min ?? null,
    maxValue: tresholdsData?.cap_machine_speed_max ?? null,
    unit: ParameterUnits.SEALANT_CAP_MACHINE_SPEED,
    variant: "numeric",
  };
  const totalAirPressureCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_TOTAL_AIR_PRESSURE,
    value: paramsData?.total_air_pressure ?? null,
    minValue: tresholdsData?.total_air_pressure_min ?? null,
    maxValue: tresholdsData?.total_air_pressure_max ?? null,
    unit: ParameterUnits.SEALANT_TOTAL_AIR_PRESSURE,
    variant: "numeric",
  };
  const holdersForwardCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_HOLDERS_FORWARD,
    value: paramsData?.holders_forward ?? null,
    minValue: tresholdsData?.holders_forward_min ?? null,
    maxValue: tresholdsData?.holders_forward_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_FORWARD,
    variant: "numeric",
  };
  const holdersOpeningLeftCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_HOLDERS_OPENING_LEFT,
    value: paramsData?.holders_opening_left ?? null,
    minValue: tresholdsData?.holders_opening_left_min ?? null,
    maxValue: tresholdsData?.holders_opening_left_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_OPENING_LEFT,
    variant: "numeric",
  };
  const holdersOpeningRightCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_HOLDERS_OPENING_RIGHT,
    value: paramsData?.holders_opening_right ?? null,
    minValue: tresholdsData?.holders_opening_right_min ?? null,
    maxValue: tresholdsData?.holders_opening_right_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDERS_OPENING_RIGHT,
    variant: "numeric",
  };
  const holdersClosingCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_HOLDER_CLOSING,
    value: paramsData?.holders_closing ?? null,
    minValue: tresholdsData?.holders_closing_min ?? null,
    maxValue: tresholdsData?.holders_closing_max ?? null,
    unit: ParameterUnits.SEALANT_HOLDER_CLOSING,
    variant: "numeric",
  };

  const injectionAStartCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_A_START,
    value: paramsData?.injection_a_start ?? null,
    minValue: tresholdsData?.injection_a_start_min ?? null,
    maxValue: tresholdsData?.injection_a_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_A_START,
    variant: "numeric",
  };
  const injectionBStartCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_B_START,
    value: paramsData?.injection_b_start ?? null,
    minValue: tresholdsData?.injection_b_start_min ?? null,
    maxValue: tresholdsData?.injection_b_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_B_START,
    variant: "numeric",
  };
  const injectionAEndCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_A_END,
    value: paramsData?.injection_a_end ?? null,
    minValue: tresholdsData?.injection_a_end_min ?? null,
    maxValue: tresholdsData?.injection_a_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_A_END,
    variant: "numeric",
  };
  const injectionBEndCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_B_END,
    value: paramsData?.injection_b_end ?? null,
    minValue: tresholdsData?.injection_b_end_min ?? null,
    maxValue: tresholdsData?.injection_b_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_B_END,
    variant: "numeric",
  };
  const injectionTubeOrientationStartCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_START,
    value: paramsData?.injection_tube_orientation_start ?? null,
    minValue: tresholdsData?.injection_tube_orientation_start_min ?? null,
    maxValue: tresholdsData?.injection_tube_orientation_start_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_TUBE_ORIENTATION_START,
    variant: "numeric",
  };
  const injectionTubeOrientationEndCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_INJECTION_TUBE_ORIENTATION_END,
    value: paramsData?.injection_tube_orientation_end ?? null,
    minValue: tresholdsData?.injection_tube_orientation_end_min ?? null,
    maxValue: tresholdsData?.injection_tube_orientation_end_max ?? null,
    // unit: ParameterUnits.SEALANT_INJECTION_TUBE_ORIENTATION_END,
    variant: "numeric",
  };
  const isCapSurfaceSmoothCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_IS_CAP_SURFACE_SMOOTH,
    booleanValue: paramsData?.is_cap_surface_smooth ?? null,
    variant: "boolean",
  };
  const latexRingPaddingCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_LATEX_RING_PADDING,
    value: paramsData?.latex_ring_padding ?? null,
    minValue: tresholdsData?.latex_ring_padding_min ?? null,
    maxValue: tresholdsData?.latex_ring_padding_max ?? null,
    unit: ParameterUnits.SEALANT_LATEX_RING_PADDING,
    variant: "numeric",
  };
  const latexRingWidthCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_LATEX_RING_WIDTH,
    value: paramsData?.latex_ring_width ?? null,
    minValue: tresholdsData?.latex_ring_width_min ?? null,
    maxValue: tresholdsData?.latex_ring_width_max ?? null,
    unit: ParameterUnits.SEALANT_LATEX_RING_WIDTH,
    variant: "numeric",
  };
  const tubeRigidityCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_TUBE_RIGIDITY,
    value: paramsData?.tube_rigidity ?? null,
    minValue: tresholdsData?.tube_rigidity_min ?? null,
    maxValue: tresholdsData?.tube_rigidity_max ?? null,
    unit: ParameterUnits.SEALANT_TUBE_RIGIDITY,
    variant: "numeric",
  };
  const capUnscrewingTorqueCardProps: ParameterCardProps = {
    title: ParameterNames.SEALANT_CAP_UNSCREWING_TORQUE,
    value: paramsData?.cap_unscrewing_torque ?? null,
    minValue: tresholdsData?.cap_unscrewing_torque_min ?? null,
    maxValue: tresholdsData?.cap_unscrewing_torque_max ?? null,
    unit: ParameterUnits.SEALANT_CAP_UNSCREWING_TORQUE,
    variant: "numeric",
  };

  return (
    <VStack gap={2} h="full" w="full">
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...capMachineSpeedCardProps} />
        <ParameterCard {...totalAirPressureCardProps} />
        <ParameterCard {...holdersForwardCardProps} />
        <ParameterCard {...holdersOpeningLeftCardProps} />
        <ParameterCard {...holdersOpeningRightCardProps} />
        <ParameterCard {...holdersClosingCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...injectionAStartCardProps} />
        <ParameterCard {...injectionBStartCardProps} />
        <ParameterCard {...injectionAEndCardProps} />
        <ParameterCard {...injectionBEndCardProps} />
        <ParameterCard {...injectionTubeOrientationStartCardProps} />
        <ParameterCard {...injectionTubeOrientationEndCardProps} />
      </HStack>
      <HStack gap={2} h="full" w="full">
        <ParameterCard {...isCapSurfaceSmoothCardProps} />
        <ParameterCard {...latexRingPaddingCardProps} />
        <ParameterCard {...latexRingWidthCardProps} />
        <ParameterCard {...tubeRigidityCardProps} />
        <ParameterCard {...capUnscrewingTorqueCardProps} />
      </HStack>
    </VStack>
  );
}
