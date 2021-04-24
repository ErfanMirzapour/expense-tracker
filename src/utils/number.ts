/**
 * @returns String representing number with which every three digits
 * separated by comma and has two decimals
 * @example formatAmount(21354.12) //'21,354.12'
 */
export const formatAmount = (number: number): string => {
   const [integer, decimal] = number.toFixed(2).split('.');

   return integer
      .split('')
      .reverse()
      .flatMap((ch, i) => (Number(i) % 3 === 2 ? [ch, ','] : ch))
      .reverse()
      .join('')
      .concat(`.${decimal}`)
      .replace(/^,/, '');
};

/**
 * @returns parsed number
 * @example parseAmount('21,354.12') //21354.12
 */
export const parseAmount = (number: string): number =>
   Number(number.replace(/,/, ''));
