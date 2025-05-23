
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import DropDown from "./DropDown";
import type { Book } from "@/utils/types/BookingTypes/bookingTypes";

interface Props{
    booking:Book
}

const TableBooking = ({booking}:Props) => {

    const CheckInClick = () =>{
        console.log(booking.id)
    }

    const CheckOutClick = () => {
        console.log(booking.id)
    }

    const maintanceClick = () => {
        console.log(booking.id)
    }

  return (
    <TableRow key={booking.id}>
      <TableCell>{booking.customerName}</TableCell>
      <TableCell className="text-center">{booking.roomNo}</TableCell>
      <TableCell>{booking.checkIn}</TableCell>
      <TableCell>{booking.checkOut}</TableCell>
      <TableCell className="text-center">{booking.guestCount}</TableCell>
      <TableCell className="text-right">{booking.depositAmount}Ks</TableCell>
      <TableCell className="text-right">{booking.totalAmount}Ks</TableCell>
      <TableCell
        className={
          booking.status === "Available"
            ? "text-blue-500 text-center"
            : booking.status === "Check-In"
            ? "text-green-500 text-center"
            : "text-red-500 text-center"
        }
      >
        {booking.status}
      </TableCell>
      <TableCell>{booking.createdAt}</TableCell>
      <TableCell className="flex gap-3 items-center justify-center">
        <DropDown CheckIn={CheckInClick} CheckOut={CheckOutClick} Maintance={maintanceClick} status={booking.status}/>
      </TableCell>
    </TableRow>
  );
};

export default TableBooking;
