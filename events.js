'use strict';

const https = require('https');
const qs = require('querystring');
const VERIFICATION_TOKEN = 'XXX';
const ACCESS_TOKEN = 'XXX';

// Verify Url - https://api.slack.com/events/url_verification
function verify(data, callback) {
    console.log('callback: ');
    /* const challengeResponse = {
        challenge: data.challenge,
        headers: {
            "Content-type" : "application/json"
        },
    };*/
    
    console.log(challengeResponse)
    if (data.token === VERIFICATION_TOKEN) callback(null, data.challenge);
    else callback("verification failed");   
}

// Post message to Slack - https://api.slack.com/methods/chat.postMessage
function process(event, callback) {
    // test the message for a match and not a bot
    if (!event.bot_id && /(aws|lambda)/ig.test(event.text)) {
        var text = `<@${event.user}> isn't AWS Lambda awesome?`;
        var message = { 
            token: ACCESS_TOKEN,        
            channel: event.channel,
            text: text
        };

        var query = qs.stringify(message); // prepare the querystring
        https.get(`https://slack.com/api/chat.postMessage?${query}`);
    }

    callback(null);
}

// Lambda handler
module.exports.eventsapi = (data, context, callback) => {
    console.log('data');
    console.log(data);
    console.log('context');
    console.log(context);
    console.log('callback');
    console.log(callback);
    switch (data.type) {
        case "url_verification": verify(data, callback); break;
        case "event_callback": process(data.event, callback); break;
        default: callback(null);
    }
};