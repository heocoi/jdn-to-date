import test from 'ava';
import timezoneMock from 'timezone-mock';
import jdnToDate from './index.js';

test.beforeEach(() => {
  timezoneMock.register('UTC');
});

test('main', t => {
  t.deepEqual(jdnToDate(2460370), new Date('2024-02-29'));

  t.deepEqual(jdnToDate(2460369.1), new Date('2024-02-28'));

  t.deepEqual(jdnToDate(2460369.5), new Date('2024-02-29'));

  t.deepEqual(jdnToDate(2460369.9166666665), new Date('2024-02-29'));

  t.deepEqual(jdnToDate(2460398.0354167), new Date('2024-03-28'));

  t.throws(() => {
    jdnToDate('just a string');
  }, {
    instanceOf: TypeError,
    message: 'Expected a number, got string',
  });
});
