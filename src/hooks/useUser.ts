import Axios from "@/config/ApiConfig"
import type { CreateUser, IdPrpos, LoginUser } from "@/utils/types/LoginTypes/AuthType";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const getUsers = async() => {
    const data = await Axios.get("users")
    return data.data.data;
}

const createUser = async(newUser:LoginUser) =>{
    const data = await Axios.post("users",newUser)
    return data.data;
}

const patchUser = async(id:string,patchUser:CreateUser) => {
    const data = await Axios.patch(`users/${id}`,patchUser)
    return data.data;
}

const getIdUser = async(id:string) =>{
    const data = await Axios.get(`users/${id}`)
    return data.data.data;
}

const deleteUser = async(id:string) => {
    const data = await Axios.delete(`users/${id}`)
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

export const useMutate = ({id}:IdPrpos) =>{

    const queryClient = useQueryClient()

    const getIdquery = useQuery({
        queryKey:["users",id],
        queryFn:()=> getIdUser(id)
    })

    const updateMutation = useMutation({
        mutationKey:["users",id],
        mutationFn:(updateUser:CreateUser) => patchUser(id,updateUser),
        onSuccess:()=>{
           queryClient.invalidateQueries({ queryKey: ["users"] });
        }
    })


    return {updateMutation,getIdquery}
}