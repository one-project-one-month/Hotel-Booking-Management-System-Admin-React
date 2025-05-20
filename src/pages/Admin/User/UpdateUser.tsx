import InputFormField from "@/components/shared/FormFields/inputFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { users } from "@/utils/dummy"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {useNavigate, useParams} from 'react-router-dom'
import { z } from "zod"


  const updateUserSchema = z.object({
    name:z.string().min(1, { message: "Name is required." }),
    email:z.string().min(1,{message:"Email is required."}),
    password:z.string().min(1,{message:"Password is required."}),
    phoneNumber:z.string().min(1,{message:"Phone Number is required"}),
    role:z.string(),
    coupon:z.number(),
    points:z.number()
  })

const UpdateUser = () => {

  const {id} = useParams();

  const userUpate = users.find((user: { id: number }) => user.id === Number(id));

  const form = useForm<z.infer<typeof updateUserSchema>>({
        resolver: zodResolver(updateUserSchema),
        mode: "all",
        defaultValues: {
          name: userUpate?.name,
          email:userUpate?.email,
          password: userUpate?.password,
          phoneNumber: userUpate?.phoneNumber && "0"+ userUpate?.phoneNumber,
          role:userUpate?.role,
          coupon:userUpate?.coupon,
          points:userUpate?.points
        },
      });
  

    const [image,setImage] = useState("")
    const navigate = useNavigate()
  
    const images = userUpate?.profile ?userUpate?.profile :"https://avatars.githubusercontent.com/u/70505132?v=4"
  
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageUpload = (event:any) =>{
      const files = event.target.files[0]
      if(files){
        const url = URL.createObjectURL(files)
        setImage(url)
      }
    }

      const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
        console.log(values);
        console.log(image)
      };

    const cancelClick = () => {
      navigate("/users")
    }

  return (
    <div className="relative h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-semibold">Update User</h3>
      <div className="h-[65vh] px-5 rounded-md mt-10 shadow-lg ">
        <Form {...form}>
          <form className="grid grid-cols-3 gap-5 " onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <InputFormField
                control={form.control}
                name={"name"}
                placeholder={"Enter Name"}
                label={"Name"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"email"}
                placeholder={"Enter Email"}
                label={"Email"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"phoneNumber"}
                placeholder={"Enter Phone Number"}
                label={"Phone Number"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"password"}
                placeholder={"Enter Password"}
                label={"Password"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"points"}
                placeholder={"Enter Points"}
                label={"Points"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"coupon"}
                placeholder={"Enter Coupon"}
                label={"coupon"}
              />
            </div>
            <div>
              <InputFormField
                control={form.control}
                name={"role"}
                placeholder={"Enter Role"}
                label={"Role"}
              />
            </div>
            <div>
              <label htmlFor="Upload Profile" className="text-sm font-[500]">Upload Profile</label>
              <div className="h-[35px] border-2 rounded-md px-2  text-center cursor-pointer">
                <label htmlFor="upload" className="cursor-pointer">Profile Upload</label>
                <Input type="file" id="upload" className="mt-3 cursor-pointer" hidden placeholder="upload Profile" accept=".png,.jpeg,.svg" onChange={imageUpload}/>
              </div>
            </div>
            <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
              <img src={images} alt="profile_img" className="w-full h-full rounded-md"/>
            </div>
            <div className="absolute bottom-0 right-[40%] flex gap-10">
              <Button variant='outline' className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white" onClick={cancelClick}>Cancel</Button>
              <Button type="submit" className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500">Update</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default UpdateUser
