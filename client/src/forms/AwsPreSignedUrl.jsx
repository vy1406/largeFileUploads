import { useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { AWS, LANGS } from "../constants"

function AwsPreSignedUrl() {

  const [file, setFile] = useState(null)
  const [presignedUrl, setPresignedUrl] = useState(null);
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  }

  const isLargeFile = useMemo(() => {
    return file && file.size > 5000000;
  }, [file]);

  const handleClear = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setPresignedUrl(null)
    toast.dismiss()
  }

  const handleUploadToS3 = async (e) => {
    e.preventDefault();

    try {
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error("File upload failed");
      }

      toast.success(LANGS.UPLOAD_SUCCESS_S3);
    } catch (error) {
      console.error("Error during file upload:", error);
      toast.error(LANGS.UPLOAD_ERROR_S3);
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (isLargeFile) {
      toast.error(LANGS.FILE_TOO_LARGE);
      return;
    }

    const fileName = file.name;

    try {
      const response = await fetch(AWS.PRE_SIGNED_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || LANGS.UPLOAD_ERROR_S3);
        throw new Error(errorData.message);
      }

      const data = await response.json();
      const preSignedUrl = data.preSignedUrl;
      setPresignedUrl(preSignedUrl);
    } catch (error) {
      console.error("Error during file upload:", error);
      toast.error(LANGS.ERROR_PRESIGNED_URL);
    }
  };


  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {LANGS.GET_PRESIGNED_FORM_TITLE}
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
          type="submit"
          disabled={file?.length === 0}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {LANGS.GET_PRESIGNED_URL}
        </button>
        <button
          type="button"
          onClick={handleUploadToS3}
          disabled={presignedUrl === null}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {LANGS.UPLOAD_SIGNED_TO_S3}
        </button>
      </form>
      {file && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">{LANGS.SELECTED}</h2>
          {file.name} - {(file.size / 1024).toFixed(2)} KB
        </div>
      )}
      {presignedUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">{LANGS.PRE_SIGNED_URL}</h2>
          {LANGS.PRE_SIGNED_URL_GENERATED}
        </ div>
      )}

    </div>
  )
}

export default AwsPreSignedUrl
