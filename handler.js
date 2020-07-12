'use strict';

require('dotenv').config()

let request = require('request');
let channel = 'test'; //fallback channel 

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;

const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
};

module.exports.qoutes = (event, context, callback) => {
  if (!event.body){
    channel = event.body.split("&")[3].split("=")[1];
  }
  
  getQoute(callback);
};

function getQoute(callback) {
  request('https://ron-swanson-quotes.herokuapp.com/v2/quotes', function (err, resp, body) {
    console.log('error:', err);
    console.log('statusCode:', resp && resp.statusCode);
    console.log('body', body);
    callback(null, SUCCESS_RESPONSE);
    postQoute(body.substring(2, body.length - 2));
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
      channel: channel,
      text: quote
    }
  }

  request(options, function(err, resp, body) {
    console.log('error:', err);
    console.log('statusCode:', resp && resp.statusCode);
    console.log('body', body);
  });
}