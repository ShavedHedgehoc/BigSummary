import { AbsoluteCenter, Card, Stack, Text } from "@chakra-ui/react";
import { useActiveSummary } from "../hooks/use-active-summary";
import { useExtrusionConveyorStore } from "../store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";

export default function ExtrusionProductCard() {
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const { data, isPending, isSuccess } = useActiveSummary(extrusionConveyor ? extrusionConveyor.id : null);

  if (isPending) return <></>;

  return (
    <Card.Root h="100%" variant="elevated" backgroundColor="bg.success">
      <Card.Body>
        {data && isSuccess ? (
          <Stack h="100%" justify="center" gap={4}>
            <Text textStyle="2xl" fontWeight="semibold">
              {data.production.code} {data.production.marking}
            </Text>

            <Text textStyle="md" fontWeight="semibold">
              {data.production.name}
            </Text>
            <Text textStyle="2xl" fontWeight="semibold">
              Партия: {data.batch.name}
            </Text>
            <Text textStyle="2xl" fontWeight="semibold">
              План: {data.plan}
            </Text>
          </Stack>
        ) : (
          <AbsoluteCenter>....</AbsoluteCenter>
        )}
      </Card.Body>
    </Card.Root>
  );
}
