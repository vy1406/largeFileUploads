var express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");

const PORT = 3400

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const mergeChunks = async (fileName, totalChunks) => {
    const chunkDir = __dirname + "/chunks";
    const mergedFilePath = __dirname + "/merged_files";

    if (!fs.existsSync(mergedFilePath)) {
        fs.mkdirSync(mergedFilePath);
    }

    const writeStream = fs.createWriteStream(`${mergedFilePath}/${fileName}`);
    for (let i = 0; i < totalChunks; i++) {
        const chunkFilePath = `${chunkDir}/${fileName}.part_${i}`;
        const chunkBuffer = await fs.promises.readFile(chunkFilePath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkFilePath); // Delete the individual chunk file after merging
    }

    writeStream.end();
    console.log("Chunks merged successfully");
};

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function (req, res) {
    res.json({ message: "Server success message" })
})

app.post("/uploadMulter", upload.single("file"), (req, res) => {
    console.log(req.file); // File metadata
    res.status(200).json({ message: "File uploaded successfully!" });
});

app.listen(PORT, function () { console.log(`Server is listening on port ${PORT}`) })
module.exports = app;