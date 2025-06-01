import { TableCell, TableRow } from "@/components/ui/table.tsx";
import { UpdateCouponFormDialog } from "@/components/Coupon/UpdateCouponFormDialog/UpdateCouponFormDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Trash } from "lucide-react";
import { type CouponList } from "@/utils/types/couponTypes/couponTypes.ts";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog/ConfirmDeleteDialog.tsx";

import moment from "moment";
import { useCouponById } from "@/hooks/useCoupon.ts";
import { toast } from "sonner";
import {
  errorToastStyle,
  successToastStyle,
} from "@/utils/dummy/Toast/toast.ts";

interface Props {
  coupon: CouponList;
  index: number;
  // setCuponsToBeShown: Dispatch<SetStateAction<CouponList[]>>;
}
export default function CouponTableRow({ coupon, index }: Props) {
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const { deleteCouponMutation } = useCouponById({ id: coupon.id });
  // const { userQuery } = useUser();
  // const { data: users } = userQuery;

  // const userid = coupon.user_id;
  // const user = users?.find((user) => user.id === userid);
  const handleClickDelete = () => {
    setOpenConfirmDeleteDialog(true);
  };
  const handleConfirmDeleteCoupon = async () => {
    try {
      const res = await deleteCouponMutation.mutateAsync();

      if (res) {
        toast("Coupon is deleted successfully", successToastStyle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }
  };
  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{coupon.code}</TableCell>
      <TableCell>userid</TableCell>
      <TableCell>${coupon.discounts}</TableCell>
      <TableCell>{coupon.expiry_date.split("T")[0]}</TableCell>
      <TableCell>{coupon.is_active ? "True" : "False"}</TableCell>
      <TableCell>
        {moment(coupon.created_at).format("MMMM Do YYYY, h:mm:ss A")}
      </TableCell>
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
        handleConfirmDelete={handleConfirmDeleteCoupon}
        isPending={deleteCouponMutation.isPending}
      />
    </TableRow>
  );
}
