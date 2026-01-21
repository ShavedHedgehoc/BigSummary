import { useColorScheme, Stack, IconButton, Typography, Sheet } from "@mui/joy";
import { useDashTubePostStopModalStore } from "../store/use-dash-tube-post-stop-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../../auth/store/auth-store";
import { DbRoles } from "../../../shared/db-roles";

type IState = "working" | "idle" | "finished" | "no_data";

export interface DashTubePostCardProps {
  title: string;
  production: number;
  employee: string;
  state: IState;
  summary_id: number | null;
  post_id: number;
  post_name: string;
}

export default function DashTubePostCard(props: DashTubePostCardProps) {
  const { mode } = useColorScheme();
  const user = useAuthStore(useShallow((state) => state.user));
  const setOpen = useDashTubePostStopModalStore(useShallow((state) => state.setOpen));
  const setSummaryId = useDashTubePostStopModalStore(useShallow((state) => state.setSummaryId));
  const setPostId = useDashTubePostStopModalStore(useShallow((state) => state.setPostId));
  const setTitle = useDashTubePostStopModalStore(useShallow((state) => state.setTitle));

  const handleCloseClick = () => {
    setSummaryId(props.summary_id);
    setPostId(props.post_id);
    setTitle(props.post_name);
    setOpen(true);
  };
  const cardContent = {
    working: (
      <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
        {user?.roles?.includes(DbRoles.TUBE_DASH) && (
          <IconButton
            size="sm"
            variant="plain"
            sx={{ position: "absolute", top: 2, right: 2 }}
            onClick={handleCloseClick}
          >
            X
          </IconButton>
        )}
        <Stack>
          <Typography level="title-sm">{props.title}</Typography>

          <Typography level="body-xs">Работает</Typography>
        </Stack>
        <Typography level="h2">{props.production}</Typography>
        <Typography level="body-xs">{props.employee}</Typography>
      </Stack>
    ),
    idle: (
      <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
        <Stack>
          <Typography level="title-sm">{props.title}</Typography>
          <Typography level="body-xs">Простой</Typography>
        </Stack>
        <Typography level="h2">{props.production}</Typography>
        <Typography level="body-xs">{props.employee}</Typography>
      </Stack>
    ),
    finished: (
      <Stack sx={{ justifyContent: "space-between", height: "100%" }}>
        <Stack>
          <Typography level="title-sm">{props.title}</Typography>
          <Typography level="body-xs">Закончил</Typography>
        </Stack>
        <Typography level="h2">{props.production}</Typography>
        <Typography level="body-xs">{props.employee}</Typography>
      </Stack>
    ),
    no_data: (
      <Stack>
        <Typography level="title-sm">{props.title}</Typography>
        <Typography level="body-xs">Нет данных</Typography>
      </Stack>
    ),
  }[props.state];
  return (
    <Sheet
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexGrow: 1,
          width: "25%",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 1,
        },
        () => ({
          bgcolor: "neutral.softBg",

          color: mode === "light" ? "var(--joy-palette-neutral-400)" : "white",
          ...(props.state === "finished" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#e879f9" : "#a21caf",
          }),
          ...(props.state === "working" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#4ade80" : "#15803d",
          }),
          ...(props.state === "idle" && {
            color: "common.white",
            bgcolor: mode === "light" ? "#facc15" : "#a16207",
          }),
        }),
      ]}
    >
      {cardContent}
    </Sheet>
  );
}
