import { Stack, Typography, FormControl, Input } from "@mui/joy";

interface TresholdsMinMaxEntryProps {
  idMin: string;
  idMax: string;
  title: string;
  isInteger: boolean;
  fromZero?: boolean;
  required: boolean;
  minValue: string;
  maxValue: string;
  onChange: ({ key, value }: { key: string; value: string }) => void;
}

export function TresholdsMinMaxEntry(props: TresholdsMinMaxEntryProps) {
  return (
    <Stack spacing={1}>
      <Stack direction="row" gap={1}>
        <Typography level="title-sm">{props.title}</Typography>
        {props.required && <span style={{ color: "red", fontWeight: "bold" }}>*</span>}
      </Stack>
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="body-xs">Минимум</Typography>
        <FormControl>
          <Input
            id={props.idMin}
            type="number"
            required={props.required}
            slotProps={{
              input: {
                min: props.isInteger ? (props.fromZero ? 0 : 1) : 0.01,
                step: props.isInteger ? 1 : 0.01,
              },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            size="sm"
            value={props.minValue}
            onChange={(e) => props.onChange({ key: props.idMin, value: e.target.value })}
          />
        </FormControl>
      </Stack>
      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="body-xs">Максимум</Typography>
        <FormControl>
          <Input
            id={props.idMax}
            type="number"
            required={props.required}
            slotProps={{
              input: {
                min: props.isInteger ? 1 : 0.01,
                step: props.isInteger ? 1 : 0.01,
              },
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            size="sm"
            value={props.maxValue}
            onChange={(e) => props.onChange({ key: props.idMax, value: e.target.value })}
          />
        </FormControl>
      </Stack>
    </Stack>
  );
}
