import { useMemo, useRef, useState } from "react"
import { ToastContainer } from "react-toastify"
import { LANGS } from "./constants"


function App() {

  const [file, setFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleOnUpload = (e) => {
    const file = e.target.files[0]
    console.log(e.target.files)
    console.log(file)
    setFile(file)
  }

  const isLargeFile = useMemo(() => {
    return file && file.size > 5000000;
  }, [file]);

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-extralight text-center">
        Choose file
      </h1>
      <input ref={fileInputRef} type="file" name="file" id="file" onChange={handleOnUpload}/>
      <button onClick={handleRemoveFile} className="bg-red-500 text-white p-2 rounded mt-2">
        {LANGS.REMOVE_FILE}
      </button>
      {file ? isLargeFile ? <span>{LANGS.UPLOAD_LARGE}</span> : <span>{LANGS.UPLOAD_SMALL}</span> : null}
      <ToastContainer />
    </div>
  )
}

export default App
