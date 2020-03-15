import React from "react";
import {
  TaskFieldsFragment,
  useDeleteTasksMutation,
  useUpdateTaskMutation,
  ListsQuery,
  ListsDocument
} from "../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Confirm, Toast } from "../utils";
import { produce } from "immer";

export const Task: React.FC<TaskFieldsFragment> = ({
  id,
  listId,
  name,
  completed
}) => {
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTasks] = useDeleteTasksMutation();

  const labelStyle: React.CSSProperties = {
    cursor: "pointer",
    marginRight: 16
  };

  if (completed) labelStyle.textDecoration = "line-through";

  const handleCompleted = async () => {
    await updateTask({
      variables: {
        id,
        listId,
        name,
        completed
      },
      update: cache => {
        const listData = cache.readQuery<ListsQuery>({
          query: ListsDocument
        });

        if (!listData) return;

        const { lists } = listData;

        const targetTask = lists
          .find(list => list.id === listId)
          ?.tasks.find(task => task.id === id);

        if (!targetTask) return;

        targetTask.completed = !targetTask.completed;

        cache.writeQuery<ListsQuery>({
          query: ListsDocument,
          data: produce(listData, ({ lists }) => {
            const targetTask = lists
              .find(list => list.id === listId)
              ?.tasks.find(task => task.id === id);

            targetTask!.completed = !targetTask!.completed;
          })
        });
      }
    });
  };

  const deleteTask = async () => {
    const decision = await Confirm.fire({
      text: "Deseja mesmo apagar esta tarefa?"
    });

    if (decision.value)
      await deleteTasks({
        variables: { ids: [id] },
        update: (cache, res) => {
          const listData = cache.readQuery<ListsQuery>({
            query: ListsDocument
          });

          if (!listData || !res.data) {
            Toast.fire({
              title: "No data returned for some reason...",
              icon: "error"
            });
            return;
          }

          const { lists } = listData;

          const targetList = lists.find(list => list.id === listId);

          if (!targetList) return;

          targetList.tasks = targetList.tasks.filter(task => task.id !== id);

          cache.writeQuery<ListsQuery>({
            query: ListsDocument,
            data: { lists }
          });
        }
      });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="custom-control custom-checkbox">
        <input
          className="custom-control-input"
          type="checkbox"
          id={`${id}`}
          checked={completed}
          onChange={handleCompleted}
        />
        <label
          className="custom-control-label"
          htmlFor={`${id}`}
          style={labelStyle}
        >
          {name}
        </label>
      </div>
      <button className="btn btn-danger" onClick={deleteTask}>
        <FontAwesomeIcon icon="trash" />
      </button>
    </li>
  );
};
