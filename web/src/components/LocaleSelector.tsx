import React, { useState } from "react";
import { useLocale } from "../contexts/locale";
import { supportedLocales } from "../contexts/locale/locale";
import { LocaleSelectorImage } from "./LocaleSelectorImage";

export const LocaleSelector: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { localeKey, setLocaleKey } = useLocale();

  return (
    <aside
      className={`locale-selector ${open ? "open" : ""}`}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="true"
    >
      {open ? (
        <ul>
          {supportedLocales.map(lk => (
            <li key={lk} onClick={() => setLocaleKey(lk)}>
              <LocaleSelectorImage localeKey={lk} /> <span>{lk}</span>
            </li>
          ))}
        </ul>
      ) : (
        <LocaleSelectorImage localeKey={localeKey} />
      )}
    </aside>
  );
};
