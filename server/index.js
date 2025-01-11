var express = require('express')
// const bodyParser = require("body-parser");
const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");

const PORT = 3400

var app = express()
// app.use(cors())
app.get('/test', function (req, res) {
    res.json({ message: "Server is working fine" })
})

app.listen(PORT, function () { console.log(`Server is listening on port ${PORT}`) })
module.exports = app;