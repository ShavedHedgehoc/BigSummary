import Box from "@mui/joy/Box";
// import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useShallow } from "zustand/shallow";
// import { useEditModalStore } from "./store/use-edit-modal-store";
// import ConveyorService from "../../shared/api/services/conveyor-service";
// import { enqueueSnackbar } from "notistack";
// import handleError from "../../shared/api/http/handleError";
import { ITraceCan } from "../../shared/api/services/trace-cans-service";

export default function CansListRow({ row }: { row: ITraceCan }) {
  //   const client = useQueryClient();
  //   const { mutate: destroy } = useMutation({
  //     mutationFn: ConveyorService.deleteConveyor,
  //     onSuccess: () => {
  //       client.invalidateQueries({ queryKey: ["conveyors"] });
  //       enqueueSnackbar("Конвейер успешно удален", {
  //         variant: "success",
  //         anchorOrigin: { vertical: "top", horizontal: "right" },
  //       });
  //     },
  //     onError: (err) => {
  //       if (err instanceof Error) {
  //         const error = handleError(err);
  //         enqueueSnackbar(error, { variant: "error", anchorOrigin: { vertical: "top", horizontal: "right" } });
  //       }
  //     },
  //   });

  //   const openEditModal = useEditModalStore(useShallow((state) => state.setOpen));
  //   const setId = useEditModalStore(useShallow((state) => state.setId));
  //   const setValue = useEditModalStore(useShallow((state) => state.setValue));
  //   const setBarcode = useEditModalStore(useShallow((state) => state.setBarcode));

  //   const handleEditButtonClick = ({ id, value, barcode }: { id: number; value: string; barcode: string }) => {
  //     setId(id);
  //     setValue(value);
  //     setBarcode(barcode);
  //     openEditModal(true);
  //   };

  return (
    <tr key={row.CanPK}>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanName}</Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanVolume ? row.CanVolume : "-"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.CanBarcode ? row.CanBarcode : "-"}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plant_name ? row.plant_name : "-"}</Typography>
      </td>

      <td style={{ width: 110, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {/* <IconButton
            color="primary"
            size="sm"
            onClick={() => handleEditButtonClick({ id: row.id, value: row.value, barcode: row.barcode })}
          >
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="danger" size="sm" onClick={() => destroy(row.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton> */}
        </Box>
      </td>
    </tr>
  );
}
