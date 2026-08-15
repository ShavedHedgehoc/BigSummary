import { Box, FormControl, FormHelperText, Switch, Typography } from "@mui/joy";

export interface FilterSwitcherProps {
  id: string;
  condition: boolean;
  values: string[];
  label: string;
  setCondition: (val: boolean) => void;
}

export default function FilterSwitcher(props: FilterSwitcherProps) {
  return (
    <Box sx={{ display: "flex", pt: 2 }}>
      <FormControl size="sm" id={props.id}>
        <Box sx={{ display: "flex", flex: "row", gap: 2, alignItems: "center", justifyContent: "center", pb: 1 }}>
          <Switch
            color="neutral"
            disabled={false}
            size="sm"
            variant="outlined"
            checked={props.condition}
            onChange={(event) => props.setCondition(event.target.checked)}
          />
          <Typography level="body-xs">{props.condition ? props.values[0] : props.values[1]}</Typography>
        </Box>

        <FormHelperText>{props.label}</FormHelperText>
      </FormControl>
    </Box>
  );
}
