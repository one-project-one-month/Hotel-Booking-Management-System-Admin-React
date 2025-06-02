import { TableCell, TableRow } from "@/components/ui/table";
import DropDown from "./DropDown";
import type { bookingProps } from "@/utils/types/BookingTypes/bookingTypes";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useCheckIn } from "@/hooks/useCheckIn";
import { toast } from "sonner";

const TableBooking = ({ booking }: bookingProps) => {
  const navigate = useNavigate();

  const { mutation } = useCheckIn();

  const CheckInClick = async () => {
    const pastData = {
      bookingId: booking.id,
      status: "Check-In",
    };
    try {
      const res = await mutation.mutateAsync(pastData);
      if (res.message === "Create Check-in/out Success!") {
        toast(`${res.message}`, {
          position: "top-center",
          style: {
            backgroundColor: "#228B22",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
        navigate(`/booking/${res.data.data.id}`);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error?.response?.data?.message}`, {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
        },
      });
    }
  };

  return (
    <TableRow key={booking.id}>
      <TableCell>{booking.user.name}</TableCell>
      <TableCell className="text-center">{booking.room.roomNo}</TableCell>
      <TableCell className="text-center">
        {moment(booking.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">
        {moment(booking.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">{booking.guestCount}</TableCell>
      <TableCell className="text-right">{booking.depositAmount}Ks</TableCell>
      <TableCell className="text-right">{booking.totalAmount}Ks</TableCell>
      <TableCell
        className={
          booking.status === "pending"
            ? "text-red-600 text-center"
            : "text-green-600 text-center"
        }
      >
        {booking.status}
      </TableCell>
      <TableCell>
        {moment(booking.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="flex justify-center items-center mt-6">
        <DropDown CheckIn={CheckInClick} status={booking.status} />
      </TableCell>
    </TableRow>
  );
};

export default TableBooking;
