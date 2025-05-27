import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { UpdateCouponFormDialog } from "@/components/Coupon/UpdateCouponFormDialog/UpdateCouponFormDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import {type CouponList} from "@/utils/types/couponTypes/couponTypes.ts";
import { type Dispatch, type SetStateAction, useState } from "react";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog/ConfirmDeleteDialog.tsx";
import { coupons } from "@/utils/dummy/coupon/couponDummy.ts";
import moment from "moment";

interface Props {
    coupon: CouponList;
    index: number;
    setCuponsToBeShown: Dispatch<SetStateAction<CouponList[]>>;
}
export default function CouponTableRow({
                                          coupon,
                                          index,
                                          setCuponsToBeShown,
                                      }: Props) {
    const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
    const handleClickDelete = () => {
        setOpenConfirmDeleteDialog(true);
    };
    const handleConfirmDeleteCupon = () => {
        const newCupons = coupons.filter((c) => c.id !== coupon.id);
        setCuponsToBeShown(newCupons);
    };
    return (
        <TableRow>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{coupon.code}</TableCell>
            <TableCell>${coupon.discount_pct}</TableCell>
            <TableCell>{coupon.expiry_date}</TableCell>
            <TableCell>{coupon.is_active ? "True" : "False"}</TableCell>
            <TableCell>{moment(coupon.created_at).format("MMMM Do YYYY, h:mm:ss A")}</TableCell>
            <TableCell>{coupon.is_claimed ? "True" : "False"}</TableCell>

            <TableCell className="flex gap-3 mt-4">
                <UpdateCouponFormDialog couponId={coupon.id} />
                <Button
                    size="icon"
                    variant="outline"
                    className="cursor-pointer"
                    onClick={handleClickDelete}
                >
                    <Trash className="text-red-500" />
                </Button>
            </TableCell>
            <ConfirmDeleteDialog
                open={openConfirmDeleteDialog}
                setOpen={setOpenConfirmDeleteDialog}
                itemName={"cupon"}
                handleConfirmDelete={handleConfirmDeleteCupon}
            />
        </TableRow>
    );
}
