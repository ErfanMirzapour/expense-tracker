import { useAppContext } from 'contexts';
import classes from './TransactionsList.module.scss';

const TransactionsList = () => {
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
