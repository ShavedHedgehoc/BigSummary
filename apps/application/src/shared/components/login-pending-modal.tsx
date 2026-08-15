import { Box, CircularProgress, DialogContent, Modal, ModalDialog, ModalOverflow, Typography } from "@mui/joy";
import * as React from "react";

export default function LoginPendingModal({ open }: { open: boolean }) {
  return (
    <React.Fragment>
      <Modal
        open={open}
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
                display: "flex",
                borderRadius: "sm",
                borderWidth: "1px",
                backgroundColor: "var(--joy-palette-background-level1)",
              },
            ]}
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CircularProgress color="neutral" size="sm" value={75} />
                <Typography level="body-md">Загружаю...</Typography>
                <Typography level="body-xs">Запрос к базе данных</Typography>
              </Box>
            </DialogContent>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </React.Fragment>
  );
}
