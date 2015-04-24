import Constants from './constants';
import Marty from 'marty';

export class UserActionCreators extends Marty.ActionCreators {
  setAddress(address) { this.dispatch(Constants.USER_SET_ADDRESS, address); }
  setEmail(email) { this.dispatch(Constants.USER_SET_EMAIL, email); }
}

export default Marty.register(UserActionCreators);
