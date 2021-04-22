import { StrictMode } from 'react';
import { render } from 'react-dom';

import App from './App';
import './globals.scss';

render(
   <StrictMode>
      <App />
   </StrictMode>,
   document.getElementById('react-app')
);
