import { ActionType } from './actions';

type TransactionType =
   | 'CAR_PAYMENT'
   | 'HOUSE_PAYMENT'
   | 'PROFIT'
   | 'SALARY'
   | 'TAX';

export interface Transaction {
   id: string;
   date: string;
   amount: number;
   type: TransactionType;
}

interface Reducer {
   initBalance: number;
   transactions: Transaction[];
}

const initialState = {
   initBalance: 0,
   transactions: [],
};

const rootReducer = (state: Reducer = initialState, action: ActionType) => {};

export default rootReducer;
