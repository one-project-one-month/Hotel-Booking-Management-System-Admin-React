import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Axios from "@/config/ApiConfig";
import { Eye, EyeClosed } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [users, setUsers] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const passwordHandle = () => {
    setActive(!active);
    setEmailError(false);
    setPasswordError(false);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value !== "") {
      setEmailError(false);
      setUsers((prev) => ({ ...prev, email: value }));
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const values = event.target.value;
    if (values !== "") {
      setPasswordError(false);
      setUsers((prev) => ({ ...prev, password: values }));
    } else {
      setPasswordError(true);
    }
  };

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (users.email === "") {
      setEmailError(true);
    }
    if (users.password === "") {
      setPasswordError(true);
    }

    if (users.email !== "" && users.password !== "") {
      await Axios.post("auth/signin", users)
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.data.token);
            toast("Login Successfully", {
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
            navigate("/dashboard");
          }
        })
        .catch((error) => {
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
        });
    }
  };

  return (
    <div className="flex w-[100%]">
      <div className="w-[50%] h-[95vh] relative">
        <div className="absolute top-[10%] left-[15%] flex flex-col justify-center items-center">
          <h3 className="text-4xl font-bold">Hotel Management System</h3>
          <h3 className="text-3xl mt-6">Login Your Account</h3>
        </div>
        <form
          className="w-[480px] h-[450px] absolute top-[40%] left-[15%]"
          onSubmit={login}
        >
          <div>
            <label htmlFor="Email">Email</label>
            <Input
              placeholder="Enter Email"
              type="text"
              className="py-6  mt-2"
              name="email"
              onChange={handleEmailChange}
              autoComplete="off"
              autoFocus={true}
            />
            {emailError && <p className="text-red-600">*Email is required.</p>}
          </div>
          <div className="mt-4 relative">
            <label htmlFor="Password">Password</label>
            <Input
              placeholder="Enter Password"
              className="py-6  mt-2"
              type={active ? "text" : "password"}
              name="password"
              onChange={handlePasswordChange}
              autoComplete="off"
            />
            <div
              className="cursor-pointer absolute top-[45px] right-[5%]"
              onClick={passwordHandle}
            >
              {!active ? <EyeClosed /> : <Eye />}
            </div>
            {passwordError && (
              <p className="text-red-600">*Password is required.</p>
            )}
          </div>
          <div className="mt-6">
            <Button
              type="submit"
              className="w-[100%] bg-blue-600 py-5.5 hover:bg-blue-500 uppercase space-x-1 cursor-pointer"
            >
              Login
            </Button>
          </div>
        </form>
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
              <img src="/images/loginImage4.png" alt="image4" />
            </div>
            <div>
              <img src="/images/loginImage5.png" alt="image5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
