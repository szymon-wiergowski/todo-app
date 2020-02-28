import React, { useState } from "react";

import { List, Segment } from "semantic-ui-react";

import ToDoItem from "./ToDoItem";
import ToDoEditItem from "./ToDoEditItem";

export const BASE_URL = "https://rest-api-jfdz12-sw.firebaseio.com";

const ToDoListBoard = (props) => {
  const [editTaskId, setEditTaskId] = useState(null);

  const handleOnEdit = markedId => {
    setEditTaskId(markedId);
  };

  const handleOnClose = () => {
    setEditTaskId(null);
  };

  const handleOnSave = () => {
    props.onSave();
    setEditTaskId(null);
  };

  const { todo, onDelete, onCheck } = props;

  return (
    <Segment>
      <List divided relaxed size="large">
        {todo.map(item => {
          return editTaskId === item.id ? (
            <ToDoEditItem
              key={item.id}
              todo={todo}
              done={item.done}
              id={item.id}
              item={item}
              onClose={handleOnClose}
              onSave={handleOnSave}
              onDelete={onDelete}
              onCheck={onCheck}
              onEdit={handleOnEdit}
            />
          ) : (
            <ToDoItem
              key={item.id}
              todo={todo}
              done={item.done}
              id={item.id}
              item={item}
              onDelete={onDelete}
              onCheck={onCheck}
              onEdit={handleOnEdit}
            />
          );
        })}
      </List>
    </Segment>
  );
};

export default ToDoListBoard;

// export default class ToDoListBoard extends React.Component {
//   state = {
//     editTaskId: null
//   };

//   handleOnEdit = markedId => {
//     this.setState({
//       editTaskId: markedId
//     });
//   };

//   handleOnClose = () => {
//     this.setState({
//       editTaskId: null
//     });
//   };

//   handleOnSave = () => {
//     this.props.onSave();
//     this.setState({
//       editTaskId: null
//     });
//   };

//   render() {
//     const { editTaskId } = this.state;
//     const { todo, onDelete, onCheck } = this.props;

//     return (
//       <Segment>
//           <List divided relaxed size="large">
//             {todo.map(item => {
//               return editTaskId === item.id ? (
//                 <ToDoEditItem
//                   key={item.id}
//                   todo={todo}
//                   done={item.done}
//                   id={item.id}
//                   item={item}
//                   onClose={this.handleOnClose}
//                   onSave={this.handleOnSave}
//                   onDelete={onDelete}
//                   onCheck={onCheck}
//                   onEdit={this.handleOnEdit}
//                 />
//               ) : (
//                 <ToDoItem
//                   key={item.id}
//                   todo={todo}
//                   done={item.done}
//                   id={item.id}
//                   item={item}
//                   onDelete={onDelete}
//                   onCheck={onCheck}
//                   onEdit={this.handleOnEdit}
//                 />
//               );
//             })}
//           </List>
//       </Segment>
//     );
//   }
// }
