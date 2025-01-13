const AWS = require('../aws-config')
const CONSTANTS = require('../env')

const s3 = new AWS.S3()

var param = {
    Bucket: CONSTANTS.AWS_CURRENT_BUCKET,
    Key: CONSTANTS.AWS_CURRENT_OBJECT,
    Expires: 60 // seconds, default is 900
}

const url = s3.getSignedUrl('getObject', param)

console.log("--------------------")
console.log(url)
console.log("--------------------")