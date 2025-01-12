require('dotenv').config();
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
const region = 'us-east-1'
const s3 = new AWS.S3({ region: region })

const uniqueBucketName = `my-unique-bucket-${uuidv4()}`;

var param = {
    Bucket: uniqueBucketName
}
s3.createBucket(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
