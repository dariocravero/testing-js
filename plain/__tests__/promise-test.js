import assert from 'assert'
import { promise, promiseThrow } from '../promise'

// In mocha, done is the key to testing asynchronous code.
// Make sure your test has it as a parameter.
it('resolves a promise', (done) => {
  promise().then(() => {
    assert(true)
    // and that you call it when you're done testing stuff
    done()
  })
})

// What about callbacks? [Here you go](../callback-test.js).


// Gotchas:
//
// - If you forget to call `done` when your tests are done `mocha` will timeout and give you an error
// like this:
//
// ```
// Error: timeout of 2000ms exceeded. Ensure the done() callback is being called in this test.
// ```
//
// - If you're using promises and your code fails with an exception, that's essentially the same as
// having your promise rejected.
//
// Of course you won't be just putting a `throw` statement just like that in your code but maybe some
// other things that it calls can be failing and it might not be very clear from the test when it just
// "timeouts". Adding the `catch` statement to the test will help you debug it more easily. Use this as
// a last resort and don't really leave this code in your tests (unless you have to test a `reject` on
// a promise which is totally valid).

it('resolves a promise that throws', (done) => {
  promiseThrow().then(() => {
    assert(true)
    done()
  }).catch((err) => {
    console.error('This promise threw this error:', err)
    done()
  })
})
