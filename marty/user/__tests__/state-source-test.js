// The main thing to test in `StateSource` is that they trigger the actions we expect them to
// trigger with the right values in place.
//
// For that we'll need to get a hold of the `dispatcher` and register ourselves for events triggered
// there. We also need to clean up our listeners right before the test finishes.

import assert from 'assert';
import { onDispatchedAction } from 'marty-test-utils';
import StateSource from '../state-source';
import { check } from 'mocha-test-utils';

const ADDRESS = {city: 'Dublin'};
const EMAIL = 'my@email.com';

describe('User state source', () => {
  describe('getters', () => {
    xit('#getAddress', (done) => {
    });
  });

  describe('setters', () => {
    xit('#setAddress', () => {
    });
  })
});
