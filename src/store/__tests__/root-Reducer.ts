import rootReducer from '../root-reducer';
import {
   setInitBalance,
   addTransaction,
   editTransaction,
   deleteTransaction,
} from '../actions';

const initialState = {
   initBalance: 0,
   transactions: [
      {
         id: '123',
         date: new Date('2020-01').toISOString(),
         amount: 1000,
         type: 'TAX' as const,
      },
   ],
};
const newTransaction = {
   date: new Date('2021-02').toISOString(),
   amount: 700,
   type: 'SALARY' as const,
};

const toHaveZeroBalance = (initBalance: number) => expect(initBalance).toBe(0);

describe('Try different actions', () => {
   it('It should set initial balance correctly', () => {
      const { initBalance, transactions } = rootReducer(
         initialState,
         setInitBalance(1200)
      );

      expect(initBalance).toBe(1200);
      expect(transactions).toHaveLength(1);
   });

   it('It should add new transaction with right order', () => {
      const { initBalance, transactions } = rootReducer(
         initialState,
         addTransaction(newTransaction)
      );

      toHaveZeroBalance(initBalance);
      expect(transactions).toHaveLength(2);
      // Since added transaction has newer date it should be in first index
      expect(transactions[0]).toMatchObject(newTransaction);
   });

   it('It should edit transaction with the given id', () => {
      const { initBalance, transactions } = rootReducer(
         initialState,
         editTransaction('123', newTransaction)
      );

      toHaveZeroBalance(initBalance);
      expect(transactions).toHaveLength(1);
      expect(transactions[0]).toMatchObject(newTransaction);
   });

   it('Should re-order the edited transaction when date has been changed', () => {
      const { initBalance, transactions } = rootReducer(
         // Starting with two ordered transactions
         {
            initBalance: 0,
            transactions: [
               { ...newTransaction, id: '456' },
               ...initialState.transactions,
            ],
         },
         editTransaction('123', {
            ...newTransaction,
            date: new Date('2022-01').toISOString(),
         })
      );

      toHaveZeroBalance(initBalance);
      expect(transactions).toHaveLength(2);
      // Now transaction#123 should be in first index
      expect(transactions[0].id).toBe('123');
   });

   it('It should delete transaction with the given id', () => {
      const { initBalance, transactions } = rootReducer(
         initialState,
         deleteTransaction('123')
      );

      toHaveZeroBalance(initBalance);
      expect(transactions).toHaveLength(0);
   });
});
