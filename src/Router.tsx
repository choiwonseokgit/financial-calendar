import { useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';


import * as Page from '@pages/index';
import { useAppSelector } from '@store/hooks';

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useAppSelector((state) => state.loginCheck);

  useEffect(() => {
    if (location.pathname !== '/auth' && !userId) {
      navigate('/login');
    }
  }, [location.pathname]);

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
          <Route path="chart" element={<Page.Chart />} />
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
