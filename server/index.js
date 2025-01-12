var express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { mergeChunks, createFolder, FOLDERS_MAP } = require('./utils');
const PORT = 3400

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

    const chunkDir = __dirname + FOLDERS_MAP.CHUNKS;

    createFolder(chunkDir)

    const chunkFilePath = `${chunkDir}/${fileName}.part_${chunkNumber}`;

    try {
        await fs.promises.writeFile(chunkFilePath, chunk);

        if (chunkNumber === totalChunks - 1) {
            await mergeChunks(fileName, totalChunks);
        }

        res.status(200).json({ message: "Chunk uploaded successfully" });
    } catch (error) {
        res.status(500).json({ message: "[Server] Error saving chunk" });
    }
});

app.post("/uploadSingleSmall", upload.single("file"), (req, res) => {
    const file = req.file;
    const fileName = file.originalname;
    const mergedFilePath = __dirname + FOLDERS_MAP.MERGED_FILES;

    createFolder(mergedFilePath)
    const filePath = `${mergedFilePath}/${fileName}`

    try {
        fs.writeFileSync(filePath, file.buffer);
        res.status(200).json({ message: "File uploaded successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "[Server] Error saving file" });
    }

});

app.listen(PORT, function () { console.log(`Server is listening on port ${PORT}`) })
module.exports = app;