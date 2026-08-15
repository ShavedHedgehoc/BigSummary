import { IconButton, styled } from "@mui/joy";

export const TableIconButton = styled(IconButton, { slot: "root" })(({ theme }) => ({
  "&.MuiIconButton-colorDanger": { color: theme.vars.palette.darkPalette.tableButtonDanger },
  "&.MuiIconButton-colorSuccess ": { color: theme.vars.palette.darkPalette.tableButtonSuccess },
  "&.MuiIconButton-colorWarning ": { color: theme.vars.palette.darkPalette.tableButtonWarning },
  "&.Mui-disabled": { color: theme.vars.palette.text.tertiary },
}));
