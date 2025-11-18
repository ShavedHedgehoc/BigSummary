import { Heading, Card, HStack, IconButton, Button, AbsoluteCenter } from "@chakra-ui/react";
import { TbSearch } from "react-icons/tb";
import InputTimer from "../../../shared/components/input-timer";
import { CheckIntervals } from "@/shared/helpers/check-intervals";
import { useExtrusionAuthLabModalStore } from "../store/use-extrusion-auth-lab-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useExtrusionQualityParamsTableModalStore } from "../store/use-extrusion-quality-params-table-modal-store";
import { useExtrusionQualityCurrentParams } from "../hooks/use-extrusion-quality-current-params";
import { useEffect } from "react";

export default function ExtrusionQualityControlCard({ summary_id }: { summary_id: number | undefined }) {
  const { data } = useExtrusionQualityCurrentParams(summary_id ?? null);
  const setOpenAuth = useExtrusionAuthLabModalStore(useShallow((state) => state.setOpen));
  const setOpenTable = useExtrusionQualityParamsTableModalStore(useShallow((state) => state.setOpen));

  useEffect(() => {
    console.log("render QC card");
  }, []);

  return (
    <Card.Root h="100%" variant="elevated">
      <Card.Header>
        <HStack justify="space-between">
          <Heading size="3xl">Операционный контроль</Heading>
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
                setOpenTable(true);
              }}
            >
              <TbSearch />
            </IconButton>
            <Button
              variant="outline"
              backgroundColor="brand_blue"
              size="xl"
              onClick={(e) => {
                e.currentTarget.blur();
                setOpenAuth(true);
              }}
            >
              Внести данные
            </Button>
          </HStack>
        </HStack>
      </Card.Header>
      <Card.Body asChild>
        <AbsoluteCenter>
          <InputTimer date={data?.createdAt} isParameters={false} checkInterval={CheckIntervals.QUALITY} />
        </AbsoluteCenter>
      </Card.Body>
    </Card.Root>
  );
}
