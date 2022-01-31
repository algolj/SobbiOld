import { RootState } from '../store/reducers/rootReducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const UseTypeSelector: TypedUseSelectorHook<RootState> = useSelector;
