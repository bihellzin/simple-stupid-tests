import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when an object is iterable', () => {
    const obj = {
      name: 'Joao',
      age: 18,
    };

    expect(queryString(obj)).toBe('name=Joao&age=18');
  });

  it('should create a valid query string when the value of a key is an array', () => {
    const obj = {
      name: 'Joao',
      brothers: ['Carlos', 'Miguel'],
    };

    expect(queryString(obj)).toBe('name=Joao&brothers=Carlos,Miguel');
  });

  it('should throw an error when the value of a key is an object', () => {
    const obj = {
      name: 'Joao',
      brothers: {},
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert query string to object', () => {
    const string = 'name=Gabriel&profession=developer';
    expect(parse(string)).toEqual({ name: 'Gabriel', profession: 'developer' });
  });

  it('should convert query string to object of a single key-value object', () => {
    const string = 'name=Gabriel';
    expect(parse(string)).toEqual({ name: 'Gabriel' });
  });

  it('should convert query string to object taking care of comma separated values', () => {
    const string = 'name=Gabriel&abilities=js,golang';
    expect(parse(string)).toEqual({
      name: 'Gabriel',
      abilities: ['js', 'golang'],
    });
  });
});
