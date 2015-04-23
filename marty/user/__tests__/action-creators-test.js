// The main thing to test in `ActionCreators` is that they trigger the actions we expect them to
// trigger with the right values in place.

// For that we'll need to get a hold of the `dispatcher` and register ourselves for events triggered
// there. We also need to clean up our listeners right before the test finishes.

import assert from 'assert'
import { onActionCreatorCall } from 'marty-test-utils'
import UserMock from '../__mocks__'
import Marty from 'marty'
import proxyquire from 'proxyquire'
import { wcheck } from 'mocha-test-utils'

const UserConstantsMock = UserMock(['Constants']).Constants
const dispatcher = Marty.dispatcher.getDefault()

proxyquire.noCallThru()

const ActionCreators = proxyquire('../action-creators', {
  './constants': UserConstantsMock
})['default'];

const ADDRESS = {city: 'Dublin'}
const EMAIL = 'my@email.com'

describe('User action creators', () => {
  it('#setAddress', (done) => {
    onActionCreatorCall(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === UserConstantsMock.USER_SET_ADDRESS, 'triggers the right event')
      assert(payload.arguments[0] === ADDRESS, 'has the right value')
    }))

    // Trigger the action
    ActionCreators.setAddress(ADDRESS)
  })

  it('#setEmail', (done) => {
    onActionCreatorCall(dispatcher, wcheck(done, (payload) => {
      assert(payload.type === UserConstantsMock.USER_SET_EMAIL, 'triggers the right event')
      assert(payload.arguments[0] === EMAIL, 'has the right value')
    }))

    // Trigger the action
    ActionCreators.setEmail(EMAIL)
  })
})
