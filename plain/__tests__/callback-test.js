import assert from 'assert'
import callback from '../callback'

// In mocha, done is the key to testing asynchronous code.
// Make sure your test has it as a parameter.
it('calls a callback', (done) => {
  callback(function() {
    assert(true)
    // and that you call it when you're done testing stuff
    done()
  })
})

// What about promises? [Here you go](../promise-test.js).
