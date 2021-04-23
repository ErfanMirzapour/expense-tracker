import { Store } from 'store';

/**
 * Retrieve redux state from localStorage
 */
export const loadState = () => {
   const serializedState = localStorage.getItem('state');

   if (!serializedState) return;

   return JSON.parse(serializedState);
};

/**
 * Store redux state in localStorage
 */
export const saveState = (state: Store) => {
   const serializedState = JSON.stringify(state);

   localStorage.setItem('state', serializedState);
};
