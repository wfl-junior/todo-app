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
        completed: !completed
      },
      update: cache => {
        const listData = cache.readQuery<ListsQuery>({
          query: ListsDocument
        });

        if (!listData) return;

        const targetTask = listData.lists
          .find(list => list.id === listId)
          ?.tasks.find(task => task.id === id);

        if (!targetTask) return;

        targetTask.completed = !targetTask.completed;

        cache.writeQuery<ListsQuery>({
          query: ListsDocument,
          data: { ...listData, lists: listData.lists }
        });
      }
    });
  };

  const deleteTask = async () => {
    const decision = await Confirm.fire({
      html:
        "Deseja mesmo apagar esta tarefa? <br /> Esta ação não pode ser revertida."
    });

    if (decision.value)
      await deleteTasks({
        variables: { ids: [id] },
        update: cache => {
          const listData = cache.readQuery<ListsQuery>({
            query: ListsDocument
          });

          if (!listData) return;

          const { lists } = listData;

          const targetList = lists.find(list => list.id === listId);

          if (!targetList) return;

          targetList.tasks = targetList.tasks.filter(task => task.id !== id);

          cache.writeQuery<ListsQuery>({
            query: ListsDocument,
            data: { ...listData, lists }
          });

          Toast.fire({
            title: "Tarefa deletada!",
            icon: "success"
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
