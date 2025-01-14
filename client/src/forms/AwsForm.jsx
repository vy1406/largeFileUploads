import { useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { AWS, LANGS } from "../constants"

function AwsUploadS3() {

  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("");
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
    setStatus("")
    toast.dismiss()
  }

  // means it wont be formData, cuz otherwise i need to make more changes. 
  // we will stick to this one.
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isLargeFile) {
        toast.error(LANGS.FILE_TOO_LARGE);
        return;
    }

    const fileName = file.name;
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64String = reader.result.split("base64,")[1];

        const dataInfo = { fileName, base64String: base64String };

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataInfo),
        };

        fetch(AWS.PUT_OBJECT, config)
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        toast.error(data.message || LANGS.UPLOAD_ERROR_S3);
                        throw new Error(data.message);
                    });
                }
                return response.json();
            })
            .then((response) => {
                console.log(response.data);
                toast.success(LANGS.UPLOAD_SUCCESS_S3);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                toast.error(LANGS.UPLOAD_ERROR_S3);
            });
    };

    reader.readAsDataURL(file);
};

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {LANGS.UPLOAD_SINGLE_FILE_S3}
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
    </div>
  )
}

export default AwsUploadS3
