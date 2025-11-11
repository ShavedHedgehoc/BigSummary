import { CloseButton, Dialog, Input, Portal } from "@chakra-ui/react";

import { useRef, useState } from "react";

export interface ScanModalProps {
  title: string;
  open: boolean;
  setOpen: (val: boolean) => void;
  processInput: (val: string) => void;
}

export default function ScanModal(props: ScanModalProps) {
  const [inputField, setInputField] = useState("");
  const ref = useRef<HTMLInputElement | null>(null);

  const clearInput = () => {
    setInputField("");
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.setOpen(false);
      props.processInput(inputField);
      clearInput();
    }
  };
  return (
    <Dialog.Root
      lazyMount
      placement="center"
      open={props.open}
      onOpenChange={(e) => props.setOpen(e.open)}
      initialFocusEl={() => ref.current}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{props.title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                ref={ref}
                type="text"
                value={inputField}
                onChange={(e) => setInputField(e.target.value)}
                onKeyDown={(e) => handleInputKeyDown(e)}
              />
            </Dialog.Body>

            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
