import { spy } from 'sinon';

export default function() {
  return {
    getAddress: spy(() => new Promise(resolve => resolve()))
  };
}
