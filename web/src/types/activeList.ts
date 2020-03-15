import { ListFieldsFragment } from "../graphql";

export type ActiveList = ListFieldsFragment | null;

export interface Action {
  type: "SET_ACTIVE_LIST";
  payload?: ActiveList;
}
