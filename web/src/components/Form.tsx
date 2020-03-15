import React from "react";

interface FormProps {
  disabled?: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder: string;
  value: string;
  id: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Form: React.FC<FormProps> = ({
  onSubmit,
  disabled = false,
  ...props
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <div className="form-inline">
          <input
            type="text"
            className="form-control"
            aria-label="Add Task"
            style={{ flexGrow: 1, marginRight: 16 }}
            autoComplete="off"
            {...props}
            disabled={disabled}
          />
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            Enviar
          </button>
        </div>
      </div>
    </form>
  );
};
