import assert from 'assert';
import { propertyDescriptor } from 'mocha-test-utils';
import Address from '../address';

const CITY = 'CITY';

describe('User Address record', () => {
  let address; beforeEach(() => address = new Address());

  it('is immutable', () => {
    let newAddress = address.set('city', CITY);
    assert(address.city === undefined, 'original object is untouched');
    assert(newAddress.city === CITY, 'copy gets the right value');
  });

  it('#city', () => typeof propertyDescriptor(address, 'city').get === 'function');
});
