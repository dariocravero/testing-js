import ActionCreators from './action-creators';
import Constants from './constants';
import Container from './container';
import Component from './component';
import StateSource from './state-source';
import Store from './store';
import Queries from './queries';

const MODULES = {
  ActionCreators,
  Constants,
  Container,
  Component,
  StateSource,
  Store,
  Queries
};

export default function User(modules=[]) {
  let ret = {};
  modules.forEach(mod => ret[mod] = MODULES[mod]());
  return ret;
}
