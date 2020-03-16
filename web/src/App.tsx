import React from "react";
import "./style.scss";
import "./registerIcons";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Lists } from "./components/Lists";
import { Tasks } from "./components/Tasks";
import { TodosContext } from "./context";
import { client } from "./graphql/client";

interface State {
  loading: boolean;
  error: any;
}

export class App extends React.Component<{}, State> {
  static contextType = TodosContext;
  context!: React.ContextType<typeof TodosContext>;

  state = {
    loading: true,
    error: null
  };

  async componentDidMount() {
    try {
      const { lists } = await client.Lists();

      this.context.setLists(lists);
      this.context.setActiveList(lists[0]);
    } catch (err) {
      console.log(err);
      this.setState({ error: err });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, error } = this.state;

    if (loading) return <Loading />;

    if (error) {
      return <Error msg="An error occurred while fetching data..." />;
    }

    return (
      <main>
        <div className="container">
          <section className="todos">
            <Lists />
            <Tasks />
          </section>
        </div>
      </main>
    );
  }
}
