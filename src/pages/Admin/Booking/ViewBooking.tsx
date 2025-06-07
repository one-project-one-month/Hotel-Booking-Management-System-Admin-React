
import { Button } from "@/components/ui/button";
import {
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutateBooking } from "@/hooks/useBooking";
import moment from "moment";

interface Props{
  invoice:string,
}

const ViewBooking = ({invoice}:Props) => {


  const {getIdBooking} = useMutateBooking({id:invoice as string})

  const {data} = getIdBooking;

  const mainData = data?.data
  

  const roomNo = mainData?.room?.roomNo|| "";

  const customer = mainData?.user?.name || ''


  const roomPrice = mainData?.room?.price || 0;

  const pay =
    mainData?.totalAmount -
    mainData?.depositAmount +
    mainData?.checkInOut?.extra_charge;
  const total = pay + mainData?.depositAmount;

  return (
    // <Dialog open={invoiceOpen} onOpenChange={setInvoiceOpen}>
    //   <DialogTrigger>
    //     {/* <div className="bg-white shadow-md rounded-lg p-2 w-[80px] cursor-pointer text-center">
    //         <p>Invoice</p>
    //      </div> */}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[440px]">
    //     <DialogHeader>
    //       <DialogTitle className="text-center text-3xl">Hotel Receipt</DialogTitle>
    //     </DialogHeader>
        <div className="mt-1 rounded-md p-2 mx-auto">
          <div className="flex flex-col justify-center">
            <h3 className="flex gap-2 mt-1">
              BookingNo:{" "}
              <p className="font-semibold text-nowrap text-sm">
                INV-{mainData?.bookingId || '00000000'}
              </p>
            </h3>
            <h3 className="flex gap-2 mt-1">
              Invoice Date:{" "}
              <p className="font-semibold">
                {moment(mainData?.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
              </p>
            </h3>
          </div>
          <div className="mt-1">
            <h3 className="font-bold">Guest Details:</h3>
            <h3 className="flex gap-3">
              Name: <p className="font-semibold">{customer || "-"}</p>
            </h3>
            <h3 className="flex gap-2 items-center">
              CheckIn:{" "}
              <p className="font-semibold text-nowrap text-sm">
                {moment(mainData?.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
              </p>
            </h3>
            <h3 className="flex gap-2 items-center">
              CheckOut:{" "}
              <p className="font-semibold text-nowrap text-sm">
                {moment(mainData?.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
              </p>
            </h3>
            <h3 className="flex gap-3">
              Guest Count:{" "}
              <p className="font-semibold">{mainData?.guestCount || "0"}</p>
            </h3>
          </div>
          <div>
            <Table className="mt-1 border-1">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center text-nowrap">Room Number</TableHead>
                  <TableHead className="text-right  text-nowrap">Unique Price</TableHead>
                  <TableHead className="text-center  text-nowrap">Used Date</TableHead>
                  <TableHead className="text-right  text-nowrap">Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center">{roomNo || '-'}</TableCell>
                  <TableCell className="text-right">${roomPrice || "0"}</TableCell>
                  <TableCell className="text-center">3days</TableCell>
                  <TableCell className="text-right">
                    ${mainData?.totalAmount || "0"}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Deposit Amount</TableCell>
                  <TableCell className="text-right">
                    ${mainData?.depositAmount || "0"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Extra Charge Amount</TableCell>
                  <TableCell className="text-right">
                    ${mainData?.checkInOut?.extra_charge || "0"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Pay Amount</TableCell>
                  <TableCell className="text-right">${pay || "0"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">${total || "0"}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
          <DialogFooter>
            <div className="flex mt-2 justify-end w-[100%]">
              <Button className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500">Print Invoice</Button>
            </div>
          </DialogFooter>
        </div>
    //   </DialogContent>
    // </Dialog>
  );
};

export default ViewBooking;
