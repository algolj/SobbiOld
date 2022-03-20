import ReactDOM from 'react-dom';
import RoutesPage from './routes/routes';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

ReactDOM.render(
  <Provider store={store}>
    <RoutesPage />
  </Provider>,
  document.getElementById('root'),
);
