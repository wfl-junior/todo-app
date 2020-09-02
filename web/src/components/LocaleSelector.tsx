import React, { useState } from "react";
import { getCurrentLocale, supportedLocales, localStorageLocaleKey } from "../locale";
import { LocaleSelectorImage } from "./LocaleSelectorImage";

interface LocaleSelectorProps {
  forceUpdate: React.Component["forceUpdate"];
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({ forceUpdate }) => {
  const [open, setOpen] = useState(false);

  const asideClasses = ["locale-selector"];
  if (open) asideClasses.push("open");

  return (
    <aside
      className={asideClasses.join(" ")}
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
                localStorage.setItem(localStorageLocaleKey, lk);
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
