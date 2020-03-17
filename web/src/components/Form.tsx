import React, { useState } from "react";
import { capitalize } from "../utils";
import { locale, getCurrentLocale } from "../locale";

interface FormProps {
  onSubmit: (value: string) => Promise<void>;
  placeholder: string;
  id: string;
  "aria-label"?: string;
}

export const Form: React.FC<FormProps> = ({ onSubmit, ...props }) => {
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const currentLocale = locale[getCurrentLocale()];

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        setSubmitting(true);
        await onSubmit(value);
        setSubmitting(false);
        setValue("");
      }}
    >
      <div className="form-group">
        <div className="form-inline">
          <input
            type="text"
            className="form-control"
            style={{ flexGrow: 1, marginRight: 16 }}
            autoComplete="off"
            value={value}
            onChange={e => setValue(capitalize(e.target.value))}
            disabled={submitting}
            {...props}
          />
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? (
              <>
                {currentLocale.formButtonSubmitting}{" "}
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </>
            ) : (
              currentLocale.formButton
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
