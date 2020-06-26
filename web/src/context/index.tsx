import React, { createContext, useContext, useReducer } from "react";
import { todosReducer } from "./reducer";
import { Context } from "./types";

export const TodosContext = createContext<Context>({} as Context);

export const useTodos = () => useContext(TodosContext);

export const TodosProvider: React.FC = ({ children }) => {
  const [{ lists, activeList }, dispatch] = useReducer(todosReducer, {
    lists: [],
    activeList: null
  });

  const setLists: Context["setLists"] = lists =>
    dispatch({
      type: "SET_LISTS",
      payload: { lists }
    });

  const setActiveList: Context["setActiveList"] = list =>
    dispatch({
      type: "SET_ACTIVE_LIST",
      payload: { list }
    });

  const addList: Context["addList"] = list =>
    dispatch({
      type: "ADD_LIST",
      payload: { list }
    });

  const deleteList: Context["deleteList"] = listId =>
    dispatch({
      type: "DELETE_LIST",
      payload: { listId }
    });

  const addTask: Context["addTask"] = task =>
    dispatch({
      type: "ADD_TASK",
      payload: { task }
    });

  const toggleCompleted: Context["toggleCompleted"] = (listId, taskId) =>
    dispatch({
      type: "TOGGLE_TASK_COMPLETED",
      payload: { listId, taskId }
    });

  const deleteTask: Context["deleteTask"] = (listId, taskId) =>
    dispatch({
      type: "DELETE_TASK",
      payload: { listId, taskId }
    });

  const clearCompleted: Context["clearCompleted"] = listId =>
    dispatch({
      type: "CLEAR_COMPLETED_TASKS",
      payload: { listId }
    });

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
