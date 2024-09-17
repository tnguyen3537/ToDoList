import { useState } from "react";
import TodoTable from "./todotable";

function Todolist() {
  const [todo, setTodo] = useState({ description: "", duedate: "" });
  const [todos, setTodos] = useState([]);

  const handleTodo = () => {
    if (!todo.description || !todo.duedate) {
      alert("Type something first");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "" });
    }
  };

  const handleDelete = (row) => {
    setTodos(todos.filter((_, index) => row != index));
  };

  return (
    <>
      <h3>My To Do List</h3>
      <label>Task</label>
      <input
        placeholder="Type task here"
        value={todo.description}
        onChange={(event) =>
          setTodo({ ...todo, description: event.target.value })
        }
      />
      <label>Due Date</label>
      <input
        type="date"
        value={todo.duedate}
        onChange={(event) => setTodo({ ...todo, duedate: event.target.value })}
      />
      <button onClick={handleTodo}>Add To Do</button>

      <TodoTable todos={todos} handleDelete={handleDelete} />
    </>
  );
}

export default Todolist;
