import React, { createContext, useContext, useReducer, useCallback } from "react";
import { todosReducer } from "./reducer";
import { Context } from "./types";

export const TodosContext = createContext<Context>({} as Context);

export const useTodos = () => useContext(TodosContext);

export const TodosProvider: React.FC = ({ children }) => {
  const [{ lists, activeList }, dispatch] = useReducer(todosReducer, {
    lists: [],
    activeList: null
  });

  const setLists: Context["setLists"] = useCallback(
    lists => {
      dispatch({
        type: "SET_LISTS",
        payload: { lists }
      });
    },
    [dispatch]
  );

  const setActiveList: Context["setActiveList"] = useCallback(
    list => {
      dispatch({
        type: "SET_ACTIVE_LIST",
        payload: { list }
      });
    },
    [dispatch]
  );

  const addList: Context["addList"] = useCallback(
    list => {
      dispatch({
        type: "ADD_LIST",
        payload: { list }
      });
    },
    [dispatch]
  );

  const deleteList: Context["deleteList"] = useCallback(
    listId => {
      dispatch({
        type: "DELETE_LIST",
        payload: { listId }
      });
    },
    [dispatch]
  );

  const addTask: Context["addTask"] = useCallback(
    task => {
      dispatch({
        type: "ADD_TASK",
        payload: { task }
      });
    },
    [dispatch]
  );

  const toggleCompleted: Context["toggleCompleted"] = useCallback(
    (listId, taskId) => {
      dispatch({
        type: "TOGGLE_TASK_COMPLETED",
        payload: { listId, taskId }
      });
    },
    [dispatch]
  );

  const deleteTask: Context["deleteTask"] = useCallback(
    (listId, taskId) => {
      dispatch({
        type: "DELETE_TASK",
        payload: { listId, taskId }
      });
    },
    [dispatch]
  );

  const clearCompleted: Context["clearCompleted"] = useCallback(
    listId => {
      dispatch({
        type: "CLEAR_COMPLETED_TASKS",
        payload: { listId }
      });
    },
    [dispatch]
  );

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
