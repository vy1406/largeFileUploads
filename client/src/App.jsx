import { ToastContainer } from "react-toastify"
import MultipleFilesForm from "./forms/MultipleFilesForm"
import SingleFileForm from "./forms/SingleFileForm"
import TestConnectionBtn from "./components/TestConnection"
import TestConnectionBtnS3 from "./components/TestConnectionS3"
import AwsUploadS3 from "./forms/AwsForm"
import AwsPreSignedUrl from "./forms/AwsPreSignedUrl"

function App() {

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      {/* <MultipleFilesForm />
      <SingleFileForm /> */}
      <AwsPreSignedUrl />
      <AwsUploadS3 />
      <TestConnectionBtn />
      <TestConnectionBtnS3 />
      <ToastContainer />
    </div>
  )
}

export default App
