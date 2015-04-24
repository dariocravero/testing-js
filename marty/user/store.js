import Constants from './constants';
import Marty from 'marty';
import Queries from './queries';
import { State } from './records';

export class UserStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.handlers = {
      setAddress: Constants.USER_SET_ADDRESS,
      setEmail: Constants.USER_SET_EMAIL
    };
  }

  getInitialState() { return new State(); }

  get address() {
    return this.fetch({
      id: this.email,
      locally() { return this.state.address; },
      remotely() { return Queries.getAddress(this.email); }
    })
  }
  get email() { return this.state.email; }

  setAddress(address) { this.state = this.state.set('address', address); }
  setEmail(email) { this.state = this.state.set('email', email); }
}

export default Marty.register(UserStore);
