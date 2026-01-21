import * as React from "react";
import { Box, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, ModalOverflow } from "@mui/joy";

export interface AddModalLayoutProps {
  open: boolean;
  onClose(): void;
  title: string;
  height: number;
  width: number;
}

export default function AddModalLayout({ props, children }: { props: AddModalLayoutProps; children: React.ReactNode }) {
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
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999998,
        }}
      >
        <ModalOverflow>
          <ModalDialog
            layout="center"
            variant="solid"
            sx={[
              {
                display: "flex",
                borderRadius: "sm",
                borderWidth: "1px",
                backgroundColor: "var(--joy-palette-background-level1)",
              },
            ]}
          >
            <DialogTitle sx={{ color: "var(--joy-palette-text-secondary)" }}>{props.title}</DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  mt: 2,
                  overflow: "hidden",
                  height: `${props.height}px`,
                  width: `${props.width}px`,
                }}
              >
                {children}
              </Box>
            </DialogContent>
            <ModalClose variant="outlined" />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
