import { toast } from "react-toastify"
import { LANGS } from "../constants"


function TestConnectionBtn() {

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
        <button
            onClick={handleOnTestConnection}
            className="bg-blue-500 text-white p-2 rounded mt-2"
        >
            {LANGS.TEST}
        </button>
    )
}

export default TestConnectionBtn