import { Button, CloseButton, Dialog } from "@chakra-ui/react";

export interface AlertModalProps {
  title?: string;
  message: string;
  actionButtonValue?: string;
  cancelButtonValue?: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  cancelAction?: () => void;
  okAction: () => void;
}

export default function AlertModal(props: AlertModalProps) {
  const handleOkClick = () => {
    props.setOpen(false);
    props.okAction();
  };
  const handleCancelClick = () => {
    if ("cancelAction" in props && typeof props.cancelAction === "function") {
      props.cancelAction();
    }
  };

  return (
    <Dialog.Root
      role="alertdialog"
      placement="center"
      open={props.open}
      onOpenChange={(e) => {
        props.setOpen(e.open);
        handleCancelClick();
      }}
    >
      <Dialog.Trigger asChild></Dialog.Trigger>
      {/* <Portal> */}
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title color="fg.subtle">{props.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <p>{props.message}</p>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline" size="sm">
                {props.cancelButtonValue ?? "Cancel"}
              </Button>
            </Dialog.ActionTrigger>
            <Button colorPalette="red" onClick={() => handleOkClick()}>
              {props.actionButtonValue ?? "Ok"}
            </Button>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
      {/* </Portal> */}
    </Dialog.Root>
  );
}
