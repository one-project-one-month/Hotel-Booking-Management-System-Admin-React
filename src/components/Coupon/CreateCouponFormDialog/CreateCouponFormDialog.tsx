import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";

import { Label } from "@/components/ui/label.tsx";
import CreateNewButton from "@/components/shared/CustomButtons/CreateNewButton/CreateNewButton.tsx";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import * as React from "react";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectUserFormField from "@/components/Coupon/SelectUserFormField/SelectUserFormField.tsx";
import { useCoupon } from "@/hooks/useCoupon.ts";
import { toast } from "sonner";
import type { CouponList } from "@/utils/types/couponTypes/couponTypes.ts";

const createCuponFormSchema = z.object({
  // code: z.string().min(1, { message: "Code is required" }),
  user_id: z.string().min(1, { message: "UserId is required" }),
  discounts: z.string().min(1, { message: "Discount Price is required" }),
  expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

export function CreateCouponFormDialog() {
  const [date, setDate] = React.useState<Date>();

  const { createCouponMutation } = useCoupon();

  const form = useForm({
    resolver: zodResolver(createCuponFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: z.infer<typeof createCuponFormSchema>) => {
    console.log(formData);
    const newCoupon: Partial<CouponList> = {
      user_id: formData.user_id,
      discounts: Number(formData.discounts),
      expiry_date: formData.expiry_date,
    };
    try {
      const res = await createCouponMutation.mutateAsync(newCoupon);

      if (res) {
        form.reset({});
        toast("Coupon is created successfully", {
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
        <CreateNewButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Cupon</DialogTitle>
          {/*<DialogDescription>*/}
          {/*  Make changes to your profile here. Click save when you're done.*/}
          {/*</DialogDescription>*/}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                <Label> Expiry Date</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
            <DialogFooter>
              <SubmitButton
                text={"Create"}
                pendingText={"Creating"}
                isPending={createCouponMutation.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
