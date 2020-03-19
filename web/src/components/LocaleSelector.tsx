import React, { useState } from "react";
import { LocaleKey } from "../locale/types";
import { getCurrentLocale, supportedLocales } from "../locale";

interface LocaleSelectorProps {
  forceUpdate: () => void;
}

export const LocaleSelector: React.FC<LocaleSelectorProps> = ({ forceUpdate }) => {
  const [open, setOpen] = useState(false);

  const updateLocale = (targetLocale: LocaleKey) => {
    localStorage.setItem("locale", targetLocale);
    forceUpdate();
  };

  let className = "locale-selector";
  if (open) className += " open";

  const localeKey = getCurrentLocale();

  return (
    <aside
      className={className}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      aria-haspopup="true"
    >
      {open ? (
        <ul>
          {(supportedLocales as LocaleKey[]).map(lk => (
            <li key={lk} onClick={() => updateLocale(lk)}>
              <img
                src={require(`../locale/flags/${lk}.svg`)}
                alt={`${lk} flag`}
                className="flag"
              />{" "}
              <span>{lk}</span>
            </li>
          ))}
        </ul>
      ) : (
        <img
          src={require(`../locale/flags/${localeKey}.svg`)}
          alt={`${localeKey} flag`}
          className="flag"
        />
      )}
    </aside>
  );
};
