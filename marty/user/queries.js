import Constants from './constants';
import Marty from 'marty';
import stateSource from './state-source';

export class UserQueries extends Marty.Queries {
  getAddress(email) {
    return stateSource.getAddress(email).then(address => this.dispatch(Constants.USER_SET_ADDRESS, address));
  }
}

export default Marty.register(UserQueries);
