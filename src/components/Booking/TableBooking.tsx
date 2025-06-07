import { TableCell, TableRow } from "@/components/ui/table";
import type { bookingProps } from "@/utils/types/BookingTypes/bookingTypes";
import moment from "moment";
import ModalExtracharge from "./ModalExtracharge";
import ViewBooking from "@/pages/Admin/Booking/ViewBooking";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

const TableBooking = ({ booking }: bookingProps) => {

  const extraCharge = booking?.checkInOut?.extra_charge;
  const total = booking.totalAmount + booking?.checkInOut?.extra_charge;
  const [updateId, setUpdateId] = useState("");
  const [invoice, setInvoice] = useState("");
  const [open, setOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [data,setData] = useState('')

  const updateBranch = (id: string,data:string) => {
    setUpdateId(id);
    setData(data)
    setOpen(true);
  };

  const ViewInvoice = (id: string) => {
    setInvoice(id);
    setInvoiceOpen(true);
  };

  return (
    <TableRow key={booking.id}>
      <TableCell>{booking?.user?.name || "-"}</TableCell>
      <TableCell className="text-center">{booking.room.roomNo}</TableCell>
      <TableCell className="text-center">
        {moment(booking.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">
        {moment(booking.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">{booking.guestCount}</TableCell>
      <TableCell className="text-right">${booking.depositAmount}</TableCell>
      <TableCell className="text-right">${extraCharge}</TableCell>
      <TableCell className="text-right">${total}</TableCell>
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
        <div
          className="bg-white shadow-md rounded-lg p-2 w-[80px] cursor-pointer text-center"
          onClick={() => updateBranch(booking.checkInOutId,booking?.checkInOut?.extra_charge)}
        >
          <p>Pay</p>
        </div>
         <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
             <DialogHeader>
              <DialogTitle className="text-center text-2xl pb-4">Update Booking</DialogTitle>
            </DialogHeader>
            {
              updateId && (
                <ModalExtracharge updateId={updateId} setOpen={setOpen} data={data}/>
              )
            }
          </DialogContent>
        </Dialog>
        <div
          className="bg-white shadow-md rounded-lg p-2 w-[80px] cursor-pointer text-center"
          onClick={() => ViewInvoice(booking.id)}
        >
          <p>Invoice</p>
        </div>
         <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}>
          <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-3xl">Hotel Receipt</DialogTitle>
              </DialogHeader>
            {
              invoice && (
              <ViewBooking
                invoice={invoice}
              />
              )
            }
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
};

export default TableBooking;
