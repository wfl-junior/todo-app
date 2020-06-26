import React from "react";
import { useTodos } from "../context";
import { ListFieldsFragment } from "../graphql";

type ListProps = {
  tasksLength: number;
} & Pick<ListFieldsFragment, "id" | "name">;

export const List: React.FC<ListProps> = ({ id, name, tasksLength }) => {
  const { lists, activeList, setActiveList } = useTodos();

  if (!activeList) return null;

  const liClasses: string[] = [
    "list-group-item",
    "list-group-item-action",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  ];

  if (activeList.id === id) liClasses.push("active");

  return (
    <li
      className={liClasses.join(" ")}
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
