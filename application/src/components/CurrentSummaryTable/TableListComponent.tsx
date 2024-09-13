import * as React from "react";
import { Box, Link, List, ListDivider, ListItem, ListItemContent, Typography } from "@mui/joy";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { CurrentSummaryTableProps } from "./CurrentSummaryTable";

const TableListComponent = (props: CurrentSummaryTableProps) => {
  //   const { mode, systemMode } = useColorScheme();
  //   systemMode;
  const { store } = React.useContext(Context);
  return (
    <React.Fragment>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        {store.SummaryStore.records.map((row) => (
          <List key={row.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                // backgroundColor: "blue",
              }}
            >
              <ListItemContent sx={{ display: "flex", gap: 0.5, alignItems: "start", flexDirection: "column" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    // backgroundColor: "beige",
                    width: "100%",
                  }}
                >
                  <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    {row.conveyor.value}
                  </Typography>
                  {/* <Typography level="body-xs"> */}
                  <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    {row.product.marking} - {row.boil.value}
                    {/* {row.histories.length ? row.histories[row.histories.length - 1].historyType.description : ""} */}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",

                    justifyContent: "space-between",
                    gap: 0.5,
                    // backgroundColor: "green",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 0.5,

                      //   backgroundColor: "red",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%",
                        gap: 0.5,
                        // backgroundColor: "cyan",
                      }}
                    >
                      <Typography level="body-xs">&bull;</Typography>
                      <Typography level="body-xs">Аппарат: {row.apparatus.value}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        width: "100%",
                        gap: 0.5,
                        // backgroundColor: "yellow",
                      }}
                    >
                      <Typography level="body-xs">&bull;</Typography>
                      <Typography level="body-xs">Емкость: {row.can.value}</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      //   , backgroundColor: "yellow"
                    }}
                  >
                    <Link
                      level="body-sm"
                      component="button"
                      onClick={() => alert("Тут будет подробная запись сводки!")}
                    >
                      Подробнее...
                    </Link>
                  </Box>
                </Box>
              </ListItemContent>
            </ListItem>
            <ListDivider />
          </List>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default observer(TableListComponent);
