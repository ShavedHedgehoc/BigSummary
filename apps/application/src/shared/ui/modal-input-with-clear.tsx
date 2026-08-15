import * as React from "react";
import { Box, FormControl, Input, IconButton, useColorScheme } from "@mui/joy";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

export interface ModalInputWithClearProps {
  value: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function ModalInputWithClear(props: ModalInputWithClearProps) {
  const { mode } = useColorScheme();
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <FormControl size="sm" sx={{ width: "100%" }}>
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
            },
            // width: "100%",

            display: "flex",
            // flexGrow: 1,
            // flexShrink: 1,
          }}
          autoComplete="false"
          value={props.value}
          disabled={props.disabled}
          onChange={(e) => props.onChange(e.target.value)}
          endDecorator={
            <React.Fragment>
              <IconButton
                color={mode === "dark" ? "neutral" : "neutral"}
                disabled={props.disabled}
                onClick={() => {
                  props.onClear();
                }}
              >
                <ClearOutlinedIcon />
              </IconButton>
            </React.Fragment>
          }
        />
      </FormControl>
    </Box>
  );
}
