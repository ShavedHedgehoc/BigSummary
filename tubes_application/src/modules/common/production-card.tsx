import type { ISummary } from "@/shared/api/services/summary-service";
import { Box, DataList, HStack, Stack, Text } from "@chakra-ui/react";
import InputTimer from "./input-timer";
import { CheckIntervals } from "@/shared/helpers/check-intervals";

export default function ProductionCard({ data, postId }: { data: ISummary | null; postId: number }) {
  return (
    <Box backgroundColor="bg.panel" w="full" h="full" rounded="lg" p={8} alignItems="center" justifyContent="center">
      <Stack justify="space-between" h="full" w="full">
        <Stack gap="4">
          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel>Продукт</DataList.ItemLabel>
              <DataList.ItemValue>{`${data?.production.code} ${data?.production.name}`}</DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
          <HStack>
            <DataList.Root size="lg">
              <DataList.Item>
                <DataList.ItemLabel>Партия</DataList.ItemLabel>
                <DataList.ItemValue>{`${data?.batch.name}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <DataList.Root size="lg">
              <DataList.Item>
                <DataList.ItemLabel>План</DataList.ItemLabel>
                <DataList.ItemValue>{`${data?.plan}`}</DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
          </HStack>
          <DataList.Root size="lg">
            <DataList.Item>
              <DataList.ItemLabel>
                {data?.chief_notes.filter((x) => x.post_id === postId).length ? "Примечание главного технолога:" : ""}
              </DataList.ItemLabel>
              <DataList.ItemLabel>
                {data?.chief_notes.filter((x) => x.post_id === postId).length
                  ? data.chief_notes.filter((x) => x.post_id === postId)[0].note
                  : ""}
              </DataList.ItemLabel>
            </DataList.Item>
          </DataList.Root>
        </Stack>
        <HStack justify={"space-between"}>
          <InputTimer
            checkInterval={CheckIntervals.HARDWARE}
            date={postId === 1 && data && data.extrusion_params.length ? data.extrusion_params[0].createdAt : undefined}
          />
          <HStack justify="end" alignItems="end" h="full">
            <Text color="fg.subtle" textStyle="xl">
              Выработка поста:
            </Text>
            <Text color="fg.a" textStyle="4xl">
              {postId === 1 && data?.extrusion_params.length ? data.extrusion_params[0].counter_value : 0}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
}
