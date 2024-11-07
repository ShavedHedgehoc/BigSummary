import { Box, IconButton, Typography } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import TableLayout from "../../tables/TableLayout";
import TableLoaderComponent from "../../tables/TableLoaderComponent";
import TableNotFoundComponent from "../../tables/TableNotFoundComponent";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../../shared/api/http/handleError";

import { useShallow } from "zustand/shallow";
import { useUsers } from "./hooks/useUsers";
import UserService, { IUserRow } from "../../../services/UserService";
import { useChangeUserRolesModalStore } from "./hooks/useChangeUserRolesModalStore";
import { useRolesListStore } from "./hooks/useRolesListStore";

const RowComponent = ({ row }: { row: IUserRow }) => {
  const client = useQueryClient();
  const openChangeRolesModal = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));
  const setId = useChangeUserRolesModalStore(useShallow((state) => state.setId));
  const setRoles = useRolesListStore(useShallow((state) => state.setRoles));

  const { mutate: changeBanned } = useMutation({
    mutationFn: UserService.changeBannedStatus,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Статус доступа успешно обновлен", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    },
    onError: (err) => {
      if (err instanceof Error) {
        const error = handleError(err);
        enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
      }
    },
  });

  const handleChangeRolesButtonClick = () => {
    const roles = row.roles.map((role) => role.id);
    setId(row.id);
    setRoles(roles);
    openChangeRolesModal(true);
  };
  //   const setId = useEditModalStore(useShallow((state) => state.setId));
  //   const setName = useEditModalStore(useShallow((state) => state.setName));
  //   const setBarcode = useEditModalStore(useShallow((state) => state.setBarcode));
  //   const setOccupation = useEditModalStore(useShallow((state) => state.setOccupation));

  //   const handleEditButtonClick = ({
  //     id,
  //     name,
  //     barcode,
  //     occupation,
  //   }: {
  //     id: number;
  //     name: string;
  //     barcode: string;
  //     occupation: number;
  //   }) => {
  //     setId(id);
  //     setName(name);
  //     setBarcode(barcode);
  //     setOccupation(occupation);
  //     openEditModal(true);
  //   };

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", pl: 4 }}>
          <Typography level="body-xs">{row.name}</Typography>
        </Box>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.email}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", gap: 1 }}>
            {row.roles.length ? row.roles.map((item) => <div key={item.id}>{item.description}</div>) : "-"}
          </Box>
        </Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs"> {row.banned ? "Забанен" : "Активен"}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {/* Edit user data */}
          <IconButton
            color="primary"
            size="sm"
            // onClick={() =>
            //   handleEditButtonClick({ id: row.id, name: row.name, barcode: row.barcode, occupation: row.occupation.id })
            // }
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="primary" size="sm" onClick={() => handleChangeRolesButtonClick()}>
            <ManageAccountsOutlinedIcon />
          </IconButton>
          <IconButton color="danger" size="sm" onClick={() => changeBanned(row.id)}>
            <BlockOutlinedIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
};

export const TableComponent = () => {
  const { isPending, isRefetching, data, isSuccess } = useUsers();

  const commonThead = [
    { width: 64, value: "Имя" },
    { width: 64, value: "Email" },
    { width: 120, value: "Роли" },
    { width: 64, value: "Доступ" },
    { width: 50, value: "Действия" },
  ];
  if (isPending || isRefetching) {
    return <TableLoaderComponent />;
  }
  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <TableLayout>
      <thead>
        <tr>
          {[...commonThead].map((item, key) => (
            <th key={key} scope="col" style={{ width: item.width, textAlign: "center", padding: "12px 6px" }}>
              {item.value}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{isSuccess && data.users.map((row) => <RowComponent row={row} key={row.id} />)}</tbody>
    </TableLayout>
  );
};
