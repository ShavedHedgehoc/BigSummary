import * as React from "react";
import { Context } from "../../main";
import { IPlant } from "../../types/plant";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { Button, Typography, Box } from "@mui/material";

import SideMenu from "../sideMenu/SideMenu";
import Loading from "../ui/Loading";
import { Observer, observer } from "mobx-react-lite";

function Selector() {
  const { store } = React.useContext(Context);
  const [plants, setPlants] = React.useState({} as IPlant[]);
  const navigate = useNavigate();

  const setData = () => {
    if (store.PlantStore.plants.length > 0 && store.PlantStore.error.length === 0) {
      setPlants(store.PlantStore.plants);
    } else {
      setPlants({} as IPlant[]);
    }
  };

  React.useEffect(() => {
    store.PlantStore.fetchPlants().then(() => setData());
  }, []);

  if (store.PlantStore.pending) {
    return <Loading />;
  }

  if (store.PlantStore.error.length > 0) {
    return (
      <>
        {store.PlantStore.error.map((item) => (
          <p>{item}</p>
        ))}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "start",
        justifyContent: "center",
        paddingTop: "30px ",
      }}
    >
      <Grid item xl={4} xs={10} gap={2} container>
        <Typography variant="h4">Выберите площадку</Typography>
        {/* {plants.length > 0 &&
          plants.map((item) => ( */}
        {store.PlantStore.plants.length > 0 &&
          store.PlantStore.plants.map((item) => (
            <Button
              sx={{ paddingTop: "15px", paddingBottom: "15px", fontSize: "1.5rem" }}
              variant="contained"
              fullWidth
              size="large"
              color="warning"
              onClick={() => navigate(`/${item.id}`)}
              key={`button_${item.id}`}
            >
              {item.value}
            </Button>
          ))}
      </Grid>
      {/* <SideMenu /> */}
    </Box>
  );
}

export default observer(Selector);
