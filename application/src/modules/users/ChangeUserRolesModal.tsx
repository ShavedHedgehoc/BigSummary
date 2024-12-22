import React from "react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import ModalLayout, { ModalLayoutProps } from "../../components/modals/ModalLayout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useChangeUserRolesModalStore } from "./hooks/useChangeUserRolesModalStore";
import { useShallow } from "zustand/shallow";
import { useRoles } from "./use-roles";
import { useRolesListStore } from "./hooks/useRolesListStore";
import { enqueueSnackbar } from "notistack";
import handleError from "../../shared/api/http/handleError";
import UserService from "../../services/UserService";

const ContentComponent = () => {
  const { isPending, isRefetching, data } = useRoles();

  const rolesList = useRolesListStore(useShallow((state) => state.rolesList));
  const addRole = useRolesListStore(useShallow((state) => state.addRole));
  const removeRole = useRolesListStore(useShallow((state) => state.removeRole));
  if (isPending || isRefetching) {
    return <>Loading...</>;
  }
  const handleChange = ({ event, id }: { event: React.ChangeEvent<HTMLInputElement>; id: number }) => {
    if (event.target.checked) {
      addRole(id);
    } else {
      removeRole(id);
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minHeight: 0 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflow: "auto" }}>
        {data &&
          data.map((item) => (
            <Sheet
              variant="outlined"
              key={`roleSheet_${item.id}`}
              sx={{
                borderRadius: "sm",
                pl: 2,
                pt: 1,
                pb: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Checkbox
                key={`checkbox_${item.id}`}
                checked={rolesList.includes(item.id)}
                onChange={(e) => handleChange({ event: e, id: item.id })}
              />
              <Box>{item.description}</Box>
            </Sheet>
          ))}
      </Box>
    </Box>
  );
};

const ButtonComponent = () => {
  const client = useQueryClient();
  const id = useChangeUserRolesModalStore(useShallow((state) => state.id));
  const setOpen = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));
  const rolesList = useRolesListStore(useShallow((state) => state.rolesList));

  const { mutate: updateRoles } = useMutation({
    mutationFn: UserService.updateUserRoles,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["users"] });
      enqueueSnackbar("Роли успешно обновлены", {
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

  const handleUpdateButtonClick = () => {
    if (id) {
      updateRoles({ id: id, roles: [...rolesList] });
      setOpen(false);
    }
  };

  const handleCancelButtonClick = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleUpdateButtonClick()}
      >
        Изменить
      </Button>
      <Button
        color="neutral"
        variant="outlined"
        size={"sm"}
        sx={{ fontWeight: "normal", fontSize: "small" }}
        onClick={() => handleCancelButtonClick()}
      >
        Отмена
      </Button>
    </React.Fragment>
  );
};

export const ChangeUserRolesModal = () => {
  const open = useChangeUserRolesModalStore(useShallow((state) => state.open));
  const setOpen = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование прав пользователя",
    content: <ContentComponent />,
    height: 600,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
    buttons: <ButtonComponent />,
  };

  return <ModalLayout {...modalProps} />;
};
