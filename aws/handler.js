'use strict';

const AWS = require('./aws-config')

const s3 = new AWS.S3()

module.exports.putObject = async (event) => {
  const body = JSON.parse(event.body);
  const fileName = body.fileName;
  const base64String = body.base64String;
  const buffer = Buffer.from(base64String, 'base64');

  try {
    const params = {
      Body: buffer,
      Bucket: process.env.bucketName,
      Key: fileName,
    };

    await s3.putObject(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: `file Uploaded`
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(err)
    };
  }
};


module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
