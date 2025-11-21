import { useShallow } from "zustand/react/shallow";

import { Box, FormControl, FormHelperText, Switch } from "@mui/joy";
import { Typography } from "@mui/joy";

import { useInventoryDetailFilterStore } from "../store/inventory-detail-filter-store";
import { InventoryDetailFilterParams } from "../store/inventory-detail-filter-params";

export default function InventoryDetailFilterFilterSwitch() {
  const toFilter = useInventoryDetailFilterStore(useShallow((state) => state.filter.toFilter));
  const changeFilter = useInventoryDetailFilterStore(useShallow((state) => state.changeFilter));

  return (
    <Box sx={{ display: "flex", pt: 2, alignItems: "stretch" }}>
      <FormControl size="sm" id={InventoryDetailFilterParams.TO_FILTER}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "stretch", gap: 2 }}>
          {toFilter ? <Typography color="neutral">НЕТ</Typography> : <Typography>НЕТ</Typography>}

          <Switch
            color="neutral"
            disabled={false}
            size="md"
            variant="outlined"
            checked={toFilter}
            onChange={(event) =>
              changeFilter({
                key: InventoryDetailFilterParams.TO_FILTER,
                value: event.target.checked ? "true" : "false",
              })
            }
          />
          {toFilter ? <Typography>ДА</Typography> : <Typography color="neutral">ДА</Typography>}
        </Box>
        <FormHelperText>Фильтровать</FormHelperText>
      </FormControl>
    </Box>
  );
}
