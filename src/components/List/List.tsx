import { ResponseTodoFromAPI } from "../../types/types";
import s from "./List.module.css";
import ListItem from "./ListItem/ListItem";

interface ListPropsType {
  data: Array<ResponseTodoFromAPI>;
}

const List: React.FC<ListPropsType> = ({ data }) => {
  return (
    <div className={s.listWrapper}>
      {data.map((item) => (
        <ListItem key={item.id} data={item} />
      ))}
    </div>
  );
};

export default List;
