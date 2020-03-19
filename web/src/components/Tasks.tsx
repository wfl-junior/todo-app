import React, { useContext } from "react";
import { TodosContext } from "../context";
import { Task } from "./Task";
import { Form } from "./Form";
import { Toast, Confirm } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "../graphql/client";
import { TaskFieldsFragment } from "../graphql";
import { DangerButton } from "./DangerButton";
import { locale, getCurrentLocale } from "../locale";

export const Tasks = () => {
  const { activeList, deleteList, addTask, clearCompleted } = useContext(TodosContext);

  if (!activeList) return null;

  const currentLocale = locale[getCurrentLocale()];

  const handleDeleteList = async (id: number) => {
    const decision = await Confirm().fire({
      html: currentLocale.swalDeleteListConfirm
    });

    if (decision.value) {
      deleteList(activeList.id);

      try {
        const { deleteLists } = await client.DeleteLists({ ids: [id] });

        if (deleteLists) {
          Toast.fire({
            title: currentLocale.swalDeleteListSuccess,
            icon: "success"
          });
        } else {
          throw new Error(currentLocale.errorDefault);
        }
      } catch (err) {
        console.log(err);

        Toast.fire({
          title: currentLocale.swalDeleteListError,
          icon: "error"
        });
      }
    }
  };

  const handleAddTask = async (task: Pick<TaskFieldsFragment, "listId" | "name">) => {
    if (!task.name.length) return;

    try {
      const { createTask } = await client.CreateTask(task);

      addTask(createTask);

      Toast.fire({
        title: currentLocale.swalAddTaskSuccess,
        icon: "success"
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: currentLocale.swalAddTaskSuccess,
        icon: "error"
      });
    }
  };

  const handleClearCompleted = async () => {
    const targetTasks = activeList.tasks.filter(task => task.completed);
    if (!targetTasks.length) {
      Toast.fire({
        title: currentLocale.swalClearCompletedEmpty,
        icon: "info"
      });
      return;
    }

    const decision = await Confirm().fire({
      html: currentLocale.swalClearCompletedConfirm
    });

    if (decision.value) {
      clearCompleted(activeList.id);

      try {
        const { deleteTasks } = await client.DeleteTasks({
          ids: targetTasks.map(task => task.id)
        });

        if (deleteTasks) {
          Toast.fire({
            title: currentLocale.swalClearCompletedSuccess,
            icon: "success"
          });
        } else {
          throw new Error(currentLocale.errorDefault);
        }
      } catch (err) {
        console.log(err);

        Toast.fire({
          title: currentLocale.swalClearCompletedError,
          icon: "error"
        });
      }
    }
  };

  return (
    <div className="card tasks">
      <div className="card-header">
        <h2 className="card-title">
          {currentLocale.tasksCardTitle}{" "}
          <small>
            <FontAwesomeIcon icon="tasks" />
          </small>
        </h2>
        <p>
          {currentLocale.ammountTasksCompleted.replace(/\$[0-9]/g, g => {
            const replacers = {
              $1: activeList.tasks.filter(task => task.completed).length.toString(),
              $2: activeList.tasks.length.toString()
            };
            return replacers[g];
          })}
        </p>
      </div>
      <div className="card-body">
        <Form
          onSubmit={async value => {
            await handleAddTask({ listId: activeList.id, name: value });
            setTimeout(() => {
              document.getElementById("add-task")?.focus();
            }, 0);
          }}
          placeholder={currentLocale.tasksInputPlaceholder}
          id="add-task"
          aria-label={currentLocale.tasksInputPlaceholder.replace("...", "")}
        />
        <ul className="list-group">
          {activeList.tasks.map(({ id, ...rest }) => (
            <Task key={id} id={id} {...rest} />
          ))}
        </ul>
        <div className="d-flex justify-content-around text-align-center mt-3">
          <DangerButton onClick={handleClearCompleted}>
            <FontAwesomeIcon icon="trash" /> {currentLocale.clearCompletedButton}
          </DangerButton>
          <DangerButton onClick={() => handleDeleteList(activeList.id)}>
            {currentLocale.deleteListButton} <FontAwesomeIcon icon="trash" />
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
