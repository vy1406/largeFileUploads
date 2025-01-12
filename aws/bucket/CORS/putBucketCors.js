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
    Bucket: uniqueBucketName,
    "CORSConfiguration": {
        "CORSRules": [
            {
                "AllowedHeaders": [
                    "*"
                ],
                "AllowedMethods": [
                    "PUT",
                    "POST",
                    "DELETE"
                ],
                "AllowedOrigins": [
                    "http://www.example.com"
                ],
                "ExposeHeaders": [
                    "x-amz-server-side-encryption"
                ],
                "MaxAgeSeconds": 3000
            },
            {
                "AllowedHeaders": [
                    "Authorization"
                ],
                "AllowedMethods": [
                    "GET"
                ],
                "AllowedOrigins": [
                    "*"
                ],
                "MaxAgeSeconds": 3000
            }
        ]
    },
    "ContentMD5": ""
}


s3.putBucketCors(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
