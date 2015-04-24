// The main thing to test in `ActionCreators` is that they trigger the actions we expect them to
// trigger with the right values in place.
//
// For that we'll need to get a hold of the `dispatcher` and register ourselves for events triggered
// there. We also need to clean up our listeners right before the test finishes.
//
// That can get a bit repetitive quite quickly, that's why we'll be using `onDispatchedAction` a
// helper from `marty-test-utils`.

import assert from 'assert'
import { Address, State } from '../records'
import Marty from 'marty'
import mockCreator from '../__mocks__'
import { onStoreChange } from 'marty-test-utils'
import proxyquire from 'proxyquire'
import { wcheck } from 'mocha-test-utils'

proxyquire.noCallThru()

const ADDRESS = new Address({
  city: 'Dublin'
})
const dispatcher = Marty.dispatcher.getDefault()
const EMAIL = 'my@email.com'
const Mock = mockCreator(['Constants', 'Queries'])

Mock.Queries.ADDRESS = ADDRESS

let Store = proxyquire('../store', {
  './constants': Mock.Constants,
  './queries': Mock.Queries
})['default']

describe('User store', () => {
  // Make sure we clear out the store on every test so that we start with a clean slate.
  beforeEach(() => Store.clear())

  // Make sure our mock gets unregistered. This shouldn't be needed with newer versions of Marty.
  after(() => Mock.Queries.constructor.unregister())

  // Check that the initial state is right. Since we're using [immutable
  // records](http://facebook.github.io/immutable-js/docs/#/Record) for it we check against a new
  // instance of it.
  it('sets an initial state', () => assert((new State()).equals(Store.state), 'initial state'))

  // Test that your getters work accordingly
  describe('getters', () => {
    // We need an email for our tests
    beforeEach(() => Store.replaceState(new State({email: EMAIL})))

    // Simple get checkers should 'just' work
    it('#email', () => assert('email' in Store, 'has property'))

    // Test fetch scenarios where some property comes from a Query's result
    it('#address', (done) => {
      assert('address' in Store, 'has property')

      // We start with an undefined property to make it easier on our fetch logic.
      assert(typeof Store.state.address === 'undefined', 'start without value')

      // Assert when the Store registers the change
      onStoreChange(Store, wcheck(done, (state) => {
        assert(state.address instanceof Address, 'set the right record type')
        assert(state.address.equals(ADDRESS), 'set the value')
      }))

      // Get the value
      let fetchResult = Store.address
      // Assert that we start with a pending request
      assert(fetchResult.pending, 'first fetch with no data')
    })
  })

  // Test that your event handlers work accordingly
  describe('handlers', () => {
    // Test every constant you support
    it('USER_SET_ADDRESS', (done) => {
      // Assert when the Store registers the change
      onStoreChange(Store, wcheck(done, (state) => {
        assert(state.address.equals(ADDRESS), 'verify the value is set')
      }))

      // Fake the dispatcher emitting an action
      dispatcher.dispatchAction({type: Mock.Constants.USER_SET_ADDRESS, arguments: [ADDRESS]})
    })

    it('USER_SET_EMAIL', (done) => {
      // Assert when the Store registers the change
      onStoreChange(Store, wcheck(done, (state) => {
        assert(state.email === EMAIL, 'verify the value is set')
      }))

      // Fake the dispatcher emitting an action
      dispatcher.dispatchAction({type: Mock.Constants.USER_SET_EMAIL, arguments: [EMAIL]})
    })
  })
})
