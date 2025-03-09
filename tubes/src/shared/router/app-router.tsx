import { BrowserRouter, Route, Routes } from "react-router";

import MainPage from "../../modules/main-page/main-page";

export default function AppRouter() {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
  return router;
}
