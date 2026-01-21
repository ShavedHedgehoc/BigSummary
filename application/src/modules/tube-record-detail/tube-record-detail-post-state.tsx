import { Stack, Typography } from "@mui/joy";
import { PostState } from "../../shared/api/services/tube-records-service";

export default function TubeRecordDetailPostState({ state }: { state: PostState | null }) {
  const message = state
    ? {
        working: "Работает",
        idle: "Простой",
        finished: "Закончил",
      }[state]
    : "Нет данных";
  return (
    <Stack gap={1}>
      <Typography level="h4">Статус поста</Typography>
      <Typography level="body-md">{message}</Typography>
    </Stack>
  );
}
