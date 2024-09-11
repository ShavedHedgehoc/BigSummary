import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";

export interface HelperProps {
  openDrawer: boolean;
  toggleDrawer(val: boolean): void;
}

export default function DetailHelper(props: HelperProps) {
  return (
    <Drawer anchor="bottom" open={props.openDrawer} onClose={() => props.toggleDrawer(false)}>
      <Box sx={{ maxHeight: "600px" }} role="presentation" onClick={() => props.toggleDrawer(false)}>
        <List>
          <ListItem>
            <ListItemText primary={"Подсказка"} primaryTypographyProps={{ color: "primary", fontSize: "x-large" }} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Нажатие этой кнопки вызывает меню авторизации пользователя"}
              primaryTypographyProps={{ color: "info", fontSize: "large" }}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <AspectRatioIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Нажатие этой кнопки переключает вид (краткий/подробный)"}
              primaryTypographyProps={{ color: "info", fontSize: "large" }}
            />
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemIcon>
              <QuestionMarkIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Нажатие этой кнопки вызывает подсказку"}
              primaryTypographyProps={{ color: "info", fontSize: "large" }}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <ArrowBackIosNewIcon />
            </ListItemIcon>
            <ListItemText
              primary={"Нажатие этой кнопки возвращает к предыдущей странице"}
              primaryTypographyProps={{ color: "info", fontSize: "large" }}
            />
          </ListItem>

          <Divider />
          <ListItem>
            <ListItemText
              secondary={"Для того, чтобы отметить начало фасовки, необходимо:"}
              secondaryTypographyProps={{ color: "secondary", fontSize: "large" }}
            />
          </ListItem>
          <ListItem>
            <ListItemText secondary={"- Статус сводки 'Допуск на фасовку'"} />
          </ListItem>
          <ListItem>
            <ListItemText
              secondary={"- Пользователь должен быть авторизован (Меню авторизации вызывается нажатием на значок)"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              secondary={"- Пользователь должен иметь соответствующие права (Назначается администратором)"}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              secondary={"Для того, чтобы отметить конец фасовки, необходимо:"}
              secondaryTypographyProps={{ color: "secondary", fontSize: "large" }}
            />
          </ListItem>
          <ListItem>
            <ListItemText secondary={"- Статус сводки 'Продукт фасуется'"} />
          </ListItem>
          <ListItem>
            <ListItemText
              secondary={"- Пользователь должен быть авторизован (Меню авторизации вызывается нажатием на значок)"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              secondary={"- Пользователь должен иметь соответствующие права (Назначается администратором)"}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
