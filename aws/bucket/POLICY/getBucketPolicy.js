const AWS = require('../aws-config')

const s3 = new AWS.S3()

const uniqueBucketName = process.env.AWS_CURRENT_BUCKET;
var param = {
    Bucket: uniqueBucketName
}
s3.getBucketPolicy(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
