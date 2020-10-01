import React, { createContext, useContext, useState, useEffect } from "react";
import { supportedLocales, locale } from "./locale";
import { LocaleKey, LocaleMap } from "./types";

interface Context {
  localeKey: LocaleKey;
  setLocaleKey: React.Dispatch<React.SetStateAction<LocaleKey>>;
  currentLocale: LocaleMap;
}

export const LocaleContext = createContext<Context>({} as Context);

export const useLocale = () => useContext(LocaleContext);

export const LocaleProvider: React.FC = ({ children }) => {
  const localStorageKey = "locale";

  const [localeKey, setLocaleKey] = useState<LocaleKey>(() => {
    const defaultLocaleKey: LocaleKey = "en-us";
    const localStorageValue = localStorage.getItem(localStorageKey);

    if (!localStorageValue) {
      return defaultLocaleKey;
    }

    const parsedValue = JSON.parse(localStorageValue);

    if (!supportedLocales.includes(parsedValue)) {
      return defaultLocaleKey;
    }

    return parsedValue;
  });

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(localeKey));
  }, [localeKey]);

  return (
    <LocaleContext.Provider
      value={{
        localeKey,
        setLocaleKey,
        currentLocale: locale[localeKey]
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};
