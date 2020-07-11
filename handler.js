'use strict';

let request = require('request');
let channel = 'test'; //fallback channel 

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN;


const SUCCESS_RESPONSE = {
  statusCode: 200,
  body: null
};

module.exports.receive = (event, context, callback) => {
  console.log('inside receive function');
  
  let { Botkit } = require('botkit');
  const { SlackAdapter } = require('botbuilder-adapter-slack');

  const adapter = new SlackAdapter({
      clientSigningSecret: SLACK_VERIFICATION_TOKEN,
      botToken: SLACK_OAUTH_TOKEN
  });

  const controller = new Botkit({
      adapter,
      // ...other options
  });

  controller.on('message', async(bot, message) => {
      await bot.reply(message, 'I heard a message!');
  });
  controller.hears(["Hello","Hi"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {

    bot.reply(message,'Hellow are you today?');
  
  });

  console.log('...End...');

};

module.exports.qoutes = (event, context, callback) => {
  channel = event.body.split("&")[3].split("=")[1]
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