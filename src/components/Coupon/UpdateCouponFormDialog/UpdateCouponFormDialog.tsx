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
import { DatePicker } from "@/components/shared/DatePicker/DatePicker.tsx";
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

  const cuponToBeUpdated = coupons?.find((coupon) => coupon.id === couponId);
  // const userId = users
  //   .find((user) => user.coupon.includes(Number(couponId)))
  //   ?.id.toString();
  const userId = "";

  const form = useForm<z.infer<typeof updateCuponFormSchema>>({
    resolver: zodResolver(updateCuponFormSchema),
    mode: "onChange",
    defaultValues: {
      id: cuponToBeUpdated?.id ?? couponId,
      // code: cuponToBeUpdated?.code ?? "",
      user_id: userId ?? "",
      discounts: cuponToBeUpdated?.discounts.toString() ?? "",
      expiry_date: cuponToBeUpdated?.expiry_date ?? "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof updateCuponFormSchema>) => {
    console.log(formData);
    const updatedCoupon: Partial<CouponList> = {
      user_id: formData.user_id,
      discounts: Number(formData.discounts),
      expiry_date: formData.expiry_date,
    };
    try {
      const res = await updateCouponMutation.mutateAsync(updatedCoupon);

      if (res) {
        form.reset({});
        toast("Coupon is updated successfully", {
          position: "top-center",
          style: {
            backgroundColor: "#228B22",
            color: "white",
            border: "none",
            height: "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "16px",
          },
        });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, {
        position: "top-center",
        style: {
          backgroundColor: "red",
          color: "white",
          border: "none",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "16px",
        },
      });
    }
  };

  useEffect(() => {
    const getExpDate = () => {
      // const year = date?.getFullYear().toString();
      // const month = date?.getMonth().toString();
      // const day = date?.getDate();
      //
      // const expDate = `${year}-${month}-${day}`;
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
          {/*<DialogDescription>*/}
          {/*  Make changes to your profile here. Click save when you're done.*/}
          {/*</DialogDescription>*/}
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
                name={"userId"}
                label={"User"}
                users={[]}
                placeholder={"Select User"}
              />
              <InputFormField
                control={form.control}
                type={"number"}
                name={"discount_pct"}
                placeholder={"Enter Discount Price"}
                label={"Discount Price"}
              />

              <div className="grid gap-2">
                <Label>
                  {" "}
                  Expiry Date: ({cuponToBeUpdated?.expiry_date.split("T")[0]})
                </Label>
                <DatePicker date={date} setDate={setDate} />
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
