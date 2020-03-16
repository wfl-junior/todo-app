import React from "react";

interface DangerButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const DangerButton: React.FC<DangerButtonProps> = ({
  onClick,
  children
}) => {
  return (
    <button type="button" className="btn btn-danger" onClick={onClick}>
      {children}
    </button>
  );
};
