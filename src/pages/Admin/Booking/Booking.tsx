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
import { Eye, Filter, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
export const bookings:any = [
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Approved",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Cancel",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Pending",
    createdAt:"24/5/2000"
  },
  {
    customerName:"Arkar",
    roomNo:"104",
    checkIn:"3:00AM",
    checkOut:"12:00PM",
    guestCount:4,
    depositAmount:10000,
    totalAmount:30000,
    status:"Approved",
    createdAt:"24/5/2000"
  },
]



const Booking = () => {

  const navigate = useNavigate();

  const viewBooking = () => {
    navigate("/booking/view")
  }



  return (
        <div>
            <div className="flex justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
              <h3 className="text-2xl font-semibold">Booking Listings</h3>
              <div>
                <Input placeholder="Search Booking" className="w-[500px]"/>
              </div>
              <div className="flex gap-5">
                <Button size='icon' className="cursor-pointer" variant='secondary'>
                  <Filter />
                </Button>
              </div>
            </div>
            <div className="h-[73vh] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead  className="w-[150px] text-md">Customer Name</TableHead>
                    <TableHead  className="w-[100px] text-md">Room Number</TableHead>
                    <TableHead className="w-[100px] text-md">Check_In</TableHead>
                    <TableHead className="w-[100px] text-md">Check_Out</TableHead>
                    <TableHead className="w-[100px] text-center text-md">Guest Count</TableHead>
                    <TableHead className="w-[100px] text-md">Deposit Amount</TableHead>
                    <TableHead  className="w-[100px] text-md">Total Amount</TableHead>
                    <TableHead  className="w-[100px] text-md">Status</TableHead>
                    <TableHead  className="w-[100px] text-md">CreatedAt</TableHead>
                    <TableHead  className="w-[100px] text-md text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    bookings.map((booking:any)=>{
                      return (
                          <TableRow>
                              <TableCell>{booking.customerName}</TableCell>
                              <TableCell>{booking.roomNo}</TableCell>
                              <TableCell>{booking.checkIn}</TableCell>
                              <TableCell>{booking.checkOut}</TableCell>
                              <TableCell className="text-center">{booking.guestCount}</TableCell>
                              <TableCell className="text-right">{booking.depositAmount}</TableCell>
                              <TableCell className="text-right">{booking.totalAmount}</TableCell>
                              <TableCell className={booking.status === 'Pending' ? 'text-blue-500': booking.status === 'Approved'? 'text-green-500':"text-red-500"}>{booking.status}</TableCell>
                              <TableCell>{booking.createdAt}</TableCell>
                              <TableCell className="flex gap-3 mt-4 items-center justify-center">
                                {
                                  booking.status === 'Pending' ? (
                                        <>
                                          <Button className="bg-green-600 cursor-pointer hover:bg-green-500">Approve</Button>
                                          <Button className="text-red-600 cursor-pointer hover:text-red-500" variant='outline'>Cancel</Button>
                                        </>
                                  ):(
                                        <Button size='icon' variant='outline' className="cursor-pointer" onClick={viewBooking}>
                                          <Eye className="text-blue-500"/>
                                        </Button>
                                  )
                                }
                              
                              </TableCell>
                            </TableRow>
                      )
                    })
                  }
                  
                </TableBody>
              </Table>
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

export default Booking
