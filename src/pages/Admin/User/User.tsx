import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Edit, Filter, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
// import { useUser } from "@/hooks/useUser"
import moment from 'moment'
import {  useState, type ChangeEvent } from "react"
import type { User } from "@/utils/types/UserTypes/userTypes"
import { users } from "@/utils/dummy/dummy"





const User = () => {

  // const {data:user,isLoading,isError} = useUser();
  // const userList = user?.data.data
  const [filterUser,setFilterUser] = useState<User[]>(users)



  const navigate = useNavigate();


  const createUser = () => {
    navigate("/users/create")
  }

  const updateUser = (id:number) => {
    navigate(`/users/update/${id}`)
  }

  // if(isLoading){
  //   return <div>Loading</div>
  // }

  // if(isError){
  //   return <div>Error</div>
  // }

  
    const userChange = (event: ChangeEvent<HTMLInputElement>) => {
           const filter = users.filter((user:User)=> {
            return user.name.toLowerCase().includes(event.target.value.toLowerCase()) || user.email.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setFilterUser(filter)
       
    }

  return (
    <div>
        <div className="flex justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
          <h3 className="text-2xl font-semibold">User Listings</h3>
          <div>
            <Input placeholder="Search User" className="w-[500px]" onChange={userChange}/>
          </div>
          <div className="flex gap-5">
            <Button className="cursor-pointer" variant='secondary' onClick={createUser}>
              <Plus /> Create
            </Button>
            <Button size='icon' className="cursor-pointer" variant='secondary'>
              <Filter />
            </Button>
          </div>
        </div>
        <div className="h-[calc(100vh-200px)] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead  className="w-[100px] text-center text-md">Profile</TableHead>
                <TableHead className="w-[100px] text-md">Name</TableHead>
                <TableHead className="w-[100px] text-md">Email</TableHead>
                <TableHead className="w-[100px] text-md text-center">Ph Number</TableHead>
                <TableHead  className="w-[100px] text-md">Role</TableHead>
                <TableHead  className="w-[100px] text-md text-center">Points</TableHead>
                <TableHead  className="w-[100px] text-md text-center">Coupon</TableHead>
                <TableHead  className="w-[100px] text-md">CreatedAt</TableHead>
                <TableHead  className="w-[100px] text-md">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                filterUser.map((user:User)=>{
                  return (
                      <TableRow>
                        <TableCell>
                          <div className="w-[70px] h-[70px]  rounded-md shadow-lg mx-auto">
                            <img src={user.profile} alt="user.profile" className="w-full h-full rounded-md shadow-lg"/>
                          </div>
                          </TableCell>
                          <TableCell className="capitalize">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell className="text-center">{user.phoneNumber ? `0${user.phoneNumber}` : "-"}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell className="text-center">{user.points}</TableCell>
                          <TableCell className="text-center">{user.coupon}</TableCell>
                          <TableCell>{moment(user.createdAt).format('lll')}</TableCell>
                          <TableCell className="flex gap-3 mt-4">
                            <Button size='icon' variant='outline' className="cursor-pointer" onClick={()=>updateUser(user.id)}>
                              <Edit className="text-blue-500"/>
                            </Button>
                            <Button size='icon' variant='outline' className="cursor-pointer">
                              <Trash className="text-red-500"/>
                            </Button>
                          </TableCell>
                        </TableRow>
                  )
                })
              }
              
            </TableBody>
          </Table>
           {
                    filterUser.length === 0 && (
                      <div className="flex justify-center items-center mt-[200px]">
                        <p className="text-xl">No User found.</p>
                      </div>
                    )
              }
        </div>
        <div className="w-full mt-[10px] h-[60px] flex rounded-md shadow-lg">
              <Pagination className="justify-end">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
        </div>
    </div>
  )
}

export default User
