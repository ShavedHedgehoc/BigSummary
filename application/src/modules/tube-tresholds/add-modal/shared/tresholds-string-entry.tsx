import { Stack, Typography, FormControl, Input } from "@mui/joy";

interface TresholdsStringEntryProps {
  id: string;
  title: string;
  value: string;
  required: boolean;
  onChange: ({ key, value }: { key: string; value: string }) => void;
}

export function TresholdsStringEntry(props: TresholdsStringEntryProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" gap={1}>
        <Typography level="title-sm">{props.title}</Typography>
        <span style={{ color: "red", fontWeight: "bold" }}>*</span>
      </Stack>
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="body-xs">Введите значение</Typography>
        <FormControl>
          <Input
            type="text"
            required={props.required}
            size="sm"
            value={props.value}
            onChange={(e) => props.onChange({ key: props.id, value: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
