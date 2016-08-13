import test from 'ava';
import got from 'got';
import cheerio from 'cheerio';

import config from './config';

import IndexModel from './models';

const url = config.host + ':' + config.port;
const errUrl = url + '/random-page';

 function getPageAsElement (url) {
  return got(url)
    .then((res) => {
      return cheerio.load(res.body);
    })
    .catch((err) => {
      if (err.statusCode === 404){
        return cheerio.load(err.response.body);
      }
      console.error(err);
    });
};

// OK pages (200)
test('Page title is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('title').text(), IndexModel().title);
});

test('h1 text is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('h1').text(), IndexModel().header);
});

test('p text is correct', async t => {

  const $ = await getPageAsElement(url);

  t.is($('p').text(), IndexModel().description);
});

// Error pages (404)
test('404 page has correct title', async t => {

  const $ = await getPageAsElement(errUrl);

  t.is($('title').text(), 'Error');
});

test('404 page has corrct h1', async t => {

  const $ = await getPageAsElement(errUrl);

  t.is($('h1').text(), 'Not Found');
});
