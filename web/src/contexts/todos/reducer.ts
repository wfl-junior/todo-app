import { GlobalState, Action } from "./types";

export const todosReducer: React.Reducer<GlobalState, Action> = (state, action) => {
  switch (action.type) {
    case "SET_LISTS": {
      return {
        ...state,
        lists: action.payload.lists
      };
    }
    case "SET_ACTIVE_LIST": {
      return {
        ...state,
        activeList: action.payload.list
      };
    }
    case "ADD_LIST": {
      const { list } = action.payload;

      return {
        lists: [...state.lists, list],
        activeList: list
      };
    }
    case "DELETE_LIST": {
      const lists = state.lists.filter(list => list.id !== action.payload.listId);

      return {
        lists,
        activeList: lists[0]
      };
    }
    case "ADD_TASK": {
      const { task } = action.payload;

      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === task.listId) {
            list.tasks.push(task);
          }

          return list;
        })
      };
    }
    case "TOGGLE_TASK_COMPLETED": {
      const { listId, taskId } = action.payload;

      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            list.tasks = list.tasks.map(task => {
              if (task.id === taskId) {
                task.completed = !task.completed;
              }

              return task;
            });
          }

          return list;
        })
      };
    }
    case "DELETE_TASK": {
      const { listId, taskId } = action.payload;

      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === listId) {
            list.tasks = list.tasks.filter(task => task.id !== taskId);
          }

          return list;
        })
      };
    }
    case "CLEAR_COMPLETED_TASKS": {
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id === action.payload.listId) {
            list.tasks = list.tasks.filter(task => !task.completed);
          }

          return list;
        })
      };
    }
    default: {
      return state;
    }
  }
};
