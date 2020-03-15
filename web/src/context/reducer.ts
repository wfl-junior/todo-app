import { ActiveList, Action } from "../types/activeList";

export const activeListReducer: React.Reducer<ActiveList, Action> = (
  state,
  action
) => {
  switch (action.type) {
    case "SET_ACTIVE_LIST":
      return action.payload!;
    default:
      return state;
  }
};
