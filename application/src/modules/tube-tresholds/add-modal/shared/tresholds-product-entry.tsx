import { Stack, Typography, Select, FormControl, Option } from "@mui/joy";

interface TubeProduct {
  id: number;
  code: string;
  marking: string;
  name: string;
}

interface TresholdsProductEntryProps {
  id: string;
  value: number | null;
  options: TubeProduct[] | [];
  setSelected: (value: number) => void;
  onChange: ({ key, value, values }: { key: string; value: string; values?: number[] }) => void;
}

export function TresholdsProductEntry(props: TresholdsProductEntryProps) {
  const handleChangeProduct = (newValue: number | null) => {
    newValue && props.setSelected(newValue);
    newValue && props.onChange({ key: props.id, value: "", values: [newValue] });
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
      <Stack direction="row" gap={1}>
        <Typography level="title-sm">Продукт:</Typography>
        <span style={{ color: "red", fontWeight: "bold" }}>*</span>
      </Stack>
      <Select
        size="sm"
        slotProps={{
          button: { sx: { whiteSpace: "nowrap" } },
          listbox: { sx: { zIndex: 999999, maxHeight: "3  00px" } },
        }}
        sx={{
          display: "flex",
          flexShrink: 1,
          flexGrow: 1,
        }}
        onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
          event && newValue && handleChangeProduct(newValue);
        }}
        value={props.value}
        required={true}
      >
        {props.options.map((item) => (
          <Option value={item.id} key={item.id}>
            <FormControl size="sm">{`${item.code} ${item.name}`}</FormControl>
          </Option>
        ))}
      </Select>
    </Stack>
  );
}
