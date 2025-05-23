import { Table, TableBody } from "@/components/ui/table";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
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
import {type CouponList} from "@/utils/types/couponTypes/couponTypes.ts";
import CouponTableHeader from "@/components/Coupon/CouponTableHeader/CouponTableHeader.tsx";
import CouponTableRow from "@/components/Coupon/CouponTableRow/CouponTableRow.tsx";

const Coupon = () => {
    const [couponsToBeShown, setCouponsToBeShown] = useState<CouponList[]>(coupons);

    const handleSearchCoupon = (e: ChangeEvent<HTMLInputElement>) => {
        const searchedValue = e.target.value.toLowerCase();
        const filteredCoupons = coupons.filter(
            (coupon) =>
                coupon.code.toLowerCase().includes(searchedValue) ||
                coupon.discount_pct.toString().toLowerCase().includes(searchedValue),
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
                        {couponsToBeShown.map((coupon, index) => {
                            return (
                                <CouponTableRow
                                    key={coupon.id}
                                    coupon={coupon }
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
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default Coupon;
