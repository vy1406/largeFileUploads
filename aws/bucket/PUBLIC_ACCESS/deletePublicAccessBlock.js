const AWS = require('../aws-config')

const s3 = new AWS.S3()

const uniqueBucketName = process.env.AWS_CURRENT_BUCKET;

s3.deletePublicAccessBlock({ Bucket: uniqueBucketName }, (err, data) => {
    if (err) {
        console.error("Error disabling public access block:", err);
    } else {
        console.log("Public access block disabled:", data);
    }
});
