import React from "react";
import { LocaleKey } from "../locale/types";

interface LocaleSelectorImageProps {
  localeKey: LocaleKey;
}

export const LocaleSelectorImage: React.FC<LocaleSelectorImageProps> = ({
  localeKey
}) => (
  <img
    src={require(`../locale/flags/${localeKey}.svg`)}
    alt={`${localeKey} flag`}
    className="flag"
  />
);
