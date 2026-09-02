import { BrowserRouter, Route, Routes } from 'react-router';
import { RouteNames } from '@/shared/router';
import { AppSummaryPage, SummaryPage, RecordPage, CanPage, BoilPage } from '@/pages';

export function AppRouter() {
  const router = (
    <BrowserRouter>
      <Routes>
        <Route index element={<SummaryPage />} />
        <Route path={RouteNames.RECORD_DETAIL} element={<RecordPage />} />
        <Route path={RouteNames.APP_SUMMARY} element={<AppSummaryPage />} />
        <Route path={RouteNames.CANS} element={<CanPage />} />
        <Route path={RouteNames.BOILS} element={<BoilPage />} />
      </Routes>
    </BrowserRouter>
  );
  return router;
}
