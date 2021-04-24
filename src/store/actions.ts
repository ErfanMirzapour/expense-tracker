import { nanoid } from 'nanoid';

import { Transaction } from './root-reducer';

export const setInitBalance = (value: number) => ({
   type: 'SET_INIT_BALANCE' as const,
   value,
});

export const addTransaction = (transaction: Transaction) => ({
   type: 'ADD_TRANSACTION' as const,
   transaction: { ...transaction, id: nanoid() },
});

export const editTransaction = (
   transactionId: string,
   newTransaction: Transaction
) => ({
   type: 'EDIT_TRANSACTION' as const,
   transactionId,
   newTransaction,
});

export const deleteTransaction = (transactionId: string) => ({
   type: 'DELETE_TRANSACTION' as const,
   transactionId,
});

export type ActionType =
   | ReturnType<typeof setInitBalance>
   | ReturnType<typeof addTransaction>
   | ReturnType<typeof editTransaction>
   | ReturnType<typeof deleteTransaction>;
