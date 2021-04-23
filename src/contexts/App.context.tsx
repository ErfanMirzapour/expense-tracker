import { createContext, FC, useContext, useReducer } from 'react';

export enum actionTypes {
   DISPLAY_LIST = 'DISPLAY_LIST',
   DISPLAY_ADD = 'DISPLAY_ADD',
   DISPLAY_EDIT = 'DISPLAY_EDIT',
}

type Action =
   | {
        type: actionTypes.DISPLAY_LIST | actionTypes.DISPLAY_ADD;
     }
   | {
        type: actionTypes.DISPLAY_EDIT;
        transactionId: string;
     };

interface InitialState {
   displayTransaction: boolean;
   transactionId: string | null;
}

const initialState: InitialState = {
   displayTransaction: false,
   transactionId: null,
};

const reducer = (state: InitialState, action: Action): InitialState => {
   switch (action.type) {
      case actionTypes.DISPLAY_LIST:
         return {
            displayTransaction: false,
            transactionId: null,
         };

      case actionTypes.DISPLAY_ADD:
         return {
            displayTransaction: true,
            transactionId: null,
         };

      case actionTypes.DISPLAY_EDIT:
         return {
            displayTransaction: true,
            transactionId: action.transactionId,
         };
   }
};

// A wrapper around useReducer
// We need it to share state schema with createContext
const useAppState = () => useReducer(reducer, initialState);
const appContext = createContext<ReturnType<typeof useAppState> | null>(null);

export const AppProvider: FC = ({ children }) => (
   <appContext.Provider value={useAppState()}>{children}</appContext.Provider>
);

export const useAppContext = () => useContext(appContext)!;
