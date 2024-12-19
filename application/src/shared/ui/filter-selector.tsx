import * as React from "react";
import { Box, FormControl, FormHelperText, Option, Select, SelectStaticProps } from "@mui/joy";

export interface FilterSelectorOptionProps {
  id: number;
  value: string;
}

export interface FilterSelectorProps {
  id: string;
  selectedOption: number;
  placeholder: string;
  label: string;
  options: React.ReactNode;
  setSelectedOption: (id: number) => void;
  changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) => void;
}

export function FilterSelectorOption(props: FilterSelectorOptionProps) {
  return (
    <Option value={props.id} key={props.id}>
      <FormControl size="sm">{props.value}</FormControl>
    </Option>
  );
}

export default function FilterSelector(props: FilterSelectorProps) {
  const action: SelectStaticProps["action"] = React.useRef(null);
  const handleChange = (newValue: number | null) => {
    newValue && props.setSelectedOption(newValue);
    newValue && props.changeFilter({ key: props.id, value: "", values: newValue === 999999 ? [] : [newValue] });
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
            minWidth: "220px",
            maxWidth: "220px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
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
