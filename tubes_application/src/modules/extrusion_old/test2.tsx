import { RouteNames } from "@/shared/router/route-names";
import {
  Box,
  Button,
  Center,
  CloseButton,
  Dialog,
  Grid,
  GridItem,
  Group,
  HStack,
  Heading,
  Icon,
  IconButton,
  NumberInput,
  Popover,
  Portal,
  Separator,
  Text,
  Theme,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useExtrusionConveyorStore } from "../extrusion/store/use-extrusion-conveyor-store";
import { useShallow } from "zustand/react/shallow";
import TimeComponent from "../common/time-component";
import HeaderComponent from "../common/header-component";
import { PostNames } from "@/shared/helpers/post-names";
import NotFound from "@/shared/components/not-found-full-screen";
import { AppMessages } from "@/shared/resources/app-messages";
import UserComponent from "../common/user-component";
import { useExtrusionEmployeeStore } from "../extrusion/store/use-extrusion-employee-store";
import { TbSearch } from "react-icons/tb";
import { useState } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { useDialogStore } from "./test2-dialog-stroe";

function Modal() {
  const open = useDialogStore(useShallow((state) => state.open));
  const setOpen = useDialogStore(useShallow((state) => state.setOpen));
  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>{/* <Dialog.Title>Dialog Title</Dialog.Title> */}</Dialog.Header>
            <Dialog.Body backgroundColor="bg.panel" rounded="lg">
              <Grid maxH="100%" w="100%" templateRows="repeat(15, 1fr)" templateColumns="repeat(12, 1fr)" gap={2}>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={8} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    bk
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
                </GridItem>
                <GridItem colSpan={4} rowSpan={3}>
                  <Button size="2xl" width="full" variant="outline" rounded="md">
                    C
                  </Button>
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

export default function Test2() {
  const navigate = useNavigate();
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  if (!extrusionConveyor) return <NotFound message={AppMessages.CONVEYOR_NOT_EXISTS} />;

  function InputDialog() {}
  const setOpen = useDialogStore(useShallow((state) => state.setOpen));

  return (
    <Theme appearance="dark">
      <Grid h="100vh" w="100wv" templateRows="repeat(28, 1fr)" templateColumns="repeat(24, 1fr)" gap={2}>
        <GridItem rowSpan={1} colSpan={24}>
          <TimeComponent />
        </GridItem>
        <GridItem rowSpan={2} colSpan={24}>
          <HeaderComponent conveyorName={extrusionConveyor.name} postName={PostNames.EXTRUSION} />
        </GridItem>
        <GridItem rowSpan={2} colSpan={24}>
          <Center h="full">
            <Heading size="xl" color="fg.subtle">
              Внесение параметров
            </Heading>
          </Center>
        </GridItem>
        <GridItem rowSpan={12} colSpan={24}>
          <VStack gap={2} h="full" w="full">
            <HStack h="full" w="full">
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
            </HStack>
            <HStack h="full" w="full">
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
            </HStack>
            <HStack h="full" w="full">
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
              <InputParameterBox />
            </HStack>
          </VStack>
        </GridItem>
        <GridItem rowSpan={1} colSpan={24}>
          <Button onClick={() => navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`)}>back</Button>
        </GridItem>
        <GridItem rowSpan={10} colSpan={24}></GridItem>
        <GridItem rowSpan={1} colSpan={24}>
          <UserComponent employee={employee} />
        </GridItem>
      </Grid>
      <Modal />
    </Theme>
  );
}
