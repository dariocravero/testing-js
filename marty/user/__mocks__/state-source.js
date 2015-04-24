export default function() {
  return {
    ADDRESS: undefined,
    getAddress(email) {
      return new Promise(resolve => resolve(this.ADDRESS));
    }
  };
}
