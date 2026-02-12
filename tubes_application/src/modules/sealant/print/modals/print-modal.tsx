import { Dialog, Grid, GridItem, HStack, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { type DialogOpenChangeDetails } from "@chakra-ui/react";

import { useQuantityIntegerModalStore } from "../../store/use-quantity-integer-modal-store";
import { useBoxQuantityStore } from "../../store/use-box-quantity-store";
import { useShallow } from "zustand/shallow";
import { usePrintZpl } from "../../use-print-zpl";
import type { ISummary } from "@/shared/api/services/summary-service";
import { usePrinter } from "../../use-printer";
import { useSealantEmployeeStore } from "../../store/use-sealant-employee-store";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useProductionBoxes } from "../../use-production-boxes";
import { makeBoxReceipt } from "@/shared/helpers/make-zpl-receipt";
import type { PrintReceiptDto } from "@/shared/api/services/zpl-service";
import { TbPrinter } from "react-icons/tb";

interface AddEntryModalButtonProps {
  value: string;
  disabled: boolean;
  icon?: React.ReactNode;
  onClick: (val: string) => void;
}

function AddEntryModalButton({ props }: { props: AddEntryModalButtonProps }) {
  return (
    <Button
      size="2xl"
      width="full"
      variant="outline"
      rounded="md"
      color="fg.subtle"
      disabled={props.disabled}
      onClick={() => props.onClick(props.value)}
    >
      {props.icon}
      {props.value}
    </Button>
  );
}

export default function PrintModal({ summaryData }: { summaryData: ISummary | null }) {
  const open = useQuantityIntegerModalStore(useShallow((state) => state.open));
  const setOpen = useQuantityIntegerModalStore(useShallow((state) => state.setOpen));
  const data = useBoxQuantityStore(useShallow((state) => state.quantity));
  const clearData = useBoxQuantityStore(useShallow((state) => state.clearData));
  const changeData = useBoxQuantityStore(useShallow((state) => state.changeData));
  const sliceData = useBoxQuantityStore(useShallow((state) => state.sliceData));
  const roundData = useBoxQuantityStore(useShallow((state) => state.roundData));
  const employee = useSealantEmployeeStore(useShallow((state) => state.sealantEmployee));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const { data: printerData } = usePrinter(sealantConveyor?.id ?? null);
  const { data: boxData } = useProductionBoxes(summaryData?.data.batch_id ?? null);

  const { printZPL } = usePrintZpl();
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    setOpen(e.open);
    roundData();
  };

  const handleClose = () => {
    setOpen(false);
    roundData();
    if (printerData) {
      const zplData: {
        name: string;
        code: string;
        batch: string;
        batchId: number | null;
        boxNumber: number;
        quantity: number;
        employee: string;
        summaryId: number | null;
        employeeId: number | null;
      } = {
        name: summaryData?.data.product_name ?? "",
        code: summaryData?.data.product_code ?? "",
        batch: summaryData?.data.batch_name ?? "",
        batchId: summaryData?.data.batch_id ?? null,
        boxNumber: boxData && boxData.length > 0 ? boxData.length + 1 : 1,
        quantity: Number(data),
        employee: employee?.name ?? "",
        employeeId: employee?.id ?? null,
        summaryId: summaryData?.data.id ?? null,
      };
      const zpl = makeBoxReceipt(zplData);
      const dto: PrintReceiptDto = {
        ip: printerData.ip,
        port: printerData.port,
        zpl: zpl,
      };
      printZPL(dto);
    }
  };
  const disabledCondition = !employee || !printerData || data === "0";
  return (
    <Dialog.Root open={open} onOpenChange={(e) => handleOpenchange(e)} placement="center" size="sm">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="lg">
          <Dialog.Header>
            <Dialog.Title w="full">
              <Stack gap={4}>
                <HStack justify="space-between">
                  <Heading color="fg.muted">Введите количество в коробе</Heading>
                </HStack>

                <Stack gap={5}>
                  <HStack justify="end" px={4} py={2} rounded="md" borderWidth="1px">
                    <Text textStyle="3xl" color="fg.a">
                      {data ? data : "0"}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Grid maxH="100%" w="100%" templateRows="repeat(15, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "C", onClick: () => clearData() }} />
              </GridItem>
              <GridItem colSpan={8} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "<<", onClick: () => sliceData() }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "7", onClick: () => changeData("7") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "8", onClick: () => changeData("8") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "9", onClick: () => changeData("9") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "4", onClick: () => changeData("4") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "5", onClick: () => changeData("5") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "6", onClick: () => changeData("6") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "1", onClick: () => changeData("1") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "2", onClick: () => changeData("2") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "3", onClick: () => changeData("3") }} />
              </GridItem>
              <GridItem colSpan={6} rowSpan={3}>
                <AddEntryModalButton props={{ disabled: false, value: "0", onClick: () => changeData("0") }} />
              </GridItem>
              <GridItem colSpan={6} rowSpan={3}>
                <AddEntryModalButton
                  props={{
                    disabled: disabledCondition,
                    value: "Печать",
                    icon: <TbPrinter />,
                    onClick: () => handleClose(),
                  }}
                />
              </GridItem>
            </Grid>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
