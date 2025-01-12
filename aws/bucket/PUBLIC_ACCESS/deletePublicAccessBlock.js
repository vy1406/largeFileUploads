require('dotenv').config();
const AWS = require('aws-sdk')

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const s3 = new AWS.S3()

const uniqueBucketName = process.env.AWS_CURRENT_BUCKET;

s3.deletePublicAccessBlock({ Bucket: uniqueBucketName }, (err, data) => {
    if (err) {
        console.error("Error disabling public access block:", err);
    } else {
        console.log("Public access block disabled:", data);
    }
});
