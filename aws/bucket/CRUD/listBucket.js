const AWS = require('../aws-config')

const s3 = new AWS.S3()

var param = {}
s3.listBuckets(param, function (err, data) {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})
