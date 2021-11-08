import { UserContext } from './UserContext';

const User = () => {

  return (
    <UserContext.Consumer>
      {
        (user) => (
          <div>
            <h4>User</h4>
            <Name user={user} />
            <Color user={user} />
          </div>
        )
      }
    </UserContext.Consumer>
  );
}

const Name = ({ user }) => <h3>{user.name}</h3>
const Color = ({ user }) => <h4>{user.color}</h4>

export default User;
