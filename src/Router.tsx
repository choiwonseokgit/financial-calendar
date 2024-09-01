import * as Page from '@pages/index';
import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.CalendarView />} />
          <Route path="login" element={<Page.Login />} />
          <Route path="auth" element={<Page.Auth />} />
          <Route path="spending-form" element={<Page.SpendingForm />} />
          <Route path="spending-detail" element={<Page.SpendingDetail />} />
          <Route path="schedule-form" element={<Page.ScheduleForm />} />
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
