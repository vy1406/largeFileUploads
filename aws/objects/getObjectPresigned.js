const AWS = require('../aws-config')

const s3 = new AWS.S3()

var param = {
    Bucket: process.env.AWS_CURRENT_BUCKET,
    Key: process.env.AWS_CURRENT_OBJECT
}

s3.getObject(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
