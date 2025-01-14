import { toast } from "react-toastify"
import { AWS, LANGS } from "../constants"


function TestConnectionBtnS3() {

    const handleOnTestConnection = async () => {
        try {
            const response = await fetch(AWS.HELLO)
            const data = await response.json()
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            toast.error(LANGS.TEST_FAIL_S3)
            console.error(error)
        }
    }

    return (
        <button
            onClick={handleOnTestConnection}
            className="bg-blue-500 text-white p-2 rounded mt-2"
        >
            {LANGS.TEST_S3}
        </button>
    )
}

export default TestConnectionBtnS3
