import {
  isRange,
  isIndex,
  isBoolean,
  isResultSet,
  isHelp,
  isFunction,
  isDate,
  isRegExp,
  isObject,
  isNull
} from './variant2.js';

describe('Type checking utilities - Variant 2', () => {
  describe('isRange', () => {
    test('should return true for Range objects', () => {
      function Range() {}
      Range.prototype.isRange = true;
      const range = new Range();
      expect(isRange(range)).toBe(true);
    });

    test('should return false for non-range values', () => {
      expect(isRange(null)).toBe(false);
      expect(isRange(undefined)).toBe(false);
      expect(isRange(42)).toBe(false);
      expect(isRange('test')).toBe(false);
      expect(isRange({})).toBe(false);
      expect(isRange([])).toBe(false);
    });

    test('should return false when isRange is false', () => {
      function NotRange() {}
      NotRange.prototype.isRange = false;
      const obj = new NotRange();
      expect(isRange(obj)).toBe(false);
    });

    test('має повертати false коли властивість isRange не на прототипі', () => {
      const obj = { isRange: true };
      expect(isRange(obj)).toBe(false);
    });

    test('має обробляти успадковані об\'єкти Range', () => {
      function Range() {}
      Range.prototype.isRange = true;
      function ExtendedRange() {}
      ExtendedRange.prototype = Object.create(Range.prototype);
      const extRange = new ExtendedRange();
      expect(isRange(extRange)).toBe(true);
    });
  });

  describe('isIndex', () => {
    test('should return true for Index objects', () => {
      function Index() {}
      Index.prototype.isIndex = true;
      const index = new Index();
      expect(isIndex(index)).toBe(true);
    });

    test('should return false for non-index values', () => {
      expect(isIndex(null)).toBe(false);
      expect(isIndex(undefined)).toBe(false);
      expect(isIndex(42)).toBe(false);
      expect(isIndex('test')).toBe(false);
      expect(isIndex({})).toBe(false);
      expect(isIndex([])).toBe(false);
    });

    test('should return false when isIndex is false', () => {
      function NotIndex() {}
      NotIndex.prototype.isIndex = false;
      const obj = new NotIndex();
      expect(isIndex(obj)).toBe(false);
    });

    test('має повертати false коли властивість isIndex не на прототипі', () => {
      const obj = { isIndex: true };
      expect(isIndex(obj)).toBe(false);
    });

    test('має обробляти успадковані об\'єкти Index', () => {
      function Index() {}
      Index.prototype.isIndex = true;
      function ExtendedIndex() {}
      ExtendedIndex.prototype = Object.create(Index.prototype);
      const extIndex = new ExtendedIndex();
      expect(isIndex(extIndex)).toBe(true);
    });
  });

  describe('isBoolean', () => {
    test('should return true for boolean values', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    test('should return false for non-boolean values', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean('false')).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
      expect(isBoolean({})).toBe(false);
      expect(isBoolean([])).toBe(false);
    });

    test('should return false for Boolean objects', () => {
      expect(isBoolean(new Boolean(true))).toBe(false);
      expect(isBoolean(new Boolean(false))).toBe(false);
    });

    test('має обробляти булеві вирази', () => {
      expect(isBoolean(5 > 3)).toBe(true);
      expect(isBoolean(!0)).toBe(true);
      expect(isBoolean(!!1)).toBe(true);
    });

    test('має повертати false для truthy/falsy не-булевих значень', () => {
      expect(isBoolean('')).toBe(false);
      expect(isBoolean('text')).toBe(false);
      expect(isBoolean(NaN)).toBe(false);
    });
  });

  describe('isResultSet', () => {
    test('should return true for ResultSet objects', () => {
      function ResultSet() {}
      ResultSet.prototype.isResultSet = true;
      const resultSet = new ResultSet();
      expect(isResultSet(resultSet)).toBe(true);
    });

    test('should return false for non-resultset values', () => {
      expect(isResultSet(null)).toBe(false);
      expect(isResultSet(undefined)).toBe(false);
      expect(isResultSet(42)).toBe(false);
      expect(isResultSet('test')).toBe(false);
      expect(isResultSet({})).toBe(false);
      expect(isResultSet([])).toBe(false);
    });

    test('should return false when isResultSet is false', () => {
      function NotResultSet() {}
      NotResultSet.prototype.isResultSet = false;
      const obj = new NotResultSet();
      expect(isResultSet(obj)).toBe(false);
    });

    test('має повертати false коли властивість isResultSet не на прототипі', () => {
      const obj = { isResultSet: true };
      expect(isResultSet(obj)).toBe(false);
    });

    test('має обробляти успадковані об\'єкти ResultSet', () => {
      function ResultSet() {}
      ResultSet.prototype.isResultSet = true;
      function ExtendedResultSet() {}
      ExtendedResultSet.prototype = Object.create(ResultSet.prototype);
      const extResultSet = new ExtendedResultSet();
      expect(isResultSet(extResultSet)).toBe(true);
    });
  });

  describe('isHelp', () => {
    test('should return true for Help objects', () => {
      function Help() {}
      Help.prototype.isHelp = true;
      const help = new Help();
      expect(isHelp(help)).toBe(true);
    });

    test('should return false for non-help values', () => {
      expect(isHelp(null)).toBe(false);
      expect(isHelp(undefined)).toBe(false);
      expect(isHelp(42)).toBe(false);
      expect(isHelp('test')).toBe(false);
      expect(isHelp({})).toBe(false);
      expect(isHelp([])).toBe(false);
    });

    test('should return false when isHelp is false', () => {
      function NotHelp() {}
      NotHelp.prototype.isHelp = false;
      const obj = new NotHelp();
      expect(isHelp(obj)).toBe(false);
    });

    test('має повертати false коли властивість isHelp не на прототипі', () => {
      const obj = { isHelp: true };
      expect(isHelp(obj)).toBe(false);
    });

    test('має обробляти успадковані об\'єкти Help', () => {
      function Help() {}
      Help.prototype.isHelp = true;
      function ExtendedHelp() {}
      ExtendedHelp.prototype = Object.create(Help.prototype);
      const extHelp = new ExtendedHelp();
      expect(isHelp(extHelp)).toBe(true);
    });
  });

  describe('isFunction', () => {
    test('should return true for functions', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function() {})).toBe(true);
      expect(isFunction(async function() {})).toBe(true);
      expect(isFunction(function*() {})).toBe(true);
      expect(isFunction(Math.sin)).toBe(true);
      expect(isFunction(Date)).toBe(true);
    });

    test('should return false for non-functions', () => {
      expect(isFunction(42)).toBe(false);
      expect(isFunction('test')).toBe(false);
      expect(isFunction(null)).toBe(false);
      expect(isFunction(undefined)).toBe(false);
      expect(isFunction({})).toBe(false);
      expect(isFunction([])).toBe(false);
      expect(isFunction(true)).toBe(false);
    });

    test('має повертати true для стрілкових функцій', () => {
      const arrow = (x) => x * 2;
      expect(isFunction(arrow)).toBe(true);
    });

    test('має повертати true для конструкторів класів', () => {
      class MyClass {}
      expect(isFunction(MyClass)).toBe(true);
    });

    test('має повертати true для прив\'язаних функцій', () => {
      const fn = function() {};
      const bound = fn.bind(null);
      expect(isFunction(bound)).toBe(true);
    });

    test('має повертати false для рядків схожих на функції', () => {
      expect(isFunction('function')).toBe(false);
      expect(isFunction('() => {}')).toBe(false);
    });
  });

  describe('isDate', () => {
    test('should return true for Date objects', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2024-01-01'))).toBe(true);
      expect(isDate(new Date(0))).toBe(true);
    });

    test('should return false for non-date values', () => {
      expect(isDate('2024-01-01')).toBe(false);
      expect(isDate(1234567890)).toBe(false);
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
    });

    test('should return true for invalid dates', () => {
      expect(isDate(new Date('invalid'))).toBe(true);
    });

    test('має повертати true для дат з від\'ємними timestamps', () => {
      expect(isDate(new Date(-1))).toBe(true);
    });

    test('має повертати true для дат далеко в майбутньому', () => {
      expect(isDate(new Date(8640000000000000))).toBe(true);
    });

    test('має повертати false для об\'єктів схожих на дату', () => {
      const fakeDateObject = { getTime: () => Date.now() };
      expect(isDate(fakeDateObject)).toBe(false);
    });

    test('має повертати false для чисел timestamps', () => {
      expect(isDate(Date.now())).toBe(false);
    });
  });

  describe('isRegExp', () => {
    test('should return true for RegExp objects', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp('test'))).toBe(true);
      expect(isRegExp(/abc/gi)).toBe(true);
      expect(isRegExp(new RegExp('xyz', 'i'))).toBe(true);
    });

    test('should return false for non-regexp values', () => {
      expect(isRegExp('/test/')).toBe(false);
      expect(isRegExp('test')).toBe(false);
      expect(isRegExp(null)).toBe(false);
      expect(isRegExp(undefined)).toBe(false);
      expect(isRegExp({})).toBe(false);
      expect(isRegExp([])).toBe(false);
      expect(isRegExp(42)).toBe(false);
    });

   test('має повертати true для RegExp з усіма прапорцями', () => {
  expect(isRegExp(/test/gimsuy)).toBe(true);
});

    test('має повертати false для об\'єктів схожих на regexp', () => {
      const fakeRegExp = { test: () => true, exec: () => null };
      expect(isRegExp(fakeRegExp)).toBe(false);
    });
  });

  describe('isObject', () => {
    test('should return true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1, b: 2 })).toBe(true);
      expect(isObject(new Object())).toBe(true);
    });

    test('should return false for null', () => {
      expect(isObject(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(isObject(undefined)).toBe(false);
    });

    test('should return false for primitives', () => {
      expect(isObject(42)).toBe(false);
      expect(isObject('test')).toBe(false);
      expect(isObject(true)).toBe(false);
    });

    test('should return false for arrays', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
    });

    test('should return false for other object types', () => {
      expect(isObject(new Date())).toBe(false);
      expect(isObject(/test/)).toBe(false);
      expect(isObject(() => {})).toBe(false);
    });

    test('should return false for custom class instances', () => {
      class CustomClass {}
      expect(isObject(new CustomClass())).toBe(false);
    });

    test('should return false for complex numbers', () => {
      const complex = Object.create({ isComplex: true });
      expect(isObject(complex)).toBe(false);
    });

    test('should return false for fractions', () => {
      const fraction = Object.create({ isFraction: true });
      expect(isObject(fraction)).toBe(false);
    });

    test('should handle objects with null prototype', () => {
      const obj = Object.create(null);
      expect(isObject(obj)).toBe(false);
    });

    test('має повертати true для вкладених простих об\'єктів', () => {
      expect(isObject({ a: { b: { c: 1 } } })).toBe(true);
    });

    test('має повертати false для Map об\'єктів', () => {
      expect(isObject(new Map())).toBe(false);
    });

    test('має повертати false для Set об\'єктів', () => {
      expect(isObject(new Set())).toBe(false);
    });

    test('має повертати false для WeakMap об\'єктів', () => {
      expect(isObject(new WeakMap())).toBe(false);
    });

    test('має повертати false для WeakSet об\'єктів', () => {
      expect(isObject(new WeakSet())).toBe(false);
    });

    test('має повертати false для Error об\'єктів', () => {
      expect(isObject(new Error())).toBe(false);
    });

    test('має повертати false для Promise об\'єктів', () => {
      expect(isObject(Promise.resolve())).toBe(false);
    });

    test('має повертати true для Object.create(Object.prototype)', () => {
      const obj = Object.create(Object.prototype);
      expect(isObject(obj)).toBe(true);
    });

    test('має повертати false для загорнутих примітивів', () => {
      expect(isObject(new String('test'))).toBe(false);
      expect(isObject(new Number(42))).toBe(false);
    });
  });

  describe('isNull', () => {
    test('should return true for null', () => {
      expect(isNull(null)).toBe(true);
    });

    test('should return false for non-null values', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
      expect(isNull(false)).toBe(false);
      expect(isNull(NaN)).toBe(false);
      expect(isNull({})).toBe(false);
      expect(isNull([])).toBe(false);
      expect(isNull('null')).toBe(false);
    });

    test('має обробляти null у виразах', () => {
      let x = null;
      expect(isNull(x)).toBe(true);
    });

    test('має повертати false для об\'єктів схожих на null', () => {
      expect(isNull({ value: null })).toBe(false);
    });
  });
});