import React from "react";
import "./style.scss";
import "./registerIcons";
import { TodosContext } from "./context";
import { client } from "./graphql/client";
import { Loading } from "./components/Loading";
import { LocaleSelector } from "./components/LocaleSelector";
import { Error } from "./components/Error";
import { Lists } from "./components/Lists";
import { Tasks } from "./components/Tasks";

interface State {
  loading: boolean;
  error: boolean;
}

export class App extends React.Component<{}, State> {
  static contextType = TodosContext;
  context!: React.ContextType<typeof TodosContext>;

  state = {
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      const { lists } = await client.Lists();

      this.context.setLists(lists);
      this.context.setActiveList(lists[0]);

      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      this.setState({ error: true, loading: false });
    }
  }

  render() {
    const { loading, error } = this.state;

    if (loading) return <Loading />;

    if (error) {
      return (
        <>
          <LocaleSelector forceUpdate={() => this.forceUpdate()} />
          <Error />
        </>
      );
    }

    return (
      <>
        <LocaleSelector forceUpdate={() => this.forceUpdate()} />
        <main>
          <div className="container">
            <section className="todos">
              <Lists />
              <Tasks />
            </section>
          </div>
        </main>
      </>
    );
  }
}
