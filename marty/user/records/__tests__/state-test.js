import assert from 'assert';
import { propertyDescriptor } from 'mocha-test-utils';
import State from '../state';

const EMAIL = 'EMAIL';

describe('User State record', () => {
  let state; beforeEach(() => state = new State());

  it('is immutable', () => {
    let newState = state.set('email', EMAIL);
    assert(state.email === undefined, 'original object is untouched');
    assert(newState.email === EMAIL, 'copy gets the right value');
  });

  it('#address', () => typeof propertyDescriptor(state, 'address').get === 'function');
  it('#email', () => typeof propertyDescriptor(state, 'email').get === 'function');
});
