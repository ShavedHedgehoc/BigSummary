import { Box, FormControl, Input } from "@mui/joy";

export interface ModalInputProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export default function ModalInput(props: ModalInputProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <FormControl size="sm">
        <Input
          sx={{
            "&:focus-within": {
              "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
            },
            // minWidth: "150px",
            // maxWidth: "150px",
            display: "flex",
            // flexGrow: 1,
            // flexShrink: 1,
          }}
          autoComplete="false"
          value={props.value}
          disabled={props.disabled}
          onChange={(e) => props.onChange(e.target.value)}
        />
      </FormControl>
    </Box>
  );
}
