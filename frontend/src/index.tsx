import ReactDOM from 'react-dom';

import RoutesPage from './routes/routes';

import './styles/index.scss';
import { store } from './store/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <RoutesPage />
  </Provider>,
  document.getElementById('root'),
);
