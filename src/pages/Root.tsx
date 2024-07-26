import GlobalStyle from '@styles/global';
import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <div>
      Root
      <GlobalStyle />
      <Outlet />
    </div>
  );
}

export default Root;
