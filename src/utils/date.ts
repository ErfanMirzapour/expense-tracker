import { MONTHS } from '../constants';

/**
 * @returns a boolean indicating whether isoDate1
 * is after or equal with isoDate2 or not
 */
export const isDateAfterOrEqual = (isoDate1: string, isoDate2: string) => {
   const date1ms = Date.parse(isoDate1);
   const date2ms = Date.parse(isoDate2);

   if (Number.isNaN(date1ms) || Number.isNaN(date2ms))
      throw Error('Invalid input!');

   return date1ms >= date2ms;
};

export const formatDate = (date: Date) => {
   const [month, day, year] = date.toLocaleDateString().split('/');

   return `${MONTHS[Number(month) - 1]} ${day}, ${year}`;
};
