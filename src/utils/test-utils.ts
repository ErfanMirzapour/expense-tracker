import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ReduxProvider } from 'store';

const customRender = (
   ui: ReactElement,
   options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: ReduxProvider, ...options });

export { customRender as render };
