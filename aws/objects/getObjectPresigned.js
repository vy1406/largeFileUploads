const AWS = require('../aws-config')

const s3 = new AWS.S3()

var param = {
    Bucket: process.env.AWS_CURRENT_BUCKET,
    Key: process.env.AWS_CURRENT_OBJECT,
    Expires: 60 // seconds, default is 900
}

const url = s3.getSignedUrl('getObject', param)

console.log("--------------------")
console.log(url)
console.log("--------------------")