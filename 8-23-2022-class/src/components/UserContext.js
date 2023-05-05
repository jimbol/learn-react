import React from "react";

export const UserContext = React.createContext({});

const user = {
  name: 'Jim',
  email: 'jim.hall.dev@gmail.com',
  twitter: 'jimboolean'
};

export const User = () => {
  return (
    <UserContext.Provider value={user}>
      <DisplayUser />
    </UserContext.Provider>
  );
}

const Name = ({ user }) => (
  <h2>User: {user.name}</h2>
);

const Email = ({ user }) => (
  <a href={`mailto:${user.email}`}>{user.email}</a>
);

const Twitter = () => (
  <UserContext.Consumer>
    {(user) => (
      <a href={`twitter.com/${user.twitter}`}>{user.twitter}</a>
    )}
  </UserContext.Consumer>
);

const DisplayUser = () => {
  return (
    <UserContext.Consumer>
      {(user) => (
        <div>
          <Name user={user} />
          <Email user={user} />
          <br />
          <Twitter />
        </div>
      )}
    </UserContext.Consumer>
  );
}
