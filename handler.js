'use strict';

module.exports.qoutes = async event => {
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
