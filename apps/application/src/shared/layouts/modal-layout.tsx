import * as React from "react";
import { Box, Button, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog, ModalOverflow } from "@mui/joy";

export interface ModalLayoutProps {
  open: boolean;
  onClose(): void;
  title: string;
  height: number;
  minHeight: number;
  width: number;
  onlyCloseButton: boolean;
}

export default function ModalLayout({
  props,
  children,
  buttons,
}: {
  props: ModalLayoutProps;
  children: React.ReactNode;
  buttons: React.ReactNode;
}) {
  const ButtonsComponent = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: 1 }}>
        {props.onlyCloseButton && (
          <Button
            color="neutral"
            variant="outlined"
            size={"sm"}
            sx={{ fontWeight: "normal", fontSize: "small" }}
            onClick={() => props.onClose()}
          >
            Закрыть
          </Button>
        )}
        {!props.onlyCloseButton && buttons}
      </Box>
    );
  };
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
                  maxHeight: `${props.height}px`,
                  minHeight: `${props.minHeight}px`,
                  minWidth: `${props.width}px`,
                  maxWidth: `${props.width}px`,
                }}
              >
                {children}

                <Box sx={{ mt: "auto" }}>
                  <ButtonsComponent />
                </Box>
              </Box>
            </DialogContent>
            <ModalClose variant="outlined" />
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
