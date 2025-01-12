const { v4: uuidv4 } = require('uuid');
const AWS = require('../aws-config')

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
