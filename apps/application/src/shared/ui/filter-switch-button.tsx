import * as React from "react";
import { Box, ButtonGroup, IconButton } from "@mui/joy";

export interface FilterSwitchButtonProps {
  trueDecorator: React.ReactNode;
  falseDecorator: React.ReactNode;
  condition: boolean;
  onClick: () => void;
}

export default function FilterSwitchButton(props: FilterSwitchButtonProps) {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", py: 1, border: "0.5px solid tertiary" }}
    >
      <ButtonGroup size="sm">
        <IconButton disabled={props.condition} onClick={() => props.onClick()}>
          {props.trueDecorator}
        </IconButton>
        <IconButton disabled={!props.condition} onClick={() => props.onClick()}>
          {props.falseDecorator}
        </IconButton>
      </ButtonGroup>
    </Box>
  );
}
