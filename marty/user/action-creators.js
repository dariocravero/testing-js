import Constants from './constants';
import Marty from 'marty';
import StateSource from './state-source';

export class UserActionCreators extends Marty.ActionCreators {
  setAddress(address, id) {
    StateSource.setAddress(address, id).then(() => this.dispatch(Constants.USER_SET_ADDRESS, address, id));
  }
  setEmail(email) { this.dispatch(Constants.USER_SET_EMAIL, email); }
}

export default Marty.register(UserActionCreators);
