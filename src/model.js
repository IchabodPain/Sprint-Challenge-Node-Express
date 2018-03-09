const fetch = require('node-fetch');

const CURRENT_PRICE_REQUEST = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const YESTERDAY_PRICE_REQUEST = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

const getCurrentPrice = () => {
  return new Promise((resolve, reject) => {
    fetch(CURRENT_PRICE_REQUEST)
      .then(response => response.json())
      .then(parsedResponse => parsedResponse.bpi.USD.rate_float)
      .then(price => resolve(price))
      .catch(err => reject(err));
  });
};

const getYesterdayPrice = () => {
  return new Promise((resolve, reject) => {
    fetch(YESTERDAY_PRICE_REQUEST)
      .then(response => response.json())
      .then(parsedResponse => parsedResponse.bpi)
      .then(rateObject => rateObject[Object.keys(rateObject)[0]])
      .then(yesterdayPrice => resolve(yesterdayPrice))
      .catch(err => reject(err));
  });
};

module.exports = {
  getCurrentPrice,
  getYesterdayPrice,
}