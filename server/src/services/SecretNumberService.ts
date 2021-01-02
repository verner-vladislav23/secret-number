

class SecretNumberService {
  private _DEFAULT_COUNT_NUMBERS: number = 4;
  private _CORRECTED_SYMBOL:string = 'B';
  private _PRESENTED_SYMBOL:string = 'K';

  /**
   * Получить случайно число в диапазоне двух чисел
   * @private
   * @param min {Number} - минимальное число
   * @param max {Number} - максимальное число
   * @returns {Number}
   */
  private _getRandomNumber (min: number = 0, max: number = 9): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Сгенерировать случайное число
   * @public
   * @param maxCountNumbers {Number} - максимальное кол-во цифр
   * @returns {String}
   */
  public generateSecretNumber (maxCountNumbers: number = this._DEFAULT_COUNT_NUMBERS): string {
    const maxLength = this._getRandomNumber(1, maxCountNumbers);

    return [...Array(maxLength)]
      .map(() => this._getRandomNumber())
      .join('')
  }

  /**
   * Проверка введенного числа
   * @public
   * @param inputNumber {String} - максимальное кол-во цифр
   * @param secretNumber {String}
   * @returns {String}
   */
  public getComparedNumber (inputNumber: string, secretNumber: string): string {
    return inputNumber
      .split('')
      .map((num:string, index:number) => {

        // если цифра присутсвует и стоит на правильном месте,
        // то обозначить ее буквой B
        if (num === secretNumber[index]) return this._CORRECTED_SYMBOL;
          // если цифра присутвсует,
        // то ее обозначить ее буквой K
        else if (secretNumber.includes(num)) return this._PRESENTED_SYMBOL;


        return num
      }).join('')
  }

}
