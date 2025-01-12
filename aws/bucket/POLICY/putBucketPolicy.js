require('dotenv').config();
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3()

const uniqueBucketName = process.env.AWS_CURRENT_BUCKET;

var readOnlyAnonUserPolicy = {
    Version: "2012-10-17",
    Statement: [
        {
            Sid: "AddPerm",
            Effect: "Allow",
            Principal: "*",
            Action: ["s3:GetObject"],
            Resource: [""],
        },
    ],
};

// create selected bucket resource string for bucket policy
var bucketResource = "arn:aws:s3:::" + uniqueBucketName + "/*";
readOnlyAnonUserPolicy.Statement[0].Resource[0] = bucketResource;

// convert policy JSON into string and assign into params
var bucketPolicyParams = {
    Bucket: uniqueBucketName,
    Policy: JSON.stringify(readOnlyAnonUserPolicy),
};

s3.putBucketPolicy(bucketPolicyParams, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
