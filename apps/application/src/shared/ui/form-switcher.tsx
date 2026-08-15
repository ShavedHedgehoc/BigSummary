import { Box, Switch } from "@mui/joy";

export interface FormSwitcherProps {
  condition: boolean;
  onChange: (val: boolean) => void;
}

export default function FormSwitcher(props: FormSwitcherProps) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexGrow: 1 }}>
      <Switch
        color="neutral"
        disabled={false}
        size="md"
        variant="outlined"
        checked={props.condition}
        onChange={(event) => props.onChange(event.target.checked)}
      />
    </Box>
  );
}
