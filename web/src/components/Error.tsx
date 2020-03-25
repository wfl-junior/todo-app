import React from "react";
import { locale, getCurrentLocale } from "../locale";
import { Toast } from "../utils";

export const Error: React.FC = () => {
  const msg = locale[getCurrentLocale()].errorFetch;

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
