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
import { cupons } from "@/utils/dummy/cupon/cuponDummy.ts";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form.tsx";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import { useEffect } from "react";

const updateCuponFormSchema = z.object({
  id: z.number().min(1, { message: "Id is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  discount_pct: z.string().min(1, { message: "Discount Price is required" }),
  expiry_date: z.string().min(1, { message: "Expiry date is required" }),
});

interface Props {
  cuponId: number;
}

export function UpdateCuponFormDialog({ cuponId }: Props) {
  const [date, setDate] = React.useState<Date>();

  const cuponToBeUpdated = cupons.find((cupon) => cupon.id === cuponId);

  const form = useForm<z.infer<typeof updateCuponFormSchema>>({
    resolver: zodResolver(updateCuponFormSchema),
    mode: "onChange",
    defaultValues: {
      id: cuponToBeUpdated?.id ?? cuponId,
      code: cuponToBeUpdated?.code ?? "",
      discount_pct: cuponToBeUpdated?.discount_pct.toString() ?? "",
      expiry_date: cuponToBeUpdated?.expiry_date ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof updateCuponFormSchema>) => {
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
              <Input {...form.register("id")} value={cuponId} type={"hidden"} />
              <InputFormField
                control={form.control}
                name={"code"}
                placeholder={"Enter code"}
                label={"Code"}
                type="text"
              />

              <InputFormField
                control={form.control}
                type={"number"}
                name={"discount_pct"}
                placeholder={"Enter Discount Price"}
                label={"Discount Price"}
              />

              <div className="grid gap-2">
                <Label> Expiry Date: ({cuponToBeUpdated?.expiry_date})</Label>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>
            <DialogFooter>
              <SubmitButton text={"Update"} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
