import React, { useState, useContext } from "react";
import { List } from "./List";
import { Form } from "./Form";
import { capitalize, Toast } from "../utils";
import {
  useListsQuery,
  useCreateListMutation,
  ListFieldsFragment,
  ListsQuery,
  ListsDocument
} from "../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActiveListContext } from "../context";

export const Lists = () => {
  const [value, setValue] = useState("");
  const { data } = useListsQuery();
  const [createList] = useCreateListMutation();
  const { setActiveList } = useContext(ActiveListContext);

  const addList = async (name: ListFieldsFragment["name"]) => {
    if (!name.length) return;

    await createList({
      variables: { name },
      update: (cache, res) => {
        const listData = cache.readQuery<ListsQuery>({ query: ListsDocument });

        if (!listData || !res.data) {
          Toast.fire({
            title: "No data returned for some reason...",
            icon: "error"
          });
          return;
        }

        cache.writeQuery<ListsQuery>({
          query: ListsDocument,
          data: { ...listData, lists: [...listData.lists, res.data.createList] }
        });

        setActiveList(res.data.createList);
        document.getElementById("add-task")?.focus();
      }
    });
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
          onSubmit={e => {
            e.preventDefault();
            addList(value);
            setValue("");
          }}
          placeholder="Adicionar Lista..."
          value={value}
          onChange={e => setValue(capitalize(e.target.value))}
          id="add-list"
        />
        <ul className="list-group">
          {data!.lists.map(({ id, name, tasks }) => (
            <List key={id} id={id} name={name} tasksLength={tasks.length} />
          ))}
        </ul>
      </div>
    </div>
  );
};
