import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default function useToast(msg, type) {
  createToast(msg, { type: type, showIcon: true, transition: "slide", hideProgressBar: true, position: "bottom-right" });

  return {
    createToast,
  };
}
