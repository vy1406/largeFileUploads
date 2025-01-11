import { useMemo, useRef, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { LANGS } from "./constants"

function App() {

  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setFiles(selectedFiles)
  }

  const isLargeFiles = useMemo(() => {
    return files && files.size > 5000000;
  }, [files]);

  const handleRemoveFile = () => {
    setFiles([]) 
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("file", files[0])
    console.log(formData)
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  }

  const handleOnTestConnection = async () => {
    try {
      const response = await fetch("http://localhost:3400/test")
      const data = await response.json()
      console.log(data)
      toast.success(data.message)
    } catch (error) {
      toast.error(LANGS.TEST_FAIL)
      console.error(error)
    }
  }
  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
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
          onClick={handleRemoveFile}
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
      <button
          onClick={handleOnTestConnection}
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          {LANGS.TEST}
        </button>
      <ToastContainer />
    </div>
  )
}

export default App
