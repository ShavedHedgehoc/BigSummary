import * as React from "react";

import { Box, Option, Select, Sheet, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";

export const perPageValues = [10, 15, 20, 50, 90];
export const extPerPageValues = [10, 15, 20, 50, 90, 200, 1000, 2000, 10000, 50000];
export interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  extPerPage?: boolean;
  increasePage: () => void;
  decreasePage: () => void;
  setLimit: (val: number) => void;
  setPage: (val: number) => void;
}

export function Pagination(props: PaginationProps) {
  const pages = Math.ceil(props.total / props.limit);

  return (
    <React.Fragment>
      <Sheet
        className="Container"
        variant="outlined"
        sx={[
          {
            display: { xs: "none", xl: "flex" },
            width: "100%",
            borderRadius: "sm",
            justifyContent: "flex-end",
            mt: "auto",
            gap: 3,
            p: 1,
            borderWidth: "1px",
          },
          (theme) => ({
            backgroundColor: theme.variants.soft.neutral,
          }),
        ]}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Записи: {pages === 0 ? 0 : 1 + (props.page - 1) * props.limit} -{" "}
              {props.page * props.limit > props.total ? props.total : props.page * props.limit} из {props.total}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">Записей на странице:</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Select
              size="sm"
              sx={{ fontSize: "small" }}
              defaultValue={props.limit}
              slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
              disabled={pages === 0}
              onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
                event && newValue && props.setLimit(newValue);
              }}
            >
              {props.extPerPage
                ? extPerPageValues.map((val) => (
                    <Option value={val} key={val}>
                      <Typography level="body-xs">{val}</Typography>
                    </Option>
                  ))
                : perPageValues.map((val) => (
                    <Option value={val} key={val}>
                      <Typography level="body-xs">{val}</Typography>
                    </Option>
                  ))}
            </Select>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === 1 || props.total === 0}
            onClick={() => props.setPage(1)}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === 1 || props.total === 0}
            onClick={() => props.decreasePage()}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Страница {pages === 0 ? 0 : props.page} из {pages}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === pages || pages === 0}
            onClick={() => props.increasePage()}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={props.page === pages || pages === 0}
            onClick={() => props.setPage(pages)}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}
