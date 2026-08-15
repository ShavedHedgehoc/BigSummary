import React from "react";

import Box from "@mui/joy/Box";
import Checkbox from "@mui/joy/Checkbox";
import Sheet from "@mui/joy/Sheet";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import { useChangeUserRolesModalStore } from "../store/use-change-user-roles-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useRolesListStore } from "../store/use-roles-list-store";
import { useUsersFilterStore } from "../store/use-users-filter-store";
import UpdateUserRolesModalButtons from "./update-user-roles-modal-buttons";

const ContentComponent = () => {
  const roleSelectorOptions = useUsersFilterStore(useShallow((state) => state.roleSelectorOptions));
  const rolesList = useRolesListStore(useShallow((state) => state.rolesList));
  const addRole = useRolesListStore(useShallow((state) => state.addRole));
  const removeRole = useRolesListStore(useShallow((state) => state.removeRole));

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
        {roleSelectorOptions &&
          roleSelectorOptions.map((item) => (
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

export default function UpdateUserRolesModal() {
  const open = useChangeUserRolesModalStore(useShallow((state) => state.open));
  const setOpen = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование прав пользователя",
    height: 600,
    minHeight: 0,
    width: 400,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<UpdateUserRolesModalButtons />}>
      <ContentComponent />
    </ModalLayout>
  );
}
