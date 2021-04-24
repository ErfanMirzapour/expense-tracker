export const PAYMENT_TYPES = ['CAR_PAYMENT', 'HOUSE_PAYMENT', 'TAX'] as const;
export const GAINED_TYPES = ['BANK_PROFIT', 'SALARY'] as const;

export const TRANSACTION_TYPES = [...PAYMENT_TYPES, ...GAINED_TYPES];
