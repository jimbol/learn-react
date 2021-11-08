import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import bee from './bee-side.png';
import './App.css';
import ToDoList from './components/ToDoList';
// import ToDoList from './components/ToDoListClass';
import About from './components/About';
import ToDosStateContainer from './components/ToDosContainer';
import Catcher from './components/Catcher';
import User from './components/User';
import { UserContext } from "./components/UserContext";

function App() {
  const user = {
    name: 'Jim',
    color: 'Green',
  };

  return (
    <div className="App">
      <Router>

        <Catcher scope="Header">
          <header className="App-header">
            <img src={bee} className="App-logo" alt="logo" />
            <h2>Space Bee To Do List</h2>
            <p>
              <Link to="/">Home</Link> - <Link to="/about">About</Link> - <Link to="/user">User</Link>
            </p>
          </header>
        </Catcher>

        <Routes>
          <Route path="/" element={
            <ToDosStateContainer>
              <Catcher scope="Todolist">
                <ToDoList />
              </Catcher>
            </ToDosStateContainer>
          } />
          <Route path="/user" element={
            <UserContext.Provider value={user}>
              <User />
            </UserContext.Provider>
          } />
          <Route path="/about" element={<About />} />
          {/* <Route path="/detail/:id" element={<About />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
