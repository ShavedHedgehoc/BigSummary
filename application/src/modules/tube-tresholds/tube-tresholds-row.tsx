import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { StyledTypography } from "../../shared/ui/styled-typography";
import {
  ITubeExtrusionTresholdRow,
  ITubeOffsetTresholdRow,
  ITubeSealantTresholdRow,
  ITubeVarnishTresholdRow,
} from "../../shared/api/services/tube-tresholds-service";
import { useTubeTresholdsFilterStore } from "./store/use-tube-tresholds-filter-store";
import { useShallow } from "zustand/react/shallow";
import { TubeTresholdsFilterParams } from "./filter/tube-tresholds-filter-params";
import { useTubeTresholdsExtrusionFormModalStore } from "./store/use-form-modals-store";
import { useTubeTresholdsPostStore } from "./store/use-tube-tresholds-post-store";
import { useTubeExtrusionTresholdsStore } from "./add-modal/store/use-tube-extrusion-tresholds-store";
import {
  isExtrusionTreshold,
  isOffsetTreshold,
  isSealantTreshold,
  isVarnishTreshold,
} from "./add-modal/tresholds-guards";
import { useTubeVarnishTresholdsStore } from "./add-modal/store/use-tube-varnish-tresholds-store";
import { useTubeOffsetTresholdsStore } from "./add-modal/store/use-tube-offset-tresholds-store";
import { useTubeSealantTresholdsStore } from "./add-modal/store/use-tube-sealant-tresholds-store";

export default function TubeTresholdsRow({
  row,
}: {
  row: ITubeExtrusionTresholdRow | ITubeVarnishTresholdRow | ITubeOffsetTresholdRow | ITubeSealantTresholdRow;
}) {
  const changeFilter = useTubeTresholdsFilterStore(useShallow((state) => state.changeFilter));
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));
  const setExtrusionTreshold = useTubeExtrusionTresholdsStore(useShallow((state) => state.setTreshold));
  const setVarnishTreshold = useTubeVarnishTresholdsStore(useShallow((state) => state.setTreshold));
  const setOffsetTreshold = useTubeOffsetTresholdsStore(useShallow((state) => state.setTreshold));
  const setSealantTreshold = useTubeSealantTresholdsStore(useShallow((state) => state.setTreshold));

  const handleOpenExtrusion = (val: boolean) => {
    row.last && isExtrusionTreshold(row.last) && setExtrusionTreshold(row.last);
    setOpen(val);
  };

  const handleOpenVarnish = (val: boolean) => {
    console.log(row.last);
    row.last && isVarnishTreshold(row.last) && setVarnishTreshold(row.last);
    setOpen(val);
  };

  const handleOpenOffset = (val: boolean) => {
    row.last && isOffsetTreshold(row.last) && setOffsetTreshold(row.last);
    setOpen(val);
  };

  const handleOpenSealant = (val: boolean) => {
    row.last && isSealantTreshold(row.last) && setSealantTreshold(row.last);
    setOpen(val);
  };

  const post = useTubeTresholdsPostStore(useShallow((state) => state.post));

  const handleAddCopy = {
    extrusion: handleOpenExtrusion,
    varnish: handleOpenVarnish,
    offset: handleOpenOffset,
    sealant: handleOpenSealant,
  }[post];

  const handleAddSearchClick = () => {
    changeFilter({ key: TubeTresholdsFilterParams.CODE, value: row.product_code });
  };

  return (
    <tr key={`tr_${row.conveyor_id}_${row.product_id}`}>
      <td style={{ width: 30, textAlign: "center", padding: "12px 6px" }}>
        <IconButton color="neutral" size="sm" onClick={() => handleAddSearchClick()}>
          <KeyboardArrowUpOutlinedIcon />
        </IconButton>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 36px" }}>
        <Typography level="body-xs">{row.product_code}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product_marking}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product_name ?? "-"}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.conveyor_name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.count} state={row.count === 0 ? "fail" : "success"} />
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton color="success" size="sm" onClick={() => handleAddCopy(true)} disabled={row.count === 0}>
            <AddOutlinedIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
