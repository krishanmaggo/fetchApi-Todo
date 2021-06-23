import React, { useEffect, useState } from "react";
import "./App.css";
import { Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>
        {todo.text}
      </span>
      <div>
        <Button variant="outline-success" onClick={() => markTodo(index)}>
          ✓
        </Button>{" "}
        <Button variant="outline-danger" onClick={() => removeTodo(index)}>
          ✕
        </Button>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          <b>Add Todo</b>
        </Form.Label>
        <Form.Control
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add new todo"
        />
      </Form.Group>
      <Button variant="primary mb-3" type="submit">
        Submit
      </Button>
    </Form>
  );
}

function App() {
  const [query, setQuery] = useState("page=1");
  const [data, setData] = useState([]);

  const [todos, setTodos] = useState([
    {
      text: "This is a sampLe todo",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const page = [
    {
      id: "page1",
      value: "page=1",
    },
    {
      id: "page2",
      value: "page=2",
    },
  ];

  useEffect(() => {
    fetch(`https://reqres.in/api/users?${query}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        console.log(data.data[2].first_name);
      });
  }, [query]);

  return (
    <div className="App">
      <div>
        {page.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setQuery(item.value);
              }}
            >
              {item.id}
            </button>
          );
        })}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Full Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img src={item.avatar} />
                  </td>
                  <td>{item.first_name + " " + item.last_name}</td>
                  <td>{item.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <div className="app">
          <div className="container">
            <h1 className="text-center mb-4">Todo List</h1>
            <FormTodo addTodo={addTodo} />
            <div>
              {todos.map((todo, index) => (
                <Card>
                  <Card.Body>
                    <Todo
                      key={index}
                      index={index}
                      todo={todo}
                      markTodo={markTodo}
                      removeTodo={removeTodo}
                    />
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
