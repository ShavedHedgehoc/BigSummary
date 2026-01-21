import { useShallow } from "zustand/react/shallow";

import { Button, Stack, ToggleButtonGroup, Typography } from "@mui/joy";
import { TubePostName, useTubeRecordDetailPostStore } from "./store/use-tube-record-detail-post-store";
import { PostNames } from "../../shared/helpers/post-names";

export default function TubeRecordDetailToggle() {
  const post = useTubeRecordDetailPostStore(useShallow((state) => state.post));
  const setPostName = useTubeRecordDetailPostStore(useShallow((state) => state.setPostName));

  const handleChange = (newValue: TubePostName | null) => {
    newValue && setPostName(newValue);
  };

  const postHeader = {
    extrusion: PostNames.EXTRUSION,
    varnish: PostNames.VARNISH,
    offset: PostNames.OFFSET,
    sealant: PostNames.SEALANT,
  }[post];

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
      <ToggleButtonGroup
        size="md"
        value={post}
        onChange={(event: React.SyntheticEvent | null, newValue: TubePostName | null) => {
          event && newValue && handleChange(newValue);
        }}
      >
        <Button value="extrusion">Пост 1</Button>
        <Button value="varnish">Пост 2</Button>
        <Button value="offset">Пост 3</Button>
        <Button value="sealant">Пост 4</Button>
      </ToggleButtonGroup>
      <Typography level="h4">{postHeader}</Typography>
    </Stack>
  );
}
