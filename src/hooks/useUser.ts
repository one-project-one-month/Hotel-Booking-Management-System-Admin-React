import Axios from "@/config/ApiConfig"
import { useQuery } from "@tanstack/react-query"


const getUsers = () => {
    return Axios.get("/users")
}

export const useUser = () => {
    return useQuery({
        queryKey:["users"],
        queryFn:getUsers,
    })
}

