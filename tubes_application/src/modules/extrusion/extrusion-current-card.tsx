import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { useShallow } from "zustand/react/shallow";
import { AbsoluteCenter, Button, Card, HStack, Heading, Stat } from "@chakra-ui/react";
import { useExtrusionCurrentParams } from "./use-extrusion-current-params";
import { useExtrusionTresholds } from "./use-extrusion-tresholds";

export default function ExtrusionCurrentCard({
  summary_id,
  production_id,
}: {
  summary_id: number | undefined;
  production_id: number | undefined;
}) {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { data, isSuccess } = useExtrusionCurrentParams(summary_id ? summary_id : null);
  const { data: tresholdsData } = useExtrusionTresholds(production_id ? production_id : null);

  return (
    <Card.Root h="100%" variant="elevated" size="lg">
      <Card.Header>
        <HStack justify="space-between">
          <Heading size="3xl">Текущие параметры машины</Heading>
          <Button variant="outline" backgroundColor="brand_blue" size="xl" disabled={!employee}>
            Внести параметры
          </Button>
        </HStack>
      </Card.Header>
      <Card.Body justifyContent="end">
        {data && isSuccess ? (
          <HStack justify="start">
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px" backgroundColor="bg.success">
              <Stat.Label>Скорость пресса</Stat.Label>
              <Stat.ValueText>{data.press_speed ? data.press_speed : "-"}</Stat.ValueText>
              <Stat.ValueText>{tresholdsData ? tresholdsData.press_speed_min : "-"}</Stat.ValueText>
              <Stat.HelpText>шт/мин</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px" backgroundColor="bg.warning">
              <Stat.Label>Время выдува</Stat.Label>
              <Stat.ValueText>{data.blow_time ? data.blow_time : "-"}</Stat.ValueText>
              <Stat.HelpText>мс</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px" backgroundColor="bg.error">
              <Stat.Label>Скорость токарного автомата</Stat.Label>
              <Stat.ValueText>{data.turning_machine_speed ? data.turning_machine_speed : "-"}</Stat.ValueText>
              <Stat.HelpText>шт/мин</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px" backgroundColor="bg.success">
              <Stat.Label>Температура печи отжига</Stat.Label>
              <Stat.ValueText>{data.annealing_furnace_temp ? data.annealing_furnace_temp : "-"}</Stat.ValueText>
              <Stat.HelpText>C</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px" backgroundColor="bg.success">
              <Stat.Label>Тип рондоли</Stat.Label>
              <Stat.ValueText>{data.rondel_type ? data.rondel_type.value : "-"}</Stat.ValueText>
              <Stat.HelpText>мм</Stat.HelpText>
            </Stat.Root>
          </HStack>
        ) : (
          <AbsoluteCenter>....</AbsoluteCenter>
        )}
      </Card.Body>
    </Card.Root>
  );
}
