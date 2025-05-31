import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/loading_animation.json";

export default function CustomLoading() {
  return (
    <div className="w-[100%] h-[calc(100vh-40px)] flex justify-center items-center">
      <div className="flex flex-col items-center space-y-4">
        <div className={"rounded-full w-20 h-20 overflow-hidden "}>
          <Lottie
            animationData={loadingAnimation}
            loop={true}
            className="w-full h-full "
          />
        </div>
        <p className="text-md font-semibold animate-pulse">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
}
