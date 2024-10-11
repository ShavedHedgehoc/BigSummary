import * as React from "react";
import { Context } from "../../main";
// import { observer } from "mobx-react-lite";
import { Box, Option, Select, Sheet, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { observer } from "mobx-react-lite";

export const perPageValues = [10, 15, 20, 50, 90];

function PaginationComponent() {
  const { store } = React.useContext(Context);

  return (
    <React.Fragment>
      <Sheet
        className="PaginationComponentContainer"
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
              Записи: {store.BoilStore.firstRecord} - {store.BoilStore.lastRecord} из {store.BoilStore.state.data.total}
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
              defaultValue={store.BoilStore.state.limit}
              slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
              disabled={store.BoilStore.pages === 0}
              onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
                event && newValue && store.BoilStore.changeLimit(newValue);
              }}
            >
              {perPageValues.map((val) => (
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
            disabled={store.BoilStore.state.page === 1 || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.firstPage()}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === 1 || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.prevPage()}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography level="body-xs">
              Страница {store.BoilStore.pages === 0 ? 0 : store.BoilStore.state.page} из {store.BoilStore.pages}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === store.BoilStore.pages || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.nextPage()}
          >
            <KeyboardArrowRightOutlinedIcon />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            disabled={store.BoilStore.state.page === store.BoilStore.pages || store.BoilStore.pages === 0}
            onClick={() => store.BoilStore.lastPage()}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </IconButton>
        </Box>
      </Sheet>
    </React.Fragment>
  );
}

export default observer(PaginationComponent);
// export default PaginationComponent;
