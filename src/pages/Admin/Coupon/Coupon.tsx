import { Table, TableBody } from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { coupons } from "@/utils/dummy/coupon/couponDummy.ts";
import { CreateCouponFormDialog } from "@/components/Coupon/CreateCouponFormDialog/CreateCouponFormDialog.tsx";
import { type ChangeEvent, useState } from "react";
import { type CouponList as Coupon } from "@/utils/types/couponTypes/couponTypes.ts";
import CouponTableHeader from "@/components/Coupon/CouponTableHeader/CouponTableHeader.tsx";
import CouponTableRow from "@/components/Coupon/CouponTableRow/CouponTableRow.tsx";

export default function Coupon() {
  const [couponsToBeShown, setCouponsToBeShown] = useState<Coupon[]>(coupons);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 5;
  const pages: number[] = [];

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

  for (let i = 1; i <= Math.ceil(couponsToBeShown.length / itemPerPage); i++) {
    pages.push(i);
  }

  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentCoupon = couponsToBeShown.slice(startIndex, endIndex);

  const pageClick = (text: number) => {
    setCurrentPage(Number(text));
  };

  const handleSearchCoupon = (e: ChangeEvent<HTMLInputElement>) => {
    const searchedValue = e.target.value.toLowerCase();
    const filteredCoupons = coupons.filter(
      (coupon) =>
        coupon.code.toLowerCase().includes(searchedValue) ||
        coupon.discount_pct.toString().toLowerCase().includes(searchedValue)
    );
    setCouponsToBeShown(filteredCoupons);
  };
  return (
    <div>
      <div className=" flex  justify-between items-center rounded-md shadow-lg h-[60px] px-[1rem]">
        <h3 className="text-2xl font-semibold">Cupon Lists</h3>
        <div>
          <Input
            placeholder="Search by code or discount price ..."
            className="w-[500px]"
            onChange={handleSearchCoupon}
          />
        </div>
        <div className="flex gap-5">
          <CreateCouponFormDialog />
          {/*<CreateNewButton onClick={handleClickCreate} />*/}
          <Button size="icon" className="cursor-pointer" variant="secondary">
            <Filter />
          </Button>
        </div>
      </div>
      <div className="h-[73vh] overflow-auto rounded-md shadow-lg mt-[10px] px-[10px] ">
        <Table>
          <CouponTableHeader />
          <TableBody>
            {currentCoupon.map((coupon, index) => {
              return (
                <CouponTableRow
                  key={coupon.id}
                  coupon={coupon}
                  index={index}
                  setCuponsToBeShown={setCouponsToBeShown}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="w-full mt-[10px] h-[60px] flex rounded-md shadow-lg">
        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={prevClick} />
            </PaginationItem>
            {pages.map((p, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === p}
                    onClick={() => pageClick(p)}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext href="#" onClick={nextClick} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
