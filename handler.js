'use strict';

let request = require('request');

module.exports.qoutes = (event) => {
  getQoutes();
};

function getQoutes() {
  request('https://ron-swanson-quotes.herokuapp.com/v2/quotes', function (err, resp, body) {
    console.log('error:', err)
    console.log('statusCode:', resp && resp.statusCode)
    console.log('body', body)
  })
}