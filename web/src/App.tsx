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
import { DangerButton } from "./components/DangerButton";
import { LocaleKey } from "./locale/types";

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

  updateLocale(targetLocale: LocaleKey) {
    localStorage.setItem("locale", targetLocale);
    this.forceUpdate();
  }

  render() {
    const { loading, error } = this.state;

    if (loading) return <Loading />;

    const currentLocale = locale[getCurrentLocale()];

    if (error) return <Error msg={currentLocale.errorFetch} />;

    return (
      <main>
        <div className="container">
          <DangerButton onClick={() => this.updateLocale("en-us")}>
            click me for en-us
          </DangerButton>
          <DangerButton onClick={() => this.updateLocale("pt-br")}>
            click me for pt-br
          </DangerButton>
          <section className="todos">
            <Lists />
            <Tasks />
          </section>
        </div>
      </main>
    );
  }
}
