import { TableCell, TableRow } from "@/components/ui/table";
import type { bookingProps } from "@/utils/types/BookingTypes/bookingTypes";
// import { useNavigate } from "react-router-dom";
import moment from "moment";
import ModalExtracharge from "./ModalExtracharge";
import ViewBooking from "@/pages/Admin/Booking/ViewBooking";
// import { useCheckIn } from "@/hooks/useCheckIn";
// import { toast } from "sonner";
// import { useMutateBooking } from "@/hooks/useBooking";
// import { errorToastStyle, successToastStyle } from "@/utils/dummy/Toast/toast";

const TableBooking = ({ booking }: bookingProps) => {
  // const navigate = useNavigate();

  // const { mutation } = useCheckIn();

  // const id = booking.id

  // const {mutation:mutate} = useMutateBooking({id:id as string})

  // const {query} = useCheckIn()
  // const {data} = query;

  // const CheckInClick = async () => {
  //   const pastData = {
  //     bookingId: booking.id,
  //     status: "Check-In",
  //   };
  //   try {
  //     const res = await mutation.mutateAsync(pastData);
  //     if (res.message === "Create Check-in/out Success!") {

  //       const data = {
  //         id:id,
  //         status:"approved"
  //       }

  //       await mutate.mutateAsync({data})

  //       toast(`${res.message}`,successToastStyle);
  //       navigate(`/booking/${res.data.data.id}`);
  //     }
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     toast(`${error?.response?.data?.message}`,errorToastStyle);
  //   }
  // };

  // const viewHistory = () => {
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   const findId = data.data.find((data:any)=> data.bookingId === id)
  //   navigate(`/booking/${findId.id}`);
  // }


  return (
    <TableRow key={booking.id}>
      <TableCell>{booking?.user?.name || '-'}</TableCell>
      <TableCell className="text-center">{booking.room.roomNo}</TableCell>
      <TableCell className="text-center">
        {moment(booking.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">
        {moment(booking.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">{booking.guestCount}</TableCell>
      <TableCell className="text-right">${booking.depositAmount}</TableCell>
      <TableCell className="text-right">${booking.totalAmount}</TableCell>
      <TableCell
        className={
          booking.status === "pending"
            ? "text-red-600 text-center capitalize"
            : "text-green-600 text-center capitalize"
        }
      >
        {booking.status}
      </TableCell>
      <TableCell>
        {moment(booking.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="flex justify-center gap-2 items-center mt-3">
        <div>
          <ModalExtracharge />
        </div>
        <div>
          <ViewBooking />
        </div>
        {/* CheckIn={CheckInClick} viewHistory={viewHistory} status={booking.status} */}
      </TableCell>
    </TableRow>
  );
};

export default TableBooking;
