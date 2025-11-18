import { Button, CloseButton, Dialog } from "@chakra-ui/react";
import { TbX } from "react-icons/tb";

export interface InputModalProps {
  title: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  initData: () => void;
  buttons: React.ReactNode;
}
export default function InputModal({ props, children }: { props: InputModalProps; children: React.ReactNode }) {
  return (
    <Dialog.Root
      lazyMount
      size="full"
      open={props.open}
      onOpenChange={(e) => {
        props.setOpen(e.open);
        props.initData();
      }}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{props.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>{children}</Dialog.Body>
          <Dialog.Footer>
            {props.buttons}
            <Dialog.ActionTrigger asChild>
              <Button bg="brand" variant="outline">
                <TbX />
                Закрыть
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
