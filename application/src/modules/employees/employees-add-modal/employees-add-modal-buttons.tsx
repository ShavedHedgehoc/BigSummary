import React from "react";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/react/shallow";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";
import { useCreateEmployee } from "../use-create-employee";

export default function EmployeesAddModalButtons() {
  const setOpen = useEmployeeAddModalStore(useShallow((state) => state.setOpen));
  const clearData = useEmployeeAddModalStore(useShallow((state) => state.clearData));

  const name = useEmployeeAddModalStore(useShallow((state) => state.name));
  const barcode = useEmployeeAddModalStore(useShallow((state) => state.barcode));
  const occupation = useEmployeeAddModalStore(useShallow((state) => state.occupation));

  const { createEmployee, isPending } = useCreateEmployee();

  const handleCreateEmployee = () => {
    if (name !== "" && barcode !== "" && occupation) {
      createEmployee({ name: name, barcode: barcode, occupationId: occupation });
      setOpen(false);
      clearData();
    }
  };

  const handleCancelCreation = () => {
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
        disabled={!(name !== "" && barcode !== "" && occupation !== null) || isPending}
        onClick={() => handleCreateEmployee()}
      >
        Создать
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        disabled={isPending}
        onClick={() => handleCancelCreation()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
}
