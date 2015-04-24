// The main thing to test in `ActionCreators` is that they trigger the actions we expect them to
// trigger with the right values in place.
//
// For that we'll need to get a hold of the `dispatcher` and register ourselves for events triggered
// there. We also need to clean up our listeners right before the test finishes.

import assert from 'assert';
import Marty from 'marty';
import mockCreator from '../__mocks__';;
import { onDispatchedAction } from 'marty-test-utils';
import proxyquire from 'proxyquire';
import { wcheck } from 'mocha-test-utils';

const ADDRESS = {city: 'Dublin'};
const dispatcher = Marty.dispatcher.getDefault();
const EMAIL = 'my@email.com';
const Mock = mockCreator(['Constants']);

proxyquire.noCallThru()
const ActionCreators = proxyquire('../action-creators', {
  './constants': Mock.Constants
})['default'];

describe('User action creators', () => {
  it('#setAddress', (done) => {
    onDispatchedAction(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === Mock.Constants.USER_SET_ADDRESS, 'triggers the right event');
      assert(payload.arguments[0] === ADDRESS, 'has the right value');
    }));

    // Trigger the action
    ActionCreators.setAddress(ADDRESS);
  });

  it('#setEmail', (done) => {
    onDispatchedAction(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === Mock.Constants.USER_SET_EMAIL, 'triggers the right event');
      assert(payload.arguments[0] === EMAIL, 'has the right value');
    }));

    // Trigger the action
    ActionCreators.setEmail(EMAIL);
  });
});
