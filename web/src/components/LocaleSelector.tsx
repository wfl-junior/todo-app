import React, { useState } from "react";
import { getCurrentLocale, supportedLocales } from "../locale";
import { LocaleSelectorImage } from "./LocaleSelectorImage";

interface LocaleSelectorProps {
  forceUpdate: () => void;
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({ forceUpdate }) => {
  const [open, setOpen] = useState(false);

  let className = "locale-selector";
  if (open) className += " open";

  return (
    <aside
      className={className}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="true"
    >
      {open ? (
        <ul>
          {supportedLocales.map(lk => (
            <li
              key={lk}
              onClick={() => {
                localStorage.setItem("locale", lk);
                forceUpdate();
              }}
            >
              <LocaleSelectorImage localeKey={lk} /> <span>{lk}</span>
            </li>
          ))}
        </ul>
      ) : (
        <LocaleSelectorImage localeKey={getCurrentLocale()} />
      )}
    </aside>
  );
};
