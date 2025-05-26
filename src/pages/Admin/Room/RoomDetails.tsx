import { useParams } from "react-router-dom";
import { dummyRooms } from "@/utils/dummy/room/roomDummy.ts";

export default function RoomDetails() {
  const { id } = useParams();
  const room = dummyRooms.find((room) => room.id === Number(id));
  return (
    <div>
      Room Details :{id}
      {room?.room_no}
    </div>
  );
}
