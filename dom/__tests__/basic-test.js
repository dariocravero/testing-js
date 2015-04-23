// We'll be using `jsdom`'s implementation of the DOM to make our tests run faster without the overhead
// of launching a real browser when we don't need it.

// `jsdom` gives you access to a global named `window`. It won't do it if it already exists, which
// means you can run the same set of tests without any issues on browsers too and it won't interfere
// with them.

import assert from 'assert'
import div from '../basic'
import jsdom from 'mocha-jsdom'

describe('basic dom tests', () => {
  jsdom()

  let el
  const TEXT = 'Sample text'
  beforeEach(() => el = div(TEXT))

  it('creates a div', () => assert(el.tagName === 'DIV'))
  it('sets the proper text to it', () => assert(el.innerText === TEXT))
})
