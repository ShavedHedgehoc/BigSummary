import * as React from "react";
import { Box, FormControl, Option, Select, SelectStaticProps } from "@mui/joy";
import { DashMode, useDashModeStore } from "./store/use-dash-mode-store";
import { useShallow } from "zustand/react/shallow";

function DashFilterModeSelectorOption() {
  const options = [
    { id: "packaging", value: "Фасовка" },
    { id: "tubes", value: "Тубы" },
  ];
  return options.map((item) => (
    <Option value={item.id} key={item.id}>
      <FormControl size="sm">{item.value}</FormControl>
    </Option>
  ));
}

export default function DashFilterModeSelector() {
  const mode = useDashModeStore(useShallow((state) => state.mode));
  const changeMode = useDashModeStore(useShallow((state) => state.changeMode));
  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: DashMode | null) => {
    newValue && changeMode(newValue);
  };
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={"plants"}>
        <Select
          action={action}
          size="sm"
          value={mode}
          slotProps={{
            button: { sx: { whiteSpace: "nowrap" } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            minWidth: "220px",
            maxWidth: "220px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: DashMode | null) => {
            event && newValue && handleChange(newValue);
          }}
        >
          <DashFilterModeSelectorOption />
        </Select>
      </FormControl>
    </Box>
  );
}
