import { useRef, useState } from "react"
import { toast } from "react-toastify"
import { AWS, LANGS } from "../constants"
import Progress from "../components/Progress";

function AwsMultipartForm() {

  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  }

  const handleClear = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProgress(0)
    setStatus("")
  }

  const handleAbort = async () => {
    const uploadId = sessionStorage.getItem("uploadId");

    if (!uploadId) {
      toast.error("No upload in progress");
      return;
    }
    if (!file) {
      toast.error(LANGS.NO_FILE_SELECTED);
      return;
    }

    const fileName = file.name;

    try {
      const response = await fetch(`${AWS.ABORT_MULTIPART_UPLOAD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName, uploadId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      toast.success(LANGS.ABORT_SUCCESS);
      setStatus("Upload aborted");
      sessionStorage.removeItem("uploadId");
      setProgress(0);
    } catch (error) {
      console.error("Error aborting upload:", error);
      toast.error(LANGS.ABORT_ERROR);
    }
    handleClear()
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    uploadLargeFile()
  }

  const uploadLargeFile = async () => {
    if (!file) return;

    const fileName = file.name;
    const fileSize = file.size;

    try {
      // Step 1: Request an upload ID
      const res = await fetch(`${AWS.GET_UPLOAD_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message || LANGS.UPLOAD_ERROR_S3);
        throw new Error(errorData.message);
      }

      const { uploadId } = await res.json();
      sessionStorage.setItem("uploadId", uploadId);

      // Step 2: Calculate chunks and upload each chunk
      const chunkSize = 10 * 1024 * 1024; // 10 MiB
      const chunkCount = Math.ceil(fileSize / chunkSize);
      const multiUploadArray = [];

      for (let uploadCount = 1; uploadCount <= chunkCount; uploadCount++) {
        const start = (uploadCount - 1) * chunkSize;
        const end = Math.min(start + chunkSize, fileSize);
        const fileBlob = file.slice(start, end);

        const signedUrlRes = await fetch(`${AWS.GET_UPLOAD_PART}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileName,
            partNumber: uploadCount,
            uploadId,
          }),
        });

        if (!signedUrlRes.ok) {
          const errorData = await signedUrlRes.json();
          toast.error(errorData.message || LANGS.UPLOAD_ERROR_S3);
          throw new Error(errorData.message);
        }

        const { preSignedUrl } = await signedUrlRes.json();

        const uploadChunkRes = await fetch(preSignedUrl, {
          method: "PUT",
          body: fileBlob,
        });

        if (!uploadChunkRes.ok) {
          throw new Error(`Chunk ${uploadCount} upload failed`);
        }

        const etag = uploadChunkRes.headers.get("ETag");
        multiUploadArray.push({ ETag: etag, PartNumber: uploadCount });

        setProgress(Math.round((uploadCount / chunkCount) * 100));
        setStatus(`Uploaded chunk ${uploadCount} of ${chunkCount}`);
      }

      // Step 3: Complete the multipart upload
      const completeRes = await fetch(`${AWS.COMPLETE_MULTIPART_UPLOAD}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName,
          parts: multiUploadArray,
          uploadId,
        }),
      });

      if (!completeRes.ok) {
        const errorData = await completeRes.json();
        toast.error(errorData.message || LANGS.UPLOAD_ERROR_S3);
        throw new Error(errorData.message);
      }

      toast.success(LANGS.UPLOAD_SUCCESS_S3);
      setStatus("File uploaded successfully");
    } catch (error) {
      console.error("Error during file upload:", error);
      toast.error(LANGS.UPLOAD_ERROR_S3);
      setStatus("Upload failed");
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {LANGS.UPLOAD_LARGE_FILE_S3}
        </h1>
        <input
          ref={fileInputRef}
          type="file"
          name="file"
          id="file"
          onChange={handleOnUpload}
        />
        <button
          type="button"
          onClick={handleClear}
          className="bg-red-500 text-white p-2 rounded mt-2"
        >
          {LANGS.CLEAR}
        </button>
        <button
          type="button"
          onClick={handleAbort}
          disabled={file === null}
          className="bg-red-500 text-white p-2 rounded mt-2"
        >
          {LANGS.ABORT}
        </button>
        <button
          type="submit"
          disabled={file?.length === 0}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {LANGS.UPLOAD}
        </button>
      </form>
      {file && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">{LANGS.SELECTED}</h2>
          {file.name} - {(file.size / 1024).toFixed(2)} KB
        </div>
      )}
      <h3>{status}</h3>
      <Progress progress={progress} />
    </div>
  )
}

export default AwsMultipartForm
