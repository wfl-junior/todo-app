import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Confirm, Toast } from "../utils";
import { TodosContext } from "../context";
import { TaskFieldsFragment } from "../graphql";
import { client } from "../graphql/client";
import { DangerButton } from "./DangerButton";
import { currentLocale } from "../locale";

export const Task: React.FC<TaskFieldsFragment> = ({ id, listId, name, completed }) => {
  const { toggleCompleted, deleteTask } = useContext(TodosContext);

  const labelStyle: React.CSSProperties = {
    cursor: "pointer",
    marginRight: 16
  };

  if (completed) labelStyle.textDecoration = "line-through";

  const handleCompleted = async () => {
    toggleCompleted(listId, id);

    try {
      await client.UpdateTask({
        id,
        listId,
        name,
        completed: !completed
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: currentLocale.swalUpdateTaskError,
        icon: "error"
      });
    }
  };

  const handleDeleteTask = async () => {
    const decision = await Confirm.fire({
      html: currentLocale.swalDeleteTaskConfirm
    });

    if (decision.value) {
      deleteTask(listId, id);

      try {
        const { deleteTasks } = await client.DeleteTasks({ ids: [id] });

        if (deleteTasks) {
          Toast.fire({
            title: currentLocale.swalDeleteTaskSuccess,
            icon: "success"
          });
        } else {
          throw new Error(currentLocale.errorDefault);
        }
      } catch (err) {
        console.log(err);

        Toast.fire({
          title: currentLocale.swalDeleteTaskError,
          icon: "error"
        });
      }
    }
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
        <label className="custom-control-label" htmlFor={`${id}`} style={labelStyle}>
          {name}
        </label>
      </div>
      <DangerButton onClick={handleDeleteTask}>
        <FontAwesomeIcon icon="trash" />
      </DangerButton>
    </li>
  );
};
