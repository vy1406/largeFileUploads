const AWS = require('../../aws-config');
const CONSTANTS = require('../../env');

const s3 = new AWS.S3()

const uniqueBucketName = CONSTANTS.AWS_CURRENT_BUCKET;

var readOnlyAnonUserPolicy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::bucket-name/*"
            ]
        }
    ]
}

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
