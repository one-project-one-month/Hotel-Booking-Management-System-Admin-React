import FilterDropdown from "@/components/shared/FilterDropdown/FilterDropdown.tsx";

import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useEffect,
  useState,
} from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input.tsx";

import type {
  GuestLimitStr,
  Room,
  RoomStatus,
  RoomTypes,
} from "@/utils/types/roomTypes/roomTypes.ts";

import { useNavigate } from "react-router-dom";
import CreateNewButton from "@/components/shared/CustomButtons/CreateNewButton/CreateNewButton.tsx";
import {
  guestLimitForFilter,
  roomStatusForFilter,
  roomTypesForFilter,
} from "@/utils/dummy/room/roomDummy.ts";

interface Props {
  rooms: Room[];
  setRoomsToBeShown: Dispatch<SetStateAction<Room[]>>;
}

export default function RoomFiltersAndCreateNewButton({
  rooms,
  setRoomsToBeShown,
}: Props) {
  const navigate = useNavigate();
  const [selectedRoomType, setSelectedRoomType] = useState<"All" | RoomTypes>(
    "All",
  );
  const [selectedStatus, setSelectedStatus] = useState<"All" | RoomStatus>(
    "All",
  );
  const [selectedLimit, setSelectedLimit] = useState<"All" | GuestLimitStr>(
    "All",
  );

  const [searchedRooms, setSearchRooms] = useState(rooms);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const filteredRooms =
      searchValue.length > 0
        ? rooms.filter((room) => {
            return room.roomNo
              .toString()
              .toLowerCase()
              .includes(searchValue.toLowerCase());
          })
        : rooms;
    setSearchRooms(filteredRooms);
    setRoomsToBeShown(filteredRooms);
  };

  useEffect(() => {
    const filteredRooms = searchedRooms
      .filter(
        (room) => selectedRoomType === "All" || room.type === selectedRoomType,
      )
      .filter(
        (room) => selectedStatus === "All" || room.status === selectedStatus,
      )
      .filter(
        (room) => selectedLimit === "All" || room.guestLimit === +selectedLimit,
      );

    setRoomsToBeShown(filteredRooms);
  }, [selectedRoomType, selectedStatus, selectedLimit, searchedRooms]);

  return (
    <div className="flex gap-4 items-start ">
      <div className="relative w-full max-w-md flex items-center ">
        <Search className="absolute left-3  text-muted-foreground w-4 h-4" />
        <Input
          type="search"
          placeholder="Search by Room No "
          className="pl-10 rounded-full border-[#d4d2e2] min-w-[300px]"
          onChange={handleSearch}
        />
      </div>
      <FilterDropdown
        label="RoomType"
        selected={selectedRoomType}
        setSelected={setSelectedRoomType as Dispatch<SetStateAction<string>>}
        options={roomTypesForFilter}
      />
      <FilterDropdown
        label="Status"
        selected={selectedStatus}
        setSelected={setSelectedStatus as Dispatch<SetStateAction<string>>}
        options={roomStatusForFilter}
      />
      <FilterDropdown
        label="GuestLimit"
        selected={selectedLimit}
        setSelected={setSelectedLimit as Dispatch<SetStateAction<string>>}
        options={guestLimitForFilter}
      />

      <CreateNewButton
        onClick={() => {
          navigate("/rooms/create");
        }}
      />
    </div>
  );
}
