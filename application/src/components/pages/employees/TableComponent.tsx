import { Box, IconButton, Typography } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EmployeeService, { IEmployee } from "../../../services/EmployeeService";
import TableLayout from "../../tables/TableLayout";
import TableLoaderComponent from "../../tables/TableLoaderComponent";
import TableNotFoundComponent from "../../tables/TableNotFoundComponent";
import { useEmployees } from "./hooks/useEmployees";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import handleError from "../../../shared/api/http/handleError";
import { useEditModalStore } from "./hooks/useEditModalStore";
import { useShallow } from "zustand/shallow";

const RowComponent = ({ row }: { row: IEmployee }) => {
  const client = useQueryClient();
  const { mutate: destroy } = useMutation({
    mutationFn: EmployeeService.deleteEmployee,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["employees"] });
      enqueueSnackbar("Сотрудник успешно удален", {
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

  const openEditModal = useEditModalStore(useShallow((state) => state.setOpen));
  const setId = useEditModalStore(useShallow((state) => state.setId));
  const setName = useEditModalStore(useShallow((state) => state.setName));
  const setBarcode = useEditModalStore(useShallow((state) => state.setBarcode));
  const setOccupation = useEditModalStore(useShallow((state) => state.setOccupation));

  const handleEditButtonClick = ({
    id,
    name,
    barcode,
    occupation,
  }: {
    id: number;
    name: string;
    barcode: string;
    occupation: number;
  }) => {
    setId(id);
    setName(name);
    setBarcode(barcode);
    setOccupation(occupation);
    openEditModal(true);
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", pl: 4 }}>
          <Typography level="body-xs">{row.name}</Typography>
        </Box>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.barcode}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.occupation.description}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton
            color="primary"
            size="sm"
            onClick={() =>
              handleEditButtonClick({ id: row.id, name: row.name, barcode: row.barcode, occupation: row.occupation.id })
            }
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="danger" size="sm" onClick={() => destroy(row.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
        {/* <Typography level="body-xs">{row.value}</Typography> */}
      </td>
    </tr>
  );
};

export const TableComponent = () => {
  const { isPending, isRefetching, data, isSuccess } = useEmployees();

  const commonThead = [
    { width: 64, value: "ФИО" },
    { width: 64, value: "Штрихкод" },
    { width: 64, value: "Роль" },
    { width: 50, value: "Действия" },
  ];
  if (isPending || isRefetching) {
    return <TableLoaderComponent />;
  }
  if (isSuccess && data.employees.length === 0) {
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
      <tbody>{isSuccess && data.employees.map((row) => <RowComponent row={row} key={row.id} />)}</tbody>
    </TableLayout>
  );
};
