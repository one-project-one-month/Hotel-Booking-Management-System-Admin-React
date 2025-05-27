
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import DropDown from "./DropDown";
import { useEffect, useState } from "react";
import type { checkProps } from "@/utils/types/BookingTypes/bookingTypes";




const TableCheck = ({check}:checkProps) => {

  const [active,setActive] = useState(false)

    const CheckOutClick = () => {
        console.log(check.id)
        localStorage.setItem("CheckId",check.id)
        window.location.reload()
    }

    const viewBooking = () => {
         console.log(check.id)
        localStorage.setItem("CheckId",check.id)
        window.location.reload()
    }

    const updateBooking = () => {
      console.log(check.id)
      localStorage.setItem("updateBooking",check.id)
      window.location.reload()
    }

    useEffect(()=>{
      const checkId = localStorage.getItem('CheckId')
      const updateBooking = localStorage.getItem("updateBooking")

      if(checkId || updateBooking){
        setActive(true)
      }

    },[active])


  return (
    <TableRow key={check.id}>
      <TableCell>{check.customerName}</TableCell>
      <TableCell className="text-center">{check.roomNo}</TableCell>
      <TableCell>{check.checkIn}</TableCell>
      <TableCell>{check.checkOut}</TableCell>
      <TableCell className="text-center">{check.extraCharges}</TableCell>
      <TableCell
        className={
            check.status === "Check-In"
            ? "text-green-500 text-center"
            : "text-orange-500 text-center"
        }
      >
        {check.status}
      </TableCell>
      <TableCell>{check.createdAt}</TableCell>
      {
        !active && (
             <TableCell className="flex justify-center py-4 items-center">
                <DropDown CheckOut={CheckOutClick} status={check.status} active={true} viewBooking={viewBooking} updateBooking={updateBooking}/>
              </TableCell>
        )
      }
     
    </TableRow>
  )
}

export default TableCheck
