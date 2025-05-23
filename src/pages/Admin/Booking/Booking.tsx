import {
  Table,
  TableBody,
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
import {  Filter, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { bookings } from "@/utils/dummy/dummy.ts"

import type { Booking } from "@/utils/types/BookingTypes/bookingTypes"
import TableBooking from "@/components/Booking/TableBooking"
import { useState, type ChangeEvent } from "react"





const Booking = () => {
  const [filterBooking,setFilterBooking] = useState<Booking[]>(bookings)

  const bookingChange = (event: ChangeEvent<HTMLInputElement>) => {
         const filter =bookings.filter((booking)=> {
          return booking.customerName.toLowerCase().includes(event.target.value.toLowerCase()) || booking.depositAmount.toString().includes(event.target.value.toString())
      })
        setFilterBooking(filter)
     
  }

  return (
        <div>
            <div className="flex justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
              <h3 className="text-2xl font-semibold">Booking Listings</h3>
              <div>
                <Input placeholder="Search Booking" className="w-[500px]" onChange={bookingChange}/>
              </div>
              <div className="flex gap-5">
                <Button size='icon' className="cursor-pointer" variant='secondary'>
                  <Filter />
                </Button>
              </div>
            </div>
            <div className="h-[calc(100vh-200px)] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead  className="w-[150px] text-md">Customer Name</TableHead>
                    <TableHead  className="w-[100px] text-md text-center">Room Number</TableHead>
                    <TableHead className="w-[100px] text-md">Check_In</TableHead>
                    <TableHead className="w-[100px] text-md">Check_Out</TableHead>
                    <TableHead className="w-[100px] text-center text-md">Guest Count</TableHead>
                    <TableHead className="w-[100px] text-md">Deposit Amount</TableHead>
                    <TableHead  className="w-[100px] text-md">Total Amount</TableHead>
                    <TableHead  className="w-[100px] text-md text-center">Status</TableHead>
                    <TableHead  className="w-[100px] text-md">CreatedAt</TableHead>
                    <TableHead  className="w-[100px] text-md text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    filterBooking.map((booking:Booking)=>{
                      return (
                          <TableBooking booking={booking}/>
                      )
                    })
                  }
                </TableBody>
              </Table>
              {
                    filterBooking.length === 0 && (
                      <div className="flex justify-center items-center mt-[200px]">
                        <p className="text-xl">No Booking found.</p>
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

export default Booking
