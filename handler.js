'use strict';

module.exports.authorize = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully. Test',
        input: event,
      },
      null,
      2
    ),
  };
};

module.exports.cat = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Cat picture!',
        input: event,
      },
      null,
      2
    ),
  };
};
