import React from "react";
import "./style.scss";
import "./registerIcons";
import { useListsQuery } from "./graphql";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Todos } from "./components/Todos";

export const App: React.FC = () => {
  const { data, loading, error } = useListsQuery();

  if (loading) return <Loading />;

  if (error) {
    return <Error msg="An error occurred while fetching data..." />;
  }

  if (!data) {
    return <Error msg="No data returned for some reason..." />;
  }

  return (
    <main>
      <div className="container">
        <Todos />
      </div>
    </main>
  );
};
