import { Stack, Typography } from "@mui/joy";

export default function TubeRecordDetailDefect({ defect }: { defect: number | null }) {
  return (
    <Stack gap={1}>
      <Typography level="h4">Брак</Typography>
      <Typography level="body-md">{defect ? `${defect} кг` : "Нет данных"}</Typography>
    </Stack>
  );
}
