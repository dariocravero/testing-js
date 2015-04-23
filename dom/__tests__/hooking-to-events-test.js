// One trick that may come in handy is checking out whether certain methods were used but not really
// interfere with the original implementation. Here's an example that lets us know that a `click` event
// handler was set and it still sets the real event handler in place.

import assert from 'assert'
import jsdom from 'mocha-jsdom'
import onClick from '../hooking-to-events'
import { spy } from 'sinon'

describe('hooking to events dom tests', () => {
  jsdom()

  {
  let clicked
  let el
  beforeEach(() => {
    clicked = spy()
    el = document.createElement('div')
    spy(el, 'addEventListener')
    onClick(el, clicked)
  })

  it('calls addEventListener', () => assert(el.addEventListener.calledOnce, 'called addEventListener on the element'))

  it('calls callback', () => {
    let event = document.createEvent('HTMLEvents')
    event.initEvent('click', false, true)
    el.dispatchEvent(event)

    assert(clicked.calledOnce, 'called clicked callback')
  })
  }

  // Triggering events with
  //
  // ```js
  // let event = document.createEvent('HTMLEvents')
  // event.initEvent("click", false, true)
  // el.dispatchEvent(event)
  // ```
  //
  // can be a bit repetitive...
  //
  // If you're testing `React` components, you can use [React simulation helpers](https://facebook.github.io/react/docs/test-utils.html#simulate)
  // to fake user interaction against DOM elements. 
  //
  // If you aren't, you will still need to trigger events on your own but you can simplify their creation
  // through [synthetic-dom-events](https://github.com/defunctzombie/synthetic-dom-events):
  {
  let clicked
  let el
  let event
  before(() => event = require('synthetic-dom-events'))
  beforeEach(() => {
    clicked = spy()
    el = document.createElement('div')
    onClick(el, clicked)
  })

  it('calls the callback', () => {
    el.dispatchEvent(event('click'))
    assert(clicked.calledOnce, 'called clicked callback')
  })
  }
})
