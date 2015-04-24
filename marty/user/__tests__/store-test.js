// The main thing to test in `Store` is that:
//
// - they have getters to extract information,
// - when these getters are fetching data they call the Queries;
// - they handle the actions we expect them to and update itself accordingly.
//
// For the last one we'll need to register ourselves for changes on the store.
// We also need to clean up our listeners right before the test finishes.
// We'll use the
// [onStoreChange](https://github.com/dariocravero/marty-test-utils/blob/master/on-store-change.es6)
// helper from marty-test-utils for that.

import assert from 'assert';
import { Address, State } from '../records';
import Marty from 'marty';
import mockCreator from '../__mocks__';
import { onStoreChange } from 'marty-test-utils';
import proxyquire from 'proxyquire';
import { wcheck } from 'mocha-test-utils';

proxyquire.noCallThru();

const ADDRESS = new Address({
  city: 'Dublin'
});
const dispatcher = Marty.dispatcher.getDefault();
const EMAIL = 'my@email.com';
const Mock = mockCreator(['Constants', 'Queries']);

let Store = proxyquire('../store', {
  './constants': Mock.Constants,
  './queries': Mock.Queries
})['default'];

describe('User store', () => {
  // Make sure we clear out the store on every test so that we start with a clean slate.
  beforeEach(() => Store.clear());

  // Check that the initial state is right. Since we're using [immutable
  // records](http://facebook.github.io/immutable-js/docs/#/Record) for it we check against a new
  // instance of it.
  it('sets an initial state', () => assert((new State()).equals(Store.state), 'initial state'));

  // Test that your getters work accordingly
  describe('getters', () => {
    // We need an email for our tests
    beforeEach(() => Store.replaceState(new State({email: EMAIL})));

    // Simple get checkers should 'just' work
    it('#email', () => {
      assert(typeof Object.getOwnPropertyDescriptor(Store.constructor.prototype, 'email').get === 'function', 'has a getter');
      assert('email' in Store, 'has property');
    });

    // Test fetch scenarios where some property comes from a Query's result
    it('#address', () => {
      assert(typeof Object.getOwnPropertyDescriptor(Store.constructor.prototype, 'address').get === 'function', 'has a getter');
      assert('address' in Store, 'has property');

      // We make sure we have an undefined state for the property so that it will fetch remotely.
      assert(typeof Store.state.address === 'undefined', 'start without value');

      // Get the value
      let fetchResult = Store.address;
      // Assert that we start with a pending request
      assert(fetchResult.pending, 'first fetch with no data');

      // Check that it calls the Queries
      assert(Mock.Queries.getAddress.calledOnce, 'calls Queries');
    });
  });

  // Test that your event handlers work accordingly
  describe('handlers', () => {
    // Test every constant you support
    it('USER_SET_ADDRESS', (done) => {
      // Assert when the Store registers the change
      onStoreChange(Store, wcheck(done, state => assert(state.address.equals(ADDRESS), 'value is set')));

      // Fake the dispatcher emitting an action
      dispatcher.dispatchAction({type: Mock.Constants.USER_SET_ADDRESS, arguments: [ADDRESS]});
    });

    it('USER_SET_EMAIL', (done) => {
      onStoreChange(Store, wcheck(done, state => assert(state.email === EMAIL, 'value is set')));
      dispatcher.dispatchAction({type: Mock.Constants.USER_SET_EMAIL, arguments: [EMAIL]});
    });
  });
});
