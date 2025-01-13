export const LANGS = {
    UPLOAD_LARGE: "Will upload with multipart",
    UPLOAD_SMALL: "Will upload with base64",
    SELECTED: "Selected:",
    CLEAR: "Remove file",
    UPLOAD: "Upload",
    TEST: 'Test nodejs connection',
    TEST_S3: 'Test S3 connection',
    TEST_FAIL_S3: "Failed to test S3 connection",
    TEST_FAIL: "Failed to test connection",
    MULTER_FAIL: "Error uploading files",
    UPLOAD_MULTIPLE_FILES: "Upload multiple files",
    UPLOAD_SINGLE_FILE: "Upload single file",
    UPLOAD_ERROR: "Error uploading file",
    UPLOAD_SUCCESS: "File uploaded successfully",
    UPLOAD_SUCCESS_S3: "File uploaded to S3 successfully",
    UPLOAD_ERROR_S3: "Error uploading file to S3",
    FILE_TOO_LARGE: 'File is too large',
    UPLOAD_SINGLE_FILE_S3: "Upload single file to S3",
}

const AWS_BASE = "https://7g0tifu0t3.execute-api.us-east-1.amazonaws.com/dev"

// taken from serverless.yml 
export const AWS = {
    HELLO: `${AWS_BASE}/helloHandler`,
    PUT_OBJECT: `${AWS_BASE}/putObject`,
    PRE_SIGNED_URL: `${AWS_BASE}/getSignedUrl`,
    GET_UPLOAD_ID: `${AWS_BASE}/getUploadId`,
    GET_UPLOAD_PART: `${AWS_BASE}/getUploadPart`,
    COMPLETE_MULTIPART_UPLOAD: `${AWS_BASE}/completeUpload`,
    ABORT_MULTIPART_UPLOAD: `${AWS_BASE}/abortUpload`,
};
