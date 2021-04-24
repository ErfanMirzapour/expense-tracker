import { FC, useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
   deleteTransaction: (transactionId: string) => void;
}

interface FormValues {
   amount: number;
   type: typeof TRANSACTION_TYPES[number];
   date: string;
}

const schema = yup.object().shape({
   amount: yup.number().required(),
   date: yup.string().required('Pick a date!'),
});

const TransactionForm: FC<Props> = ({
   transaction,
   submitTransaction,
   deleteTransaction,
}) => {
   const [, appDispatch] = useAppContext();
   const {
      register,
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<FormValues>({
      mode: 'onTouched',
      resolver: yupResolver(schema),
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

   const remove = () => {
      deleteTransaction(transaction?.id!);
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
            <p className={classes['error']}>
               {errors.amount && 'Amount should be a number!'}
            </p>

            <label htmlFor='type'>Type</label>
            <select {...register('type')} defaultValue={defaultValues.type}>
               <optgroup label='Income'>
                  {GAINED_TYPES.map(type => (
                     <option key={type} value={type}>
                        {READABLE_TYPES[type]}
                     </option>
                  ))}
               </optgroup>

               <optgroup label='Expense'>
                  {PAYMENT_TYPES.map(type => (
                     <option key={type} value={type}>
                        {READABLE_TYPES[type]}
                     </option>
                  ))}
               </optgroup>
            </select>
            <p className={classes['error']}>{errors.type?.message}</p>

            <label htmlFor='date'>Date</label>
            <input
               type='date'
               {...register('date')}
               defaultValue={defaultValues.date}
            />
            <p className={classes['error']}>{errors.date?.message}</p>

            <button type='submit' className={classes['btn']}>
               Submit
            </button>

            {transaction && (
               <button type='button' className={classes['btn']} onClick={remove}>
                  Delete
               </button>
            )}
            
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
