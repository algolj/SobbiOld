import * as reactRedux from 'react-redux';
import { RootState } from '../store/reducers/rootReducer';

export const useTypeSelector: reactRedux.TypedUseSelectorHook<RootState> =
  reactRedux.useSelector;
