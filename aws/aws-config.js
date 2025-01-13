const AWS = require('aws-sdk');
const CONSTANTS = require('./env');

// AWS.config.update({
//     accessKeyId: CONSTANTS.AWS_ACCESS_KEY,
//     secretAccessKey: CONSTANTS.AWS_SECRET_ACCESS_KEY,
//     region: CONSTANTS.AWS_REGION,
// });

module.exports = AWS;
