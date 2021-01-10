import SecretNumberService from '../../src/services/SecretNumberService';

describe('NumberService', () => {
  let presentSymbol: string = SecretNumberService.presentedSymbol;
  let correctedSymbol: string = SecretNumberService.correctedSymbol;
  let defaultCountMembers: number = SecretNumberService.defaultCountMembers;

  describe('generateRandomNumber method', () => {
    it('should return type string', () => {
      const secretNumber: string = SecretNumberService.generateSecretNumber();

      expect(typeof secretNumber).toBe('string')
    });

    it(`default max length should be less or equal ${defaultCountMembers}`, () => {
      const secretNumber: string = SecretNumberService.generateSecretNumber();

      expect(secretNumber.length).toBeLessThanOrEqual(defaultCountMembers)
    });

    it('with param 3 should return max length less or equal 3', () => {
      const secretNumber: string = SecretNumberService.generateSecretNumber(3);

      expect(secretNumber.length).toBeLessThanOrEqual(3);
    });

    it('should return only positive numbers', () => {
      const secretNumber: string = SecretNumberService.generateSecretNumber();

      const filteredNegativeLength: number = secretNumber
        .split('')
        .filter(value => +value < 0).length;

      expect(filteredNegativeLength).toBe(0)
    });
  });

  describe('getComparedNumber method', () => {
    it('should return type string', () => {
      const comparedNumber: string = SecretNumberService.getComparedNumber('123', '4411');

      expect(typeof comparedNumber).toBe('string');
    });

    it('should return length equal 3 (inputNumber: 111; secretNumber: 1111)', () => {
      const comparedNumber: string = SecretNumberService.getComparedNumber('111', '1111');

      expect(comparedNumber.length).toBe(3)
    });

    it(`(inputNumber: 1111, secretNumber: 1111) expected all numbers equal ${correctedSymbol}`, () => {
      const comparedNumber: string = SecretNumberService.getComparedNumber('1111', '1111');
      const expectedCompared: string = correctedSymbol.repeat(4);

      expect(comparedNumber).toBe(expectedCompared);
    });

    it(`'(inputNumber: 0001, secretNumber: 0011) expected BBKB`, () => {
      const comparedNumber: string = SecretNumberService.getComparedNumber('0001', '0011');
      const expectedCompared: string =
        [
          correctedSymbol,
          correctedSymbol,
          presentSymbol,
          correctedSymbol
        ].join('');

      expect(comparedNumber).toBe(expectedCompared);
    })
  });

});
