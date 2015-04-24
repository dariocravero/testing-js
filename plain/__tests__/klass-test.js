import assert from 'assert'
import Klass from '../klass';
import { spy } from 'sinon'

const STUFF1 = 'STUFF1';
const STUFF2 = 'STUFF2';

describe('Klass', () => {
  let klass;
  beforeEach(() => klass = new Klass());

  describe('descriptors', () => {
    it('#stuff (getter)', () => {
      let descriptor = Object.getOwnPropertyDescriptor(klass.constructor.prototype, 'stuff');
      assert(typeof descriptor.get === 'function', 'getter');
    });

    it('#stuff (setter)', () => {
      let descriptor = Object.getOwnPropertyDescriptor(klass.constructor.prototype, 'stuff');
      assert(typeof descriptor.set === 'function', 'setter');
    });
  });

  describe('interaction', () => {
    beforeEach(() => klass._stuff = STUFF1);

    it('gets stuff', () => assert(klass.stuff === STUFF1))

    it('sets stuff', () => {
      klass.stuff = STUFF2;
      assert(klass.stuff === STUFF2);
    });
  });

  describe('with two instances', () => {
    let klass1;
    let klass2;
    beforeEach(() => {
      klass1 = new Klass();
      klass2 = new Klass();

      // Spy klass1.stuff
      Object.defineProperty(klass1, 'stuff', {
        get: spy(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(klass1), 'stuff').get)
      });
      // Spy klass2.stuff
      Object.defineProperty(klass2, 'stuff', {
        get: spy(Object.getOwnPropertyDescriptor(Object.getPrototypeOf(klass2), 'stuff').get)
      });
    });

    it('calls the right getter', () => {
      klass1.stuff;
      assert(Object.getOwnPropertyDescriptor(klass1, 'stuff').get.calledOnce, 'calls klass1.stuff');
      assert(Object.getOwnPropertyDescriptor(klass2, 'stuff').get.notCalled, `doesn't call klass2.stuff`);
    });
  })
})
