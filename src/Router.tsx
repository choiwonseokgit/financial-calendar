import { useEffect } from 'react';
import * as Page from '@pages/index';
import { useAppSelector } from '@store/hooks';
import { AnimatePresence } from 'framer-motion';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useAppSelector((state) => state.login.userId);

  // console.log('렌더링');

  useEffect(() => {
    if (!isLogin) {
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
