import React from 'react';
import './App.css';
import styled from 'styled-components';
import { UserContext } from './components/UserContext';
import ToDoList from './components/ToDoList';
import ToDoDetail from './components/ToDoDetail';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { useToDosWithDefault } from './hooks/useToDosWithDefault';

const Header = styled.div`
  background-color: #efefef;
  display: flex;
  flex-direction: row;
  padding: 16px;
  font-weight: 500;
  > * {
    padding-right: 16px;
  }
`;

const NavBar = () => {
  return (
    <Header>
      <User />
      <Link to="/">To do list</Link>
      <Link to="/about">About</Link>
    </Header>
  );
}

const Body = ({ toDos, setToDos }) => {
  return (
    <Switch>
      <Route path="/about">
        <div>
          <h2>About</h2>
          <p>Our todo app</p>
        </div>
      </Route>

      <Route path="/detail/:label">
        <ToDoDetail
          toDos={toDos}
          setToDos={setToDos}
        />
      </Route>

      <Route path="/">
        <ToDoList
          toDos={toDos}
          setToDos={setToDos}
        />
      </Route>

    </Switch>
  );
}

// separate data management from presentation/formatting
// If you're hearing echos of MVC thats no mistake
const ToDosDataContainer = ({ children }) => {
  const [toDos, setToDos] = useToDosWithDefault();

  return (
    React.Children.map(children, (child) => {
      return React.cloneElement(child, { toDos, setToDos });
    })
  );
};

const Name = ({ user }) => (
  <h2>{user.name}</h2>
);
const Email = ({ user }) => (
  <a href={`mailto:${user.email}`}>{user.email}</a>
);
const Twitter = ({ user }) => (
  <a href={`twitter.com/${user.twitter}`}>{user.twitter}</a>
);

const User = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <div>
          <Name user={user} />
          <Email user={user} />
          <br />
          <Twitter user={user} />
        </div>
      )}
    </UserContext.Consumer>
  );
}


const App = () => {
  const user = {
    name: 'Jim',
    email: 'jim.hall.dev@gmail.com',
    twitter: 'jimboolean'
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <UserContext.Provider value={user}>
            <NavBar />
            <ToDosDataContainer>
              <Body />
            </ToDosDataContainer>
          </UserContext.Provider>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;
