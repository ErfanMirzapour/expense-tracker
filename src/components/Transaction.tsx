import { useAppContext } from 'contexts';
import classes from './Transaction.module.scss';

const Transaction = () => {
   const [{ transactionId }, dispatch] = useAppContext();

   return (
      <>
         <h2>Transaction {transactionId ?? 'new'}</h2>
         <button onClick={() => dispatch({ type: 'DISPLAY_LIST'})}>
            back
         </button>
      </>
   );
};

export default Transaction;
