import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from "lucide-react"
import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Login = () => {

  const navigate = useNavigate();

  const [active,setActive] = useState(false)

  const passwordHandle = () =>{
    setActive(!active)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = (e:any) => {
    e.preventDefault();
    toast("Login Successfully",{position:"top-center",style:{backgroundColor:"#228B22",color:"white",border:'none',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:"16px"}})
    navigate("/dashboard")
  }

  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] h-[95vh] relative">
        <div className="absolute top-[10%] left-[15%] flex flex-col justify-center items-center">
            <h3 className="text-4xl font-bold">Hotel Management System</h3>
            <h3 className="text-3xl mt-6">Login Your Account</h3>
        </div>
        <div className="w-[480px] h-[450px] absolute top-[40%] left-[15%]">
          <div>
            <label htmlFor="Email">Email</label>
            <Input placeholder="Enter Email" type="text" className="py-6  mt-2"/>
          </div>
          <div className="mt-4 relative">
            <label htmlFor="Password">Password</label>
            <Input placeholder="Enter Password" className="py-6  mt-2" type={active?"text":"password"}/>
            <Button className="cursor-pointer absolute top-[50%] right-[5%]" variant='outline' size='icon' onClick={passwordHandle}>
              {
                !active ? <EyeClosed />:<Eye />
              }
            </Button>
          </div>
          <div className="flex mt-4 gap-3 items-center">
            <input type="checkbox" className="cursor-pointer w-[20px] h-[20px]"/>
            <p>Remember Me</p>
          </div>
          <div className="mt-6">
            <Button onClick={login} className="w-[100%] bg-blue-600 py-5.5 hover:bg-blue-500 uppercase space-x-1 cursor-pointer">Login</Button>
          </div>
        </div>
      </div>
      <div className="border-l-2 w-[50%] h-[100vh] relative">
          <div className="absolute w-[100%] top-[10%] px-10">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <img src="/images/loginImage1.png" alt="image1" />
                </div>
                <div className="grid grid-rows-2 gap-6">
                    <div>
                        <img src="/images/loginImage2.png" alt="image2" />
                    </div>
                    <div>
                        <img src="/images/loginImage3.png" alt="image3" />
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="col-span-2">
                  <img src="/images/loginImage4.png" alt="image4"/>
                </div>
                <div>
                  <img src="/images/loginImage5.png" alt="image5"/>
                </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Login
