import { FC, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { useAppContext } from 'contexts';
import { Transaction } from 'store';
import {
   GAINED_TYPES,
   PAYMENT_TYPES,
   READABLE_TYPES,
   TRANSACTION_TYPES,
} from '../constants';
import classes from './css/TransactionForm.module.scss';

interface Props {
   transaction?: Transaction;
   submitTransaction: (transaction: Transaction) => void;
}

interface FormValues {
   amount: number;
   type: typeof TRANSACTION_TYPES[number];
   date: string;
}

const TransactionForm: FC<Props> = ({ transaction, submitTransaction }) => {
   const [, appDispatch] = useAppContext();
   const { register, handleSubmit, control } = useForm<FormValues>({
      mode: 'onTouched',
   });

   const defaultValues: FormValues = useMemo(
      () => ({
         amount: transaction?.amount ?? 0,
         type: transaction?.type ?? 'BANK_PROFIT',
         date: transaction?.date ?? '',
      }),
      [transaction]
   );

   const onSubmit: SubmitHandler<FormValues> = values => {
      submitTransaction({ ...values, id: transaction?.id });
      backToHome();
   };

   const backToHome = () => appDispatch({ type: 'DISPLAY_LIST' });

   return (
      <>
         <form className={classes['form']} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='amount'>Amount</label>
            <input
               type='text'
               placeholder='0'
               defaultValue={defaultValues.amount}
               {...register('amount', { valueAsNumber: true })}
            />

            <label htmlFor='type'>Type</label>
            <select {...register('type')} defaultValue={defaultValues.type}>
               <optgroup label='Profit'>
                  {GAINED_TYPES.map(type => (
                     <option value={type}>{READABLE_TYPES[type]}</option>
                  ))}
               </optgroup>

               <optgroup label='Loss'>
                  {PAYMENT_TYPES.map(type => (
                     <option value={type}>{READABLE_TYPES[type]}</option>
                  ))}
               </optgroup>
            </select>

            <label htmlFor='date'>Date</label>
            <input
               type='date'
               {...register('date')}
               defaultValue={defaultValues.date}
            />

            <button type='submit' className={classes['btn']}>
               Submit
            </button>

            <button
               type='button'
               className={classes['btn']}
               onClick={backToHome}
            >
               Cancel
            </button>
         </form>

         <DevTool control={control} />
      </>
   );
};

export default TransactionForm;
