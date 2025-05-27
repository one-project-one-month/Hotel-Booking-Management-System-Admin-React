import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ChangeEvent } from "react";

interface BookingProps {
    bookingChange:(e:ChangeEvent<HTMLInputElement>) => void;
}

const BookingInput = ({bookingChange}:BookingProps) => {
  return (
    <div className="flex justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
        <h3 className="text-2xl font-semibold">Booking Listings</h3>
        <div>
          <Input
            placeholder="Search Booking"
            className="w-[500px]"
            onChange={bookingChange}
          />
        </div>
        <div className="flex gap-5">
          <Button size="icon" className="cursor-pointer" variant="secondary">
            <Filter />
          </Button>
        </div>
      </div>
  )
}

export default BookingInput
