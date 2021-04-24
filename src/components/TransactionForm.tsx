import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import classes from './css/Transaction.module.scss';

interface Props {
   transaction: Transaction | undefined;
   onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionForm = ({ transaction, onSubmit }: Props) => {
   const [{ transactionId }, dispatch] = useAppContext();

   return (
      <>
         <h2>Transaction {transactionId ?? 'new'}</h2>
         <button onClick={() => dispatch({ type: 'DISPLAY_LIST' })}>back</button>
      </>
   );
};

export default TransactionForm;
