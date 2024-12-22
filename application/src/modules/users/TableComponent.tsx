import * as React from "react";
import { Box, IconButton, Typography } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import TableLoaderComponent from "../../components/tables/TableLoaderComponent";
import TableNotFoundComponent from "../../components/tables/TableNotFoundComponent";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";

import { useShallow } from "zustand/shallow";
import { useUsers } from "./use-users";
import UserService, { IUserRow } from "../../services/UserService";
import { useChangeUserRolesModalStore } from "./hooks/useChangeUserRolesModalStore";
import { useRolesListStore } from "./hooks/useRolesListStore";
import { useUsersFilterStore } from "./store/use-users-filter-store";
import { useUsersPaginationStore } from "./store/use-users-pagination-store";
import TableLayout from "../../shared/layouts/table-layout";

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
      <td style={{ width: 64, textAlign: "left", padding: "12px 40px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "left", padding: "12px 6px" }}>
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
  const filter = useUsersFilterStore(useShallow((state) => state.filter));
  const page = useUsersPaginationStore(useShallow((state) => state.page));
  const limit = useUsersPaginationStore(useShallow((state) => state.limit));
  const total = useUsersPaginationStore(useShallow((state) => state.total));
  const setTotal = useUsersPaginationStore(useShallow((state) => state.setTotal));
  const setPage = useUsersPaginationStore(useShallow((state) => state.setPage));
  const { isPending, data, isSuccess } = useUsers({ filter: filter, limit: limit, page: page });

  //REmove useeffects

  React.useEffect(() => {
    if (data && data.total !== total) {
      setTotal(data.total);
      setPage(1);
    }
  }, [data?.total]);

  React.useEffect(() => {
    if (limit) {
      setPage(1);
    }
  }, [limit]);

  const commonThead: TheadProperties[] = [
    { width: 64, value: "Имя", align: "left", padding: "12px 40px" },
    { width: 64, value: "Email", align: "left", padding: "12px 6px" },
    { width: 140, value: "Роли" },
    { width: 64, value: "Доступ" },
    { width: 50, value: "Действия" },
  ];
  if (isPending) {
    return <TableLoaderComponent />;
  }
  if (isSuccess && data.total === 0) {
    return <TableNotFoundComponent />;
  }
  return (
    <TableLayout thead={commonThead}>
      {isSuccess && data.rows.map((row) => <RowComponent row={row} key={row.id} />)}
    </TableLayout>
  );
};
