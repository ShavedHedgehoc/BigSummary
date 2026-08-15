import * as React from "react";
import { Box, Button, useColorScheme } from "@mui/joy";

export interface FormButtonProps {
  label: string;
  disabled: boolean;
  startDecorator?: React.ReactNode;
  onClick: () => void;
}

export default function FormButton(props: FormButtonProps) {
  const { mode } = useColorScheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", gap: 2 }}>
      <Button
        color={mode === "dark" ? "neutral" : "neutral"}
        variant="outlined"
        startDecorator={props.startDecorator}
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={props.disabled}
        onClick={() => props.onClick()}
      >
        {props.label}
      </Button>
    </Box>
  );
}
