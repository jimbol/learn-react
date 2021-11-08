import styled from 'styled-components';

const StyledToDoItem = styled.li`
  text-align: left;
  opacity: ${({ done }) => (done ? 0.5 : 1)};
`;

const ToDoListItem = ({
  toDo,
  toggleToDo,
}) => {
  return (
    <StyledToDoItem
      done={toDo.done}
      onClick={() => {
        console.log("clicked")
        toggleToDo(toDo.id);
      }}
    >
      {toDo.label}
    </StyledToDoItem>
  );
};

export default ToDoListItem;
