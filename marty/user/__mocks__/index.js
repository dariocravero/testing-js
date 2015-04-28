import actionCreators from './action-creators';
import Constants from './constants';
import container from './container';
import component from './component';
import { mockCreator } from 'mocha-test-utils';
import stateSource from './state-source';
import store from './store';
import queries from './queries';

export default mockCreator({
  actionCreators,
  Constants,
  container,
  component,
  stateSource,
  store,
  queries
});
