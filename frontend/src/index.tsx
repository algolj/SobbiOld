import RoutesPage from './routes/routes';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import React from 'react';
import { createRoot } from 'react-dom/client';

const store = setupStore();
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RoutesPage />
    </Provider>
  </React.StrictMode>,
);
