import { Outlet } from "react-router-dom";
import { Box } from "@mui/joy";
import SideBar from "../components/side-bar/side-bar";
import Header from "../components/headers/header";

function Layout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100dvh" }}>
      <Header />
      <SideBar />
      <Box
        component="main"
        className="MainContent"
        sx={{
          px: { xs: 2, md: 6 },
          pt: {
            xs: "calc(12px + var(--Header-height))",
            sm: "calc(12px + var(--Header-height))",
            md: 3,
          },
          pb: { xs: 2, sm: 2, md: 3 },
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100dvh",
          gap: 1,
        }}
      >
        {/* <React.Suspense fallback={<div>Loading..///.</div>}> */}
        <Outlet />
        {/* </React.Suspense> */}
      </Box>
    </Box>
  );
}

export default Layout;
