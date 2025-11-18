import {
  Dialog,
  Portal,
  Grid,
  GridItem,
  Button,
  type DialogOpenChangeDetails,
  Heading,
  Stack,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useShallow } from "zustand/shallow";
import { useAddEntryModalStore } from "./add-entry-modal-store";
import {
  CurrentParametersInputDataParams,
  useExtrusionInputCurrentParametersStore,
} from "../extrusion/store/use-extrusion-input-current-parameters-store";

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

export default function AddEntryModal() {
  const id = useAddEntryModalStore(useShallow((state) => state.key));
  const title = useAddEntryModalStore(useShallow((state) => state.title));
  const open = useAddEntryModalStore(useShallow((state) => state.open));
  const setOpen = useAddEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useAddEntryModalStore(useShallow((state) => state.key));
  const clearData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.clearData));
  const changeData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.changeData));
  const sliceData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.sliceData));
  const roundData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.roundData));

  const handleOpenchange = (e: DialogOpenChangeDetails) => {
    setOpen(e.open);
    roundData({ key: id });
  };

  const handleClose = () => {
    setOpen(false);
    roundData({ key: id });
  };

  const data = useExtrusionInputCurrentParametersStore(
    useShallow((state) => {
      switch (dataKey) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
          return state.data.counter_value;
        case CurrentParametersInputDataParams.PRESS_SPEED:
          return state.data.press_speed;
        case CurrentParametersInputDataParams.BLOW_TIME:
          return state.data.blow_time;
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
          return state.data.turning_machine_speed;
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
          return state.data.annealing_furnace_temp;
        case CurrentParametersInputDataParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          return state.data.tube_cilindrical_section_length;
        case CurrentParametersInputDataParams.MEMBRANE_THICKNESS:
          return state.data.membrane_thickness;
        case CurrentParametersInputDataParams.TUBE_DIAMETER:
          return state.data.tube_diameter;
        case CurrentParametersInputDataParams.TUBE_CILINDRICAL_THICKNESS:
          return state.data.tube_cilindrical_thikness;
        case CurrentParametersInputDataParams.TUBE_RIGIDITY:
          return state.data.tube_rigidity;
        default:
          break;
      }
    })
  );

  return (
    <Dialog.Root open={open} onOpenChange={(e) => handleOpenchange(e)} placement="center" size="sm">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content rounded="lg">
            <Dialog.Header>
              <Dialog.Title w="full">
                <Stack gap={4}>
                  <Heading color="fg.muted">{title}</Heading>
                  <HStack justify="end" px={4} py={2} rounded="md" borderWidth="1px">
                    <Text textStyle="3xl" color="fg.a">
                      {data}
                    </Text>
                  </HStack>
                </Stack>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body backgroundColor="bg.panel" rounded="lg">
              <Grid maxH="100%" w="100%" templateRows="repeat(15, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "C", onClick: () => clearData({ key: id }) }} />
                </GridItem>
                <GridItem colSpan={8} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "<<", onClick: () => sliceData({ key: id }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "7", onClick: () => changeData({ key: id, value: "7" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "8", onClick: () => changeData({ key: id, value: "8" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "9", onClick: () => changeData({ key: id, value: "9" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "4", onClick: () => changeData({ key: id, value: "4" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "5", onClick: () => changeData({ key: id, value: "5" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "6", onClick: () => changeData({ key: id, value: "6" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "1", onClick: () => changeData({ key: id, value: "1" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "2", onClick: () => changeData({ key: id, value: "2" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "3", onClick: () => changeData({ key: id, value: "3" }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: ".", onClick: () => changeData({ key: id, value: "." }) }} />
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <AddEntryModalButton props={{ value: "0", onClick: () => changeData({ key: id, value: "0" }) }} />
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
