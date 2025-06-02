import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner";


const Logout = () => {

  const navigate = useNavigate();

  const noBtn = () => {
    navigate("/dashboard")
    window.location.reload()
  }

  const yesBtn = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("CheckId")
    toast('logout successfully.',{position:"top-center",style:{backgroundColor:"#228B22",color:"white",border:'none',height:'60px',display:'flex',justifyContent:'center',alignItems:'center',fontSize:"16px"}})
    navigate("/auth/login")
   
  }

  return (
    <div className="relative h-[90vh]">
        <div className="absolute w-[440px] top-[35%] left-[35%] shadow-lg rounded-md p-5 h-[180px]">
            <h1 className="text-center text-3xl">Are You Want To Logout?</h1>
            <div className="mt-8 flex justify-center items-center gap-8">
              <Button className="text-red-600 hover:text-red-500 cursor-pointer w-[100px]" variant='outline' onClick={noBtn}>No</Button>
              <Button className="bg-green-600 hover:bg-green-500 w-[100px] cursor-pointer" onClick={yesBtn}>Yes</Button>
            </div>
        </div>
    </div>
  )
}

export default Logout
