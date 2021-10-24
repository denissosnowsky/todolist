import s from "./Loading.module.css";
import loading from "../../assets/loading.gif";

const Loading: React.FC = () => {
  return (
    <div className={s.loadingWrapper}>
      <img alt="loading" src={loading} />
    </div>
  );
};

export default Loading;
