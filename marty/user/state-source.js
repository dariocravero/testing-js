import Marty from 'marty';

export class UserStateSource extends Marty.LocalStorageStateSource {
  constructor(options) {
    super(options);
    this.namespace = 'users';
  }

  getAddress(email) {
    return new Promise((resolve) => {
      const user = this.get(email);
      const address = user.address || {};
      resolve(address);
    });
  }

  setAddress(email, address) {
    return new Promise((resolve) => {
      let user = this.get(email) || {};
      user.address = address;
      this.set(email, user);
      resolve();
    });
  }
}

export default Marty.register(UserStateSource);
