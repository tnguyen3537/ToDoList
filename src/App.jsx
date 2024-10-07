import "./App.css";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <Container maxWidth="lg" fixed >
      <CssBaseline />
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/todolist"}> ToDos</Link>
        <Link to={"/about"}> About</Link>
        <Link to={"/contact"}> Contact</Link>
      </nav>
      <br></br>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6">My To Do List</Typography>
        </Toolbar>
      </AppBar>

      <div className="App">
        <Outlet />
      </div>
    </Container>
  );
}

export default App;
