import { MoreVert } from "@mui/icons-material";
import { Dropdown, MenuButton, IconButton, Menu, MenuItem, ListItemDecorator } from "@mui/joy";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/react/shallow";
import { IConveyorData } from "../../../shared/api/services/tube-conveyors-service";
import { useDashFinishModalStore } from "../store/use-dash-finish-modal-store";
import { useDashSelectSummaryModalStore } from "../store/use-dash-select-summary-modal-store";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

export default function DashTubeCardMenu({ conveyor }: { conveyor: IConveyorData }) {
  const setOpenFinish = useDashFinishModalStore(useShallow((state) => state.setOpen));
  const setOpenStart = useDashSelectSummaryModalStore(useShallow((state) => state.setOpen));
  const setTitleStart = useDashSelectSummaryModalStore(useShallow((state) => state.setTitle));
  const setTitleFinish = useDashFinishModalStore(useShallow((state) => state.setTitle));
  const setSummaryId = useDashFinishModalStore(useShallow((state) => state.setSummaryId));
  const setBoilValue = useDashFinishModalStore(useShallow((state) => state.setBoilValue));
  const setConveyorId = useDashSelectSummaryModalStore(useShallow((state) => state.setConveyorId));
  const client = useQueryClient();

  const handleFinishButtonClick = () => {
    setTitleFinish("Закончить партию");
    setBoilValue(conveyor.summary?.batch_name ?? null);
    setSummaryId(conveyor.summary?.id ?? null);
    setOpenFinish(true);
  };

  const handleStartButtonClick = () => {
    client.invalidateQueries({ queryKey: ["tube_available_summaries"] });
    setTitleStart("Начать партию");
    setConveyorId(conveyor.id);
    setOpenStart(true);
  };

  const disbledStopCondition =
    conveyor.summary?.extrusion?.state !== "finished" ||
    conveyor.summary?.varnish?.state !== "finished" ||
    conveyor.summary?.offset?.state !== "finished" ||
    conveyor.summary?.sealant?.state !== "finished";

  const disabledStartCondition = conveyor.summary !== null;

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        sx={{ px: 1 }}
      >
        <MoreVert />
      </MenuButton>
      <Menu placement="bottom-end">
        <MenuItem disabled={disabledStartCondition} onClick={handleStartButtonClick}>
          <ListItemDecorator>
            <PlayCircleFilledWhiteOutlinedIcon />
          </ListItemDecorator>
          Поставить на фасовку
        </MenuItem>
        <MenuItem disabled={disbledStopCondition} onClick={handleFinishButtonClick}>
          <ListItemDecorator>
            <StopCircleOutlinedIcon />
          </ListItemDecorator>
          Завершить фасовку
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
