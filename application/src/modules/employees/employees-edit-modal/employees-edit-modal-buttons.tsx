import React from "react";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesEditModalStore } from "../store/use-employees-edit-modal-store";
import { useUpdateEmployee } from "../use-update-employee";

export default function EmployeesEditModalButtonComponent() {
  const setOpen = useEmployeesEditModalStore(useShallow((state) => state.setOpen));
  const clearData = useEmployeesEditModalStore(useShallow((state) => state.clearData));
  const id = useEmployeesEditModalStore(useShallow((state) => state.id));
  const name = useEmployeesEditModalStore(useShallow((state) => state.name));
  const barcode = useEmployeesEditModalStore(useShallow((state) => state.barcode));
  const occupation = useEmployeesEditModalStore(useShallow((state) => state.occupation));
  const { updateEmployee } = useUpdateEmployee();

  const handleUpdate = () => {
    if (name !== "" && barcode !== "" && occupation && id) {
      updateEmployee({ id: id, name: name, barcode: barcode, occupationId: occupation });
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
        disabled={!(name !== "" && barcode !== "" && occupation !== null)}
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
