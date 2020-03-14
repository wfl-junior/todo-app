import React from "react";
import { Toast } from "../utils";

interface ErrorProps {
  msg: string;
}

export const Error: React.FC<ErrorProps> = ({ msg }) => {
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
