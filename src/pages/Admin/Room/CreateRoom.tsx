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
import { type ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleX } from "lucide-react";
import TextAreaFormField from "@/components/shared/FormFields/textareaFormField.tsx";
import { roomTypesToSelect } from "@/utils/dummy/room/roomDummy.ts";
import { Label } from "@/components/ui/label.tsx";
import type { Room, RoomTypes } from "@/utils/types/roomTypes/roomTypes.ts";
import { useRoom } from "@/hooks/useRooms.ts";

const createRoomFormSchema = z.object({
  roomNo: z.string().min(1, { message: "Room No. is required" }),
  roomType: z.string().min(1, { message: "Room Type is required" }),
  guestLimit: z.string().min(1, { message: "Guest Limit is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z
    .array(z.string().min(1))
    .min(1, { message: "At least one image is required" }),
});

export default function CreateRoom() {
  const navigate = useNavigate();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const form = useForm<z.infer<typeof createRoomFormSchema>>({
    resolver: zodResolver(createRoomFormSchema),
    mode: "onChange",
    defaultValues: {
      roomNo: "",
      roomType: "",
      guestLimit: "",
      price: "",
      description: "",
      images: [],
    },
  });

  const { createRoomMutation } = useRoom();

  const onSubmit = async (formData: z.infer<typeof createRoomFormSchema>) => {
    console.log("values are::::", formData);

    const newRoom: Partial<Room> = {
      roomNo: Number(formData.roomNo),
      type: formData.roomType as RoomTypes,
      price: Number(formData.price),
      status: "Available",
      isFeatured: false,
      details: {
        bedSize: "King",
        title: "Deluxe King Room with Scenic Farm Views",
        description: formData.description,
        amenities: [
          "King-sized bed",
          "2-layer windproof curtains",
          "Overlooking rice fields and farm plots",
          "Private outdoor dining table",
          "Shared bathroom and shower",
          "Towels and toiletries provided",
          "Access to swings and hiking trail",
          "Cook your own veggies with provided tools",
          "Optional home-cooked meals",
        ],
      },
      imgUrl: formData.images,
      guestLimit: Number(formData.guestLimit),
    };

    try {
      const res = await createRoomMutation.mutateAsync(newRoom);

      if (res) {
        form.reset({});
        setImageUrls([]);
        toast("Room is created successfully", {
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
        navigate("/rooms");
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

  const handleClickCancel = () => {
    navigate("/rooms");
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (imageUrls.length >= 4) {
      return toast.error("You can only upload 4 images for a room");
    }

    const file = e.target.files && e.target.files[0];
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

  useEffect(() => {
    form.setValue("images", imageUrls, { shouldValidate: true });
  }, [imageUrls]);

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

              {/*<Input*/}
              {/*  type={"hidden"}*/}
              {/*  {...form.register("images")}*/}
              {/*  value={imageUrls}*/}
              {/*/>*/}

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
}
