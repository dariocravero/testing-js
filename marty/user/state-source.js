import Marty from 'marty'

export class UserStateSource extends Marty.LocalStorageStateSource {
  constructor(options) {
    super(options)
    this.namespace = 'users'
  }

  getAddress(email) {
    return new Promise((resolve) => {
      resolve(this.get(email))
    })
  }

  setAddress(email, address) {
    this.set(email, address)
  }
}

export default Marty.register(UserStateSource)
