import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading: React.FC = () => (
  <div className="d-flex align-items-center justify-content-center vh-100">
    <FontAwesomeIcon className="text-white" icon="spinner" pulse size="5x" />
  </div>
);
