import * as React from "react";
import { Box, FormControl, FormHelperText, IconButton, Option, Checkbox, Select, SelectStaticProps } from "@mui/joy";
import CloseRounded from "@mui/icons-material/CloseRounded";

export interface FilterMultiSelectorOptionProps {
  id: number;
  value: string;
  options: number[] | [];
}

export interface FilterMultiSelectorProps {
  id: string;
  selectedOptions: number[] | [];
  placeholder: string;
  label: string;
  options: React.ReactNode;
  changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) => void;
}

export function FilterMultiSelectorOption(props: FilterMultiSelectorOptionProps) {
  return (
    <Option value={props.id} key={props.id}>
      <FormControl size="sm">
        <Checkbox color="neutral" checked={[...props.options].includes(props.id)} label={props.value} />
      </FormControl>
    </Option>
  );
}

export default function FilterMultiSelector(props: FilterMultiSelectorProps) {
  const action: SelectStaticProps["action"] = React.useRef(null);
  return (
    <Box sx={{ display: "flex", pt: 1 }}>
      <FormControl size="sm" id={props.id}>
        <Select
          action={action}
          size="sm"
          multiple
          placeholder={props.placeholder}
          value={[...props.selectedOptions]}
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
          onChange={(event: React.SyntheticEvent | null, newValue: number[] | null) => {
            event && newValue && props.changeFilter({ key: props.id, value: "", values: newValue });
          }}
          {...(props.selectedOptions.length > 0 && {
            endDecorator: (
              <IconButton
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  props.changeFilter({ key: props.id, value: "", values: [] });
                  action.current?.focusVisible();
                }}
              >
                <CloseRounded />
              </IconButton>
            ),
            indicator: null,
          })}
        >
          {props.options}
        </Select>
        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </Box>
  );
}
