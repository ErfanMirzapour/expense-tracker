import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';
import { ReduxProvider } from './store';
import { AppProvider } from './contexts';
import './globals.scss';

render(
   <StrictMode>
      <ReduxProvider>
         <AppProvider>
            <App />
         </AppProvider>
      </ReduxProvider>
   </StrictMode>,
   document.getElementById('react-app')
);
