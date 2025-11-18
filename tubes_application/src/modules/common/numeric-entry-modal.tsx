import { Dialog, Grid, GridItem, HStack, Heading, Portal, Stack, Text, Button, Status } from "@chakra-ui/react";
import { type DialogOpenChangeDetails } from "@chakra-ui/react";
import type { DataFormField } from "./data-form-field";

export interface NumericEntryModalProps {
  id: string;
  title: string;
  open: boolean;
  dataKey: string;
  data: string | undefined;
  minValue: number | null | undefined;
  maxValue: number | null | undefined;
  unit: string | null | undefined;
  setOpen: (val: boolean) => void;
  clearData: (val: Partial<DataFormField>) => void;
  changeData: (val: DataFormField) => void;
  sliceData: (val: Partial<DataFormField>) => void;
  roundData: (val: Partial<DataFormField>) => void;
}

interface AddEntryModalButtonProps {
  value: string;
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
      onClick={() => props.onClick(props.value)}
    >
      {props.value}
    </Button>
  );
}

export default function NumericEntryModal(props: NumericEntryModalProps) {
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    props.setOpen(e.open);
    props.roundData({ key: props.id });
  };

  const handleClose = () => {
    props.setOpen(false);
    props.roundData({ key: props.id });
  };

  return (
    <Dialog.Root open={props.open} onOpenChange={(e) => handleOpenchange(e)} placement="center" size="sm">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded="lg">
            <Dialog.Header>
              <Dialog.Title w="full">
                <Stack gap={4}>
                  <HStack justify="space-between">
                    <Heading color="fg.muted">{props.title}</Heading>
                    <Status.Root
                      colorPalette={
                        props.data && props.maxValue && props.minValue && props.data !== "0"
                          ? Number(props.data) > props.maxValue || Number(props.data) < props.minValue
                            ? "red"
                            : "green"
                          : props.data && props.data !== "0"
                          ? "gray"
                          : "yellow"
                      }
                      alignItems="end"
                      size="lg"
                    >
                      <Status.Indicator />
                    </Status.Root>
                  </HStack>

                  <Stack gap={5}>
                    <HStack justify="end" px={4} py={2} rounded="md" borderWidth="1px">
                      <Text textStyle="3xl" color="fg.a">
                        {props.data}
                      </Text>
                    </HStack>
                    <Text textStyle="md" color="fg.subtle">
                      {props.minValue && props.maxValue
                        ? `Регламентные значения от ${props.minValue} до ${props.maxValue} ${props.unit ?? ""}`
                        : `Регламентные значения не заданы`}
                    </Text>
                  </Stack>
                </Stack>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body backgroundColor="bg.panel" rounded="lg">
              <Grid maxH="100%" w="100%" templateRows="repeat(15, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "C", onClick: () => props.clearData({ key: props.id }) }} />
                </GridItem>
                <GridItem colSpan={8} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "<<", onClick: () => props.sliceData({ key: props.id }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "7", onClick: () => props.changeData({ key: props.id, value: "7" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "8", onClick: () => props.changeData({ key: props.id, value: "8" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "9", onClick: () => props.changeData({ key: props.id, value: "9" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "4", onClick: () => props.changeData({ key: props.id, value: "4" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "5", onClick: () => props.changeData({ key: props.id, value: "5" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "6", onClick: () => props.changeData({ key: props.id, value: "6" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "1", onClick: () => props.changeData({ key: props.id, value: "1" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "2", onClick: () => props.changeData({ key: props.id, value: "2" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "3", onClick: () => props.changeData({ key: props.id, value: "3" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: ".", onClick: () => props.changeData({ key: props.id, value: "." }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton
                    props={{ value: "0", onClick: () => props.changeData({ key: props.id, value: "0" }) }}
                  />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "OK", onClick: () => handleClose() }} />
                </GridItem>
              </Grid>
            </Dialog.Body>
            {/* <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button>Save</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger> */}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
