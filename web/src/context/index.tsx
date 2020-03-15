import React, { useReducer, createContext } from "react";
import { activeListReducer } from "./reducer";
import { ActiveList } from "../types/activeList";
import { ListFieldsFragment } from "../graphql";

interface Context {
  activeList: ActiveList;
  setActiveList: (list: ListFieldsFragment) => void;
}

export const ActiveListContext = createContext<Context>({} as Context);

export const ActiveListProvider: React.FC = ({ children }) => {
  const [activeList, dispatch] = useReducer(activeListReducer, null);

  const setActiveList = (list: ListFieldsFragment) => {
    dispatch({
      type: "SET_ACTIVE_LIST",
      payload: list
    });
  };

  return (
    <ActiveListContext.Provider value={{ activeList, setActiveList }}>
      {children}
    </ActiveListContext.Provider>
  );
};
