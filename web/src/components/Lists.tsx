import React, { useContext } from "react";
import { List } from "./List";
import { Form } from "./Form";
import { Toast } from "../utils";
import { ListFieldsFragment } from "../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodosContext } from "../context";
import { client } from "../graphql/client";

export const Lists = () => {
  const { lists, addList } = useContext(TodosContext);

  const handleAddList = async (name: ListFieldsFragment["name"]) => {
    if (!name.length) return;

    try {
      const { createList } = await client.CreateList({ name });

      addList(createList);

      document.getElementById("add-task")?.focus();

      Toast.fire({
        title: "Lista criada!",
        icon: "success"
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: "Ocorreu um erro ao criar a lista...",
        icon: "error"
      });
    }
  };

  return (
    <div className="card lists">
      <div className="card-header">
        <h2 className="card-title">
          Listas{" "}
          <small>
            <FontAwesomeIcon icon="list-ul" />
          </small>
        </h2>
      </div>
      <div className="card-body">
        <Form
          onSubmit={async value => await handleAddList(value)}
          placeholder="Adicionar Lista..."
          id="add-list"
          aria-label="Add a list"
        />
        <ul className="list-group">
          {lists.map(({ id, name, tasks }) => (
            <List key={id} id={id} name={name} tasksLength={tasks.length} />
          ))}
        </ul>
      </div>
    </div>
  );
};
