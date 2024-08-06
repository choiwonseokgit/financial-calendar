import { store } from '@store/index';
import { Provider } from 'react-redux';
import Router from '@/Router';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
