import CustomToast from "@/components/custom-toast";
import { Slide, type ToastOptions, toast } from "react-toastify";

export type IToast = { message: string; description?: string };

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  closeButton: false,
  transition: Slide,
  theme: "dark",
  className: "animate__animated animate__fadeIn  p-0 z-50 bg-zinc-700",
};

const useToastHook = () => {
  const showToast = (
    type: "success" | "error" | "info" | "warning",
    { message, description }: IToast
  ) => {
    toast(
      ({ closeToast }) => (
        <CustomToast
          message={message}
          description={description}
          type={type}
          onClose={closeToast}
        />
      ),
      toastConfig
    );
  };

  return {
    info: (props: IToast) => showToast("info", props),
    warn: (props: IToast) => showToast("warning", props),
    success: (props: IToast) => showToast("success", props),
    error: (props: IToast) => showToast("error", props),
  };
};

export default useToastHook;
