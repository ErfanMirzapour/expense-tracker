import {
   useSelector as useReduxSelector,
   useDispatch as useReduxDispatch,
   TypedUseSelectorHook,
} from 'react-redux';

import { Store, Dispatch } from './store';

export const useSelector: TypedUseSelectorHook<Store> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<Dispatch>();
