export const LANGS = {
    UPLOAD: "Upload",
    CLEAR: "Remove file",
    ABORT: "Abort upload",
    SELECTED: "Selected:",
    TEST_S3: "Test S3 connection",
    TEST: "Test nodejs connection",
    PRE_SIGNED_URL: "Pre-signed URL:",
    FILE_TOO_LARGE: "File is too large",
    MULTER_FAIL: "Error uploading files",
    UPLOAD_ERROR: "Error uploading file",
    NO_FILE_SELECTED: "No file selected",
    ABORT_ERROR: "Error aborting upload",
    TEST_FAIL: "Failed to test connection",
    UPLOAD_SMALL: "Will upload with base64",
    UPLOAD_SINGLE_FILE: "Upload single file",
    UPLOAD_LARGE: "Will upload with multipart",
    GET_PRESIGNED_URL: "Generate presigned url",
    ABORT_SUCCESS: "Upload aborted successfully",
    TEST_FAIL_S3: "Failed to test S3 connection",
    UPLOAD_SUCCESS: "File uploaded successfully",
    UPLOAD_ERROR_S3: "Error uploading file to S3",
    UPLOAD_MULTIPLE_FILES: "Upload multiple files",
    UPLOAD_SIGNED_TO_S3: "Upload signed file to S3",
    UPLOAD_SINGLE_FILE_S3: "Upload single file to S3",
    ERROR_PRESIGNED_URL: "Error getting pre-signed URL",
    UPLOAD_SUCCESS_S3: "File uploaded to S3 successfully",
    GET_PRESIGNED_FORM_TITLE: "Get pre-signed URL for S3",
    UPLOAD_LARGE_FILE_S3: "Upload large single file to S3",
    PRE_SIGNED_URL_GENERATED: "<< Pre-signed URL generated >>",
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

const SERVER_BASE = "http://localhost:3400"

export const SERVER = {
    TEST: `${SERVER_BASE}/test`,
    UPLOAD_SINGLE_SMALL: `${SERVER_BASE}/uploadSingleSmall`,
    UPLOAD_SINGLE_LARGE: `${SERVER_BASE}/uploadSingleLarge`,
    UPLOAD_MULTIPLE_SMALL: `${SERVER_BASE}/uploadMultipleSmall`,
}

