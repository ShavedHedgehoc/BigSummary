import * as React from "react";
import { Box, FormControl, Option, Select, SelectStaticProps } from "@mui/joy";

export interface ModalSelectorOptionProps {
  id: number;
  value: string;
}

export interface ModalSelectorProps {
  id: string;
  fullWidth?: boolean;
  selectedOption: number | null;
  placeholder: string;
  options: React.ReactNode;
  setSelectedOption: (id: number) => void;
  onChange: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) => void;
}

export function ModalSelectorOption(props: ModalSelectorOptionProps) {
  return (
    <Option value={props.id} key={props.id}>
      <FormControl size="sm">{props.value}</FormControl>
    </Option>
  );
}

export default function ModalSelector(props: ModalSelectorProps) {
  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && props.setSelectedOption(newValue);
    newValue && props.onChange({ key: props.id, value: "", values: newValue === 999999 ? [] : [newValue] });
  };
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <FormControl size="sm" sx={{ width: "100%" }}>
        <Select
          action={action}
          size="sm"
          placeholder={props.placeholder}
          value={props.selectedOption}
          slotProps={{
            button: { sx: { whiteSpace: "nowrap" } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            minWidth: "220px",
            maxWidth: props.fullWidth ? "100%" : "220px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
            event && newValue && handleChange(newValue);
          }}
        >
          {props.options}
        </Select>
      </FormControl>
    </Box>
  );
}
