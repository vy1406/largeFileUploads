require('dotenv').config();
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3()

const uniqueBucketName = "my-unique-bucket-95a2cd43-97e6-461f-b852-3ab8b959401c";
var param = {
    Bucket: uniqueBucketName
}
s3.deleteBucketCors(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
