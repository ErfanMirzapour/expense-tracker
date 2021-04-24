import { FC, useState, useMemo } from 'react';

import { READABLE_TYPES, GAINED_TYPES } from '../constants';
import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import { formatAmount } from 'utils';
import classes from './css/TransactionsList.module.scss';

interface Props {
   transactions: Transaction[];
}

const TransactionsList: FC<Props> = ({ transactions }) => {
   const [filter, setFilter] = useState('');

   const [, appDispatch] = useAppContext();

   // Filter transactions by group type or type of them
   const filteredTransactions = useMemo(
      () =>
         transactions.filter(({ type }) => {
            const regExp = new RegExp(filter, 'i');
            const groupType = (GAINED_TYPES as any).includes(type)
               ? 'income'
               : 'expense';

            return (
               READABLE_TYPES[type].search(regExp) > -1 ||
               groupType.search(regExp) > -1
            );
         }),
      [transactions, filter]
   );

   return (
      <>
         <button
            className={classes['add-btn']}
            onClick={() => appDispatch({ type: 'DISPLAY_ADD' })}
         >
            Add Transaction
         </button>

         {transactions.length !== 0 && (
            <input
               className={classes['filter']}
               type='text'
               placeholder='Type here to search...'
               value={filter}
               onChange={e => setFilter(e.target.value)}
            />
         )}
         {filteredTransactions.length === 0 && (
            <p className={classes['info']}>No Transactions!</p>
         )}
         <ul>
            {filteredTransactions.map(({ amount, id, type, date: isoDate }) => {
               const isIncome = (GAINED_TYPES as any).includes(type);
               const day = String(new Date(isoDate).getDate()).padStart(2, '0');

               return (
                  <li
                     className={classes['transaction']}
                     key={id}
                     onClick={() =>
                        appDispatch({
                           type: 'DISPLAY_EDIT',
                           transactionId: id!,
                        })
                     }
                  >
                     <time dateTime={isoDate}>{day}</time>

                     <div className={classes['type']}>
                        <span>{isIncome ? 'Income' : 'Expense'}</span>
                        <span>{READABLE_TYPES[type]}</span>
                     </div>

                     <span className={classes[isIncome ? 'income' : 'expense']}>
                        {isIncome ? '+' : '-'}${formatAmount(amount)}
                     </span>
                  </li>
               );
            })}
         </ul>
      </>
   );
};

export default TransactionsList;
