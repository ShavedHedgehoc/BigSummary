import { Avatar, Box, IconButton, Typography } from "@mui/joy";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthStore } from "../../../modules/auth/store/auth-store";
import { useLogout } from "../../../modules/auth/use-logout";
import { useShallow } from "zustand/shallow";

export default function UserPane() {
  const user = useAuthStore(useShallow((state) => state.user));
  const { logout } = useLogout();
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Avatar
        variant="outlined"
        size="sm"
        // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
      />
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography level="title-sm">{user?.name}</Typography>
        <Typography level="body-xs">{user?.email}</Typography>
      </Box>
      <IconButton size="sm" variant="plain" color="neutral" onClick={() => logout()}>
        <LogoutIcon />
      </IconButton>
    </Box>
  );
}
