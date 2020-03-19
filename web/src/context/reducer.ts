import { GlobalState, Action } from "./types";

export const activeListReducer: React.Reducer<GlobalState, Action> = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_LISTS": {
      return {
        ...state,
        lists: payload.lists!
      };
    }
    case "SET_ACTIVE_LIST": {
      return {
        ...state,
        activeList: payload.activeList!
      };
    }
    case "ADD_LIST": {
      return {
        lists: [...state.lists, payload.list!],
        activeList: payload.list!
      };
    }
    case "DELETE_LIST": {
      const lists = [...state.lists].filter(list => list.id !== payload.listId);

      return {
        lists,
        activeList: lists[0]
      };
    }
    case "ADD_TASK": {
      const lists = [...state.lists];
      const targetList = lists.find(list => list.id === payload.task!.listId);
      targetList!.tasks.push(payload.task!);

      return {
        ...state,
        lists
      };
    }
    case "TOGGLE_TASK_COMPLETED": {
      const lists = [...state.lists];
      const targetTask = lists
        .find(list => list.id === payload.listId)
        ?.tasks.find(task => task.id === payload.taskId);

      targetTask!.completed = !targetTask!.completed;

      return {
        ...state,
        lists
      };
    }
    case "DELETE_TASK": {
      const lists = [...state.lists];
      const targetList = lists.find(list => list.id === payload.listId);
      targetList!.tasks = targetList!.tasks.filter(task => task.id !== payload.taskId);

      return {
        ...state,
        lists
      };
    }
    case "CLEAR_COMPLETED_TASKS": {
      const lists = [...state.lists];
      const targetList = lists.find(list => list.id === payload.listId);
      targetList!.tasks = targetList!.tasks.filter(task => !task.completed);

      return {
        ...state,
        lists
      };
    }
    default: {
      return state;
    }
  }
};
