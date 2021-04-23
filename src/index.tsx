import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';
import { AppProvider } from './contexts';
import './globals.scss';

render(
   <StrictMode>
      <AppProvider>
         <App />
      </AppProvider>
   </StrictMode>,
   document.getElementById('react-app')
);
