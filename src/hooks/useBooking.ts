import Axios from "@/config/ApiConfig"
import { useQuery } from "@tanstack/react-query"

const getBooking = async() =>{
    const res = await Axios.get("booking")
    return res.data.data;
}


const useBooking = () => {
    // const queryClient = useQueryClient()

    const query = useQuery({
        queryKey:['booking'],
        queryFn:getBooking
    })

    return {query}
}

export default useBooking;