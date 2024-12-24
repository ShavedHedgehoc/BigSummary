import * as React from "react";
import { Box, LinearProgress, Modal, Sheet, Typography } from "@mui/joy";

export interface PendingModalProps {
  pending: boolean;
  title: string;
  content: string;
}

function PendingModal(props: PendingModalProps) {
  return (
    <React.Fragment>
      <Modal open={props.pending} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Sheet
          variant="plain"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h2" id="modal-title" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
              {props.title}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography id="modal-desc" level="body-md">
                {props.content}
              </Typography>
              <LinearProgress color="primary" size="lg" variant="solid" />
            </Box>
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
export default PendingModal;
