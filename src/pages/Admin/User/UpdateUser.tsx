import InputFormField from "@/components/shared/FormFields/inputFormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/useUser";
import { errorToastStyle, successToastStyle } from "@/utils/dummy/Toast/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().min(1, { message: "Email is required." }),
  phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
  role: z.string(),
  coupon: z.number(),
  points: z.number(),
});

const UpdateUser = () => {
  const { id } = useParams();

  const { updateMutation, getIdquery } = useMutate({ id });
  const [loading, setLoading] = useState(false);

  const { data } = getIdquery;

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    mode: "all",
  });

  const { control, reset, handleSubmit } = form;

  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        email: data?.email,
        phoneNumber: data?.phoneNumber.includes('+95') ? data?.phoneNumber.slice(3,14):data?.phoneNumber,
        role: data?.role,
        coupon: data?.coupon || 0,
        points: data?.points,
      });
      setImage(data?.imageUrl);
    }
  }, [data, reset]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUpload = async (event: any) => {
    const files = event.target.files[0];
    if (files) {
      setLoading(true);
      const data = new FormData();
      data.append("file", files);
      data.append("upload_preset", "hotel-image");
      data.append("cloud_name", "dwcdqx2tm");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json();
      setLoading(false);
      setImage(uploadImageUrl.url);
    }
  };

  const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
    const finalImage = image || data?.imageUrl;
    const dataToSubmit = {
      ...values,
      imageUrl: finalImage,
      phoneNumber: `+95${values.phoneNumber}`,
    };
    try {
      const res = await updateMutation.mutateAsync(dataToSubmit);
      reset();
      setImage('');
      toast(`${res.message}`,successToastStyle);
      navigate("/users");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast(`${err?.response?.data?.message}`,errorToastStyle);
    }
  };

  const cancelClick = () => {
    navigate("/users");
  };

  return (
    <div className="relative h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-semibold">Update User</h3>
      <div className="h-[65vh] px-5 rounded-md mt-10 shadow-lg ">
        <Form {...form}>
          <form
            className="grid grid-cols-3 gap-5 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <InputFormField
                control={control}
                name={"name"}
                placeholder={"Enter Name"}
                label={"Name"}
                type={"text"}
              />
            </div>
            <div>
              <InputFormField
                control={control}
                name={"email"}
                placeholder={"Enter Email"}
                label={"Email"}
                type={"text"}
              />
            </div>
            <div>
              <InputFormField
                control={control}
                name={"phoneNumber"}
                placeholder={"09*********"}
                label={"Phone Number"}
                maxLength={11}
                pattern={"[0-9]*"}
                type={"text"}
                inputMode={"numeric"}
              />
            </div>
            <div>
              <InputFormField
                control={control}
                name={"points"}
                placeholder={"Enter Points"}
                label={"Points"}
                type={"number"}
                disabled={true}
              />
            </div>
            <div>
              <InputFormField
                control={control}
                name={"coupon"}
                placeholder={"Enter Coupon"}
                label={"Coupon"}
                type={"number"}
                disabled={true}
              />
            </div>
            <div>
              <InputFormField
                control={control}
                name={"role"}
                placeholder={"Enter Role"}
                label={"Role"}
                type={"text"}
                disabled={true}
              />
            </div>
            <div className="mt-5.5">
              {loading ? (
                <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
                  <label htmlFor="upload" className="cursor-pointer">
                    Uploading
                  </label>
                </div>
              ) : (
                <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
                  <label htmlFor="upload" className="cursor-pointer">
                    Profile Upload
                  </label>
                  <Input
                    type="file"
                    id="upload"
                    className="mt-3 cursor-pointer"
                    hidden
                    placeholder="upload Profile"
                    accept="image/*"
                    onChange={imageUpload}
                  />
                </div>
              )}
            </div>
            <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
              {loading ?(
                <div className="rounded-2xl aspect-video w-full animate-pulse bg-muted flex items-center justify-center col-span-1 h-[100%]">
                <span className="text-sm text-muted-foreground">Uploading image...</span>
              </div>
              ): (
                <img
                  src={image}
                  alt="profile_img"
                  className="w-full h-full rounded-md"
                />
              )}
            </div>
            <div className="absolute bottom-0 right-[40%] flex gap-10">
              <Button
                variant="outline"
                className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white"
                onClick={cancelClick}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500"
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateUser;
