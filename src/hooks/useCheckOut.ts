import { CheckOutContext } from "@/context/checkOutContext"
import { useContext } from "react"

const useCheckOut = () => {
    const context = useContext(CheckOutContext)

    if(!context) {
        throw new Error("CheckOut Provider is error status .")
    }
    return context;
}

export default useCheckOut;