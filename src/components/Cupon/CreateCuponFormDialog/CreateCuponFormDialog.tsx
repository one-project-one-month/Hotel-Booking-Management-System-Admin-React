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
import CreateNewButton from "@/components/shared/CustomButtons/AddNewButton/CreateNewButton.tsx";
import { DatePicker } from "@/components/shared/DatePicker/DatePicker.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import * as React from "react";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";

const createCuponFormSchema = z.object({
  // code: z.string().min(1, { message: "Code is required" }),
  discount_pct: z.string().min(1, { message: "Discount Price is required" }),
  expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

export function CreateCuponFormDialog() {
  const [date, setDate] = React.useState<Date>();

  const form = useForm({
    resolver: zodResolver(createCuponFormSchema),
    mode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof createCuponFormSchema>) => {
    console.log(values);
  };

  useEffect(() => {
    const getExpDate = () => {
      const year = date?.getFullYear().toString();
      const month = date?.getMonth().toString();
      const day = date?.getDate();

      const expDate = `${year}-${month}-${day}`;

      form.setValue("expiry_date", expDate);
    };

    getExpDate();
  }, [date]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CreateNewButton onClick={() => {}} />
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
              {/*<InputFormField*/}
              {/*  control={form.control}*/}
              {/*  name={"code"}*/}
              {/*  placeholder={"Enter code"}*/}
              {/*  label={"Code"}*/}
              {/*  type="text"*/}
              {/*/>*/}

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
              <SubmitButton text={"Create"} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
