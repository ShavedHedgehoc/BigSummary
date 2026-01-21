import { Stack, Button } from "@mui/joy";

interface TresholdsButtonsProps {
  setOpen: (val: boolean) => void;
  clearData: () => void;
}

export default function TresholdsButtons(props: TresholdsButtonsProps) {
  const handleCancelClick = () => {
    props.setOpen(false);
    props.clearData();
  };
  return (
    <Stack direction="row" justifyContent="end" alignItems={"end"} gap={2}>
      <Button
        color="neutral"
        variant="outlined"
        size="sm"
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleCancelClick()}
      >
        Отмена
      </Button>
      <Button
        type="submit"
        color="neutral"
        variant="outlined"
        size="sm"
        sx={{ fontWeight: "normal", fontSize: "small" }}
      >
        Записать
      </Button>
    </Stack>
  );
}
