import React, { useState, useContext } from "react";
import {
  useDeleteListsMutation,
  useCreateTaskMutation,
  useDeleteTasksMutation,
  TaskFieldsFragment,
  ListsQuery,
  useListsQuery,
  ListsDocument
} from "../graphql";
import { ActiveListContext } from "../context";
import { Task } from "./Task";
import { Form } from "./Form";
import { capitalize, Toast, Confirm } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Tasks = () => {
  const { data } = useListsQuery();
  const [value, setValue] = useState("");
  const { activeList, setActiveList } = useContext(ActiveListContext);
  const [deleteLists] = useDeleteListsMutation();
  const [createTask] = useCreateTaskMutation();
  const [deleteTasks] = useDeleteTasksMutation();

  const deleteList = async (id: number) => {
    const decision = await Confirm.fire({
      text:
        "Deseja mesmo apagar esta lista e todas as suas tarefas? Esta ação não pode ser revertida."
    });

    if (decision.value) {
      await deleteLists({
        variables: { ids: [id] },
        update: cache => {
          const listData = cache.readQuery<ListsQuery>({
            query: ListsDocument
          });

          if (!listData) return;

          cache.writeQuery<ListsQuery>({
            query: ListsDocument,
            data: { lists: listData.lists.filter(list => list.id !== id) }
          });

          setActiveList(data!.lists[0]);
        }
      });
    }
  };

  const addTask = async (task: Pick<TaskFieldsFragment, "listId" | "name">) => {
    if (!task.name.length) return;

    await createTask({
      variables: task,
      update: (cache, res) => {
        const listData = cache.readQuery<ListsQuery>({ query: ListsDocument });

        if (!listData || !res.data) {
          Toast.fire({
            title: "No data returned for some reason...",
            icon: "error"
          });
          return;
        }

        listData.lists
          .find(list => list.id === task.listId)
          ?.tasks.push(res.data.createTask);

        cache.writeQuery<ListsQuery>({
          query: ListsDocument,
          data: { ...listData, lists: listData.lists }
        });
      }
    });
  };

  const clearCompleted = async () => {
    const decision = await Confirm.fire({
      text:
        "Deseja mesmo apagar as tarefas completas desta lista? Esta ação não pode ser revertida."
    });

    const targetTasks = activeList!.tasks.filter(task => task.completed);

    if (decision.value) {
      await deleteTasks({
        variables: {
          ids: targetTasks.map(task => task.id)
        }
      });

      Toast.fire({
        title: "Tarefas deletadas!",
        icon: "success"
      });
    }
  };

  if (!activeList) return null;

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
          onSubmit={e => {
            e.preventDefault();
            addTask({ listId: activeList.id, name: value });
            setValue("");
          }}
          placeholder="Adicionar Tarefa..."
          value={value}
          onChange={e => setValue(capitalize(e.target.value))}
          id="add-task"
          disabled={!activeList.tasks}
        />
        <ul className="list-group">
          {activeList.tasks.map(({ id, listId, name, completed }) => (
            <Task
              key={id}
              id={id}
              listId={listId}
              name={name}
              completed={completed}
            />
          ))}
        </ul>
        <div className="d-flex justify-content-around text-align-center mt-3">
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => clearCompleted()}
            disabled={!activeList.tasks}
          >
            <FontAwesomeIcon icon="trash" /> Limpar completas
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => deleteList(activeList.id)}
            disabled={!activeList.tasks}
          >
            Deletar Lista <FontAwesomeIcon icon="trash" />
          </button>
        </div>
      </div>
    </div>
  );
};
