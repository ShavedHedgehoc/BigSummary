import * as React from "react";
import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Typography,
  FormControl,
  Textarea,
  FormHelperText,
} from "@mui/joy";
import { IHistory } from "../../types";

interface BoilHistoriesyModalProps {
  open: boolean;
  rows: IHistory[];

  onClose(): void;
}

export default function BoilHistoriesModal(props: BoilHistoriesyModalProps) {
  return (
    <React.Fragment>
      <Modal
        open={props.open}
        onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
          if (reason === "closeClick") {
            props.onClose();
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999999,
        }}
      >
        <ModalOverflow>
          <ModalDialog
            layout="center"
            variant="solid"
            sx={[
              {
                width: "800px",
                borderRadius: "sm",
                borderWidth: "1px",
                backgroundColor: "var(--joy-palette-background-level1)",
              },
            ]}
          >
            <DialogTitle sx={{ color: "var(--joy-palette-text-secondary)" }}>История статусов</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography level="body-sm">Партия:</Typography>
                  {/* <Typography level="body-sm"> Статус: "{props.stateDescription}" </Typography> */}
                </Box>
                <Box></Box>
              </Box>
            </DialogContent>
            <ModalClose variant="outlined" />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
