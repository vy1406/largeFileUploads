import { ToastContainer } from "react-toastify"
import MultipleFilesForm from "./forms/MultipleFilesForm"
import SingleFileForm from "./forms/SingleFileForm"
import TestConnectionBtn from "./components/TestConnection"

function App() {

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <MultipleFilesForm />
      <SingleFileForm />
      <TestConnectionBtn />
      <ToastContainer />
    </div>
  )
}

export default App
