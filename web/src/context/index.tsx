import React, { useReducer, createContext } from "react";
import { activeListReducer } from "./reducer";
import { GlobalState } from "../types/todos";
import { ListFieldsFragment, TaskFieldsFragment } from "../graphql";

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

export const TodosContext = createContext<Context>({} as Context);

export const TodosProvider: React.FC = ({ children }) => {
  const [{ lists, activeList }, dispatch] = useReducer(activeListReducer, {
    lists: [],
    activeList: null
  });

  const setLists: Context["setLists"] = lists => {
    dispatch({
      type: "SET_TODOS",
      payload: { lists }
    });
  };

  const setActiveList: Context["setActiveList"] = list => {
    dispatch({
      type: "SET_ACTIVE_LIST",
      payload: { activeList: list }
    });
  };

  const addList: Context["addList"] = list => {
    dispatch({
      type: "ADD_LIST",
      payload: { list }
    });
  };

  const deleteList: Context["deleteList"] = listId => {
    dispatch({
      type: "DELETE_LIST",
      payload: { listId }
    });
  };

  const addTask: Context["addTask"] = task => {
    dispatch({
      type: "ADD_TASK",
      payload: { task }
    });
  };

  const toggleCompleted: Context["toggleCompleted"] = (listId, taskId) => {
    dispatch({
      type: "TOGGLE_TASK_COMPLETED",
      payload: { listId, taskId }
    });
  };

  const deleteTask: Context["deleteTask"] = (listId, taskId) => {
    dispatch({
      type: "DELETE_TASK",
      payload: { listId, taskId }
    });
  };

  const clearCompleted: Context["clearCompleted"] = listId => {
    dispatch({
      type: "CLEAR_COMPLETED_TASKS",
      payload: { listId }
    });
  };

  return (
    <TodosContext.Provider
      value={{
        lists,
        activeList,
        setLists,
        setActiveList,
        addList,
        deleteList,
        addTask,
        toggleCompleted,
        deleteTask,
        clearCompleted
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
