import Axios from "@/config/ApiConfig"
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

interface PropsUser {
    email:string;
    name:string;
    password:string;
    imgUrl:string;
    phoneNumber:string
}

interface typeUser{
    email:string
    name:string
    imgUrl:string
    phoneNumber:string
    points:number
    coupon:number
    role:string
}

interface Prpos{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id:any
}


const getUsers = async() => {
    const data = await Axios.get("/users")
    return data.data.data;
}

const createUser = async(newUser:PropsUser) =>{
    const data = await Axios.post("/users",newUser)
    return data.data;
}

const patchUser = async(id:string,patchUser:typeUser) => {
    const data = await Axios.patch(`/users/${id}`,patchUser)
    return data.data;
}

const getIdUser = async(id:string) =>{
    const data = await Axios.get(`/users/${id}`)
    return data.data.data;
}

const deleteUser = async(id:string) => {
    const data = await Axios.delete(`/users/${id}`)
    return data;
}

export const useUser = () => {

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey:["users"],
        queryFn:getUsers,
    })

    const mutation = useMutation({
        mutationKey:["users"],
        mutationFn:createUser,
        onSuccess:()=>{
           queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

     const deleteMutation = useMutation({
        mutationKey:["users"],
        mutationFn:(id:string) => deleteUser(id),
        onSuccess:()=>{
           queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })

    

    return {query,mutation,deleteMutation};
}

export const useMutate = ({id}:Prpos) =>{

    const queryClient = useQueryClient()

    const getIdquery = useQuery({
        queryKey:["users",id],
        queryFn:()=> getIdUser(id)
    })

    const updateMutation = useMutation({
        mutationKey:["users",id],
        mutationFn:(updateUser:typeUser) => patchUser(id,updateUser),
        onSuccess:()=>{
           queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })


    return {updateMutation,getIdquery}
}