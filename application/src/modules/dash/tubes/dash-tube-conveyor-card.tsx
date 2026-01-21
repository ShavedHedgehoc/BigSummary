import { Sheet, Stack, Typography } from "@mui/joy";
import { IConveyorData } from "../../../shared/api/services/tube-conveyors-service";
import DashTubeCardMenu from "./dash-tube-card-menu";
import DashTubePostCard, { DashTubePostCardProps } from "./dash-tube-post-card";
import { PostNames } from "../../../shared/helpers/post-names";
import { useShallow } from "zustand/react/shallow";
import { DbRoles } from "../../../shared/db-roles";
import { useAuthStore } from "../../auth/store/auth-store";

export default function DashTubeConveyorCard({ conveyor }: { conveyor: IConveyorData }) {
  const user = useAuthStore(useShallow((state) => state.user));
  const extrusionPostProps: DashTubePostCardProps = {
    title: "Пост 1",
    production: conveyor.summary?.extrusion?.production ?? 0,
    employee: conveyor.summary?.extrusion?.employee ?? "",
    state: conveyor.summary?.extrusion?.state ?? "no_data",
    summary_id: conveyor.summary?.id ?? null,
    post_id: 1,
    post_name: PostNames.EXTRUSION,
  };
  const varnishPostProps: DashTubePostCardProps = {
    title: "Пост 2",
    production: conveyor.summary?.varnish?.production ?? 0,
    employee: conveyor.summary?.varnish?.employee ?? "",
    state: conveyor.summary?.varnish?.state ?? "no_data",
    summary_id: conveyor.summary?.id ?? null,
    post_id: 2,
    post_name: PostNames.VARNISH,
  };
  const offsetPostProps: DashTubePostCardProps = {
    title: "Пост 3",
    production: conveyor.summary?.offset?.production ?? 0,
    employee: conveyor.summary?.offset?.employee ?? "",
    state: conveyor.summary?.offset?.state ?? "no_data",
    summary_id: conveyor.summary?.id ?? null,
    post_id: 3,
    post_name: PostNames.OFFSET,
  };
  const sealantPostProps: DashTubePostCardProps = {
    title: "Пост 4",
    production: conveyor.summary?.sealant?.production ?? 0,
    employee: conveyor.summary?.sealant?.employee ?? "",
    state: conveyor.summary?.sealant?.state ?? "no_data",
    summary_id: conveyor.summary?.id ?? null,
    post_id: 4,
    post_name: PostNames.SEALANT,
  };

  return (
    <Sheet
      variant="outlined"
      sx={[
        {
          borderRadius: "sm",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 1,
          px: 2,
          py: 2,
        },
        () => ({
          bgcolor: "neutral.softBg",
        }),
      ]}
    >
      <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
        {conveyor.summary ? (
          <Stack gap={2}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
              <Typography level="h2">{conveyor.name}</Typography>
              {user?.roles?.includes(DbRoles.TUBE_DASH) && <DashTubeCardMenu conveyor={conveyor} />}
            </Stack>
            <Stack>
              <Typography level="body-sm">{`${conveyor.summary.product_code} ${conveyor.summary.product_name}`}</Typography>
              <Typography level="body-sm">{`Партия: ${conveyor.summary.batch_name}`}</Typography>
              <Typography level="body-sm">{`План: ${conveyor.summary.plan}`}</Typography>
            </Stack>
          </Stack>
        ) : (
          <Stack gap={2}>
            <Stack direction="row" sx={{ width: "100%", justifyContent: "space-between" }}>
              <Typography level="h2">{conveyor.name}</Typography>
              {user?.roles?.includes(DbRoles.TUBE_DASH) && <DashTubeCardMenu conveyor={conveyor} />}
            </Stack>
            <Typography level="body-sm">Нет активной записи сводки</Typography>
          </Stack>
        )}

        {conveyor.summary && (
          <Stack direction="row" gap={1} height="40%">
            <DashTubePostCard {...extrusionPostProps} />
            <DashTubePostCard {...varnishPostProps} />
            <DashTubePostCard {...offsetPostProps} />
            <DashTubePostCard {...sealantPostProps} />
          </Stack>
        )}
      </Stack>
    </Sheet>
  );
}
