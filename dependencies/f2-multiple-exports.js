import { f1 } from './f1-multiple-exports'

export default function f2() {
  f1()
  console.log(`I'm f2`)
}
