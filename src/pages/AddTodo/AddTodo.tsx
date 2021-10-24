import { useState } from "react";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import { addTodoThunk } from "../../redux/reducer";
import { StateType } from "../../redux/store";
import s from "./AddTodo.module.css";

const AddTodo: React.FC = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [userId, setUserId] = useState("");
  const isFetching = useSelector(
    (state: StateType) => state.reducer.isFetchingTodos
  );

  const handleCancel = () => {
    setTitle("");
    setUserId("");
  };

  const handleAdd = (userId: number, title: string) => {
    if (userId && title) dispatch(addTodoThunk(userId, title, false));
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Container>
      <div className={s.wrapper}>
        <Form.Group as={Row} className="m-4" controlId="name">
          <Col md={3} className={s.firstCol}>
            <Form.Label column sm="2" className={s.label}>
              Enter Title:
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="m-4" controlId="name">
          <Col md={3} className={s.firstCol}>
            <Form.Label column sm="2" className={s.label}>
              Enter User Id:
            </Form.Label>
          </Col>
          <Col md={9}>
            <Form.Control
              type="number"
              placeholder="Enter User Id"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Row className={s.buttonsWrapper}>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              className="my-2 w-75"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="success"
              className="my-2 w-75"
              onClick={() => handleAdd(Number(userId), title)}
            >
              Add
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AddTodo;
