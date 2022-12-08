import { sum, double } from './calculator';

it('should sum 2 and 2 and the result must be 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('should sum 2 and 2 and the result must be 4 even if the values are string', () => {
  expect(sum('2', '2')).toBe(4);
});

it('should throw an error if an invalid value is given', () => {
  expect(() => {
    sum('', '2');
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();
});

it('should 3 and the result must be 6', () => {
  expect(double(3)).toBe(6);
});
