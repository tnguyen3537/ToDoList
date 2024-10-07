import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Tabs, Tab, AppBar } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Todolist() {
  const [todo, setTodo] = useState({
    description: "",
    duedate: "",
    priority: "",
  });
  const [todos, setTodos] = useState([]);
  const [colDefs, setcolDefs] = useState([
    {
      field: "description",
      filter: true,
      floatingFilter: true,
      editable: true,
    },
    { field: "duedate", filter: true, floatingFilter: true },
    {
      field: "priority",
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ]);
  const gridRef = useRef();
  const [tab, setTab] = useState(0);
  const [date, setDate] = useState(null);

  const handleTodo = () => {
    if (!todo.description || !todo.duedate || !todo.priority) {
      alert("Type something first");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ description: "", duedate: "", priority: "" })
      setDate(null);
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  const handleTabs = (event, newValue) => setTab(newValue);

  // const handleDelete = (row) => {
  //   setTodos(todos.filter((_, index) => row != index));
  // };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs value={tab} onChange={handleTabs}>
          <Tab label="Welcome" />
          <Tab label="ToDo" />
        </Tabs>
      </AppBar>
      <br></br>
      <CustomTabPanel value={tab} index={0}>
        Welcome to My To Do list. This is where I keep track of all of my to do
        things
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        <Stack
          mt={2}
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            label="Description"
            value={todo.description}
            onChange={(event) =>
              setTodo({ ...todo, description: event.target.value })
            }
          />

          {/* <TextField
            label="Date"
            type="date"
            value={todo.duedate}
            onChange={(event) =>
              setTodo({ ...todo, duedate: event.target.value })
            }
          /> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={date}
              onChange={(date) => {
                setDate(date);
                setTodo({ ...todo, duedate: date.toISOString().substring(0, 10) });
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Priority"
            value={todo.priority}
            onChange={(event) =>
              setTodo({ ...todo, priority: event.target.value })
            }
          />
          <Button variant="contained" onClick={handleTodo}>
            Add To Do
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>

        <div
          className="ag-theme-material"
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={(params) => (gridRef.current = params.api)}
            rowData={todos}
            columnDefs={colDefs}
            rowSelection="single"
          />
        </div>
      </CustomTabPanel>
    </>
  );
}

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default Todolist;
