import Marty from 'marty';
import constantsMock from './constants';

const Constants = constantsMock();

export default function() {
  class UserQueriesMock extends Marty.Queries {
    static unregister() {
      delete Marty.registry.types.Queries.UserQueriesMock;
      delete Marty.registry.defaults.Queries.UserQueriesMock;
    }

    getAddress(email) {
      return new Promise((resolve) => {
        this.dispatch(Constants.USER_SET_ADDRESS, this.ADDRESS);
        resolve();
      });
    }
  }

  return Marty.register(UserQueriesMock)
}
