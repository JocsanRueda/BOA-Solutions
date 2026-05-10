import Lottie from "lottie-react";
import loaderLottie from "@/assets/lotties/loader.json";

export default function Loader({ fullScreen = true }: { fullScreen?: boolean }) {

  return (
    <div className={`flex w-full items-center justify-center p-8 ${fullScreen ? "h-screen" : "h-full"}`}>
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-32 flex items-center justify-center">
          <Lottie
            animationData={loaderLottie}
            loop={true}
            className="w-full h-full opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
