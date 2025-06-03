import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { z } from "zod";
import { Edit } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import { useEffect } from "react";
import SelectUserFormField from "@/components/Coupon/SelectUserFormField/SelectUserFormField.tsx";
import { toast } from "sonner";
import { useCoupon, useCouponById } from "@/hooks/useCoupon.ts";
import type { CouponList } from "@/utils/types/couponTypes/couponTypes.ts";
import { useUser } from "@/hooks/useUser.ts";
import {
  errorToastStyle,
  successToastStyle,
} from "@/utils/dummy/Toast/toast.ts";

const updateCuponFormSchema = z.object({
  id: z.string().min(1, { message: "Id is required" }),
  user_id: z.string().min(1, { message: "Id is required" }),
  discounts: z.string().min(1, { message: "Discount Price is required" }),
  expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

interface Props {
  couponId: string;
}

export function UpdateCouponFormDialog({ couponId }: Props) {
  const [date, setDate] = React.useState<Date>();
  const { updateCouponMutation } = useCouponById({ id: couponId });
  const { getAllCouponsQuery } = useCoupon();
  const { data: coupons } = getAllCouponsQuery;

  const { userQuery } = useUser();
  const { data: users } = userQuery;

  const cuponToBeUpdated = coupons?.find((coupon) => coupon.id === couponId);

  const form = useForm<z.infer<typeof updateCuponFormSchema>>({
    resolver: zodResolver(updateCuponFormSchema),
    mode: "onChange",
    defaultValues: {
      id: couponId,
      user_id: cuponToBeUpdated?.user_id,
      discounts: cuponToBeUpdated?.discount.toString(),
      expiry_date: cuponToBeUpdated?.expiry_date,
    },
  });

  const onSubmit = async (formData: z.infer<typeof updateCuponFormSchema>) => {
    const updatedCoupon: Partial<CouponList> = {
      user_id: formData.user_id,
      discount: Number(formData.discounts),
      expiry_date: formData.expiry_date,
    };

    try {
      const res = await updateCouponMutation.mutateAsync(updatedCoupon);

      if (res) {
        form.reset({});
        toast("Coupon is updated successfully", successToastStyle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }
  };

  useEffect(() => {
    const getExpDate = () => {
      const expDate = date?.toISOString();
      form.setValue("expiry_date", expDate ?? "");
    };

    getExpDate();
  }, [date, form]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="cursor-pointer">
          <Edit className="text-blue-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Cupon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <Input
                {...form.register("id")}
                value={couponId}
                type={"hidden"}
              />

              <SelectUserFormField
                control={form.control}
                name={"user_id"}
                label={"User"}
                users={users}
                placeholder={"Select User"}
              />
              <InputFormField
                control={form.control}
                type={"number"}
                name={"discounts"}
                placeholder={"Enter Discount Price"}
                label={"Discount Price"}
              />

              <div className="grid gap-2">
                <Label>
                  {" "}
                  Expiry Date : ({cuponToBeUpdated?.expiry_date.split("T")[0]})
                </Label>
                <Input
                  type={"date"}
                  value={date?.toISOString().split("T")[0] ?? ""}
                  onChange={(e) => setDate(new Date(e.target.value))}
                />

                {form.formState.errors.expiry_date && !date ? (
                  <label className={"text-red-600 text-sm"}>
                    {form.formState.errors.expiry_date.message}
                  </label>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <DialogFooter>
              <SubmitButton
                text={"Update"}
                pendingText={"Updating"}
                isPending={updateCouponMutation.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
