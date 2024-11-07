import Sheet from "@mui/joy/Sheet";
import ModalLayout from "../../layouts/modal-layout";
import { useShallow } from "zustand/shallow";
import { useNoteModalStore } from "./use-note-modal-store";
import { useNote } from "../../api/use-note";
import { SxProps } from "@mui/joy/styles/types";

export default function NoteModal() {
  const open = useNoteModalStore(useShallow((state) => state.open));
  const id = useNoteModalStore(useShallow((state) => state.noteId));
  const setOpen = useNoteModalStore(useShallow((state) => state.setOpen));
  const { isPending, isRefetching, data, isSuccess } = useNote(id);

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Комментарий",
    height: 400,
    minHeight: 400,
    width: 800,
    onlyCloseButton: true,
  };

  const sxProps: SxProps = {
    display: { xs: "none", xl: "initial" },
    width: "100%",
    borderRadius: "sm",
    flexShrink: 1,
    overflow: "auto",
    minHeight: 0,
    height: "100%",
    mb: 1,
    p: 2,
  };

  const ContentComponent = () => {
    return (
      <Sheet variant="outlined" sx={[sxProps]}>
        {isSuccess && data.value}
      </Sheet>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <ContentComponent />
    </ModalLayout>
  );
}
