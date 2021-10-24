import { ThunkAction } from "redux-thunk";
import { todosAPI } from "../api/api";
import { ResponseTodoFromAPI } from "../types/types";
import { StateType } from "./store";

const IS_FETCHING = "IS_FETCHING";
const ADD_TODOS = "ADD_TODOS";
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
const SET_PAGE = "SET_PAGE";
const CHANGE_CHECK = "CHANGE_CHECK";
const CANCEL_CHANGE_CHECK = "CANCEL_CHANGE_CHECK";
const UPDATE_TODO = "UPDATE_TODO";

const initialState = {
  todos: [],
  paginatedTodos: [],
  isFetchingTodos: false,
  page: 1,
  pageSize: 10,
};

type initialStateType = {
  todos: Array<ResponseTodoFromAPI>;
  paginatedTodos: Array<ResponseTodoFromAPI>;
  isFetchingTodos: boolean;
  page: number;
  pageSize: number;
};

type ActionsType =
  | IsFetchingTodosACType
  | AddTodosACType
  | SetPageACType
  | AddTodoACType
  | DeleteTodoACType
  | ChangeCheckACType
  | CancelChangeCheckACType
  | UpdateTodoACType;

const reducer = (
  state: initialStateType = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetchingTodos: action.data,
      };
    case ADD_TODOS:
      return {
        ...state,
        todos: action.data,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.data,
        paginatedTodos: state.todos.slice(
          (action.data - 1) * state.pageSize,
          action.data * state.pageSize
        ),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.data],
        page: 1,
        paginatedTodos: state.todos.slice(0, state.pageSize),
      };
    case DELETE_TODO:
      const newTodos = state.todos.filter((item) => item.id !== action.data);
      return {
        ...state,
        todos: [...newTodos],
        paginatedTodos: newTodos.slice(
          (state.page - 1) * state.pageSize,
          state.page * state.pageSize
        ),
      };
    case CHANGE_CHECK:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.id ? { ...item, completed: action.data } : item
        ),
        paginatedTodos: state.paginatedTodos.map((item) =>
          item.id === action.id ? { ...item, completed: action.data } : item
        ),
      };
    case CANCEL_CHANGE_CHECK:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.data.id
            ? { ...item, completed: !action.data.completed }
            : item
        ),
        paginatedTodos: state.paginatedTodos.map((item) =>
          item.id === action.data.id
            ? { ...item, completed: !action.data.completed }
            : item
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.data.id ? { ...action.data } : item
        ),
        paginatedTodos: state.paginatedTodos.map((item) =>
          item.id === action.data.id ? { ...action.data } : item
        ),
      };
    default:
      return state;
  }
};

type IsFetchingTodosACType = {
  type: typeof IS_FETCHING;
  data: boolean;
};
export const isFetchingAC = (data: boolean): IsFetchingTodosACType => ({
  type: IS_FETCHING,
  data,
});

type AddTodosACType = {
  type: typeof ADD_TODOS;
  data: Array<ResponseTodoFromAPI>;
};
export const addTodosAC = (
  data: Array<ResponseTodoFromAPI>
): AddTodosACType => ({
  type: ADD_TODOS,
  data,
});

type AddTodoACType = {
  type: typeof ADD_TODO;
  data: ResponseTodoFromAPI;
};
export const addTodoAC = (data: ResponseTodoFromAPI): AddTodoACType => ({
  type: ADD_TODO,
  data,
});

type DeleteTodoACType = {
  type: typeof DELETE_TODO;
  data: number;
};
export const deleteTodoAC = (data: number): DeleteTodoACType => ({
  type: DELETE_TODO,
  data,
});

type SetPageACType = {
  type: typeof SET_PAGE;
  data: number;
};
export const setPageAC = (data: number): SetPageACType => ({
  type: SET_PAGE,
  data,
});

type ChangeCheckACType = {
  type: typeof CHANGE_CHECK;
  data: boolean;
  id: number;
};
export const changeCheckAC = (
  data: boolean,
  id: number
): ChangeCheckACType => ({
  type: CHANGE_CHECK,
  data,
  id,
});

type CancelChangeCheckACType = {
  type: typeof CANCEL_CHANGE_CHECK;
  data: ResponseTodoFromAPI;
};
export const cancelChangeCheckAC = (
  data: ResponseTodoFromAPI
): CancelChangeCheckACType => ({
  type: CANCEL_CHANGE_CHECK,
  data,
});

type UpdateTodoACType = {
  type: typeof UPDATE_TODO;
  data: ResponseTodoFromAPI;
};
export const updateTodoAC = (data: ResponseTodoFromAPI): UpdateTodoACType => ({
  type: UPDATE_TODO,
  data,
});

export const setTodosThunk =
  (): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await todosAPI.getTodos();

    if (res) {
      dispatch(addTodosAC(res));
      dispatch(setPageAC(1));
    }

    dispatch(isFetchingAC(false));
  };

export const addTodoThunk =
  (
    userId: number,
    title: string,
    completed: boolean
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await todosAPI.addTodo(userId, title, completed);

    if (res) {
      dispatch(addTodoAC(res));
    }

    dispatch(isFetchingAC(false));
  };

export const deleteTodoThunk =
  (id: number): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await todosAPI.deleteTodo(id);
    if (res) {
      dispatch(deleteTodoAC(id));
    }

    dispatch(isFetchingAC(false));
  };

export const changeCheckThunk =
  (
    userId: number,
    title: string,
    completed: boolean,
    id: number
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(changeCheckAC(completed, id));
    const res = await todosAPI.putTodo(id, userId, title, completed);

    if (!res) {
      cancelChangeCheckAC({ userId, id, title, completed });
    }
  };

export const updateTodoThunk =
  (
    userId: number,
    title: string,
    completed: boolean,
    id: number
  ): ThunkAction<Promise<void>, StateType, unknown, ActionsType> =>
  async (dispatch) => {
    dispatch(isFetchingAC(true));
    const res = await todosAPI.putTodo(id, userId, title, completed);

    if (res) {
      dispatch(updateTodoAC(res));
    }

    dispatch(isFetchingAC(false));
  };

export default reducer;
