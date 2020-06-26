import React from "react";
import { useTodos } from "../context";
import { locale, getCurrentLocale } from "../locale";
import { ListFieldsFragment } from "../graphql";
import { client } from "../graphql/client";
import { Toast } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "./Form";
import { List } from "./List";

export const Lists = () => {
  const { lists, addList } = useTodos();

  const currentLocale = locale[getCurrentLocale()];

  const handleAddList = async (name: ListFieldsFragment["name"]) => {
    if (!name.length) return;

    try {
      const { createList } = await client.CreateList({ name });

      addList(createList);

      document.getElementById("add-task")?.focus();

      Toast.fire({
        title: currentLocale.swalAddListSuccess,
        icon: "success"
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: currentLocale.swalAddListError,
        icon: "error"
      });
    }
  };

  return (
    <div className="card lists">
      <div className="card-header">
        <h2 className="card-title">
          {currentLocale.listsCardTitle}{" "}
          <small>
            <FontAwesomeIcon icon="list-ul" />
          </small>
        </h2>
      </div>
      <div className="card-body">
        <Form
          onSubmit={async value => await handleAddList(value)}
          placeholder={currentLocale.listsInputPlaceholder}
          id="add-list"
          aria-label={currentLocale.listsInputPlaceholder.replace("...", "")}
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
