import React from "react";
import Button from "@mui/joy/Button";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";
import { useTubeCreateEmployee } from "../use-tube-create-employee";

export default function TubeEmployeesAddModalButtons() {
  const setOpen = useTubeEmployeesAddModalStore(useShallow((state) => state.setOpen));
  const clearData = useTubeEmployeesAddModalStore(useShallow((state) => state.clearData));

  const name = useTubeEmployeesAddModalStore(useShallow((state) => state.name));
  const barcode = useTubeEmployeesAddModalStore(useShallow((state) => state.barcode));
  const rank = useTubeEmployeesAddModalStore(useShallow((state) => state.rank));

  const { createEmployee, isPending } = useTubeCreateEmployee();

  const handleCreateEmployee = () => {
    if (name !== "" && barcode !== "" && rank) {
      createEmployee({ name: name, barcode: barcode, rank_id: rank });
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
        disabled={!(name !== "" && barcode !== "" && rank !== null) || isPending}
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
