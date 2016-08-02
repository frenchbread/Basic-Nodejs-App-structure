import test from 'ava';
import r from 'request';
import cheerio from 'cheerio';

import config from './config';

const url = config.host + ':' + config.port;
const errUrl = url + '/random-page';

async function getPageAsElement (url) {
  return await new Promise((resolve, reject) => {
    r(url, (err, res, body) => {
      if (err) reject(err);
      resolve(cheerio.load(body));
    });
  });
};

// OK pages (200)
test('Page title is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('title').text(), 'express-boilerplate');
});

test('h1 text is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('h1').text(), 'express-boilerplate');
});

test('p text is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('p').text(), 'Your basic web-app structure.');
});

// Error pages (404)
test('404 page has corrct title', async t => {

  const $ = await getPageAsElement(errUrl);

  t.is($('title').text(), 'Error');
});

test('404 page has corrct h1', async t => {

  const $ = await getPageAsElement(errUrl);

  t.is($('h1').text(), 'Not Found');
});
