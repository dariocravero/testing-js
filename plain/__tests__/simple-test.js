// This is the simplest test ever.
it('tests something', function() {})

// We use ES6 style because it's cleaner to read. Babel will compile that for us if it's not
// natively available.
it('tests something in ES6', () => {})

// How do you tell some test failed? Throw an Error!
xit('tests something and fails', () => { throw new Error('failed') })

// It probably makes more sense in context...
// Let's get a buggy implementation of a function that is supposed to multiply a number by two
function timesTwo(number) {
  return number * 3
}

xit('should multiply by two', () => {
  if (timesTwo(2) !== 4) {
    throw new Error(`it doesn't multiply by two`)
  }
})

// That feels too verbose, doesn't it?
// Luckily, there's a better way: enter [assert](../basic-test.js).
