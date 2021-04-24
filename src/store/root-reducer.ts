import { TRANSACTION_TYPES } from '../constants';
import { isDateAfterOrEqual } from 'utils';
import { ActionType } from './actions';

export interface Transaction {
   id?: string;
   date: string;
   amount: number;
   type: typeof TRANSACTION_TYPES[number];
}

interface Reducer {
   initBalance: number;
   transactions: Transaction[];
}

const initialState = {
   initBalance: 0,
   transactions: [],
};

/**
 * Given a sorted list of dates and a new date,
 * finds thee right place for the new date
 */
const findDateIndex = (dates: string[], newDate: string) => {
   // forEach here kills performance!
   for (let i = 0; i < dates.length; i++)
      if (isDateAfterOrEqual(newDate, dates[i])) return i;

   return dates.length;
};

/**
 * Inserts a transaction in a way that the list of transactions stays ordered
 * @returns the sorted list
 */
const insertTransaction = (
   transactions: Transaction[],
   newTransaction: Transaction
) => {
   const newTransactionIndex = findDateIndex(
      transactions.map(t => t.date),
      newTransaction.date
   );

   return [
      ...transactions.slice(0, newTransactionIndex),
      newTransaction,
      ...transactions.slice(newTransactionIndex),
   ];
};

/**
 * Removes a transaction by its id from the list
 * @returns the list
 */
const removeTransaction = (transactions: Transaction[], transactionId: string) =>
   transactions.filter(transaction => transaction.id !== transactionId);

const rootReducer = (state: Reducer = initialState, action: ActionType) => {
   switch (action.type) {
      case 'SET_INIT_BALANCE': {
         return {
            ...state,
            initBalance: action.value,
         };
      }

      case 'ADD_TRANSACTION': {
         // From the ground transactions array will be sorted by date
         const { transactions } = state;
         const { transaction: newTransaction } = action;

         return {
            ...state,
            transactions: insertTransaction(transactions, newTransaction),
         };
      }

      case 'EDIT_TRANSACTION': {
         const { transactionId: id, newTransaction } = action;
         const { transactions } = state;
         const index = transactions.findIndex(
            transaction => transaction.id === id
         );
         let result;

         if (newTransaction.date === transactions[index].date)
            result = transactions.map((transaction, i) =>
               i === index ? { ...newTransaction, id } : transaction
            );
         // Only when dates aren't equal do the heavy re-ordering
         else {
            result = removeTransaction(transactions, action.transactionId);
            result = insertTransaction(result, { ...newTransaction, id });
         }

         return {
            ...state,
            transactions: result,
         };
      }

      case 'DELETE_TRANSACTION': {
         return {
            ...state,
            transactions: removeTransaction(
               state.transactions,
               action.transactionId
            ),
         };
      }

      default: {
         return state;
      }
   }
};

export default rootReducer;
