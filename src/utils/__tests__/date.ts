import { isDateAfterOrEqual } from '../date';

describe('Invalid inputs', () => {
   it('Should throw error with invalid inputs', () => {
      const isoString = new Date().toISOString();

      expect(() => isDateAfterOrEqual('test', isoString)).toThrow(
         /invalid input/i
      );
      expect(() => isDateAfterOrEqual(isoString, 'test')).toThrow(
         /invalid input/i
      );
   });
});

describe('Valid inputs', () => {
   it('Should return true/false when first date is after/before', () => {
      const isoString1 = new Date('2020-01').toISOString();
      const isoString2 = new Date('2019-01').toISOString();

      expect(isDateAfterOrEqual(isoString1, isoString2)).toBe(true);
      expect(isDateAfterOrEqual(isoString2, isoString1)).toBe(false);
   });

   it('Should return true when dates are equal', () => {
      const isoString1 = new Date().toISOString();

      expect(isDateAfterOrEqual(isoString1, isoString1)).toBe(true);
   });
});
