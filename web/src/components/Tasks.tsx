import React, { useContext } from "react";
import { TodosContext } from "../context";
import { Task } from "./Task";
import { Form } from "./Form";
import { Toast, Confirm } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { client } from "../graphql/client";
import { TaskFieldsFragment } from "../graphql";
import { DangerButton } from "./DangerButton";

export const Tasks = () => {
  const { activeList, deleteList, addTask, clearCompleted } = useContext(
    TodosContext
  );

  if (!activeList) return null;

  const handleDeleteList = async (id: number) => {
    const decision = await Confirm.fire({
      html:
        "Deseja mesmo apagar esta lista e todas as suas tarefas? <br /> Esta ação não pode ser revertida."
    });

    if (decision.value) {
      deleteList(activeList.id);

      try {
        const { deleteLists } = await client.DeleteLists({ ids: [id] });

        if (deleteLists) {
          Toast.fire({
            title: "Lista deletada!",
            icon: "success"
          });
        } else {
          throw new Error("Backend Error");
        }
      } catch (err) {
        console.log(err);

        Toast.fire({
          title: "Ocorreu um erro ao deletar a lista...",
          icon: "error"
        });
      }
    }
  };

  const handleAddTask = async (
    task: Pick<TaskFieldsFragment, "listId" | "name">
  ) => {
    if (!task.name.length) return;

    try {
      const { createTask } = await client.CreateTask(task);

      addTask(createTask);

      Toast.fire({
        title: "Tarefa criada!",
        icon: "success"
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: "Ocorreu um erro ao criar a tarefa...",
        icon: "error"
      });
    }
  };

  const handleClearCompleted = async () => {
    const decision = await Confirm.fire({
      html:
        "Deseja mesmo apagar as tarefas completas desta lista? <br /> Esta ação não pode ser revertida."
    });

    if (decision.value) {
      clearCompleted(activeList.id);

      try {
        const targetTasks = activeList.tasks.filter(task => task.completed);
        const { deleteTasks } = await client.DeleteTasks({
          ids: targetTasks.map(task => task.id)
        });

        if (deleteTasks) {
          Toast.fire({
            title: "Tarefas completas deletadas!",
            icon: "success"
          });
        } else {
          throw new Error("Backend Error");
        }
      } catch (err) {
        console.log(err);

        Toast.fire({
          title: "Ocorreu um erro ao deletar as tarefas...",
          icon: "error"
        });
      }
    }
  };

  return (
    <div className="card tasks">
      <div className="card-header">
        <h2 className="card-title">
          Tarefas{" "}
          <small>
            <FontAwesomeIcon icon="tasks" />
          </small>
        </h2>
        <p>
          {activeList.tasks.filter(task => task.completed).length} de{" "}
          {activeList.tasks.length} completas
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
          placeholder="Adicionar Tarefa..."
          id="add-task"
          aria-label="Add a task"
        />
        <ul className="list-group">
          {activeList.tasks.map(({ id, ...rest }) => (
            <Task key={id} id={id} {...rest} />
          ))}
        </ul>
        <div className="d-flex justify-content-around text-align-center mt-3">
          <DangerButton onClick={handleClearCompleted}>
            <FontAwesomeIcon icon="trash" /> Limpar completas
          </DangerButton>
          <DangerButton onClick={() => handleDeleteList(activeList.id)}>
            Deletar Lista <FontAwesomeIcon icon="trash" />
          </DangerButton>
        </div>
      </div>
    </div>
  );
};
