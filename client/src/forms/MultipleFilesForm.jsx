import { useMemo, useRef, useState } from "react"
import { toast } from "react-toastify"
import { LANGS } from "../constants"
import Progress from "../components/Progress";

function MultipleFilesForm() {

  const [files, setFiles] = useState([])
  const [progress, setProgress] = useState([]);
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const isLargeFiles = useMemo(() => {
    return files.some((file) => file.size > 5000000);
  }, [files]);

  const handleClear = () => {
    setFiles([])
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (isLargeFiles) {
      uploadLargeFiles()
    } else {
      uploadSmallFiles()
    }
  }

  const uploadLargeFiles = async () => {
    const chunkSize = 5 * 1024 * 1024;
  
    files.forEach(async (file, fileIndex) => {
      const totalChunks = Math.ceil(file.size / chunkSize);
      let chunkNumber = 0;
      let start = 0;
      let end = chunkSize;
      const chunkProgress = 100 / totalChunks;
  
      const updateProgress = (fileIndex, chunkNumber) => {
        setProgress((prev) => {
          const updated = [...prev];
          updated[fileIndex] = Math.min((chunkNumber + 1) * chunkProgress, 100);
          return updated;
        });
      };

      const uploadNextChunk = async () => {
        if (start < file.size) {
          const chunk = file.slice(start, end);
          const formData = new FormData();
          formData.append("file", chunk);
          formData.append("chunkNumber", chunkNumber);
          formData.append("totalChunks", totalChunks);
          formData.append("originalname", file.name);
  
          try {
            await fetch("http://localhost:3400/uploadSingleLarge", {
              method: "POST",
              body: formData,
            });
  
            updateProgress(fileIndex, chunkNumber);
            chunkNumber++;
            start = end;
            end = start + chunkSize;
            uploadNextChunk();
          } catch (error) {
            toast.error(LANGS.UPLOAD_ERROR);
            return;
          }
        } else {
          toast.success(`${file.name} uploaded successfully.`);
        }
      };
  
      uploadNextChunk();
    });
  };

  const uploadSmallFiles = () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file);
    });

    fetch("http://localhost:3400/uploadMultipleSmall", {
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
      .then(() => {
        toast.success(LANGS.UPLOAD_SUCCESS);
      })
      .catch((error) => {
        console.error("Error uploading files:", error);
        toast.error(LANGS.UPLOAD_ERROR);
      });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
        <h1 className="text-2xl font-medium">
          {LANGS.UPLOAD_MULTIPLE_FILES}
        </h1>
        <input
          ref={fileInputRef}
          type="file"
          name="files"
          id="files"
          multiple
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
          disabled={files?.length === 0}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {LANGS.UPLOAD}
        </button>
      </form>
      {files?.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-medium">{LANGS.SELECTED}</h2>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} - {(file.size / 1024).toFixed(2)} KB
                <Progress progress={progress[index] || 0} />
              </li>
            ))}
          </ul>
          {isLargeFiles && (
            <span className="text-red-500">{LANGS.UPLOAD_LARGE}</span>
          )}
          {!isLargeFiles && (
            <span className="text-green-500">{LANGS.UPLOAD_SMALL}</span>
          )}
        </div>
      )}

    </div>
  )
}

export default MultipleFilesForm
