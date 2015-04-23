import { spy } from 'sinon'

export default function() {
  return {
    setAddress: spy(),
    setEmail: spy()
  }
}
