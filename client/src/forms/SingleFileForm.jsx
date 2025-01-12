import { useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LANGS } from "../constants"
import Progress from "../components/Progress";

function SingleFileForm() {

  const [file, setFile] = useState(null)
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  }

  const isLargeFile = useMemo(() => {
    return file && file.size > 5000000;
  }, [file]);

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setProgress(0)
    setStatus("")
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (isLargeFile) {
      uploadLargeFile()
    } else {
      uploadSmallFiles()
    }
  }

  const uploadLargeFile = () => {
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 100 / totalChunks;
    let chunkNumber = 0;
    let start = 0;
    let end = 0;

    const uploadNextChunk = async () => {
      if (end <= file.size) {
        const chunk = file.slice(start, end);
        const formData = new FormData();
        formData.append("file", chunk);
        formData.append("chunkNumber", chunkNumber);
        formData.append("totalChunks", totalChunks);
        formData.append("originalname", file.name);

        fetch("http://localhost:3400/uploadSingleLarge", {
          method: "POST",
          body: formData,

        })
          .then((response) => {
            return response.json().then((data) => {
              if (!response.ok) {
                toast.error(data.message);
              }
              return data;
            });
          })
          .then((data) => {
            console.log({ data });
            const temp = `Chunk ${chunkNumber + 1}/${totalChunks} uploaded successfully`;
            setStatus(temp);
            setProgress(parseInt(Number((chunkNumber + 1) * chunkProgress)));
            console.log(temp);
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            uploadNextChunk();
          })
          .catch((error) => {
            console.error("Error uploading chunk:", error);
            toast.error(LANGS.UPLOAD_ERROR);
          });
      } else {
        setProgress(100);
        setFile(null);
        setStatus(LANGS.UPLOAD_SUCCESS);
      }
    };

    uploadNextChunk();
  }


  const uploadSmallFiles = () => {
    const formData = new FormData();
    formData.append('file', file);

    try {

      fetch("http://localhost:3400/uploadSingleSmall", {
        method: "POST",
        body: formData,

      }).then((response) => {
        return response.json().then((data) => {
          if (!response.ok) {
            toast.error(data.message);
          }
          return data;
        });
      }).then((data) => {
        console.log({ data });
        toast.success(LANGS.UPLOAD_SUCCESS);
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error(LANGS.UPLOAD_ERROR);
    }

  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {LANGS.UPLOAD_SINGLE_FILE}
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
          onClick={handleRemoveFile}
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
          <div>
            {isLargeFile && (
              <span className="text-red-500">{LANGS.UPLOAD_LARGE}</span>
            )}
            {!isLargeFile && (
              <span className="text-green-500">{LANGS.UPLOAD_SMALL}</span>
            )}
          </div>
        </div>
      )}
      <h3>{status}</h3>
      <Progress progress={progress} />
    </div>
  )
}

export default SingleFileForm
