import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import classes from './css/TransactionsList.module.scss';

interface Props {
   transactions: Transaction[]
}

const TransactionsList = ({transactions}: Props) => {
   const [, dispatch] = useAppContext();

   return (
      <>
         <button onClick={() => dispatch({ type: 'DISPLAY_ADD' })}>
            new
         </button>
         <ul>
            <li
               onClick={() =>
                  dispatch({
                     type: 'DISPLAY_EDIT',
                     transactionId: '123',
                  })
               }
            >
               Transaction 123
            </li>
         </ul>
      </>
   );
};

export default TransactionsList;
