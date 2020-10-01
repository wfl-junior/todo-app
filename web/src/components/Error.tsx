import React from "react";
import { useLocale } from "../contexts/locale";
import { Toast } from "../utils";

export const Error: React.FC = () => {
  const { currentLocale } = useLocale();

  const msg = currentLocale.errorFetch;

  Toast.fire({
    icon: "error",
    title: msg
  });

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-white">
      <h1>{msg}</h1>
    </div>
  );
};
