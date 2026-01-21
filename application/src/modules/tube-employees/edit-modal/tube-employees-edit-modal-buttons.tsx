import React from "react";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/react/shallow";

import { useUpdateTubeEmployee } from "../use-update-tube-employee";
import { useTubeEmployeesEditModalStore } from "../store/use-tube-employees-edit-modal-store";

export default function TubeEmployeesEditModalButtonComponent() {
  const setOpen = useTubeEmployeesEditModalStore(useShallow((state) => state.setOpen));
  const clearData = useTubeEmployeesEditModalStore(useShallow((state) => state.clearData));
  const id = useTubeEmployeesEditModalStore(useShallow((state) => state.id));
  const name = useTubeEmployeesEditModalStore(useShallow((state) => state.name));
  const barcode = useTubeEmployeesEditModalStore(useShallow((state) => state.barcode));
  const rank = useTubeEmployeesEditModalStore(useShallow((state) => state.rank));
  const { updateTubeEmployee } = useUpdateTubeEmployee();

  const handleUpdate = () => {
    if (name !== "" && barcode !== "" && rank && id) {
      updateTubeEmployee({ id: id, name: name, barcode: barcode, rank_id: rank });
      setOpen(false);
      clearData();
    }
  };

  const handleCancel = () => {
    setOpen(false);
    clearData();
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={!(name !== "" && barcode !== "" && rank !== null)}
        onClick={() => handleUpdate()}
      >
        Изменить
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleCancel()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
}
