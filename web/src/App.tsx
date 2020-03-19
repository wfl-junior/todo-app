import React from "react";
import "./style.scss";
import "./registerIcons";
import { Loading } from "./components/Loading";
import { Error } from "./components/Error";
import { Lists } from "./components/Lists";
import { Tasks } from "./components/Tasks";
import { TodosContext } from "./context";
import { client } from "./graphql/client";
import { locale, getCurrentLocale } from "./locale";
import { LocaleSelector } from "./components/LocaleSelector";

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

    const currentLocale = locale[getCurrentLocale()];

    if (error) return <Error msg={currentLocale.errorFetch} />;

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
