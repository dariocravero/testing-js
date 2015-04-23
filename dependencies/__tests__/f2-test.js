import assert from 'assert'
import f2 from '../f2'
import { spy } from 'sinon'

beforeEach(() => spy(console, 'log'))
afterEach(() => console.log.restore())

it(`doesn't fake f1`, () => {
  f2() // calls f1
  assert(console.log.calledWith(`I'm f1`), 'f1 called')
  assert(console.log.calledWith(`I'm f2`), 'f2 called')
})

// Given the code above, how do we fake `f1`? Enter [proxyquire](https://github.com/thlorenz/proxyquire).
// It basically lets us fake imports in modules.

import proxyquire from 'proxyquire'

{
const f2 = proxyquire('../f2', {
  './f1': function() {}
})

it('fakes f1', () => {
  f2() // calls function() {} instead of 
  assert(!console.log.calledWith(`I'm f1`), 'f1 not called')
  assert(console.log.calledWith(`I'm f2`), 'f2 called')
})
}

// Of course you can mix those with `spies` and `stubs` to either ensure they were called or fake some
// results:

{
const f1Spy = spy()
const f2 = proxyquire('../f2', {
  './f1': f1Spy
})

it('fakes f1 and calls the spy', () => {
  f2()
  assert(f1Spy.called, 'f1 was called')
})
}

// There is one gotcha though...
//
// In the example above we were exporting a default function in `f1`, if we would be exporting an
// object (either explicitly or through multiple `export` calls), proxyquire won't fake it unless
// we tell it to. E.g.:

{
const f2MultipleExports = proxyquire('../f2-multiple-exports', {
  './f1-multiple-exports': {}
})

it(`doesn't fake f1 because we didn't tell proxyquire to do so`, () => {
  f2() // calls f1
  assert(console.log.calledWith(`I'm f1`), 'f1 called')
  assert(console.log.calledWith(`I'm f2`), 'f2 called')
})
}

// Why did this code call the original `f1`?
//
// ```js
// const f2 = proxyquire('../f2', {
//   './f1': {}
// })
// ```
//
// Because we didn't fake any of its exports. By default `proxyquire` calls the function defined on the
// original dependency whenever it is not found on the stub. So we need to specify it.

{
const f2 = proxyquire('../f2-multiple-exports', {
  './f1-multiple-exports': {
    f1: function() {}
  }
})

it(`fakes f1 because we told proxyquire to do so`, () => {
  f2() // calls function() {} instead of 
  assert(!console.log.calledWith(`I'm f1`), 'f1 not called')
  assert(console.log.calledWith(`I'm f2`), 'f2 called')
})
}

// If we want to be more strict about what we're stubbing, we can tell `proxyquire` that we don't want
// it to use anything other than what we explicitly stubbed. We can do this with `'@noCallThru': true`:

{
const f2 = proxyquire('../f2-multiple-exports', {
  './f1-multiple-exports': {
    '@noCallThru': true
  }
})

it(`throws an exception because f1 isn't stubbed and we're preventing it from looking into the original file`, () => {
  assert.throws(f2, 'undefined is not a function', 'threw an exception')
})
}

// Be careful with that because on the example above the export from `./f1-multiple-exports` will look 
// like an empty object, i.e., the function `f1` won't be defined and your test will fail.
//
// This isn't a way to tell it to mock everything, it's just a way to tell it not to call things you
// don't want it to. [There are efforts to automock](https://github.com/danvk/mocha-proxyquire-test)
// like `jest` does. We won't be using it for now and we won't cover it on this guide.
//
// To fix the last example, just define your stubs:

{
const f2 = proxyquire('../f2-multiple-exports', {
  './f1-multiple-exports': {
    f1: function() {},
    '@noCallThru': true
  }
})

it(`throws an exception because f1 isn't stubbed and we're preventing it from looking into the original file`, () => {
  assert.doesNotThrow(f2, 'no exception thrown')
})
}
