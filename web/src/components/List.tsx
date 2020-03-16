import React, { useContext } from "react";
import { TodosContext } from "../context";
import { ListFieldsFragment } from "../graphql";

type ListProps = {
  tasksLength: number;
} & Pick<ListFieldsFragment, "id" | "name">;

export const List: React.FC<ListProps> = ({ id, name, tasksLength }) => {
  const { lists, activeList, setActiveList } = useContext(TodosContext);

  if (!activeList) return null;

  let className =
    "list-group-item list-group-item-action d-flex justify-content-between align-items-center";

  if (activeList.id === id) className += " active";

  return (
    <li
      className={className}
      style={{ cursor: "pointer" }}
      onClick={() => {
        const targetList = lists.find(list => list.id === id);
        setActiveList(targetList!);
        document.getElementById("add-task")?.focus();
      }}
    >
      <div style={{ marginRight: 16 }}>{name}</div>
      <span
        className={`bagde badge-${activeList.id === id ? "light" : "primary"} badge-pill`}
      >
        {tasksLength}
      </span>
    </li>
  );
};
