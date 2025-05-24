
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import DropDown from "./DropDown";
import type { CheckType } from "@/utils/types/BookingTypes/bookingTypes";


interface Props {
    check:CheckType
}

const TableCheck = ({check}:Props) => {

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
      <TableCell className="flex gap-3 items-center justify-center">
        <DropDown CheckOut={CheckOutClick} status={check.status} active={true} viewBooking={viewBooking}/>
      </TableCell>
    </TableRow>
  )
}

export default TableCheck
