import { Stack, Typography, Select, FormControl, Option } from "@mui/joy";

interface TubeRondel {
  id: number;
  value: string;
}

interface TresholdsSelectEntryProps {
  id: string;
  title: string;
  value: number | null;
  options: TubeRondel[] | [];
  setSelected: (value: number) => void;
  onChange: ({ key, value, values }: { key: string; value: string; values?: number[] }) => void;
}

export default function TresholdsSelectEntry(props: TresholdsSelectEntryProps) {
  const handleChange = (newValue: number | null) => {
    newValue && props.setSelected(newValue);
    newValue && props.onChange({ key: props.id, value: "", values: [newValue] });
  };
  return (
    <Stack spacing={1}>
      <Stack direction="row" gap={1}>
        <Typography level="title-sm">{props.title}</Typography>
        <span style={{ color: "red", fontWeight: "bold" }}>*</span>
      </Stack>

      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Typography level="body-xs">Выберите:</Typography>
        <Select
          size="sm"
          slotProps={{
            button: { sx: { whiteSpace: "nowrap" } },
            listbox: { sx: { zIndex: 999999 } },
          }}
          sx={{
            minWidth: "210px",
            maxWidth: "200px",
            display: "flex",
            flexShrink: 1,
          }}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
            event && newValue && handleChange(newValue);
          }}
          value={props.value}
          required={true}
        >
          {props.options.map((item) => (
            <Option value={item.id} key={item.id}>
              <FormControl size="sm">{item.value}</FormControl>
            </Option>
          ))}
        </Select>
      </Stack>
    </Stack>
  );
}
