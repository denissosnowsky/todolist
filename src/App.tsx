import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TodosList from "./pages/TodosList/TodosList";
import AddTodo from "./pages/AddTodo/AddTodo";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/todos" />} />
        <Route exact path="/todos" render={() => <TodosList />} />
        <Route exact path="/addTodos" render={() => <AddTodo />} />
        <Route path="*" render={() => <ErrorPage />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
