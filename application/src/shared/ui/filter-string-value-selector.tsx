import * as React from "react";
import { Box, FormControl, FormHelperText, Option, Select, SelectStaticProps } from "@mui/joy";

export interface FilterStringValueSelectorOptionProps {
  id: string;
  value: string;
}

export interface FilterStringValueSelectorProps {
  id: string;
  selectedOption: string | null;
  placeholder: string;
  label: string;
  maxW?: number;
  options: React.ReactNode;
  setSelectedOption: (id: string) => void;
  changeFilter: ({ key, value, values }: { key: string; value: string; values: string[] | [] }) => void;
}

export function FilterStringValueSelectorOption(props: FilterStringValueSelectorOptionProps) {
  return (
    <Option value={props.id} key={props.id}>
      <FormControl size="sm">{props.value}</FormControl>
    </Option>
  );
}

export default function FilterStringValueSelector(props: FilterStringValueSelectorProps) {
  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: string | null) => {
    newValue && props.setSelectedOption(newValue);
    newValue && props.changeFilter({ key: props.id, value: "", values: newValue === "#" ? [] : [newValue] });
  };
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={"plants"}>
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
            minWidth: props.maxW ? `${props.maxW}px` : "220px",
            maxWidth: props.maxW ? `${props.maxW}px` : "220px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: string | null) => {
            event && newValue && handleChange(newValue);
          }}
        >
          {props.options}
        </Select>
        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </Box>
  );
}
