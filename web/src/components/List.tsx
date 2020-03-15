import React, { useContext } from "react";
import { ActiveListContext } from "../context";
import { ListFieldsFragment, useListsQuery } from "../graphql";

type ListProps = {
  tasksLength: number;
} & Pick<ListFieldsFragment, "id" | "name">;

export const List: React.FC<ListProps> = ({ id, name, tasksLength }) => {
  const { data } = useListsQuery();
  const { activeList, setActiveList } = useContext(ActiveListContext);

  const updateActiveList = (id: number) => {
    const list = data!.lists.find(list => list.id === id);
    setActiveList(list!);
    document.getElementById("add-task")?.focus();
  };

  if (!activeList) return null;

  let className =
    "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

  if (activeList.id === id) className += " active";

  return (
    <li
      className={className}
      style={{ cursor: "pointer" }}
      onClick={() => updateActiveList(id)}
    >
      <div style={{ marginRight: 16 }}>{name}</div>
      <span
        className={`bagde badge-${
          activeList.id === id ? "light" : "primary"
        } badge-pill`}
      >
        {tasksLength}
      </span>
    </li>
  );
};
