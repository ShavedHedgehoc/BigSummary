import * as React from "react";
import BreadCrumbHeader from "../headers/BreadCrumbHeader";
import { Context } from "../../main";
import MainPageHeaderWithRenewProp from "../headers/MainPageHeaderWithRenewProp";
import TableSkeleton from "../tables/TableSkeleton";
import { Box, Button, Typography, useColorScheme } from "@mui/joy";

export default function UsersList() {
  const [initial, setInitial] = React.useState(false);
  const { store } = React.useContext(Context);
  const { mode, systemMode } = useColorScheme();

  React.useEffect(() => {
    store.RoleStore.fetchRoles()
      .then(() => store.UserStore.fetchUsers())
      .then(() => setInitial(true));
  });
  return (
    <React.Fragment>
      <BreadCrumbHeader breadcrumbs={["Администратор", "Пользователи БД"]} />
      <MainPageHeaderWithRenewProp title={"Пользователи БД"} renewData={() => store.BoilStore.fetchBoils()} />
      {initial && (
        <TableSkeleton>
          <thead>
            <tr>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Имя
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Email
              </th>
              <th scope="col" style={{ width: 240, textAlign: "center", padding: "12px 6px" }}>
                Роли
              </th>
              <th scope="col" style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                Доступ
              </th>
            </tr>
          </thead>
          <tbody>
            {store.UserStore.users.map((user) => (
              <tr key={user.id}>
                <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>{user.name}</td>
                <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>{user.email}</td>
                <td style={{ width: 240, textAlign: "center", padding: "12px 6px" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {store.RoleStore.roles.map((role) => (
                      <Button
                        variant={mode === "light" ? "soft" : "solid"}
                        color={user.roles.includes(role.value) ? "success" : "danger"}
                        size="sm"
                      >
                        <Typography level="body-xs" sx={{ color: "text.primary" }}>
                          {role.description}
                          {role.value}
                        </Typography>
                      </Button>
                    ))}
                  </Box>
                </td>
                <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
                  <Button
                    variant={mode === "light" ? "soft" : "solid"}
                    color={user.banned ? "danger" : "success"}
                    size="sm"
                  >
                    <Typography level="body-xs" sx={{ color: "text.primary" }}>
                      {user.banned ? "Забанен" : "Активен"}
                    </Typography>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </TableSkeleton>
      )}
      {/* {initial && <BoilsListTable role={"laboratory"} />} */}
    </React.Fragment>
  );
}
