import { AppMessages } from "@/shared/resources/app-messages";
import { Button, Dialog, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { TbPencil } from "react-icons/tb";

export interface CloseSummaryModalProps {
  title: string;
  open: boolean;
  defectValue: string | null;
  clearValue: () => void;
  setOpen: (val: boolean) => void;
  onAddButtonClick: () => void;
  onEndButtonClick: () => void;
}

export default function CloseSummaryModal(props: CloseSummaryModalProps) {
  const handleCancelclick = () => {
    props.setOpen(false);
    props.clearValue();
  };
  return (
    <Dialog.Root open={props.open} placement="center" size="lg">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content rounded="lg">
          <Dialog.Header>
            <Dialog.Title w="full">
              <Stack gap={1}>
                <Heading color="fg.muted" size="xl">
                  {props.title}
                </Heading>
              </Stack>
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body backgroundColor="bg.panel" rounded="lg">
            <Stack gap={4}>
              <Text textStyle="sm" color="fg.muted">
                <p>{AppMessages.WANT_TO_CLOSE_PROMPT}</p>
              </Text>
              <Text textStyle="sm" color="fg.muted">
                <p>Для завершения работы поста необходимо внести количество брака</p>
              </Text>
              <HStack w="full" justify="start">
                <Text textStyle="md" color="fg.a">
                  Брак: {`${props.defectValue === "0" ? "Не внесено" : props.defectValue + " кг"}`}
                </Text>
              </HStack>
              <HStack mt={2}>
                <Button variant="outline" onClick={props.onAddButtonClick} px={8}>
                  <TbPencil />
                  Брак
                </Button>
                <HStack w="full" justify="end" gap={2}>
                  <Button variant="outline" onClick={handleCancelclick}>
                    Отмена
                  </Button>
                  <Button colorPalette="red" disabled={props.defectValue === "0"} onClick={props.onEndButtonClick}>
                    Завершить
                  </Button>
                </HStack>
              </HStack>
            </Stack>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
