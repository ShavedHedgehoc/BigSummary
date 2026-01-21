import { Dialog, Grid, GridItem, HStack, Heading, Stack, Text, Button } from "@chakra-ui/react";
import { type DialogOpenChangeDetails } from "@chakra-ui/react";

export interface DefectInputModalProps {
  open: boolean;
  data: string | null | undefined;
  setOpen: (val: boolean) => void;
  clearData: () => void;
  changeData: (val: string) => void;
  sliceData: () => void;
  roundData: () => void;
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

export default function DefectInputModal(props: DefectInputModalProps) {
  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    props.setOpen(e.open);
    props.roundData();
  };

  const handleClose = () => {
    props.setOpen(false);
    props.roundData();
  };

  return (
    <Dialog.Root open={props.open} onOpenChange={(e) => handleOpenchange(e)} placement="center" size="sm">
      {/* <Portal> */}
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="lg">
          <Dialog.Header>
            <Dialog.Title w="full">
              <Stack gap={4}>
                <HStack justify="space-between">
                  <Heading color="fg.muted">Количество брака</Heading>
                </HStack>

                <Stack gap={5}>
                  <HStack justify="end" px={4} py={2} rounded="md" borderWidth="1px">
                    <Text textStyle="3xl" color="fg.a">
                      {props.data ? props.data : "0"}
                    </Text>
                  </HStack>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Grid maxH="100%" w="100%" templateRows="repeat(15, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "C", onClick: () => props.clearData() }} />
              </GridItem>
              <GridItem colSpan={8} rowSpan={3}>
                <AddEntryModalButton props={{ value: "<<", onClick: () => props.sliceData() }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "7", onClick: () => props.changeData("7") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "8", onClick: () => props.changeData("8") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "9", onClick: () => props.changeData("9") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "4", onClick: () => props.changeData("4") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "5", onClick: () => props.changeData("5") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "6", onClick: () => props.changeData("6") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "1", onClick: () => props.changeData("1") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "2", onClick: () => props.changeData("2") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "3", onClick: () => props.changeData("3") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: ".", onClick: () => props.changeData(".") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "0", onClick: () => props.changeData("0") }} />
              </GridItem>
              <GridItem colSpan={4} rowSpan={3}>
                <AddEntryModalButton props={{ value: "OK", onClick: () => handleClose() }} />
              </GridItem>
            </Grid>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
      {/* </Portal> */}
    </Dialog.Root>
  );
}
