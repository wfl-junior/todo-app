import { ListFieldsFragment, TaskFieldsFragment } from "../graphql";

export interface GlobalState {
  lists: ListFieldsFragment[];
  activeList: ListFieldsFragment | null;
}

interface Payload extends Partial<GlobalState> {
  listId?: ListFieldsFragment["id"];
  list?: ListFieldsFragment;
  task?: TaskFieldsFragment;
  taskId?: TaskFieldsFragment["id"];
}

export interface Action {
  type:
    | "SET_TODOS"
    | "SET_ACTIVE_LIST"
    | "ADD_LIST"
    | "DELETE_LIST"
    | "ADD_TASK"
    | "TOGGLE_TASK_COMPLETED"
    | "DELETE_TASK"
    | "CLEAR_COMPLETED_TASKS";
  payload: Payload;
}
