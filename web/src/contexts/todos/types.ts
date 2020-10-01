import { ListFieldsFragment, TaskFieldsFragment } from "../../graphql";

export interface GlobalState {
  lists: ListFieldsFragment[];
  activeList: ListFieldsFragment | null;
}

interface IAction<T extends string, P extends object> {
  type: T;
  payload: P;
}

export type Action =
  | IAction<"SET_LISTS", { lists: ListFieldsFragment[] }>
  | IAction<"SET_ACTIVE_LIST" | "ADD_LIST", { list: ListFieldsFragment }>
  | IAction<"DELETE_LIST" | "CLEAR_COMPLETED_TASKS", { listId: ListFieldsFragment["id"] }>
  | IAction<"ADD_TASK", { task: TaskFieldsFragment }>
  | IAction<
      "TOGGLE_TASK_COMPLETED" | "DELETE_TASK",
      {
        listId: ListFieldsFragment["id"];
        taskId: TaskFieldsFragment["id"];
      }
    >;

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
