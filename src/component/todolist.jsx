import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Todolist() {
  const [todo, setTodo] = useState({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);
  const [colDefs, setcolDefs] = useState([
    { field: "description", filter: true, floatingFilter: true, editable: true },
    { field: "duedate", filter: true, floatingFilter: true },
    { field: "priority", filter: true, floatingFilter: true, cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} },
  ]);

  const handleTodo = () => {
    if (!todo.description || !todo.duedate) {
      alert("Type something first");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" });
    }
  };

  // const handleDelete = (row) => {
  //   setTodos(todos.filter((_, index) => row != index));
  // };

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
      <label>Priority</label>
      <input
        placeholder="Type priority here"
        value={todo.priority}
        onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
      />
      <button onClick={handleTodo}>Add To Do</button>

      <div className="ag-theme-material" style={{ height: 500, width: "100%" }}>
        <AgGridReact rowData={todos} columnDefs={colDefs} />
      </div>
    </>
  );
}

export default Todolist;
