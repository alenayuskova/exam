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

describe('Утиліти для перевірки типів - Варіант 2', () => {
  describe('isRange', () => {
    test('має повертати true для об\'єктів Range', () => {
      function Range() {}
      Range.prototype.isRange = true;
      const range = new Range();
      expect(isRange(range)).toBe(true);
    });

    test('має повертати false для не-Range значень', () => {
      expect(isRange(null)).toBe(false);
      expect(isRange(undefined)).toBe(false);
      expect(isRange(42)).toBe(false);
      expect(isRange('test')).toBe(false);
      expect(isRange({})).toBe(false);
      expect(isRange([])).toBe(false);
    });

    test('має повертати false коли isRange дорівнює false', () => {
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

    test('має повертати false коли isRange є числом', () => {
      function FakeRange() {}
      FakeRange.prototype.isRange = 1;
      const obj = new FakeRange();
      expect(isRange(obj)).toBe(false);
    });

    test('має повертати false коли isRange є рядком', () => {
      function FakeRange() {}
      FakeRange.prototype.isRange = 'true';
      const obj = new FakeRange();
      expect(isRange(obj)).toBe(false);
    });

    test('має повертати false для примітивних значень', () => {
      expect(isRange(0)).toBe(false);
      expect(isRange('')).toBe(false);
      expect(isRange(false)).toBe(false);
      expect(isRange(Symbol('test'))).toBe(false);
    });
  });

  describe('isIndex', () => {
    test('має повертати true для об\'єктів Index', () => {
      function Index() {}
      Index.prototype.isIndex = true;
      const index = new Index();
      expect(isIndex(index)).toBe(true);
    });

    test('має повертати false для не-Index значень', () => {
      expect(isIndex(null)).toBe(false);
      expect(isIndex(undefined)).toBe(false);
      expect(isIndex(42)).toBe(false);
      expect(isIndex('test')).toBe(false);
      expect(isIndex({})).toBe(false);
      expect(isIndex([])).toBe(false);
    });

    test('має повертати false коли isIndex дорівнює false', () => {
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

    test('має повертати false для масивів', () => {
      expect(isIndex([0, 1, 2])).toBe(false);
      expect(isIndex(new Array(5))).toBe(false);
    });

    test('має повертати false коли isIndex є об\'єктом', () => {
      function FakeIndex() {}
      FakeIndex.prototype.isIndex = {};
      const obj = new FakeIndex();
      expect(isIndex(obj)).toBe(false);
    });

    test('має повертати false для числових індексів', () => {
      expect(isIndex(0)).toBe(false);
      expect(isIndex(1)).toBe(false);
      expect(isIndex(-1)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    test('має повертати true для булевих значень', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
    });

    test('має повертати false для не-булевих значень', () => {
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean(0)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean('false')).toBe(false);
      expect(isBoolean(null)).toBe(false);
      expect(isBoolean(undefined)).toBe(false);
      expect(isBoolean({})).toBe(false);
      expect(isBoolean([])).toBe(false);
    });

    test('має повертати false для об\'єктів Boolean', () => {
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

    test('має обробляти результати логічних операторів', () => {
      expect(isBoolean(true && false)).toBe(true);
      expect(isBoolean(true || false)).toBe(true);
      expect(isBoolean(!true)).toBe(true);
    });

    test('має обробляти результати порівнянь', () => {
      expect(isBoolean(1 === 1)).toBe(true);
      expect(isBoolean(1 !== 2)).toBe(true);
      expect(isBoolean(1 < 2)).toBe(true);
      expect(isBoolean(2 > 1)).toBe(true);
    });

    test('має повертати false для Symbol', () => {
      expect(isBoolean(Symbol('bool'))).toBe(false);
    });

    test('має повертати false для BigInt', () => {
      expect(isBoolean(BigInt(1))).toBe(false);
      expect(isBoolean(1n)).toBe(false);
    });
  });

  describe('isResultSet', () => {
    test('має повертати true для об\'єктів ResultSet', () => {
      function ResultSet() {}
      ResultSet.prototype.isResultSet = true;
      const resultSet = new ResultSet();
      expect(isResultSet(resultSet)).toBe(true);
    });

    test('має повертати false для не-ResultSet значень', () => {
      expect(isResultSet(null)).toBe(false);
      expect(isResultSet(undefined)).toBe(false);
      expect(isResultSet(42)).toBe(false);
      expect(isResultSet('test')).toBe(false);
      expect(isResultSet({})).toBe(false);
      expect(isResultSet([])).toBe(false);
    });

    test('має повертати false коли isResultSet дорівнює false', () => {
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

    test('має повертати false для Set об\'єктів', () => {
      expect(isResultSet(new Set())).toBe(false);
      expect(isResultSet(new Set([1, 2, 3]))).toBe(false);
    });

    test('має повертати false коли isResultSet null', () => {
      function FakeResultSet() {}
      FakeResultSet.prototype.isResultSet = null;
      const obj = new FakeResultSet();
      expect(isResultSet(obj)).toBe(false);
    });

    test('має повертати false коли isResultSet undefined', () => {
      function FakeResultSet() {}
      FakeResultSet.prototype.isResultSet = undefined;
      const obj = new FakeResultSet();
      expect(isResultSet(obj)).toBe(false);
    });
  });

  describe('isHelp', () => {
    test('має повертати true для об\'єктів Help', () => {
      function Help() {}
      Help.prototype.isHelp = true;
      const help = new Help();
      expect(isHelp(help)).toBe(true);
    });

    test('має повертати false для не-Help значень', () => {
      expect(isHelp(null)).toBe(false);
      expect(isHelp(undefined)).toBe(false);
      expect(isHelp(42)).toBe(false);
      expect(isHelp('test')).toBe(false);
      expect(isHelp({})).toBe(false);
      expect(isHelp([])).toBe(false);
    });

    test('має повертати false коли isHelp дорівнює false', () => {
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

    test('має повертати false для рядків "help"', () => {
      expect(isHelp('help')).toBe(false);
      expect(isHelp('Help')).toBe(false);
    });

  });

  describe('isFunction', () => {
    test('має повертати true для функцій', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function() {})).toBe(true);
      expect(isFunction(async function() {})).toBe(true);
      expect(isFunction(function*() {})).toBe(true);
      expect(isFunction(Math.sin)).toBe(true);
      expect(isFunction(Date)).toBe(true);
    });

    test('має повертати false для не-функцій', () => {
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

    test('має повертати true для async стрілкових функцій', () => {
      const asyncArrow = async () => {};
      expect(isFunction(asyncArrow)).toBe(true);
    });

    test('має повертати true для генераторів', () => {
      function* generator() {
        yield 1;
      }
      expect(isFunction(generator)).toBe(true);
    });

    test('має повертати true для async генераторів', () => {
      async function* asyncGenerator() {
        yield 1;
      }
      expect(isFunction(asyncGenerator)).toBe(true);
    });

    test('має повертати true для вбудованих функцій', () => {
      expect(isFunction(Array.isArray)).toBe(true);
      expect(isFunction(Object.keys)).toBe(true);
      expect(isFunction(JSON.parse)).toBe(true);
    });

    test('має повертати true для конструкторів', () => {
      expect(isFunction(Array)).toBe(true);
      expect(isFunction(Object)).toBe(true);
      expect(isFunction(Function)).toBe(true);
    });

    test('має повертати false для Symbol', () => {
      expect(isFunction(Symbol('test'))).toBe(false);
    });
  });

  describe('isDate', () => {
    test('має повертати true для об\'єктів Date', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2024-01-01'))).toBe(true);
      expect(isDate(new Date(0))).toBe(true);
    });

    test('має повертати false для не-Date значень', () => {
      expect(isDate('2024-01-01')).toBe(false);
      expect(isDate(1234567890)).toBe(false);
      expect(isDate(null)).toBe(false);
      expect(isDate(undefined)).toBe(false);
      expect(isDate({})).toBe(false);
      expect(isDate([])).toBe(false);
    });

    test('має повертати true для невалідних дат', () => {
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

    test('має повертати true для дат створених різними способами', () => {
      expect(isDate(new Date(2024, 0, 1))).toBe(true);
      expect(isDate(new Date(2024, 0, 1, 12, 30, 45))).toBe(true);
    });

    test('має повертати false для рядків ISO формату', () => {
      expect(isDate('2024-01-01T00:00:00Z')).toBe(false);
    });

    test('має повертати false для об\'єктів з методами дати', () => {
      const fakeDate = {
        getFullYear: () => 2024,
        getMonth: () => 0,
        getDate: () => 1
      };
      expect(isDate(fakeDate)).toBe(false);
    });
  });

  describe('isRegExp', () => {
    test('має повертати true для об\'єктів RegExp', () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp('test'))).toBe(true);
      expect(isRegExp(/abc/gi)).toBe(true);
      expect(isRegExp(new RegExp('xyz', 'i'))).toBe(true);
    });

    test('має повертати false для не-RegExp значень', () => {
      expect(isRegExp('/test/')).toBe(false);
      expect(isRegExp('test')).toBe(false);
      expect(isRegExp(null)).toBe(false);
      expect(isRegExp(undefined)).toBe(false);
      expect(isRegExp({})).toBe(false);
      expect(isRegExp([])).toBe(false);
      expect(isRegExp(42)).toBe(false);
    });

    test('має повертати true для RegExp з різними прапорцями', () => {
      expect(isRegExp(/test/g)).toBe(true);
      expect(isRegExp(/test/i)).toBe(true);
      expect(isRegExp(/test/m)).toBe(true);
      expect(isRegExp(/test/gim)).toBe(true);
    });

    test('має повертати false для об\'єктів схожих на regexp', () => {
      const fakeRegExp = { test: () => true, exec: () => null };
      expect(isRegExp(fakeRegExp)).toBe(false);
    });

    test('має повертати true для складних патернів', () => {
      expect(isRegExp(/^[a-zA-Z0-9]+$/)).toBe(true);
      expect(isRegExp(/\d{3}-\d{2}-\d{4}/)).toBe(true);
    });

    test('має повертати false для рядків з екранованими слешами', () => {
      expect(isRegExp('\\/test\\/')).toBe(false);
    });

    test('має повертати true для RegExp зі спеціальними символами', () => {
      expect(isRegExp(/[\w\s]/)).toBe(true);
      expect(isRegExp(/[^abc]/)).toBe(true);
    });
  });

  describe('isObject', () => {
    test('має повертати true для простих об\'єктів', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1, b: 2 })).toBe(true);
      expect(isObject(new Object())).toBe(true);
    });

    test('має повертати false для null', () => {
      expect(isObject(null)).toBe(false);
    });

    test('має повертати false для undefined', () => {
      expect(isObject(undefined)).toBe(false);
    });

    test('має повертати false для примітивів', () => {
      expect(isObject(42)).toBe(false);
      expect(isObject('test')).toBe(false);
      expect(isObject(true)).toBe(false);
    });

    test('має повертати false для масивів', () => {
      expect(isObject([])).toBe(false);
      expect(isObject([1, 2, 3])).toBe(false);
    });

    test('має повертати false для інших типів об\'єктів', () => {
      expect(isObject(new Date())).toBe(false);
      expect(isObject(/test/)).toBe(false);
      expect(isObject(() => {})).toBe(false);
    });

    test('має повертати false для екземплярів користувацьких класів', () => {
      class CustomClass {}
      expect(isObject(new CustomClass())).toBe(false);
    });

    test('має повертати false для комплексних чисел', () => {
      const complex = Object.create({ isComplex: true });
      expect(isObject(complex)).toBe(false);
    });

    test('має повертати false для дробів', () => {
      const fraction = Object.create({ isFraction: true });
      expect(isObject(fraction)).toBe(false);
    });

    test('має обробляти об\'єкти з null прототипом', () => {
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

    test('має повертати true для об\'єктів з різними властивостями', () => {
      expect(isObject({ name: 'test', age: 25 })).toBe(true);
      expect(isObject({ nested: { value: 1 } })).toBe(true);
    });

    test('має повертати false для Symbol', () => {
      expect(isObject(Symbol('test'))).toBe(false);
    });

    test('має повертати false для BigInt', () => {
      expect(isObject(BigInt(123))).toBe(false);
      expect(isObject(123n)).toBe(false);
    });

    test('має повертати true для порожніх об\'єктів', () => {
      expect(isObject({})).toBe(true);
      expect(isObject(Object.create(Object.prototype))).toBe(true);
    });

    test('має повертати false для typed arrays', () => {
      expect(isObject(new Int8Array())).toBe(false);
      expect(isObject(new Uint8Array())).toBe(false);
      expect(isObject(new Float32Array())).toBe(false);
    });

    test('має повертати false для ArrayBuffer', () => {
      expect(isObject(new ArrayBuffer(8))).toBe(false);
    });
  });

  describe('isNull', () => {
    test('має повертати true для null', () => {
      expect(isNull(null)).toBe(true);
    });

    test('має повертати false для не-null значень', () => {
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

    test('має повертати false для результату typeof null', () => {
      const typeofNull = typeof null;
      expect(isNull(typeofNull)).toBe(false);
    });

    test('має повертати true для літералу null', () => {
      expect(isNull(null)).toBe(true);
      const n = null;
      expect(isNull(n)).toBe(true);
    });

    test('має повертати false для Symbol', () => {
      expect(isNull(Symbol('null'))).toBe(false);
    });

    test('має повертати false для BigInt 0', () => {
      expect(isNull(0n)).toBe(false);
    });

    test('має обробляти null в умовних виразах', () => {
      const value = true ? null : undefined;
      expect(isNull(value)).toBe(true);
    });

    test('має повертати false для void 0', () => {
      expect(isNull(void 0)).toBe(false);
    });
    
  });
});