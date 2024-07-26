import * as Page from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page.Root />}>
          <Route index element={<Page.CalendarView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
