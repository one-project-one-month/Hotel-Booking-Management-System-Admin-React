import { Table, TableBody } from "@/components/ui/table";

import type {
  Book,
  bookingFilter,
} from "@/utils/types/BookingTypes/bookingTypes";
import TableBooking from "@/components/Booking/TableBooking";
import { useEffect, useState, type ChangeEvent } from "react";
import {useBooking} from "@/hooks/useBooking";
import TableHeaders from "@/components/Booking/TableHeader";
import PaginationTable from "@/components/shared/TablePagination/PaginationTable";
import BookingInput from "@/components/Booking/BookingInput";
import CustomLoading from "@/components/shared/Loading/Loading";
import { toast } from "sonner";
import { errorToastStyle } from "@/utils/dummy/Toast/toast";

const Booking = () => {
  const { bookingQuery } = useBooking();
  const { data: booking, isLoading, isError, isSuccess, error } = bookingQuery;
  const [filterBooking, setFilterBooking] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 10;
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

  function compare(a: Book, b: Book) {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  }

  const mainData = filterBooking.sort(compare);

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentBooking = mainData.slice(startIndex, endIndex);

  const pageClick = (text: number) => {
    setCurrentPage(Number(text));
  };

  const bookingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filter = booking.filter((book: bookingFilter) => {
      return (
        book.user.name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        book.depositAmount.toString().includes(event.target.value.toString()) ||
        book.room.roomNo.toString().includes(event.target.value.toString())
      );
    });
    setFilterBooking(filter);
  };

  if (isLoading) {
    return <CustomLoading />;
  }

  if (isError) {
    return toast(`${error.message}`,errorToastStyle);
  }

  return (
    <div>
      <BookingInput bookingChange={bookingChange} />
      <div className="h-[calc(100vh-200px)] w-[81vw] overflow-auto rounded-md shadow-lg mt-[10px] px-[20px]">
        <Table>
          <TableHeaders />
          <TableBody>
            {currentBooking.map((booking: Book) => {
              return <TableBooking booking={booking} key={booking.id} />;
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
        <PaginationTable
          prevClick={prevClick}
          pages={pages}
          currentPage={currentPage}
          nextClick={nextClick}
          pageClick={pageClick}
        />
      </div>
    </div>
  );
};

export default Booking;
