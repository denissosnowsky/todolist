import cs from "classnames";
import { Container, Row } from "react-bootstrap";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="bg-primary">
      <Container>
        <Row className={s.navbarWrapper}>
          <NavLink to="/todos" activeClassName={s.active}>
            <i className="bi bi-list-ol"></i> Todos List
          </NavLink>
          <NavLink to="/addTodos" activeClassName={s.active}>
            <i className="bi bi-plus-circle"></i> Add New Todo
          </NavLink>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
