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
// import { DatePicker } from "@/components/shared/DatePicker/DatePicker.tsx";
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
// import type { CouponList } from "@/utils/types/couponTypes/couponTypes.ts";
import { useUser } from "@/hooks/useUser.ts";
import {
  errorToastStyle,
  successToastStyle,
} from "@/utils/dummy/Toast/toast.ts";
import { Input } from "@/components/ui/input.tsx";

const createCuponFormSchema = z.object({
  // code: z.string().min(1, { message: "Code is required" }),
  user_id: z.string().min(1, { message: "UserId is required" }),
  discount: z.string().min(1, { message: "Discount Price is required" }),
  expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

interface TypeDiscount {
  user_id:string;
  discounts:number;
  expiry_date:string
}

export function CreateCouponFormDialog() {
  const [date, setDate] = React.useState<Date>();

  const { createCouponMutation } = useCoupon();
  const { userQuery } = useUser();
  const { data: users } = userQuery;

  const form = useForm({
    resolver: zodResolver(createCuponFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (formData: z.infer<typeof createCuponFormSchema>) => {
    const newCoupon: TypeDiscount = {
      user_id: formData.user_id,
      discounts: Number(formData.discount),
      expiry_date: formData.expiry_date,
    };
    try {
      const res = await createCouponMutation.mutateAsync(newCoupon);
      console.log("res is ", res);

      if (res) {
        form.reset({
          user_id: "",
          discount: "",
          expiry_date: "",
        });
        setDate(undefined);
        toast("Coupon is created successfully", successToastStyle);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast(`${error.response.data.message}`, errorToastStyle);
    }
  };

  console.log(date);
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
        <CreateNewButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Cupon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
                name={"discount"}
                placeholder={"Enter Discount Price"}
                label={"Discount Price"}
              />

              <div className="grid gap-2">
                <Label> Expiry Date</Label>
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

              {/*<div className="grid gap-2">*/}
              {/*  <Label> Expiry Date</Label>*/}
              {/*  <DatePicker date={date} setDate={setDate} />*/}
              {/*  {form.formState.errors.expiry_date && !date ? (*/}
              {/*    <label className={"text-red-600 text-sm"}>*/}
              {/*      {form.formState.errors.expiry_date.message}*/}
              {/*    </label>*/}
              {/*  ) : (*/}
              {/*    <></>*/}
              {/*  )}*/}
              {/*</div>*/}
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
