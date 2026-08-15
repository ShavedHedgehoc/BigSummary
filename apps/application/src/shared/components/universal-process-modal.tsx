import * as React from "react";

import { Box, Modal, Sheet, Typography } from "@mui/joy";

export interface UniversalProcessModalProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  minWidth?: number;
}

function UniversalProcessModal(props: UniversalProcessModalProps) {
  return (
    <React.Fragment>
      <Modal open={props.open} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: props.minWidth ? props.minWidth : 500,
            minWidth: props.minWidth ? props.minWidth : 500,
            borderRadius: "sm",
            borderColor: "neutral",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography component="h4" id="modal-title" textColor="inherit" fontWeight="lg" mb={1}>
              {props.title}
            </Typography>
            {props.content}
          </Box>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
export default UniversalProcessModal;
