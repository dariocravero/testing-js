// The main thing to test in `ActionCreators` is that they trigger the actions we expect them to
// trigger with the right values in place.
//
// For that we'll need to get a hold of the `dispatcher` and register ourselves for events triggered
// there. We also need to clean up our listeners right before the test finishes.
// We'll use the
// [onDispatchedAction](https://github.com/dariocravero/marty-test-utils/blob/master/on-dispatched-action.es6)
// helper from marty-test-utils for that.

import assert from 'assert';
import Marty from 'marty';
import mockCreator from '../__mocks__';
import { onDispatchedAction } from 'marty-test-utils';
import proxyquire from 'proxyquire';
import { wcheck } from 'mocha-test-utils';

const ADDRESS = {city: 'Dublin'};
const dispatcher = Marty.dispatcher.getDefault();
const EMAIL = 'my@email.com';
const mock = mockCreator('Constants');

proxyquire.noCallThru();
const actionCreators = proxyquire('../action-creators', {
  './constants': mock.Constants
})['default'];

describe('User action creators', () => {
  it('#setAddress', (done) => {
    onDispatchedAction(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === mock.Constants.USER_SET_ADDRESS, 'constant');
      assert(payload.arguments.length === 2, 'argument count');
      assert(payload.arguments[0] === ADDRESS, 'argument 0');
      assert(payload.arguments[1] === EMAIL, 'argument 1');
    }));

    // Trigger the action
    actionCreators.setAddress(ADDRESS, EMAIL);
  });

  it('#setEmail', (done) => {
    onDispatchedAction(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === mock.Constants.USER_SET_EMAIL, 'constant');
      assert(payload.arguments.length === 1, 'argument count');
      assert(payload.arguments[0] === EMAIL, 'argument 1');
    }));

    // Trigger the action
    actionCreators.setEmail(EMAIL);
  });
});
