import {
  Table,
  TableBody,
} from "@/components/ui/table";

import { bookings } from "@/utils/dummy/dummy.ts";

import type { Book } from "@/utils/types/BookingTypes/bookingTypes";
import TableBooking from "@/components/Booking/TableBooking";
import { useEffect, useState, type ChangeEvent } from "react";
import useBooking from "@/hooks/useBooking";
import TableHeaders from "@/components/Booking/TableHeader";
import PaginationTable from "@/components/shared/TablePagination/PaginationTable";
import BookingInput from "@/components/Booking/BookingInput";

const Booking = () => {

  const {query} = useBooking()

  const {data:booking,isLoading,isError,isSuccess} = query;

  const [filterBooking, setFilterBooking] = useState<Book[]>(bookings);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const pages: number[] = [];


    useEffect(() => {
      if (isSuccess && booking) {
        setFilterBooking(booking);
      }
    }, [booking, isSuccess]);

  const prevClick = () => {
    if (currentPage > pages.length) {
      setCurrentPage((prev) => prev - 1);
    } else {
      setCurrentPage(1);
    }
  };
  const nextClick = () => {
    if (currentPage !== pages.length) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(1);
    }
  };

  for (let i = 1; i <= Math.ceil(filterBooking.length / itemPerPage); i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentBooking = filterBooking.slice(startIndex, endIndex);

  const pageClick = (text: number) => {
    setCurrentPage(Number(text));
  };

  const bookingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = bookings.filter((booking) => {
      return (
        booking.customerName
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        booking.depositAmount.toString().includes(event.target.value.toString()) ||
        booking.roomNo.toString().includes(event.target.value.toString())
      );
    });
    setFilterBooking(filter);
  };

   if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <BookingInput bookingChange={bookingChange}/>
      <div className="h-[calc(100vh-200px)] w-full overflow-auto rounded-md shadow-lg mt-[10px] px-[10px]">
        <Table>
          <TableHeaders />
          <TableBody>
            {currentBooking.map((booking: Book) => {
              return <TableBooking booking={booking} />;
            })}
          </TableBody>
        </Table>
        {currentBooking.length === 0 && (
          <div className="flex justify-center items-center mt-[200px]">
            <p className="text-xl">No Booking found.</p>
          </div>
        )}
      </div>
      <div className="w-full mt-[10px] h-[60px] flex rounded-md shadow-lg">
        <PaginationTable prevClick={prevClick} pages={pages} currentPage={currentPage} nextClick={nextClick} pageClick={pageClick}/>
      </div>
    </div>
  );
};

export default Booking;
