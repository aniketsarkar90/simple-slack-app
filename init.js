'use strict';

require('dotenv').config();

const SLACK_OAUTH_TOKEN = process.env.SLACK_OAUTH_ACCESS_TOKEN;
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;

const Slack = require('slack');

let request = require('request');
let channel = 'test'; //fallback channel 

module.exports.start = async (data) => {
    const dataObj = JSON.parse(data.body);

    let response = {
        statusCode: 200,
        body: {},
        headers: {'X-Slack-No-Retry': 1} //turning retries off - https://api.slack.com/events-api#graceful_retries
    }

    switch ( dataObj.type ) {
        case 'url_verification':
            response.body = urlVerification(dataObj); 
            break;
        default:
            response.statusCode = 400,
            response.body = 'Empty request';
            break;
    } 
    
    return response;
}

//URL Verification challenge - https://api.slack.com/events/url_verification
function urlVerification(dataObj) {
    if ( dataObj.token === process.env.SLACK_VERIFICATION_TOKEN ) {
        return dataObj.challenge;
    } else {
        throw 'Verification failed';
    }
}