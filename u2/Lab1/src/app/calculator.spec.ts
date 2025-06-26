import { Calculator } from './calculator';

describe('Test for Calculator', () => {
  
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('Test for multiply', () => {
    it('should return twelve', () => {
      let result = calculator.multiply(3, 4);
      expect(result).toEqual(12);
    });
    it('should return ten', () => {
      let result = calculator.multiply(2, 5);
      expect(result).toEqual(10);
    });
  });

  describe('Test for divide', () => {
    it('divide for a number', () => {
      let result = calculator.divide(35, 7);
      expect(result).toEqual(5);
    });
    it('divide for a zero', () => {
      expect(calculator.divide(35, 0)).toBeNull;
      expect(calculator.divide(7, 0)).toBeNull;
    });
  });

  describe('Jasmine Matchers', () => {
    it('test of Matchers', () => {
      let name1 = 'luis';
      let name2;
      expect(name1).toBeDefined();
      expect(name2).toBeUndefined();

      expect(1+5==6).toBeTruthy();
      expect(1+1==3).toBeFalsy();

      expect(8).toBeLessThan(40);
      expect(50).toBeGreaterThan(10);

      expect('abc').toMatch(/abc/);

      expect(["tables", "chairs", "sofa"]).toContain('chairs');
    });
  });
});
