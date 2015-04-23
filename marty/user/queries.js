import Marty from 'marty'
import StateSource from './state-source'

export class UserQueries extends Marty.Queries {
  getAddress(email) {
    return StateSource.getAddress(email).then((address) => this.dispatch(Constants.USER_SET_ADDRESS, address))
  }
}

export default Marty.register(UserQueries)
