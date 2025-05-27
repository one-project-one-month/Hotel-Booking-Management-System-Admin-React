import InputFormField from "@/components/shared/FormFields/inputFormField"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useUser } from "@/hooks/useUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

  const createUserFormSchema = z.object({
    name:z.string().min(1, { message: "Name is required." }),
    email:z.string().min(1,{message:"Email is required."}),
    password:z.string().min(1,{message:"Password is required."}),
    phoneNumber:z.string().min(1,{message:"Phone Number is required" })
  })

const CreateUser = () => {

  const [image,setImage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const images = image ? image :""


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

    const {control,reset,handleSubmit} = form


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageUpload = async(event:any) =>{
    const files = event.target.files[0]
    if(files){
      setLoading(true)
      const data = new FormData()
      data.append("file",files)
      data.append("upload_preset","hotel-image")
      data.append("cloud_name","dwcdqx2tm")
      const res = await fetch("https://api.cloudinary.com/v1_1/dwcdqx2tm/image/upload",{
        method:"POST",
        body:data
      })
      if (!res.ok) {
        throw new Error("Upload failed");
      }
      const uploadImageUrl = await res.json()
      setLoading(false)
      setImage(uploadImageUrl.url)
    }
  }

  const {mutation} = useUser()
 
  const cancelClick = () => {
    reset({
        name: "",
        email: "",
        password: "",
        phoneNumber: ""
    })
    setImage(null)
    navigate("/users")
  }

  const onSubmit =async(values:z.infer<typeof createUserFormSchema>) => {
    const finalImage = image || ""
    const data = {...values,imgUrl:finalImage}
    try {
      const res = await mutation.mutateAsync(data)
      if(res.status === 201){
        reset({
          name: "",
          email: "",
          password: "",
          phoneNumber: ""
        })
        setImage(null)
        alert("User Create Successfully")
        navigate("/users")
      }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      alert(error?.response?.data.message)
      reset({
          name: "",
          email: "",
          password: "",
          phoneNumber: ""
        })
    }
   
  }


  return (
    <div className="relative h-[calc(100vh-100px)]">
      <h3 className="text-2xl font-semibold">Create User</h3>
       <div className="h-[65vh] px-5 rounded-md mt-10 shadow-lg ">
            <Form {...form}>
              <form className=" grid grid-cols-3 gap-5" onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder={"Enter Phone Number"}
                  label={"Phone Number"}
                  type={"number"}
                />
              </div>
              <div>
                <InputFormField
                  control={control}
                  name={"password"}
                  placeholder={"Enter Password"}
                  label={"Password"}
                  type={"text"}
                />
              </div>
              <div>
                <label htmlFor="Upload Profile" className="text-sm font-[500]">Upload Profile</label>
                {
                  loading ? (
                     <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
                        <label htmlFor="upload" className="cursor-pointer">Uploading</label>
                      </div>
                  ) : (
                      <div className="h-[35px] border-1 rounded-md px-2 py-1 text-center cursor-pointer">
                        <label htmlFor="upload" className="cursor-pointer">Profile Upload</label>
                        <Input type="file" id="upload" className="mt-3 cursor-pointer" hidden placeholder="upload Profile" accept="image/*" onChange={imageUpload}/>
                      </div>
                  )
                }
              </div>
              <div className="w-[180px] h-[180px] shadow-lg rounded-md mx-auto mt-4">
                {
                  images && (
                    <img src={images} className="w-full h-full rounded-md"/>
                  )
                }
              </div>
              <div className="absolute bottom-0 right-[40%] flex gap-10">
                <Button variant='outline' className="bg-red-600 text-white w-[150px] py-5 cursor-pointer hover:bg-red-500 hover:text-white" onClick={cancelClick} disabled={mutation.isPending && mutation.isError}>Cancel</Button>
                <Button type="submit" className="bg-green-600 w-[150px] py-5 cursor-pointer hover:bg-green-500" disabled={mutation.isPending && mutation.isError}>Create</Button>
              </div>
              </form>
            </Form>
      </div>
    </div>
  )
}

export default CreateUser
