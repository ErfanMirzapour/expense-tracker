import { FC, useState, useMemo, Fragment } from 'react';

import { READABLE_TYPES, GAINED_TYPES, MONTHS } from '../constants';
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

   /** Filters transactions by group type or type of them */
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

   /**
    * A nested map between years and another Maps each one
    * is a Map between months and an array of transactions
    * This is optimize and we won't have any years or months without transactions
    *
    * @example
    * I use plain object as Map for simplicity:
    * {
    *    2021: {
    *       1: Transactions[] // 1 would be Feb
    *    },
    *    2009: ...
    * }
    */
   const groupedTransactions = useMemo(() => {
      const yearMap = new Map<string, Map<string, Transaction[]>>();

      filteredTransactions.forEach(transaction => {
         const [month, , year] = new Date(transaction.date)
            .toLocaleDateString()
            .split('/');

         if (yearMap.has(year)) {
            const monthMap = yearMap.get(year) as Map<string, Transaction[]>;

            if (monthMap.has(month)) {
               monthMap.get(month)?.push(transaction);
            } else {
               monthMap.set(month, [transaction]);
            }
         } else {
            const monthMap = new Map();
            monthMap.set(month, [transaction]);

            yearMap.set(year, monthMap);
         }
      });
      return yearMap;
   }, [filteredTransactions]);

   return (
      <div className={classes['container']}>
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

         {[...groupedTransactions].map(([year, monthMap]) => {
            return (
               <Fragment key={year}>
                  <h2>- {year}</h2>
                  {[...monthMap].map(([month, monthTransactions]) => {
                     return (
                        <Fragment key={month}>
                           <h3>-- {MONTHS[Number(month) - 1]}</h3>
                           <ul>
                              {monthTransactions.map(
                                 ({ amount, id, type, date: isoDate }) => {
                                    const isIncome = (GAINED_TYPES as any).includes(
                                       type
                                    );
                                    const day = String(
                                       new Date(isoDate).getDate()
                                    ).padStart(2, '0');

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
                                             <span>
                                                {isIncome ? 'Income' : 'Expense'}
                                             </span>
                                             <span>{READABLE_TYPES[type]}</span>
                                          </div>

                                          <span
                                             className={
                                                classes[
                                                   isIncome
                                                      ? 'income'
                                                      : 'expense'
                                                ]
                                             }
                                          >
                                             {isIncome ? '+' : '-'}$
                                             {formatAmount(amount)}
                                          </span>
                                       </li>
                                    );
                                 }
                              )}
                           </ul>
                        </Fragment>
                     );
                  })}
               </Fragment>
            );
         })}
      </div>
   );
};

export default TransactionsList;
