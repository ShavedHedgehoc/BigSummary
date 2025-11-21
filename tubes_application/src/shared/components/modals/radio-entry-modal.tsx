import {
  Dialog,
  Stack,
  type DialogOpenChangeDetails,
  HStack,
  Heading,
  RadioCard,
  Group,
  Text,
  Status,
} from "@chakra-ui/react";
import type { DataFormField } from "../../helpers/data-form-field";
import { useExtrusionInputStore } from "../../../modules/extrusion/store/use-extrusion-input-current-parameters-store";
import { useShallow } from "zustand/react/shallow";

export interface RadioEntryModalProps {
  id: string;
  title: string;
  open: boolean;
  dataKey: string;
  data: string | null | undefined;
  expectedValue: string | null | undefined;
  setOpen: (val: boolean) => void;
  changeData: (val: DataFormField) => void;
}

export default function RadioEntryModal(props: RadioEntryModalProps) {
  const options = useExtrusionInputStore(useShallow((state) => state.rondelTypeSelectorOptions));
  return (
    <Dialog.Root
      open={props.open}
      onOpenChange={(e: DialogOpenChangeDetails) => props.setOpen(e.open)}
      placement="center"
      size="sm"
    >
      {/* <Portal> */}
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
                      props.data
                        ? props.expectedValue
                          ? props.expectedValue === props.data
                            ? "green"
                            : "red"
                          : "gray"
                        : "yellow"
                    }
                    alignItems="end"
                    size="lg"
                  >
                    <Status.Indicator />
                  </Status.Root>
                </HStack>
                <Stack>
                  <Text textStyle="md" color="fg.subtle">
                    {props.expectedValue && `Ожидемое значение ${props.expectedValue}`}
                  </Text>
                </Stack>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <RadioCard.Root
              size="lg"
              colorPalette="gray"
              variant="outline"
              value={props.data}
              onValueChange={(e) =>
                e.value &&
                props.changeData({
                  key: props.id,
                  value: e.value,
                })
              }
            >
              <Group attached orientation="vertical">
                {options.map((item) => (
                  <RadioCard.Item w="full" key={item.id} value={item.value}>
                    <RadioCard.ItemHiddenInput />
                    <RadioCard.ItemControl>
                      <RadioCard.ItemText color="fg.subtle">{item.value}</RadioCard.ItemText>
                      <RadioCard.ItemIndicator color="fg.subtle" />
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                ))}
              </Group>
            </RadioCard.Root>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
      {/* </Portal> */}
    </Dialog.Root>
  );
}
