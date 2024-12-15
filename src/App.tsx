import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AuthInitializer from '@pages/auth/auth-initializer';
import Router from '@routes/Router';
import { persistor, store } from '@store/index';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthInitializer>
          <Router />
        </AuthInitializer>
      </PersistGate>
    </Provider>
  );
}

export default App;
