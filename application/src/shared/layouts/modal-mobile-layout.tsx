import * as React from "react";
import { Box, DialogContent, DialogTitle, Modal, ModalDialog, ModalOverflow } from "@mui/joy";

export interface ModalLMobileLayoutProps {
  open: boolean;
  onClose(): void;
}

export default function ModalMobileLayout({
  props,
  children,
}: {
  props: ModalLMobileLayoutProps;
  children: React.ReactNode;
}) {
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
          display: { xs: "flex", sm: "none" },
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99999,
        }}
      >
        <ModalOverflow>
          <ModalDialog
            layout="fullscreen"
            variant="solid"
            sx={[
              {
                display: "flex",
                borderRadius: "sm",
                borderWidth: "1px",
                p: 1,
                backgroundColor: "var(--joy-palette-background-body)",
              },
            ]}
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 1,
                  overflow: "hidden",
                  height: "100%",
                }}
              >
                {children}
              </Box>
            </DialogContent>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
