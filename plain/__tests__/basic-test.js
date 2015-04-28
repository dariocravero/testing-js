// We need something to tell whether a test passed or not, that's when assert comes in handy,
// you can use any assertion library of your choice.
//
// We use assert because it's simple and it's bundled with node/iojs.
import assert from 'assert';
import basic from '../basic';

// What do you put inside a call to assert? A truth value. In other words, anything that resolves to
// true or false.
it('does some basic test', () => assert(basic('test') === 'test'));

// It's common for tests to check a couple of things, i.e., it's common for them to have multiple
// assert statements.
// assert takes a second parameter that let you specify some contextual text for that particular
// part of the test. It's very handy to quickly tell which one failed.
xit('let us attach a message to each assert', () => {
  assert(basic('test') === 'test', `test === 'test'`);
  assert(basic('test') !== 'test', `test !== 'test'`);
});

// Not all code is synchronous and sometimes you'll have to test things when some function finished
// doing what it was doing somewhere else.
//
// Here's how to test asynchronous code [in callbacks](../callback-test.js) and [in
// promises](../promise-test.js).
