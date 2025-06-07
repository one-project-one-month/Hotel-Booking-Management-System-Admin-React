import Axios from "@/config/ApiConfig";
import { useMutation, useQueryClient, } from "@tanstack/react-query";


// const createCheckIn = async(newCheckIn:newCheckInProps) =>{
//     const data = await Axios.post("check-in-out",newCheckIn)
//     return data.data;
// }

// const getIdCheckIn = async(id:string) =>{
//     const data = await Axios.get(`check-in-out/${id}`)
//     return data.data.data;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const patchCheckIn = async(id:string,dataList:any) => {
    const data = await Axios.patch(`check-in-out/${id}`,dataList)
    return data.data;
}

// const getCheckInOut = async() => {
//     const res = await Axios.get("check-in-out")
//     return res.data.data;
// }

// export const useCheckIn = () => {

//     const queryClient = useQueryClient()

//     const query = useQuery({
//         queryKey:['check-in-out'],
//         queryFn:getCheckInOut
//     })

//     const mutation = useMutation({
//         mutationKey:["check-in-out"],
//         mutationFn:createCheckIn,
//         onSuccess:()=>{
//            queryClient.invalidateQueries({ queryKey: ["users"] });
//         }
//     })

//     return {mutation,query}
// }

interface Props {
  id: string;
}

export const useCheckInMutate = ( { id }:Props) => {

    const queryClient = useQueryClient()
    // const getIdqueryCheckIn = useQuery({
    //     queryKey:["check-in-out",id],
    //     queryFn:()=> getIdCheckIn(id)
    // })

    const updateMutation = useMutation({
            mutationKey:["check-in-out",id],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mutationFn:({data}:{data:any}) => patchCheckIn(data.id,data),
            onSuccess:()=>{
               queryClient.invalidateQueries({ queryKey: ["users"] });
            }
    })


    return {updateMutation}
}

