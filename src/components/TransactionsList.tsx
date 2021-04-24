import { FC } from 'react';

import { READABLE_TYPES, GAINED_TYPES } from '../constants';
import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import { formatAmount } from 'utils';
import classes from './css/TransactionsList.module.scss';

interface Props {
   transactions: Transaction[];
}

const TransactionsList: FC<Props> = ({ transactions }) => {
   const [, appDispatch] = useAppContext();

   return (
      <>
         <button
            className={classes['add-btn']}
            onClick={() => appDispatch({ type: 'DISPLAY_ADD' })}
         >
            Add Transaction
         </button>

         <ul>
            {transactions.map(({ amount, id, type, date: isoDate }) => {
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
