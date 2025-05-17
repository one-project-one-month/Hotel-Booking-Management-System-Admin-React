import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button.tsx";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";
import {
  dummyRooms,
  guestLimitsToSelect,
  imageUrlsToSelect,
  roomStatusToSelect,
  roomTypesToSelect,
} from "@/utils/dummy.ts";
import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";

const updateRoomFormSchema = z.object({
  id: z.number().min(1, { message: "Room Id is missing" }),
  roomNo: z.string().min(1, { message: "Room No. is required" }),
  roomType: z.string().min(1, { message: "Room Type is required" }),
  roomStatus: z.string().min(1, { message: "Room Status is required" }),
  guestLimit: z.string().min(1, { message: "Guest Limit is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().min(1, { message: "Image is required" }),
});

const UpdateRoom = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const roomToBeUpdated = dummyRooms.find((room) => room.id === Number(id));

  const form = useForm<z.infer<typeof updateRoomFormSchema>>({
    resolver: zodResolver(updateRoomFormSchema),
    mode: "all",
    defaultValues: {
      id: roomToBeUpdated?.id,
      roomNo: roomToBeUpdated?.room_no,
      roomType: roomToBeUpdated?.type,
      roomStatus: roomToBeUpdated?.status,
      guestLimit: roomToBeUpdated?.guest_limit.toString(),
      price: roomToBeUpdated?.price.toString(),
      description: roomToBeUpdated?.description,
      image: roomToBeUpdated?.img_url,
    },
  });

  const onSubmit = (values: z.infer<typeof updateRoomFormSchema>) => {
    console.log(values);
  };
  const handleClickCancel = () => {
    navigate("/rooms");
  };

  return (
    <div className="p-15">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputFormField
            control={form.control}
            name={"roomNo"}
            placeholder={"Enter Room No"}
            label={"Room No"}
          />
          <InputFormField
            control={form.control}
            name={"price"}
            placeholder={"Enter Price"}
            label={"Price"}
          />
          <InputFormField
            control={form.control}
            name={"description"}
            placeholder={"Enter Description"}
            label={"Description"}
          />
          <SelectFormField
            control={form.control}
            name={"roomType"}
            label={"Room Type"}
            options={roomTypesToSelect}
            placeholder={"Select Room Type"}
          />
          <SelectFormField
            control={form.control}
            name={"roomStatus"}
            label={"Room Status"}
            options={roomStatusToSelect}
            placeholder={"Select Room Status"}
          />
          <SelectFormField
            control={form.control}
            name={"guestLimit"}
            label={"Guest Limit"}
            options={guestLimitsToSelect}
            placeholder={"Select guest limit"}
          />
          <SelectFormField
            control={form.control}
            name={"image"}
            label={"Image URL"}
            options={imageUrlsToSelect}
            placeholder={"Select Image URL"}
          />
          <div className="flex gap-2">
            <CancelButton handleClickCancel={handleClickCancel} />
            <Button type="submit" className="cursor-pointer">
              Update
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UpdateRoom;
