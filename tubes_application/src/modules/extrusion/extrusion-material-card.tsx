import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { useShallow } from "zustand/react/shallow";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AbsoluteCenter, Button, Card, HStack, Heading, Stack, Stat, Status } from "@chakra-ui/react";
import { useRawMaterials } from "./use-raw-materials";
import type { GetSummaryRawMaterialsBySummaryId } from "@/shared/api/services/summary-raw-materials-service";
import ParameterLenghtStatus from "@/shared/components/parameter-lenght-status";
import { useExtrusionMaterialScanModalStore } from "./store/use-extrusion-material-scan-modal-store";
import { formatTimeToString } from "@/shared/helpers/date-time-formatters";

export default function ExtrusionMaterialCard({ summary_id }: { summary_id: number | undefined }) {
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const setOpen = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const isDarkTheme = useColorModeValue(false, true);

  const dto: GetSummaryRawMaterialsBySummaryId | null = summary_id
    ? {
        summary_id: summary_id,
        post_id: 1,
      }
    : null;

  const { data: rawMaterialsData, isSuccess: isRawMaterialsSuccess } = useRawMaterials(dto);

  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Header>
        <HStack justify="space-between">
          <Heading size="3xl">Комплектующие</Heading>
          <Button
            variant="outline"
            backgroundColor="brand_blue"
            size="xl"
            disabled={!employee}
            onClick={(e) => {
              e.currentTarget.blur();
              setOpen(true);
            }}
          >
            Сканировать комплектующие
          </Button>
        </HStack>
      </Card.Header>
      <Card.Body justifyContent="end">
        {rawMaterialsData && isRawMaterialsSuccess ? (
          <Stack justify="space-between">
            {rawMaterialsData.map((row, index) => (
              <Stat.Root
                key={`stat_${index}`}
                size="sm"
                borderWidth="1px"
                p="4"
                rounded="md"
                maxW="700px"
                maxH="120px"
                backgroundColor={row.raw_material.raw_materials_current_records.length ? "bg.success" : "bg.error"}
              >
                <Stat.ValueText>
                  <HStack width="100%" justify="space-between">
                    {row.raw_material.code} {row.raw_material.name}
                    {isDarkTheme && ParameterLenghtStatus(row.raw_material.raw_materials_current_records.length)}
                  </HStack>
                </Stat.ValueText>
                <Stat.HelpText>
                  Текущая партия:{" "}
                  {row.raw_material.raw_materials_current_records.length
                    ? `${row.raw_material.raw_materials_current_records[0].lot} (${formatTimeToString(
                        row.raw_material.raw_materials_current_records[0].createdAt
                      )})`
                    : "-"}
                </Stat.HelpText>
              </Stat.Root>
            ))}
          </Stack>
        ) : (
          <AbsoluteCenter>....</AbsoluteCenter>
        )}
      </Card.Body>
    </Card.Root>
  );
}
