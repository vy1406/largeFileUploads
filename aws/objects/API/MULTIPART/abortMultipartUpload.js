const AWS = require('../../../aws-config')
const s3 = new AWS.S3({ signatureVersion: 'v4' });

exports.handler = async (event) => {
    const body = JSON.parse(event.body);

    try {
        let params = {
            Bucket: process.env.bucketName,
            Key: body.fileName,
            UploadId: body.uploadId
        };
        const abortUpload = await s3.abortMultipartUpload(params).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ abortUpload: abortUpload })
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({ error: err, details: err.stack })
        };
    }
};