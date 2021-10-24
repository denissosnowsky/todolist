import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  changeCheckThunk,
  deleteTodoThunk,
  updateTodoThunk,
} from "../../../redux/reducer";
import { ResponseTodoFromAPI } from "../../../types/types";
import s from "./ListItem.module.css";

interface ListItemPropsType {
  data: ResponseTodoFromAPI;
}

const ListItem: React.FC<ListItemPropsType> = ({ data }) => {
  const dispatch = useDispatch();

  const [change, setChange] = useState(false);
  const [input, setInput] = useState("");
  const inputRef: React.LegacyRef<HTMLInputElement> | null = useRef(null);

  const handleDelete = (id: number) => {
    dispatch(deleteTodoThunk(id));
  };

  const handleCancel = () => {
    setChange(false);
  };

  useEffect(() => {
    inputRef?.current && inputRef?.current!.focus();
  }, [change]);

  const handleChange = () => {
    setChange(true);
  };

  const handleSave = (
    userId: number,
    title: string,
    completed: boolean,
    id: number
  ) => {
    dispatch(updateTodoThunk(userId, title, completed, id));
  };

  const handleCheck = (
    userID: number,
    title: string,
    completed: boolean,
    id: number
  ) => {
    dispatch(changeCheckThunk(userID, title, completed, id));
  };

  return (
    <div className={s.listItemWrapper}>
      <div className={s.check}>
        <div>
          {data.completed ? (
            <i
              className="bi bi-check-square text-success"
              onClick={() =>
                handleCheck(data.userId, data.title, !data.completed, data.id)
              }
            ></i>
          ) : (
            <i
              className="bi bi-square"
              onClick={() =>
                handleCheck(data.userId, data.title, !data.completed, data.id)
              }
            ></i>
          )}
        </div>
      </div>
      {!change ? (
        <div className={s.text}>{`${data.id}. ${data.title}`}</div>
      ) : (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={s.textInput}
          ref={inputRef}
        />
      )}
      <div className={s.menu}>
        {!change ? (
          <>
            <i
              className="bi bi-x-circle-fill text-danger"
              onClick={() => handleDelete(data.id)}
            ></i>
            <i className="bi bi-pencil-square" onClick={handleChange}></i>
          </>
        ) : (
          <>
            <i
              className="bi bi-x"
              style={{ fontSize: "24px" }}
              onClick={handleCancel}
            ></i>
            <i
              className="bi bi-check2"
              style={{ fontSize: "24px" }}
              onClick={() =>
                handleSave(data.userId, input, data.completed, data.id)
              }
            ></i>
          </>
        )}
      </div>
    </div>
  );
};

export default ListItem;
