import React, { useContext, useEffect } from "react";
import { useListsQuery } from "../graphql";
import { Lists } from "../components/Lists";
import { Tasks } from "../components/Tasks";
import { ActiveListContext } from "../context";

export const Todos: React.FC = () => {
  const { data } = useListsQuery();
  const { setActiveList } = useContext(ActiveListContext);

  useEffect(() => {
    setActiveList(data!.lists[0]);

    // eslint-disable-next-line
  }, []);

  return (
    <section className="todos">
      <Lists />
      <Tasks />
    </section>
  );
};
