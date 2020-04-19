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
    | "SET_LISTS"
    | "SET_ACTIVE_LIST"
    | "ADD_LIST"
    | "DELETE_LIST"
    | "ADD_TASK"
    | "TOGGLE_TASK_COMPLETED"
    | "DELETE_TASK"
    | "CLEAR_COMPLETED_TASKS";
  payload: Payload;
}

export interface Context extends GlobalState {
  setLists: (lists: ListFieldsFragment[]) => void;
  setActiveList: (list: ListFieldsFragment) => void;
  addList: (list: ListFieldsFragment) => void;
  deleteList: (listId: ListFieldsFragment["id"]) => void;
  addTask: (task: TaskFieldsFragment) => void;
  toggleCompleted: (
    listId: ListFieldsFragment["id"],
    taskId: TaskFieldsFragment["id"]
  ) => void;
  deleteTask: (
    listId: ListFieldsFragment["id"],
    taskId: TaskFieldsFragment["id"]
  ) => void;
  clearCompleted: (listId: ListFieldsFragment["id"]) => void;
}
