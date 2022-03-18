import React from "react";

export const UserContext = React.createContext();

const u = {
  name: 'Jim',
  twitter: 'jimboolean',
  email: 'jim.hall.dev@gmail.com',
};

const User = () => {
  return (
    <UserContext.Provider value={u}>
      <DisplayUser />
    </UserContext.Provider>
  );
}
const Name = ({ user }) => (<h6>{user.name}</h6>);
const Email = ({ user }) => (<h6>{user.email}</h6>);
const Twitter = () => {
  return (
    <UserContext.Consumer>
      {(user) => (<h6>{user.twitter}</h6>)}
    </UserContext.Consumer>
  );
}

const DisplayUser = () => {
  return (
    <UserContext.Consumer>
      {
        (user) => (
          <div>
            <Name user={user} />
            <Email user={user} />
            <Twitter />
          </div>
        )
      }
    </UserContext.Consumer>
  );
}

export default User;
