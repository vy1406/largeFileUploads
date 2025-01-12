const AWS = require('../../aws-config')

const s3 = new AWS.S3();

const uniqueBucketName = process.env.AWS_CURRENT_BUCKET;

const params = {
    Bucket: uniqueBucketName,
    PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        IgnorePublicAcls: true,
        BlockPublicPolicy: true,
        RestrictPublicBuckets: true,
    },
};

s3.putPublicAccessBlock(params, (err, data) => {
    if (err) {
        console.error("Error restoring public access block:", err);
    } else {
        console.log("Public access block restored successfully:", data);
    }
});
