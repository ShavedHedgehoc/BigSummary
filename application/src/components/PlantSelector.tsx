import * as React from "react";
import { Context } from "../main";
import { Box, FormControl, FormLabel, Option, Select } from "@mui/joy";
import { observer } from "mobx-react-lite";

export interface SelectorProps {
  mobile: boolean;
}

const Selector = observer(function Selector(props: SelectorProps) {
  const { store } = React.useContext(Context);
  console.log(`selector`);
  return (
    store.PlantStore.plants.length > 0 &&
    store.PlantStore.currentPlantExists && (
      <Select
        size={props.mobile ? "lg" : "sm"}
        sx={[props.mobile && { width: "100%" }]}
        placeholder="Выберите площадку"
        defaultValue={store.PlantStore.currentPlant?.id}
        slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
          event && newValue && store.PlantStore.setCurrentPlant(newValue);
        }}
      >
        {/* {store.PlantStore.plants.map((plant) => (
          <Option value={plant.id} key={plant.id}>
            {plant.value}
          </Option>
        ))} */}
        {store.PlantStore.selectorOptions.map((plant) => (
          <Option value={plant.id} key={plant.id}>
            {plant.value}
          </Option>
        ))}
      </Select>
    )
  );
});

function PlantSelector() {
  // const { store } = React.useContext(Context);
  React.useEffect(() => {
    console.log("Render plantselector");
  }, []);
  return (
    <React.Fragment>
      <Box
        className="PlantSelector-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}
      >
        <FormControl size="sm">
          <FormLabel>Площадка</FormLabel>
          <Selector mobile={false} />
          {/* <Select
            size="sm"
            placeholder="Выберите площадку"
            defaultValue={store.PlantStore.currentPlant?.id}
            slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
            onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
              event && newValue && store.PlantStore.setCurrentPlant(newValue);
            }}
          >
            {store.PlantStore.selectorOptions.map((plant) => (
              <Option value={plant.id} key={plant.id}>
                {plant.value}
              </Option>
            ))}
          </Select> */}
        </FormControl>
      </Box>
      <Box
        className="PlantSelector-mobile"
        sx={{
          display: { xs: "flex", sm: "none" },
          my: 1,
          gap: 1,
        }}
      >
        <Selector mobile={true} />
      </Box>
    </React.Fragment>
  );
}
export default PlantSelector;
