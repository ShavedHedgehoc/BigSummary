import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { usePaginationStore } from "./hooks/usePaginationStore";
import { useQueryClient } from "@tanstack/react-query";
import { useShallow } from "zustand/shallow";
import { useEmployees } from "./hooks/useEmployees";

const perPageValues = [10, 15, 20, 50, 90];

const RecComponent = () => {
  const { data } = useEmployees();
  const page = usePaginationStore(useShallow((state) => state.page));
  const perPage = usePaginationStore(useShallow((state) => state.perPage));
  const total: number = data?.total ? data.total : 0;
  const firstRecord: number = total === 0 ? 0 : 1 + (page - 1) * perPage;
  const lastRecord: number = page * perPage > total ? total : page * perPage;

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography level="body-xs">
          Записи: {firstRecord} - {lastRecord} из {total}
        </Typography>
      </Box>
    </Box>
  );
};

const SelectComponent = () => {
  const { data } = useEmployees();
  const client = useQueryClient();
  const perPage = usePaginationStore(useShallow((state) => state.perPage));
  const changeLimit = usePaginationStore(useShallow((state) => state.changeLimit));
  const pages: number = data?.total ? Math.ceil(data.total / perPage) : 0;

  const SelectOptions = perPageValues.map((val) => (
    <Option value={val} key={val}>
      <Typography level="body-xs">{val}</Typography>
    </Option>
  ));

  const handleSelectChange = (newValue: number) => {
    changeLimit(newValue);
    client.invalidateQueries({ queryKey: ["employees"] });
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "row", gap: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography level="body-xs">Записей на странице:</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Select
          size="sm"
          sx={{ fontSize: "small" }}
          defaultValue={perPage}
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
          disabled={pages === 0}
          onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
            event && newValue && handleSelectChange(newValue);
          }}
        >
          {SelectOptions}
        </Select>
      </Box>
    </Box>
  );
};

const PagesComponent = () => {
  const { data } = useEmployees();
  const client = useQueryClient();
  const page = usePaginationStore(useShallow((state) => state.page));
  const perPage = usePaginationStore(useShallow((state) => state.perPage));
  const setPage = usePaginationStore(useShallow((state) => state.setPage));
  const prevPage = usePaginationStore(useShallow((state) => state.prevPage));
  const nextPage = usePaginationStore(useShallow((state) => state.nextPage));
  const pages: number = data?.total ? Math.ceil(data.total / perPage) : 0;

  const handleFirstPageButtonClick = () => {
    setPage(1);
    client.invalidateQueries({ queryKey: ["employees"] });
  };

  const handlePrevPageButtonClick = () => {
    prevPage();
    client.invalidateQueries({ queryKey: ["employees"] });
  };

  const handleNextPageButtonClick = () => {
    nextPage();
    client.invalidateQueries({ queryKey: ["employees"] });
  };

  const handleLastPageButtonClick = () => {
    setPage(pages);
    client.invalidateQueries({ queryKey: ["employees"] });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
      <IconButton
        size="sm"
        variant="outlined"
        disabled={page === 1 || pages === 0}
        onClick={() => handleFirstPageButtonClick()}
      >
        <KeyboardDoubleArrowLeftOutlinedIcon />
      </IconButton>
      <IconButton
        size="sm"
        variant="outlined"
        disabled={page === 1 || pages === 0}
        onClick={() => handlePrevPageButtonClick()}
      >
        <KeyboardArrowLeftOutlinedIcon />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography level="body-xs">
          Страница {pages === 0 ? 0 : page} из {pages}
        </Typography>
      </Box>
      <IconButton
        size="sm"
        variant="outlined"
        disabled={page === pages || pages === 0}
        onClick={() => handleNextPageButtonClick()}
      >
        <KeyboardArrowRightOutlinedIcon />
      </IconButton>
      <IconButton
        size="sm"
        variant="outlined"
        disabled={page === pages || pages === 0}
        onClick={() => handleLastPageButtonClick()}
      >
        <KeyboardDoubleArrowRightOutlinedIcon />
      </IconButton>
    </Box>
  );
};

export const PaginationComponent = () => {
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
        <RecComponent />
        <SelectComponent />
        <PagesComponent />
      </Sheet>
    </React.Fragment>
  );
};
