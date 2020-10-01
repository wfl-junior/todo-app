import React from "react";
import { LocaleKey } from "../contexts/locale/types";

interface LocaleSelectorImageProps {
  localeKey: LocaleKey;
}

export const LocaleSelectorImage: React.FC<LocaleSelectorImageProps> = ({
  localeKey
}) => (
  <img
    src={require(`../assets/${localeKey}.svg`)}
    alt={`${localeKey} flag`}
    className="flag"
  />
);
