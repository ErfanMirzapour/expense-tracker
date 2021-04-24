import { FC } from 'react';
import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import classes from './css/TransactionsList.module.scss';

interface Props {
   transactions: Transaction[];
}

const TransactionsList: FC<Props> = ({ transactions }) => {
   const [, appDispatch] = useAppContext();

   return (
      <>
         <button onClick={() => appDispatch({ type: 'DISPLAY_ADD' })}>new</button>
         <ul>
            {transactions.map(({ amount, id }) => (
               <li
                  key={id}
                  onClick={() =>
                     appDispatch({
                        type: 'DISPLAY_EDIT',
                        transactionId: id!,
                     })
                  }
               >
                  {amount}
               </li>
            ))}
         </ul>
      </>
   );
};

export default TransactionsList;
