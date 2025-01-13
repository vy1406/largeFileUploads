const AWS = require('../aws-config')
const CONSTANTS = require('../env')

const s3 = new AWS.S3()

var param = {
    Bucket: CONSTANTS.AWS_CURRENT_BUCKET,
    Delete: {
        Objects: [
            {
                Key: CONSTANTS.AWS_CURRENT_OBJECT
            }
        ]
    }
}

s3.deleteObjects(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
