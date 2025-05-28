
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import DropDown from "./DropDown";
import type { bookingProps } from "@/utils/types/BookingTypes/bookingTypes";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const TableBooking = ({booking}:bookingProps) => {

  const navigate = useNavigate()

    const CheckInClick = () =>{
        localStorage.removeItem("CheckId")
        localStorage.removeItem("updateBooking")
        navigate(`/booking/${booking.id}`)
    }

    const CheckOutClick = () => {
        localStorage.removeItem("CheckId")
        localStorage.removeItem("updateBooking")
        navigate(`/booking/${booking.id}`)
    }

    const maintanceClick = () => {
        console.log(booking.id)
    }

  return (
    <TableRow key={booking.id}>
      <TableCell>{booking.user.name}</TableCell>
      <TableCell className="text-center">{booking.room.roomNo}</TableCell>
      <TableCell className="text-center">{moment(booking.checkIn).format('MMMM Do YYYY, h:mm:ss A')}</TableCell>
      <TableCell className="text-center">{moment(booking.checkOut).format('MMMM Do YYYY, h:mm:ss A')}</TableCell>
      <TableCell className="text-center">{booking.guestCount}</TableCell>
      <TableCell className="text-right">{booking.depositAmount}Ks</TableCell>
      <TableCell className="text-right">{booking.totalAmount}Ks</TableCell>
      <TableCell
        className={
          booking.status === "Check-Out"
            ? "text-orange-600 text-center"
            : booking.status === "Check-In"
            ? "text-green-600 text-center" : booking.status === 'Booked'? "text-blue-600 text-center"
            : "text-red-600 text-center"
        }
      >
        {booking.status}
      </TableCell>
      <TableCell>{moment(booking.createdAt).format('MMMM Do YYYY, h:mm:ss A')}</TableCell>
      <TableCell className="flex justify-center items-center mt-6">
            <DropDown CheckIn={CheckInClick} CheckOut={CheckOutClick} Maintance={maintanceClick} status={booking.status}/>
      </TableCell>
    </TableRow>
  );
};

export default TableBooking;
