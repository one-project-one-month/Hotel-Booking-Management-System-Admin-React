import Axios from "@/config/ApiConfig"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const getBooking = async() =>{
    const res = await Axios.get("bookings")
    return res.data.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchBooking = async(id:string,dataList:any) => {
    const data = await Axios.patch(`bookings/${id}`,dataList)
    return data.data;
}

const getBookingId = async(id:string) => {
    const data = await Axios.get(`bookings/${id}`)

    return data.data;
}

interface Props {
  id: string;
}

export const useBooking = () => {
    const bookingQuery = useQuery({
        queryKey:['bookings'],
        queryFn:getBooking
    })

    return {bookingQuery}
}


export const useMutateBooking = ({id}:Props) => {
    const queryClient = useQueryClient()

    const getIdBooking = useQuery({
        queryKey:['bookingid',id],
        queryFn:()=>getBookingId(id),
    })

    const mutation = useMutation({
        mutationKey:['booking',id],
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        mutationFn:({data}:{data:any}) => patchBooking(data.id,data),
            onSuccess:()=>{
               queryClient.invalidateQueries({ queryKey: ["booking"] });
            }
    })

    return {mutation,getIdBooking}

}