import { Wallet, TransactionsList, Transaction } from './components';
import { useAppContext } from './contexts';

const App = () => {
   const [{ displayTransaction }] = useAppContext();

   return (
      <>
         <Wallet />
         {displayTransaction ? <Transaction /> : <TransactionsList />}
      </>
   );
};

export default App;
