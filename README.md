# Testing

Here's a process for testing JavaScript applications.

## Running tests

```
# Run all tests
npm test

# Run a subset of tests
npm test -- plain

# Run an even narrower subset of tests and debug
npm test -- marty/user debug
```

We're using [a simple bash script](.bin/test).

## Tooling

- [mocha](https://mochajs.org): a testing framework;
- [assert](https://nodejs.org/api/assert.html#assert_assert): an assertion helper;
- [sinon.js](http://sinonjs.org/): a spying and stubbing helper;
- [sinon-as-promised](https://github.com/bendrucker/sinon-as-promised): an extension to sinon to stub promises;
- [proxyquire](https://github.com/thlorenz/proxyquire): a dependency overriding helper;
- [jsdom](https://github.com/tmpvar/jsdom): a DOM implementation;
- [mocha-jsdom](https://github.com/rstacruz/mocha-jsdom): a helper to integrate `mocha` and `jsdom`;
- [babel](https://babeljs.io): to use modern JavaScript and compile for older environments; and
- [mocha-test-utils](https://github.com/dariocravero/mocha-test-utils): a bunch of utils for mocha.

Get them on your project with:

```
npm install --save-dev mocha sinon sinon-as-promised proxyquire jsdom mocha-jsdom babel mocha-test-utils
```

## Naming conventions

Tests are expected to live inside a `__tests__` directory.

We're naming appending `-test` to identify the file in an easy way but it's not a prerequisite.

A typical component's file structure (with React+Marty) may look like:

```
some-component
  __tests__
    action-creators-test.js
    constants-test.js
    container-test.js
    component-test.js
    store-test.js
  records
    __tests__
      state-test.js
    state.js
  action-creators.js
  constants.js
  container.js
  component.js
  index.js
  store.js
```

## What to test?

As a rule of thumb: test your public API, critical methods and within those, make sure you validate
edge cases. So, if you had a function that splits a number, make sure that splitting by zero is
handled somehow and doesn't make the whole thing crash.

## Testing plain JavaScript

- [The simplest test ever](./plain/__tests__/simple-test.js)
- [Using assert](./plain/__tests__/basic-test.js)
- Test asynchronous code that uses [callbacks](./plain/__tests__/callback-test.js) or [promises](./plain/__tests__/promise-test.js)
- [Testing properties defined in classes](./plain/__tests__/klass-test.js).

## Testing code with dependencies

Most of the times the feature you're testing interacts with other parts of your application in one
way or another. Maybe it goes off calling other packages, depends on the DOM or calls a function
that computes tons of things. We want to keep our tests lean and focused on what we're trying to
achieve while still have them being meaningful.

Sinon gives us [spies](http://sinonjs.org/docs/#spies) and [stubs](http://sinonjs.org/docs/#stubs),
their docs are pretty clear so I won't go into further detail on them. [Here's a great blog post
expanding on this](http://www.elijahmanor.com/unit-test-like-a-secret-agent-with-sinon-js/).

Unless we're using globals -we aren't- which we can spy or stub directly, we'll have dependencies
shaped in the form of `import stuff from 'stuff'` or `let stuff = require('stuff')`. Here's how to
go about faking those.

- [See the dependencies tests](./dependencies/f2-test.js).

## Testing code that deals with the DOM

Beware that sometimes you don't need this at all.

For instance, if your code is expecting to read `location.href` you can just fake that as follows:

```
global.location = {
  href: 'http://localhost:3000/path/to/something'
}
```

There are some times when you'll need DOM element manipulation, testing if classes and styles are
being applied, etc. That's when we'll use a DOM implementation. Not a minute before :).

These examples are done without the browser. That guide will come in at some point. `TODO`.

- [basic](./dom/__tests__/basic-test.js)
- [hooking to events](./dom/__tests__/hooking-to-events-test.js)

### With real browsers

`TODO`.

## Testing React

## Testing Marty

This tests are written for Marty `v0.9`. Because of the way Marty `v0.9` is built -it assumes
everything is part of a larger, monolithic application- it's a harder to mock the parts of the 
application we need, so instead we just need to be a bit more careful and clean after our
tests. This should be addressed in `v0.10`.

- [Action creators](./marty/user/__tests__/action-creators-test.js)
- [Constants](./marty/user/__tests__/constants-test.js)
- [Container](./marty/user/__tests__/container-test.js)
- [State Source](./marty/user/__tests__/state-source-test.js)
- [Store](./marty/user/__tests__/store-test.js)
- [Store State record](./marty/user/records/__tests__/state-test.js)
- [Queries](./marty/user/__tests__/queries-test.js)
