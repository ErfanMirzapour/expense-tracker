import { useMemo } from 'react';

import { Wallet, TransactionsList, TransactionForm } from './components';
import { useSelector, useDispatch, setInitBalance } from './store';
import { useAppContext } from './contexts';

// Only this container subscribe and dispatch to redux
// It renders other components views with appropriate props
const App = () => {
   const [{ displayTransaction, transactionId }] = useAppContext();
   const { initBalance, transactions } = useSelector(state => state);
   const dispatch = useDispatch();

   const onInitChange = (newInit: number) => dispatch(setInitBalance(newInit));

   const editingTransaction = useMemo(
      () => transactions.find(transaction => transaction.id === transactionId),
      [transactionId]
   );

   return (
      <main>
         <Wallet
            initBalance={initBalance}
            transactions={transactions}
            onInitChange={onInitChange}
         />
         {displayTransaction ? (
            <TransactionForm
               transaction={editingTransaction}
               onSubmit={() => {}}
            />
         ) : (
            <TransactionsList transactions={transactions} />
         )}
      </main>
   );
};

export default App;
