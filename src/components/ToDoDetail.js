import styled from 'styled-components';
import { useParams } from 'react-router';
import { UserContext } from './UserContext';

const AppTitle = styled.h2`
  padding: 4px;
  color: #888;
  background-color: #efefef;
  border-radius: 6px;
`;

const ToDoDetail = ({ toDos }) => {
  let { label } = useParams();
  const toDo = toDos.find((item) => item.label === label);

  return (
    <UserContext.Consumer>
      {(user) => (
        <section>
          <AppTitle>{user.name}'s To Do Detail</AppTitle>
          <h4>{toDo.label}</h4>
          <p>
            Complete: {toDo.done ? 'Yes' : 'No'}
          </p>
        </section>
      )}
    </UserContext.Consumer>

  );
};

export default ToDoDetail;
