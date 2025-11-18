import {
  Dialog,
  Portal,
  Stack,
  type DialogOpenChangeDetails,
  Switch,
  HStack,
  Heading,
  Status,
  VStack,
} from "@chakra-ui/react";
import type { DataFormField } from "./data-form-field";

export interface BooleanEntryModalProps {
  id: string;
  title: string;
  open: boolean;
  dataKey: string;
  data: boolean | undefined;
  setOpen: (val: boolean) => void;
  changeData: (val: DataFormField) => void;
}

export default function BooleanEntryModal(props: BooleanEntryModalProps) {
  return (
    <Dialog.Root
      open={props.open}
      onOpenChange={(e: DialogOpenChangeDetails) => props.setOpen(e.open)}
      placement="center"
      size="sm"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            rounded="lg"
            onClick={() => props.changeData({ key: props.id, value: props.data ? "false" : "true" })}
          >
            <Dialog.Header>
              <Dialog.Title w="full">
                <Stack gap={4}>
                  <HStack justify="space-between">
                    <Heading color="fg.muted">{props.title}</Heading>
                    <Status.Root colorPalette={props.data ? "green" : "red"} alignItems="end" size="lg">
                      <Status.Indicator />
                    </Status.Root>
                  </HStack>
                </Stack>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body backgroundColor="bg.panel" rounded="lg">
              <VStack pt={2} gap={6}>
                <Switch.Root
                  size="lg"
                  checked={props.data}
                  onCheckedChange={(e) => props.changeData({ key: props.id, value: e.checked ? "true" : "false" })}
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                  <Switch.Label />
                </Switch.Root>
                <Heading color={props.data ? "green" : "red"}>
                  {props.data ? "Соответствует" : "Не соответсвует"}
                </Heading>
              </VStack>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
