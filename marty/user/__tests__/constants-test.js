import assert from 'assert'
import Constants from '../constants'

// We want to make sure we get the right constants in.
// This seems very trivial but it's a good practice to have them verified by our tests and to make
// sure that we're only exposing the right amount of them.

// How many constants are we defining?
const DEFINED_CONSTANTS = 2

describe('User constants', () => {
  it('has USER_SET_ADDRESS', () => assert(Constants.USER_SET_ADDRESS.toString() === 'USER_SET_ADDRESS'))
  it('has USER_SET_EMAIL', () => assert(Constants.USER_SET_EMAIL.toString() === 'USER_SET_EMAIL'))

  // Until Marty v0.10 is released and we need to multiple it by 4 as Marty adds 3 constants
  // suffixed by _DONE, _PENDING and _FAILED. We're not using them internally and they are going
  // to be deprecated. If someone is using them, they would be required to define them manually
  // going forward.
  it(`has ${DEFINED_CONSTANTS} constants`, () => assert(Object.keys(Constants).length === DEFINED_CONSTANTS * 4))
})
