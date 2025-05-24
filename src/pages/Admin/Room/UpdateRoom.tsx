import { useNavigate, useParams } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";

import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { Input } from "@/components/ui/input.tsx";
import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import { dummyRooms, roomTypesToSelect } from "@/utils/dummy/room/roomDummy.ts";

const updateRoomFormSchema = z.object({
  id: z.number().min(1, { message: "Room Id is missing" }),
  roomNo: z.string().min(1, { message: "Room No. is required" }),
  roomType: z.string().min(1, { message: "Room Type is required" }),
  roomStatus: z.string().min(1, { message: "Room Status is required" }),
  guestLimit: z.string().min(1, { message: "Guest Limit is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z
      .array(z.string().min(1))
      .min(1, { message: "At least one image is required" }),
});

const UpdateRoom = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

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
      description: roomToBeUpdated?.details.description,
      images: [
        "https://avatars.githubusercontent.com/u/70505132?v=4",
      ] /*  roomToBeUpdated?.img_url, */,
    },
  });

  const onSubmit = (values: z.infer<typeof updateRoomFormSchema>) => {
    console.log(values);
  };
  const handleClickCancel = () => {
    navigate("/rooms");
  };
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (imageUrls.length >= 4) {
      return toast.error("You can only upload 4 images for a room");
    }

    if (file) {
      const newImageUrl = URL.createObjectURL(file);

      setImageUrls([...imageUrls, newImageUrl]);
    }
  };

  const handleRemoveImage = (url: string) => {
    const newImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(newImageUrls);
  };

  return (
      <div className=" h-[90vh]">
        <h3 className="text-2xl font-semibold">Update Room</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="min-h-[70vh] px-5  rounded-md mt-10 shadow-lg ">
              <div className="grid grid-cols-3 gap-5">
                <InputFormField
                    control={form.control}
                    name={"roomNo"}
                    type="number"
                    placeholder={"Enter Room No"}
                    label={"Room No"}
                />

                <SelectFormField
                    control={form.control}
                    name={"roomType"}
                    label={"Room Type"}
                    options={roomTypesToSelect}
                    placeholder={"Select Room Type"}
                />
                <InputFormField
                    control={form.control}
                    name={"price"}
                    type={"number"}
                    placeholder={"Enter Price"}
                    label={"Price"}
                />
                <InputFormField
                    control={form.control}
                    name={"guestLimit"}
                    type={"number"}
                    label={"Guest Limit"}
                    placeholder={"Select guest limit"}
                />
                <TextAreaFormField
                    control={form.control}
                    name={"description"}
                    placeholder={"Enter Description"}
                    label={"Description"}
                />

                <Input
                    type={"hidden"}
                    {...form.register("images")}
                    value={["https://avatars.githubusercontent.com/u/70505132?v=4"]}
                />

                <div>
                  <label htmlFor="Upload Profile">Images</label>
                  <div className="h-[40px] border-1 rounded-md px-2 py-1 text-center mt-2.5 cursor-pointer">
                    <label htmlFor="uploadImages" className="cursor-pointer">
                      Upload Images
                    </label>
                    <Input
                        type="file"
                        id="uploadImages"
                        className="mt-3 cursor-pointer"
                        hidden
                        placeholder="Upload Images"
                        accept=".png,.jpeg,.svg"
                        onChange={handleImageUpload}
                    />
                  </div>
                </div>

                <div className="col-span-3 grid grid-cols-4  gap-5  ">
                  {imageUrls.length ? (
                      imageUrls.map((url, index) => (
                          <div key={index} className="relative">
                            <CircleX
                                onClick={() => handleRemoveImage(url)}
                                className="cursor-pointer absolute top-1 right-1   hover:text-red-500  transition"
                            />

                            <img
                                src={url}
                                alt={`profile_img${index}`}
                                className="rounded-2xl object-cover h-[70%] w-full"
                            />
                          </div>
                      ))
                  ) : (
                      <></>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-10 justify-center mt-4">
              <CancelButton handleClickCancel={handleClickCancel} />
              <SubmitButton text={"Update"} />
            </div>
          </form>
        </Form>
      </div>
  );
};

export default UpdateRoom;
