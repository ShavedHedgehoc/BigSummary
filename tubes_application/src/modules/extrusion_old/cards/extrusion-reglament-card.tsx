import { Heading, Card, Stat, HStack, AbsoluteCenter } from "@chakra-ui/react";
import { useExtrusionHardwareTresholds } from "../hooks/use-extrusion-hardware-tresholds";

export default function ExtrusionReglamentCard({ production_id }: { production_id: number | undefined }) {
  const { data, isSuccess } = useExtrusionHardwareTresholds(production_id ? production_id : null);

  return (
    <Card.Root h="100%" variant="elevated" size="lg">
      <Card.Header>
        <Heading size="3xl">Регламентные параметры машины</Heading>
      </Card.Header>

      <Card.Body justifyContent="end">
        {data && isSuccess ? (
          <HStack justify="start">
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px">
              <Stat.Label>Скорость пресса</Stat.Label>
              <Stat.ValueText>{`${data.press_speed_min}-${data.press_speed_max}`}</Stat.ValueText>
              <Stat.HelpText>шт/мин</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px">
              <Stat.Label>Время выдува</Stat.Label>
              <Stat.ValueText>{`${data.blow_time_min}-${data.blow_time_max}`}</Stat.ValueText>
              <Stat.HelpText>мс</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px">
              <Stat.Label>Скорость токарного автомата</Stat.Label>
              <Stat.ValueText>{`${data.turning_machine_speed_min}-${data.turning_machine_speed_max}`}</Stat.ValueText>
              <Stat.HelpText>шт/мин</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px">
              <Stat.Label>Температура печи отжига</Stat.Label>
              <Stat.ValueText>{`${data.annealing_furnace_temp_min}-${data.annealing_furnace_temp_max}`}</Stat.ValueText>
              <Stat.HelpText>C</Stat.HelpText>
            </Stat.Root>
            <Stat.Root borderWidth="1px" p="4" rounded="md" maxW="240px" maxH="120px">
              <Stat.Label>Тип рондоли</Stat.Label>
              <Stat.ValueText>{data.rondel_type.value}</Stat.ValueText>
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
