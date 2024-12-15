import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import * as Page from '@pages/index';

import LoginRoute from './login-route';
import ProtectedRoute from './protected-route';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page.Root />}>
          <Route element={<LoginRoute />}>
            <Route path="login" element={<Page.Login />} />
            <Route path="auth" element={<Page.Auth />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Page.CalendarView />} />
            <Route path="spending-form" element={<Page.SpendingForm />} />
            <Route path="spending-detail" element={<Page.SpendingDetail />} />
            <Route path="schedule-form" element={<Page.ScheduleForm />} />
            <Route path="chart" element={<Page.Chart />} />
          </Route>
          <Route path="*" element={<Page.NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function Router() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default Router;
