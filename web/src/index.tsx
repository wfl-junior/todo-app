import React from "react";
import ReactDOM from "react-dom";
import { TodosProvider } from "./contexts/todos";
import { LocaleProvider } from "./contexts/locale";
import { App } from "./App";

ReactDOM.render(
  <TodosProvider>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </TodosProvider>,
  document.getElementById("root")
);
