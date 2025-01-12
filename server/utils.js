const fs = require("fs");

const FOLDERS_MAP = {
    CHUNKS: "chunks",
    MERGED_FILES: "merged_files"
}

const mergeChunks = async (fileName, totalChunks) => {

    const chunkDir = FOLDERS_MAP.CHUNKS;
    const mergedFilePath = FOLDERS_MAP.MERGED_FILES;

    if (!fs.existsSync(mergedFilePath)) {
        fs.mkdirSync(mergedFilePath);
    }

    const writeStream = fs.createWriteStream(`${mergedFilePath}/${fileName}`);
    for (let i = 0; i < totalChunks; i++) {
        const chunkFilePath = `${chunkDir}/${fileName}.part_${i}`;
        const chunkBuffer = await fs.promises.readFile(chunkFilePath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkFilePath);
    }

    writeStream.end();
    console.log("Chunks merged successfully");
};

const createFolder = async (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

module.exports = { mergeChunks, createFolder, FOLDERS_MAP };