import { FC, useState, useMemo, FormEventHandler } from 'react';

import { formatDate, formatAmount } from 'utils';
import { Transaction } from 'store';
import { PAYMENT_TYPES } from '../constants';
import classes from './css/Wallet.module.scss';

interface Props {
   initBalance: number;
   transactions: Transaction[];
   onInitChange: (initBalance: number) => void;
}

const Wallet: FC<Props> = ({ initBalance, transactions, onInitChange }) => {
   const [balanceInput, setBalanceInput] = useState<string | null>(null);

   const balance = useMemo(
      () =>
         initBalance +
         // = transactions outcome
         transactions.reduce(
            (outcome, { type, amount }) =>
               //@ts-ignore
               PAYMENT_TYPES.includes(type)
                  ? outcome - amount
                  : outcome + amount,
            0
         ),
      [initBalance, transactions]
   );

   const onSubmit: FormEventHandler = e => {
      e.preventDefault();

      if (Number.isNaN(Number(balanceInput))) return;

      onInitChange(Number(balanceInput));
      setBalanceInput(null);
   };

   return (
      <section className={classes['wallet']}>
         <div>
            <span>Wallet Balance</span>
            <span>{formatDate(new Date())}</span>
         </div>

         <div>
            <div className={classes['balance']}>
               {balanceInput !== null ? (
                  <form onSubmit={onSubmit}>
                     $
                     <input
                        aria-label='Initial Balance'
                        autoFocus
                        value={balanceInput}
                        onChange={e => setBalanceInput(e.target.value)}
                     />
                  </form>
               ) : (
                  <>
                     <span title='Wallet Balance'>${formatAmount(balance)}</span>
                     <span
                        role='button'
                        title='Edit'
                        className='material-icons'
                        onClick={() => setBalanceInput(String(initBalance))}
                     >
                        edit
                     </span>
                  </>
               )}
            </div>
            <span>USD</span>
         </div>
      </section>
   );
};

export default Wallet;
