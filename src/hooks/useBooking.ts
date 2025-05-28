import Axios from "@/config/ApiConfig"
import { useQuery } from "@tanstack/react-query"

const getBooking = async() =>{
    const res = await Axios.get("bookings")
    return res.data.data;
}


const useBooking = () => {
    // const queryClient = useQueryClient()

    const bookingQuery = useQuery({
        queryKey:['booking'],
        queryFn:getBooking
    })

    return {bookingQuery}
}

export default useBooking;