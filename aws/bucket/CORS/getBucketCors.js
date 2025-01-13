const AWS = require('../../aws-config');
const CONSTANTS = require('../../env');

const s3 = new AWS.S3()

const uniqueBucketName = CONSTANTS.AWS_CURRENT_BUCKET;
var param = {
    Bucket: uniqueBucketName
}

s3.getBucketCors(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
