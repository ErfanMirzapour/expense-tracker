export const PAYMENT_TYPES = ['CAR_PAYMENT', 'HOUSE_PAYMENT', 'TAX'] as const;
export const GAINED_TYPES = ['BANK_PROFIT', 'SALARY'] as const;

export const TRANSACTION_TYPES = [...PAYMENT_TYPES, ...GAINED_TYPES];

export const READABLE_TYPES = {
   CAR_PAYMENT: 'Car Payment',
   HOUSE_PAYMENT: 'House Payment',
   TAX: 'Tax',
   BANK_PROFIT: 'Bank Profit',
   SALARY: 'Salary',
};
