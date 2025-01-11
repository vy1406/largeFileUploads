var express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { mergeChunks } = require('./utils');

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

var app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function (req, res) {
    res.json({ message: "Server success message" })
})

app.post("/uploadSingleLarge", upload.single("file"), async (req, res) => {
    const chunk = req.file.buffer;
    const chunkNumber = Number(req.body.chunkNumber);
    const totalChunks = Number(req.body.totalChunks);
    const fileName = req.body.originalname;

    const chunkDir = __dirname + "/chunks";

    if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir);
    }

    const chunkFilePath = `${chunkDir}/${fileName}.part_${chunkNumber}`;

    try {
        await fs.promises.writeFile(chunkFilePath, chunk);
        console.log(`Chunk ${chunkNumber}/${totalChunks} saved`);

        if (chunkNumber === totalChunks - 1) {
            await mergeChunks(fileName, totalChunks);
            console.log("File merged successfully");
        }

        res.status(200).json({ message: "Chunk uploaded successfully" });
    } catch (error) {
        console.error("Error saving chunk:", error);
        res.status(500).json({ message: "[Server] Error saving chunk" });
    }
});

// app.post("/uploadSingleLarge", (req, res) => {
//     console.log(req.file);
//     res.status(200).json({ message: "File uploaded successfully!" });
// });

app.listen(PORT, function () { console.log(`Server is listening on port ${PORT}`) })
module.exports = app;