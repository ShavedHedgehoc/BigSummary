import { useShallow } from "zustand/react/shallow";
import { TubePostName, useTubeTresholdsPostStore } from "./store/use-tube-tresholds-post-store";
import { Button, ToggleButtonGroup } from "@mui/joy";

export default function TubeTresholdsToggle() {
  const post = useTubeTresholdsPostStore(useShallow((state) => state.post));
  const setPostName = useTubeTresholdsPostStore(useShallow((state) => state.setPostName));

  const handleChange = (newValue: TubePostName | null) => {
    newValue && setPostName(newValue);
  };
  return (
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
  );
}
