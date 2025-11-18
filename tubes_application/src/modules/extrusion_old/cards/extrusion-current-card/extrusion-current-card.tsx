import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useShallow } from "zustand/react/shallow";
import { AbsoluteCenter, Button, Card, HStack, Heading, IconButton, Stat } from "@chakra-ui/react";
import { useExtrusionHardwareCurrentParams } from "../../hooks/use-extrusion-hardware-current-params";
import { useExtrusionHardwareTresholds } from "../../hooks/use-extrusion-hardware-tresholds";
import { useColorModeValue } from "@/components/ui/color-mode";
import ParameterColorStatus from "@/shared/components/parameter-color-status";
import { useExtrusionInputParametersModalStore } from "../../store/use-extrusion-input-parameters-modal-store";

import { useExtrusionHardwareParamsTableModalStore } from "../../store/use-extrusion-hardware-params-table-modal-store";
import InputTimer from "../../../../shared/components/input-timer";
import { CheckIntervals } from "@/shared/helpers/check-intervals";
import { TbSearch } from "react-icons/tb";

export default function ExtrusionCurrentCard({
  summary_id,
  production_id,
}: {
  summary_id: number | undefined;
  production_id: number | undefined;
}) {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { data, isSuccess } = useExtrusionHardwareCurrentParams(summary_id ?? null);
  const { data: tresholdsData } = useExtrusionHardwareTresholds(production_id ?? null);
  const setOpenParamsInput = useExtrusionInputParametersModalStore(useShallow((state) => state.setOpen));
  const setOpenParamsTable = useExtrusionHardwareParamsTableModalStore(useShallow((state) => state.setOpen));
  const isDarkTheme = useColorModeValue(false, true);

  return (
    <Card.Root h="100%" variant="elevated" size="lg">
      <Card.Header>
        <HStack justify="space-between">
          <Heading size="3xl">Текущие параметры машины</Heading>
          <InputTimer date={data?.createdAt} isParameters={true} checkInterval={CheckIntervals.HARDWARE} />
          <HStack>
            <IconButton
              variant="outline"
              size="xl"
              rounded="md"
              backgroundColor="brand_blue"
              p={2}
              w="80px"
              onClick={(e) => {
                e.currentTarget.blur();
                setOpenParamsTable(true);
              }}
            >
              <TbSearch />
            </IconButton>
            <Button
              variant="outline"
              backgroundColor="brand_blue"
              size="xl"
              disabled={!employee}
              onClick={(e) => {
                e.currentTarget.blur();
                setOpenParamsInput(true);
              }}
            >
              Внести параметры
            </Button>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body justifyContent="end">
        {data && isSuccess ? (
          <HStack justify="start">
            <Stat.Root
              borderWidth="1px"
              p="4"
              rounded="md"
              maxW="240px"
              maxH="120px"
              backgroundColor={
                data.press_speed
                  ? tresholdsData &&
                    data &&
                    tresholdsData?.press_speed_min <= data.press_speed &&
                    data.press_speed <= tresholdsData?.press_speed_max
                    ? "bg.success"
                    : "bg.error"
                  : "bg.warning"
              }
            >
              <Stat.Label>Скорость пресса</Stat.Label>
              <Stat.ValueText>{data.press_speed ? data.press_speed : "-"}</Stat.ValueText>
              <HStack width="100%" justify="space-between">
                <Stat.HelpText>шт/мин</Stat.HelpText>
                {isDarkTheme && (
                  <ParameterColorStatus
                    palette={
                      data.press_speed
                        ? tresholdsData &&
                          data &&
                          tresholdsData?.press_speed_min <= data.press_speed &&
                          data.press_speed <= tresholdsData?.press_speed_max
                          ? "green"
                          : "red"
                        : "yellow"
                    }
                  />
                )}
              </HStack>
            </Stat.Root>
            <Stat.Root
              borderWidth="1px"
              p="4"
              rounded="md"
              maxW="240px"
              maxH="120px"
              backgroundColor={
                data.blow_time
                  ? tresholdsData &&
                    data &&
                    tresholdsData?.blow_time_min <= data.blow_time &&
                    data.blow_time <= tresholdsData?.blow_time_max
                    ? "bg.success"
                    : "bg.error"
                  : "bg.warning"
              }
            >
              <Stat.Label>Время выдува</Stat.Label>
              <Stat.ValueText>{data.blow_time ? data.blow_time : "-"}</Stat.ValueText>
              <HStack width="100%" justify="space-between">
                <Stat.HelpText>мс</Stat.HelpText>
                {isDarkTheme && (
                  <ParameterColorStatus
                    palette={
                      data.blow_time
                        ? tresholdsData &&
                          data &&
                          tresholdsData?.blow_time_min <= data.blow_time &&
                          data.blow_time <= tresholdsData?.blow_time_max
                          ? "green"
                          : "red"
                        : "yellow"
                    }
                  />
                )}
              </HStack>
            </Stat.Root>
            <Stat.Root
              borderWidth="1px"
              p="4"
              rounded="md"
              maxW="240px"
              maxH="120px"
              backgroundColor={
                data.turning_machine_speed
                  ? tresholdsData &&
                    data &&
                    tresholdsData?.turning_machine_speed_min <= data.turning_machine_speed &&
                    data.turning_machine_speed <= tresholdsData?.turning_machine_speed_max
                    ? "bg.success"
                    : "bg.error"
                  : "bg.warning"
              }
            >
              <Stat.Label>Скорость токарного автомата</Stat.Label>
              <Stat.ValueText>{data.turning_machine_speed ? data.turning_machine_speed : "-"}</Stat.ValueText>
              <HStack width="100%" justify="space-between">
                <Stat.HelpText>шт/мин</Stat.HelpText>
                {isDarkTheme && (
                  <ParameterColorStatus
                    palette={
                      data.turning_machine_speed
                        ? tresholdsData &&
                          data &&
                          tresholdsData?.turning_machine_speed_min <= data.turning_machine_speed &&
                          data.turning_machine_speed <= tresholdsData?.turning_machine_speed_max
                          ? "green"
                          : "red"
                        : "yellow"
                    }
                  />
                )}
              </HStack>
            </Stat.Root>
            <Stat.Root
              borderWidth="1px"
              p="4"
              rounded="md"
              maxW="240px"
              maxH="120px"
              backgroundColor={
                data.annealing_furnace_temp
                  ? tresholdsData &&
                    data &&
                    tresholdsData?.annealing_furnace_temp_min <= data.annealing_furnace_temp &&
                    data.annealing_furnace_temp <= tresholdsData?.annealing_furnace_temp_max
                    ? "bg.success"
                    : "bg.error"
                  : "bg.warning"
              }
            >
              <Stat.Label>Температура печи отжига</Stat.Label>
              <Stat.ValueText>{data.annealing_furnace_temp ? data.annealing_furnace_temp : "-"}</Stat.ValueText>
              <HStack width="100%" justify="space-between">
                <Stat.HelpText>C</Stat.HelpText>
                {isDarkTheme && (
                  <ParameterColorStatus
                    palette={
                      data.annealing_furnace_temp
                        ? tresholdsData &&
                          data &&
                          tresholdsData?.annealing_furnace_temp_min <= data.annealing_furnace_temp &&
                          data.annealing_furnace_temp <= tresholdsData?.annealing_furnace_temp_max
                          ? "green"
                          : "red"
                        : "yellow"
                    }
                  />
                )}
              </HStack>
            </Stat.Root>
            <Stat.Root
              borderWidth="1px"
              p="4"
              rounded="md"
              maxW="240px"
              maxH="120px"
              backgroundColor={
                data.rondel_type
                  ? tresholdsData && data && tresholdsData?.rondel_type_id === data.rondel_type_id
                    ? "bg.success"
                    : "bg.error"
                  : "bg.warning"
              }
            >
              <Stat.Label>Тип рондоли</Stat.Label>
              <Stat.ValueText>{data.rondel_type ? data.rondel_type.value : "-"}</Stat.ValueText>
              <HStack width="100%" justify="space-between">
                <Stat.HelpText>мм</Stat.HelpText>
                {isDarkTheme && (
                  <ParameterColorStatus
                    palette={
                      data.rondel_type
                        ? tresholdsData && data && tresholdsData?.rondel_type_id === data.rondel_type_id
                          ? "green"
                          : "red"
                        : "yellow"
                    }
                  />
                )}
              </HStack>
            </Stat.Root>
          </HStack>
        ) : (
          <AbsoluteCenter>....</AbsoluteCenter>
        )}
      </Card.Body>
    </Card.Root>
  );
}
