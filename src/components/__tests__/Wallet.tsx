import { render } from 'utils/test-utils';
import userEvent from '@testing-library/user-event';

import Wallet from '../Wallet';

const walletProps = {
   initBalance: 0,
   transactions: [
      {
         id: '123',
         date: new Date().toISOString(),
         amount: 1100,
         type: 'SALARY' as const,
      },
   ],
   onInitChange: () => {},
};

it('Should static texts', () => {
   const { getByText } = render(<Wallet {...walletProps} />);

   expect(getByText('Wallet Balance')).toBeInTheDocument();
   expect(getByText('USD')).toBeInTheDocument();
});

it('Should display first balance correctly', () => {
   const { getByTitle } = render(<Wallet {...walletProps} />);

   expect(getByTitle('Wallet Balance')).toHaveTextContent('$1,100.00');
});

it('Should focus on balance input after clicking edit icon', () => {
   const { getByRole, getByLabelText } = render(<Wallet {...walletProps} />);

   userEvent.click(getByRole('button'));

   const input = getByLabelText('Initial Balance');
   expect(input).toHaveFocus();
   expect(input).toHaveDisplayValue('0');
});
