import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputFormField from "@/components/shared/FormFields/inputFormField.tsx";
import SelectFormField from "@/components/shared/FormFields/selectFormField.tsx";

import { useNavigate } from "react-router-dom";
import CancelButton from "@/components/shared/CustomButtons/CancelButton/CancelButton.tsx";
import SubmitButton from "@/components/shared/CustomButtons/SubmitButton/SubmitButton.tsx";
import { Input } from "@/components/ui/input.tsx";
import { type ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import { roomTypesToSelect } from "@/utils/dummy/room/roomDummy.ts";
import { Label } from "@/components/ui/label.tsx";

const createRoomFormSchema = z.object({
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

const CreateRoom = () => {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  console.log("image url is", imageUrls);

  const form = useForm<z.infer<typeof createRoomFormSchema>>({
    resolver: zodResolver(createRoomFormSchema),
    mode: "onChange",
    defaultValues: {
      roomNo: "",
      roomType: "",
      roomStatus: "",
      guestLimit: "",
      price: "",
      description: "",
      images: ["https://avatars.githubusercontent.com/u/70505132?v=4"],
    },
  });

  const onSubmit = (values: z.infer<typeof createRoomFormSchema>) => {
    console.log(values);
  };

  const handleClickCancel = () => {
    navigate("/rooms");
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (imageUrls.length >= 4) {
      return toast.error("You can only upload 4 images for a room");
    }

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hotel-image");
      data.append("cloud_name", "dwcdqx2tm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",
        {
          method: "POST",
          body: data,
        },
      );
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json();
      setImageUrls((prev) => [...prev, uploadImageUrl.url]);
    }
  };

  const handleRemoveImage = (url: string) => {
    const newImageUrls = imageUrls.filter((imageUrl) => imageUrl !== url);
    setImageUrls(newImageUrls);
  };

  return (
    <div className=" h-[90vh]">
      <h3 className="text-2xl font-semibold">Create Room</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="min-h-[65vh] px-5  rounded-md mt-10 shadow-lg ">
            <div className="grid grid-cols-3 gap-5">
              <InputFormField
                control={form.control}
                name={"roomNo"}
                placeholder={"Enter Room No"}
                label={"Room No"}
                type="number"
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
                placeholder={"Enter guest limit"}
                label={"Guest Limit"}
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
                <Label htmlFor="Upload Profile "> Images</Label>
                <div className="h-[40px] border-1 rounded-md px-2 py-1 mt-2.5 text-center cursor-pointer">
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
                        className="rounded-2xl object-cover  aspect-video overflow-hidden  w-full"
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
            <SubmitButton text={"Create"} />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateRoom;
