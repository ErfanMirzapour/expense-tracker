import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { FC } from 'react';

const store = createStore(() => {}, composeWithDevTools());

export const AppProvider: FC = ({ children }) => (
   <Provider store={store}> {children} </Provider>
);

export type Store = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
