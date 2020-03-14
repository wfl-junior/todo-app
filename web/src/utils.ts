import Swal from "sweetalert2";

export const capitalize = (str: string) =>
  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : "";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
