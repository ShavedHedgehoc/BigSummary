import { useShallow } from "zustand/shallow";
import { useForemanFilterStore } from "./store/use-foreman-filter-store";
import { useCurrentRecords } from "../../shared/api/use-current-records";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {
  Avatar,
  Box,
  Divider,
  Dropdown,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Link,
  Typography,
  Chip,
  ListDivider,
  ColorPaletteProp,
  Button,
} from "@mui/joy";

function ForemanCard({ row }: { row: IDocRow }) {
  return <Box>{row.boil}</Box>;
}

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Rename</MenuItem>
        <MenuItem>Move</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function ForemanList() {
  const filter = useForemanFilterStore(useShallow((state) => state.filter));
  const { data, isSuccess } = useCurrentRecords({ filter: filter });

  return (
    <Box sx={{ display: { xs: "block", sm: "none" } }}>
      {isSuccess &&
        data.records.map((row) => (
          <List key={row.id} size="sm" sx={{ "--ListItem-paddingX": 0 }}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent sx={{ display: "flex", gap: 2, alignItems: "start" }}>
                {/* <ListItemDecorator>
                  <Avatar size="sm">{row.id}</Avatar>
                </ListItemDecorator> */}
                <div style={{ width: "100%" }}>
                  <Typography gutterBottom sx={{ fontWeight: 800 }}>
                    {row.conveyor}
                  </Typography>
                  {/* <Typography level="body-xs" gutterBottom>
                    {row.boil}
                  </Typography> */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: 0.5,
                      mb: 1,
                      //   bgcolor: "green",
                    }}
                  >
                    <Typography level="body-sm">{row.product}</Typography>
                    <Typography level="body-sm">&bull;</Typography>
                    <Typography level="body-sm">{row.boil}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                      //   mb: 1,
                      width: "100%",
                      //   bgcolor: "yellow",
                    }}
                  >
                    {/* <Button variant="outlined" size="sm">
                      Начать фасовку
                    </Button> */}
                    <Typography level="body-xs">{row.state}</Typography>
                    <RowMenu />
                  </Box>
                </div>
              </ListItemContent>
              {row.state !== "-" && (
                <div style={{ position: "absolute", top: 2, right: 2 }}>
                  <Chip
                    variant="soft"
                    size="sm"
                    startDecorator={
                      {
                        product_finished: <CheckRoundedIcon />,
                        Refunded: <AutorenewRoundedIcon />,
                        Cancelled: <BlockIcon />,
                      }[row.stateValue]
                    }
                    color={
                      {
                        product_finished: "success",
                        product_check: "warning",
                        Refunded: "neutral",
                        Cancelled: "danger",
                      }[row.stateValue] as ColorPaletteProp
                    }
                  >
                    {row.state}
                  </Chip>
                </div>
              )}
            </ListItem>
            <ListDivider />
          </List>
        ))}
    </Box>
  );
}
