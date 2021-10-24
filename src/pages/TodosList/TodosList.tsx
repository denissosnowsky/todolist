import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import List from "../../components/List/List";
import { ResponseTodoFromAPI } from "../../types/types";
import s from "./TodosList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "../../redux/store";
import Loading from "../../components/Loading/Loading";
import { setPageAC, setTodosThunk } from "../../redux/reducer";
import Pagination from "../../components/Pagination/Pagination";

const TodosList: React.FC = () => {
  const dispatch = useDispatch();

  const allTodos = useSelector(
    (state: StateType) => state.reducer.todos
  ).length;
  const paginatedTodos = useSelector(
    (state: StateType) => state.reducer.paginatedTodos
  );
  const page = useSelector((state: StateType) => state.reducer.page);
  const pageSize = useSelector((state: StateType) => state.reducer.pageSize);

  return (
    <Container>
      {paginatedTodos && allTodos > 0 ? (
        <List data={paginatedTodos} />
      ) : (
        <div className={s.noText}>There are no todos</div>
      )}
      <div className={s.paginationWrapper}>
        <Pagination
          page={page}
          setPage={(page) => dispatch(setPageAC(page))}
          pageSize={pageSize}
          allCount={allTodos}
        />
      </div>
    </Container>
  );
};

export default TodosList;
