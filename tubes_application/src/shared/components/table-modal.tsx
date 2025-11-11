import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

export interface TableModalProps {
  title: string;
  open: boolean;
  setOpen: (val: boolean) => void;
}
export default function TableModal({ props, children }: { props: TableModalProps; children: React.ReactNode }) {
  return (
    <Dialog.Root lazyMount size="full" open={props.open} onOpenChange={(e) => props.setOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{props.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button bg="brand" variant="outline">
                  Закрыть
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
