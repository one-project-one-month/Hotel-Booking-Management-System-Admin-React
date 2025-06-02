import { TableCell, TableRow } from "@/components/ui/table";
import DropDown from "./DropDown";
import moment from "moment";
import { useUser } from "@/hooks/useUser";
import { useRoom } from "@/hooks/useRooms";
import type { Username } from "@/utils/types/UserTypes/userTypes";
import useCheckOut from "@/hooks/useCheckOut";
import { useCheckInMutate } from "@/hooks/useCheckIn";
import { toast } from "sonner";
import { useEffect } from "react";
import type { Room } from "@/utils/types/roomTypes/roomTypes";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TableCheck = ({ check }: any) => {
  const {
    active,
    modal,
    setActive,
    setDataList,
    setModal,
    setDataListId,
    setCheckList,
    checkList,
  } = useCheckOut();

  useEffect(() => {
    if (check) {
      setCheckList(check);
    }
  }, [check, setCheckList]);

  const { userQuery } = useUser();

  const { getAllRoomsQuery } = useRoom();
  const id = check?.id;

  const { data: room } = getAllRoomsQuery;
  const { data: user } = userQuery;

  const roomList = room?.find(
    (room: Room) => room.id === checkList?.booking?.roomId
  );
  const roomNo = roomList?.roomNo || "";

  const customerName = user?.find(
    (userList: Username) => userList.id === checkList?.booking?.userId
  );

  const customer = customerName?.name || "";

  const { updateMutation } = useCheckInMutate({ id: id as string });

  const CheckOutClick = async () => {
    const data = {
      id: id,
      status: "Check-Out",
    };
    try {
      const res = await updateMutation.mutateAsync({ data });
      if (res.message === "Update Check-in/out Success!") {
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
        setCheckList(res.data.data);
        setDataList(res.data.data);
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

  const viewBooking = () => {
    setActive(true);
  };

  const updateBooking = () => {
    setModal(true);
    setDataListId(id);
  };

  return (
    <TableRow key={checkList?.id}>
      <TableCell className="text-center">{customer}</TableCell>
      <TableCell className="text-center">{roomNo}</TableCell>
      <TableCell className="text-center">
        {moment(checkList?.checkIn).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">
        {moment(checkList?.checkOut).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      <TableCell className="text-center">{checkList?.extraCharge}</TableCell>
      <TableCell
        className={
          checkList?.status === "Check-In"
            ? "text-green-600 text-center"
            : "text-red-600 text-center"
        }
      >
        {checkList?.status}
      </TableCell>
      <TableCell className="text-center">
        {moment(checkList?.createdAt).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
      {!active && !modal && (
        <TableCell className="flex justify-center py-4 items-center">
          <DropDown
            status={checkList?.status}
            CheckOutClick={CheckOutClick}
            viewBooking={viewBooking}
            updateBooking={updateBooking}
          />
        </TableCell>
      )}
    </TableRow>
  );
};

export default TableCheck;
