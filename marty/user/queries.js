import Constants from './constants';
import Marty from 'marty';
import StateSource from './state-source';

export class UserQueries extends Marty.Queries {
  getAddress(email) {
    let promise = StateSource.getAddress(email);
    promise.then((address) => this.dispatch(Constants.USER_SET_ADDRESS, address));
    return promise;
  }
}

export default Marty.register(UserQueries);
