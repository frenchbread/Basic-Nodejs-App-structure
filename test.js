import test from 'ava';

import request from 'request';

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});

test('App is up', async t => {

  const statusCode = await new Promise((resolve, reject) => {
    request('http://127.0.0.1:3000/', (err, res, body) => {
      if (err) reject(err);
      resolve(res.statusCode);
    });
  });

  t.is(statusCode, 200);
});
