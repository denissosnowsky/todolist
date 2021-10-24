import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TodosList from "./pages/TodosList/TodosList";
import AddTodo from "./pages/AddTodo/AddTodo";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { StateType } from "./redux/store";
import { setTodosThunk } from "./redux/reducer";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTodosThunk());
  }, []);

  const isFetching = useSelector(
    (state: StateType) => state.reducer.isFetchingTodos
  );

  return (
    <BrowserRouter>
      <Navbar />
      {isFetching ? (
        <Loading />
      ) : (
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/todos" />} />
          <Route exact path="/todos" render={() => <TodosList />} />
          <Route exact path="/addTodos" render={() => <AddTodo />} />
          <Route path="*" render={() => <ErrorPage />} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
