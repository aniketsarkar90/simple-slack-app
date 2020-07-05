'use strict';

let request = require('request');

//const SLACK_OAUTH_TOKEN = 'XXXX'; //local testing
const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN

module.exports.qoutes = (event) => {
  getQoute();
};

function getQoute() {
  request('https://ron-swanson-quotes.herokuapp.com/v2/quotes', function (err, resp, body) {
    console.log('error:', err)
    console.log('statusCode:', resp && resp.statusCode)
    console.log('body', body)
    postQoute(body.substring(2, body.length - 2))
  })
}

function postQoute(quote) {
  let options = {
    url: 'https://slack.com/api/chat.postMessage',
    headers: {
      'Accept': 'application/json',
    },
    method: 'POST',
    form: {
      token: SLACK_OAUTH_TOKEN,
      channel: 'test', //created a test channel
      text: quote,
    }
  }

  request(options, function(err, resp, body) {
    console.log('error:', err)
    console.log('statusCode:', resp && resp.statusCode)
    console.log('body', body)
  })
}