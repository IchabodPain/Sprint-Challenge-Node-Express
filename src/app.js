const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const server = express();

const PORT = 3030;

const CURRENT_PRICE_REQUEST = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const YESTERDAY_PRICE_REQUEST = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

// let priceToday;
// let priceYesterday;

server.use(bodyParser.json());

server.get('/compare', (request, response) => {

  const currentPricePromise = fetch(CURRENT_PRICE_REQUEST)
    .then(response => response.json())
    .then(parsedResponse => parsedResponse.bpi.USD.rate_float)
    .then(rate => {
      // priceToday = rate;
      return rate;
    })
    .catch(err => response.status(444).send({ error: err }));

    const yesterdayPricePromise = fetch(YESTERDAY_PRICE_REQUEST)
    .then(response => response.json())
    .then(parsedResponse => {
      console.log("The parsed response from BTC server is:", parsedResponse);
      return parsedResponse.bpi;
      })
    .then(rateObject => {
      return rateObject[Object.keys(rateObject)[0]];
    })
    .catch(err => response.status(444).send({ error: err }));

    Promise.all([currentPricePromise, yesterdayPricePromise])
      .then(prices => {
        console.log('Promises.all responded wtih:',prices);
        const currentPrice = prices[0];
        const yesterdayPrice = prices[1];
        const priceDelta = currentPrice - yesterdayPrice;
        response.status(200).send({priceDeltaFromYesterday: priceDelta});
      })
      .catch(err => response.status(500).send({ error: err }));
});

server.listen(PORT);
