import { Stack, Typography, Select, FormControl, Option } from "@mui/joy";

interface TubeConveyor {
  id: number;
  name: string;
}

interface TresholdsConveyorEntryProps {
  id: string;
  value: number | null;
  options: TubeConveyor[] | [];
  setSelected: (value: number) => void;
  onChange: ({ key, value, values }: { key: string; value: string; values?: number[] }) => void;
}

export function TresholdsConveyorEntry(props: TresholdsConveyorEntryProps) {
  const handleChangeConveyor = (newValue: number | null) => {
    newValue && props.setSelected(newValue);
    newValue && props.onChange({ key: props.id, value: "", values: [newValue] });
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="row" gap={1}>
        <Typography level="title-sm">Конвейер:</Typography>
        <span style={{ color: "red", fontWeight: "bold" }}>*</span>
      </Stack>
      <Select
        size="sm"
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
          event && newValue && handleChangeConveyor(newValue);
        }}
        value={props.value}
        required={true}
      >
        {props.options.map((item) => (
          <Option value={item.id} key={item.id}>
            <FormControl size="sm">{item.name}</FormControl>
          </Option>
        ))}
      </Select>
    </Stack>
  );
}
