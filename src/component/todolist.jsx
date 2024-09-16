import { useState } from "react";
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

  return (
    <>
      <h3>My To Do List</h3>
      <label>Task</label>
      <input
        placeholder="Type Task here"
        value={todo.description}
        onChange={(event) =>
          setTodo({ ...todo, description: event.target.value })
        }
      />
      <label>Due Date</label>
      <input
        placeholder="Type Due Date"
        value={todo.duedate}
        onChange={(event) => setTodo({ ...todo, duedate: event.target.value })}
      />
      <button onClick={handleTodo}>Add To Do</button>

      <table>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.duedate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Todolist;
