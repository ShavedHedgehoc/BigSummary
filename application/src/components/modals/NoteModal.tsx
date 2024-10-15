import * as React from "react";
import { Typography, Sheet } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import ModalLayout, { ModalLayoutProps } from "./ModalLayout";

interface NoteModalProps {
  open: boolean;
  onClose(): void;
}

function NoteModal(props: NoteModalProps) {
  const { store } = React.useContext(Context);

  const contentcomponent = (
    <Sheet
      variant="outlined"
      sx={[
        {
          display: { xs: "none", xl: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
          height: "100%",
          mb: 1,
          p: 2,
        },
      ]}
    >
      {!store.NoteStore.pending && <Typography level="body-xs">{store.NoteStore.note}</Typography>}
    </Sheet>
  );

  const modalProps: ModalLayoutProps = {
    open: props.open,
    onClose: () => props.onClose(),
    title: "Комментарий",
    content: contentcomponent,
    height: 400,
    minHeight:400,
    width: 800,
    onlyCloseButton: true,
    buttons: <></>,
  };
  return <ModalLayout {...modalProps} />;
}

export default observer(NoteModal);
