import InputFormField from "@/components/shared/FormFields/inputFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

  const createUserFormSchema = z.object({
    name:z.string().min(1, { message: "Name is required." }),
    email:z.string().min(1,{message:"Email is required."}),
    password:z.string().min(1,{message:"Password is required."}),
    phoneNumber:z.string().min(1,{message:"Phone Number is required"})
  })

const CreateUser = () => {

  const [image,setImage] = useState("")
  const navigate = useNavigate();

  const images = image ? image :"https://avatars.githubusercontent.com/u/70505132?v=4"


  const form = useForm<z.infer<typeof createUserFormSchema>>({
      resolver: zodResolver(createUserFormSchema),
      mode: "all",
      defaultValues: {
        name: "",
        email: "",
        password: "",
        phoneNumber: ""
      },
    });


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUpload = (event:any) =>{
    const files = event.target.files[0]
    if(files){
      const url = URL.createObjectURL(files)
      setImage(url)
    }
  }
 
  const cancelClick = () => {
    navigate("/users")
  }

  const onSubmit = (values:z.infer<typeof createUserFormSchema>) => {
    console.log(values)
  }

  return (
    <div className="relative h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-semibold">Create User</h3>
       <div className="h-[65vh] px-5 rounded-md mt-10 shadow-lg ">
          <Form  {...form}>
            <form className=" grid grid-cols-3 gap-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <InputFormField
                  control={form.control}
                  name={"name"}
                  placeholder={"Enter Name"}
                  label={"Name"}
                  type={"text"}
                />
              </div>
              <div>
                <InputFormField
                  control={form.control}
                  name={"email"}
                  placeholder={"Enter Email"}
                  label={"Email"}
                  type={"text"}
                />
              </div>
              <div>
                <InputFormField
                  control={form.control}
                  name={"phoneNumber"}
                  placeholder={"Enter Phone Number"}
                  label={"Phone Number"}
                  type={"text"}
                />
              </div>
              <div>
                <InputFormField
                  control={form.control}
                  name={"password"}
                  placeholder={"Enter Password"}
                  label={"Password"}
                  type={"text"}
                />
              </div>
              <div>
                <label htmlFor="Upload Profile" className="text-sm font-[500]">Upload Profile</label>
                <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
                  <label htmlFor="upload" className="cursor-pointer">Profile Upload</label>
                  <Input type="file" id="upload" className="mt-3 cursor-pointer" hidden placeholder="upload Profile" accept=".png,.jpeg,.svg" onChange={imageUpload}/>
                </div>
              </div>
              <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
                <img src={images} alt="profile_img" className="w-full h-full rounded-md"/>
              </div>
              <div className="absolute bottom-0 right-[40%] flex gap-10">
                <Button variant='outline' className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white" onClick={cancelClick}>Cancel</Button>
                <Button type="submit" className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500">Create</Button>
              </div>
            </form>
          </Form>
      </div>
    </div>
  )
}

export default CreateUser
