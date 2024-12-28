import Typography from "@mui/joy/Typography";

import { rowScope } from "../helpers/status-conditions";
import { SxProps } from "@mui/joy/styles/types";

export function TableState({ state, text }: { state: string; text: string | number }) {
  const scope = rowScope(state);

  const colorSXProps: SxProps = [
    {
      color:
        (scope === "success" && ((theme) => theme.vars.palette.darkPalette.tableButtonSuccess)) ||
        (scope === "fail" && ((theme) => theme.vars.palette.darkPalette.tableButtonDanger)) ||
        (scope === "wait" && ((theme) => theme.vars.palette.darkPalette.tableButtonWarning)) ||
        ((theme) => theme.vars.palette.neutral),
    },
  ];

  return (
    <Typography level="body-xs" sx={colorSXProps}>
      {text.toString().toUpperCase()}
    </Typography>
  );
}
