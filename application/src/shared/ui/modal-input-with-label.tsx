import { Box, FormControl, Input, Typography } from "@mui/joy";

export interface ModalInputProps {
  value: string;
  label: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export default function ModalInputWithLabel(props: ModalInputProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Typography level="body-sm">{props.label}</Typography>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <FormControl size="sm" sx={{ display: "flex", flexGrow: 1 }}>
          <Input
            sx={{
              "&:focus-within": {
                "--Input-focusedHighlight": `${props.value === "" ? "danger" : "var(--joy-palette-neutral-400)"}`,
              },
            }}
            error={props.value === ""}
            autoComplete="false"
            value={props.value}
            disabled={props.disabled}
            onChange={(e) => props.onChange(e.target.value)}
          />
        </FormControl>
      </Box>
    </Box>
  );
}
