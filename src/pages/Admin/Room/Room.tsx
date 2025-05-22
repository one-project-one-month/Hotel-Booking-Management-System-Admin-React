import RoomFiltersAndCreateNewButton from "@/components/Room/RoomFiltersAndCreateNewButton/RoomFiltersAndCreateNewButton.tsx";
import { RoomCard } from "@/components/Room/RoomCard/RoomCard.tsx";

import type { Room as TypeOfRoom } from "@/utils/types/roomTypes/roomTypes.ts";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { LabelOld } from "@/components/ui/label-old.tsx";
import { dummyRooms } from "@/utils/dummy/room/roomDummy.ts";

const Room = () => {
    const [rooms, setRooms] = useState<TypeOfRoom[]>(dummyRooms);
    const [roomsToBeShown, setRoomsToBeShown] = useState<TypeOfRoom[]>(rooms);
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

    const handleToggleShowOnlyFeatured = (checked: boolean) => {
        if (checked) {
            setShowOnlyFeatured(true);
        } else if (!checked) {
            setShowOnlyFeatured(false);
        }
    };

    useEffect(() => {
        const filteredRooms = showOnlyFeatured
            ? rooms.filter((room) => room.is_featured)
            : dummyRooms;
        setRooms(filteredRooms);
    }, [showOnlyFeatured]);
    return (
        <div>
            <div className="rounded-md shadow-lg  p-[1rem] ">
                <div className="flex justify-between  ">
                    <h3 className="text-2xl font-semibold">Rooms</h3>
                    <RoomFiltersAndCreateNewButton
                        rooms={rooms}
                        setRoomsToBeShown={setRoomsToBeShown}
                    />
                </div>
                <div className="flex justify-between  pt-4 ">
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="airplane-mode"
                            className="cursor-pointer"
                            onCheckedChange={handleToggleShowOnlyFeatured}
                        />
                        <LabelOld htmlFor="airplane-mode">
                            Show only featured rooms
                        </LabelOld>
                    </div>
                    <div>Room count:{roomsToBeShown.length}</div>
                </div>
            </div>

            <div className="h-[70vh] overflow-auto overflow-x-hidden rounded-md  mt-[10px] ">
                {roomsToBeShown.length ? (
                    roomsToBeShown.map((room) => (
                        <RoomCard
                            room={room}
                            key={room.id}
                            rooms={rooms}
                            setRooms={setRooms}
                        />
                    ))
                ) : (
                    <div className="flex w-full h-[250px] justify-center items-center ">
                        <h1 className="font-bold">No rooms found</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Room;
