const express = require('express');
const router = express.Router();

const { getCurrentPrice, getYesterdayPrice } = require('./model');

let todayPrice;
let yesterdayPrice;

router.get('/compare', (req, res) => {
  getCurrentPrice()
    .then(currentPrice => {
      todayPrice = currentPrice;
      return todayPrice;
    })
    .then(getYesterdayPrice)
    .then(fetchedPrice => {
      console.log("Price of BTC yesterday was:", fetchedPrice, '   ', todayPrice);
      return todayPrice - fetchedPrice;
    })
    .then(delta => res.send(String(delta)))
    .catch(err => console.log("There was an error: ", err));
});

module.exports = router;