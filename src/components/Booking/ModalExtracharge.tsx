import {
  DialogFooter,
} from "@/components/ui/dialog.tsx";
// import useCheckOut from "@/hooks/useCheckOut";
// import { useCheckInMutate } from "@/hooks/useCheckIn";
// import { toast } from "sonner";
// import { errorToastStyle, successToastStyle } from "@/utils/dummy/Toast/toast";
import SubmitButton from "../shared/CustomButtons/SubmitButton/SubmitButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import InputFormField from "../shared/FormFields/inputFormField";
import { useCheckInMutate } from "@/hooks/useCheckIn";
import { toast } from "sonner";
import { errorToastStyle, successToastStyle } from "@/utils/dummy/Toast/toast";

const extraChargeSchema = z.object({
  charge: z.string().min(1, { message: "ExtraCharge is required." }),
});

interface Props {
  updateId:string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setOpen:any
}

const ModalExtracharge = ({updateId,setOpen}:Props) => {
  // const { dataListId } = useCheckOut();
  // const { updateMutation } = useCheckInMutate({ id: dataListId as string });

  const form = useForm<z.infer<typeof extraChargeSchema>>({
    resolver: zodResolver(extraChargeSchema),
    mode: "all",
    defaultValues: {
      charge: "",
    },
  });

  const {updateMutation} = useCheckInMutate({id:updateId as string})

  const { handleSubmit, control } = form;

  const onsubmit = async (values: z.infer<typeof extraChargeSchema>) => {
    
    const data = {
      id:updateId,
      extraCharge:Number(values.charge)
    };

    console.log(data)
   
    try {
        const res = await updateMutation.mutateAsync({ data });

        if (res.message === "Update Check-in/out Success!") {;
          setOpen(false)
        toast(`${res.message}`,successToastStyle);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        toast(`${error?.response?.data?.message}`, errorToastStyle);
    }
  };


  return (
    // <Dialog open={open} onOpenChange={setOpen}>
    //   <DialogTrigger asChild>
    //      {/* <div className="bg-white shadow-md rounded-lg p-2 w-[80px] cursor-pointer text-center">
    //         <p>Pay</p>
    //      </div> */}
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[440px]">
    //     <DialogHeader>
    //       <DialogTitle className="text-center text-2xl pb-4">Update Booking</DialogTitle>
    //     </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div>
              <InputFormField
                placeholder={"Enter Extra Charges"}
                control={control}
                type={"number"}
                label={"Extra Charges"}
                name={"charge"}
              />
            </div>
            <DialogFooter className="mt-10">
              <SubmitButton
                text={"Update"}
                pendingText={"Updating"}
                // isPending={updateMutation.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
    //   </DialogContent>
    // </Dialog>
  );
};

export default ModalExtracharge;
