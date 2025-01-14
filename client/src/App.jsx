import { ToastContainer } from "react-toastify"
import MultipleFilesForm from "./forms/MultipleFilesForm"
import SingleFileForm from "./forms/SingleFileForm"
import TestConnectionBtn from "./components/TestConnection"
import TestConnectionBtnS3 from "./components/TestConnectionS3"
import AwsUploadS3 from "./forms/AwsForm"
import AwsPreSignedUrl from "./forms/AwsPreSignedUrl"
import AwsMultipartForm from "./forms/AwsMultipartForm"
import Separator from "./components/Separator"

function App() {

  return (
    <div className="container mx-auto p-4 flex flex-col items-center gap-6">
      <MultipleFilesForm />
      <Separator />
      <SingleFileForm />
      <Separator />
      <AwsMultipartForm />
      <Separator />
      <AwsPreSignedUrl />
      <Separator />
      <AwsUploadS3 />
      <Separator />
      <div className="flex flex-row gap-4">
        <TestConnectionBtn />
        <TestConnectionBtnS3 />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App

