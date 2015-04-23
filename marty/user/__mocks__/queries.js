import Marty from 'marty'
import constantsMock from './constants'

const Constants = constantsMock()

export default function() {
  class UserQueriesMock extends Marty.Queries {
    getAddress(email) {
      return new Promise((resolve) => {
        this.dispatch(Constants.USER_SET_ADDRESS, this.ADDRESS)
        resolve()
      })
    }
  }

  // TODO Register if not registered?
  return Marty.register(UserQueriesMock)
}
