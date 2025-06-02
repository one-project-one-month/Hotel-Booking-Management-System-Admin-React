import { Button } from "@/components/ui/button";
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
    <div className="shadow-lg mt-2 h-[calc(100vh-180px)]  rounded-md p-2 px-[30px] w-[40%] mx-auto">
      <div className="flex flex-col justify-center">
        <h3 className="text-3xl font-bold text-center mb-2">Hotel Receipt</h3>
        <h3 className="flex gap-2 mt-2">
          BookingNo:{" "}
          <p className="font-semibold text-nowrap text-sm">
            INV-{dataList.bookingId}
          </p>
        </h3>
        <h3 className="flex gap-2 mt-2">
          Invoice Date:{" "}
          <p className="font-semibold">
            {moment(dataList?.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
          </p>
        </h3>
      </div>
      <div className="mt-2">
        <h3 className="font-bold">Guest Details:</h3>
        <h3 className="flex gap-3">
          Name: <p className="font-semibold">{customer}</p>
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
          <p className="font-semibold">{dataList?.booking?.guestCount}</p>
        </h3>
      </div>
      <div className="h-[46%] overflow-auto w-[100%]">
        <Table className="mt-2 border-1">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Room Number</TableHead>
              <TableHead className="text-right">Unique Price</TableHead>
              <TableHead className="text-center">Used Date</TableHead>
              <TableHead className="text-right">Total Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">{roomNo}</TableCell>
              <TableCell className="text-right">{roomPrice}Ks</TableCell>
              <TableCell className="text-center">3days</TableCell>
              <TableCell className="text-right">
                {dataList?.booking?.totalAmount}Ks
              </TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Deposit Amount</TableCell>
              <TableCell className="text-right">
                {dataList?.booking?.depositAmount}Ks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Extra Charge Amount</TableCell>
              <TableCell className="text-right">
                {dataList.extraCharge}Ks
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Pay Amount</TableCell>
              <TableCell className="text-right">{pay}Ks</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">{total}Ks</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div className="flex mt-2 justify-end w-[100%]">
        <Button className="w-[120px] cursor-pointer">Print Invoice</Button>
      </div>
    </div>
  );
};

export default ViewBooking;
