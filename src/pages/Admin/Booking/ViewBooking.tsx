
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import useCheckOut from "@/hooks/useCheckOut";
import { useRoom } from "@/hooks/useRooms";
import { useUser } from "@/hooks/useUser";
import type { Room } from "@/utils/types/roomTypes/roomTypes";
import type { Username } from "@/utils/types/UserTypes/userTypes";
import moment from "moment";

const ViewBooking = () => {
  const { dataList } = useCheckOut();

  const { userQuery } = useUser();

  const { getAllRoomsQuery } = useRoom();

  const { data: room } = getAllRoomsQuery;
  const { data: user } = userQuery;

  const roomList = room?.find(
    (room: Room) => room.id === dataList?.booking?.roomId
  );
  const roomNo = roomList?.roomNo || "";

  const customerName = user?.find(
    (userList: Username) => userList.id === dataList?.booking?.userId
  );

  const customer = customerName?.name || "";

  const roomPrice = roomList?.price || 0;

  const pay =
    dataList?.booking?.totalAmount -
    dataList?.booking?.depositAmount +
    dataList.extraCharge;
  const total = pay + dataList?.booking?.depositAmount;

  return (
    <Dialog>
      <DialogTrigger>
        <div className="bg-white shadow-md rounded-lg p-2 w-[80px] cursor-pointer text-center">
            <p>Invoice</p>
         </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[440px]">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Hotel Receipt</DialogTitle>
        </DialogHeader>
        <div className="mt-1 rounded-md p-2 mx-auto">
          <div className="flex flex-col justify-center">
            <h3 className="flex gap-2 mt-1">
              BookingNo:{" "}
              <p className="font-semibold text-nowrap text-sm">
                INV-{dataList.bookingId || '00000000'}
              </p>
            </h3>
            <h3 className="flex gap-2 mt-1">
              Invoice Date:{" "}
              <p className="font-semibold">
                {moment(dataList?.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
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
                {moment(dataList?.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
              </p>
            </h3>
            <h3 className="flex gap-2 items-center">
              CheckOut:{" "}
              <p className="font-semibold text-nowrap text-sm">
                {moment(dataList?.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
              </p>
            </h3>
            <h3 className="flex gap-3">
              Guest Count:{" "}
              <p className="font-semibold">{dataList?.booking?.guestCount || "0"}</p>
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
                    ${dataList?.booking?.totalAmount || "0"}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Deposit Amount</TableCell>
                  <TableCell className="text-right">
                    ${dataList?.booking?.depositAmount || "0"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3}>Extra Charge Amount</TableCell>
                  <TableCell className="text-right">
                    ${dataList.extraCharge || "0"}
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
      </DialogContent>
    </Dialog>
  );
};

export default ViewBooking;
